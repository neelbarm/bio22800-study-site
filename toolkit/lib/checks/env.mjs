// Check 2: client-exposed env vars, committed .env files, .gitignore coverage.
import { loadPatterns, snippet, entropy, JWT_RE, decodeJwtPayload, isPlaceholderSecret, maskEnvValue, PUBLIC_DEFAULT_VALUES } from '../patterns.mjs';
import { lineAt, lineText, isEnvFile, isExampleEnv, readGitignore, isGitignored } from '../context.mjs';

const PUBLIC_PREFIX = /\b(VITE_|NEXT_PUBLIC_|REACT_APP_|EXPO_PUBLIC_)([A-Z0-9_]+)\b/g;
const SAFE_NAME = /(PUBLISHABLE|ANON|PUBLIC_KEY|SITE_KEY|_URL$|_URI$|_ID$|_HOST$|_DOMAIN$|_REGION$|PROJECT_REF|MEASUREMENT)/;
const CRITICAL_NAME = /(SERVICE_ROLE|SERVICE_KEY|SUPABASE_SECRET|STRIPE_SECRET|STRIPE_SK|OPENAI|ANTHROPIC|CLAUDE|PRIVATE_KEY|DATABASE_URL|DB_URL|POSTGRES|AWS_SECRET|WEBHOOK_SECRET|JWT_SECRET)/;
const PAID_API = /(GEMINI|GOOGLE_AI|GROQ|MISTRAL|REPLICATE|ELEVENLABS|ELEVEN_LABS|DEEPSEEK|PERPLEXITY|COHERE|TOGETHER|FIREWORKS|HUGGINGFACE|HF_|RESEND|SENDGRID|MAILGUN|POSTMARK|TWILIO|PINECONE|FIRECRAWL|SERPAPI|SERPER|ASSEMBLYAI|DEEPGRAM|STABILITY|OPENROUTER|XAI|GROK)/;
const HIGH_NAME = /(SECRET|PRIVATE|PASSWORD|PASSWD)/;
const PLACEHOLDER = /^(|your[-_].*|.*example.*|changeme|change_me|xxx+|<.*>|\.\.\.|todo|placeholder|dummy|test|null|none|false|true|\d{1,6})$/i;

function classifyName(rest) {
  if (SAFE_NAME.test(rest) && !/SECRET|SERVICE_ROLE|PRIVATE_KEY/.test(rest)) return null;
  if (CRITICAL_NAME.test(rest)) return 'critical';
  if (PAID_API.test(rest) && /(KEY|TOKEN|SECRET)/.test(rest)) return 'high';
  if (HIGH_NAME.test(rest)) return 'high';
  return null;
}

// Public by design: Stripe publishable keys, Supabase publishable keys, PostHog and Mapbox public tokens.
const PUBLIC_VALUE = /^(?:pk_live_|pk_test_|sb_publishable_|phc_|pk\.)/;
const PLACEHOLDER_WORD = /(your[-_]|example|placeholder|changeme|change[-_]me|replace[-_]?(?:me|with)|xxxx|<[^>]*>|\$\{)/i;
const URL_WITH_PASSWORD = /^[a-z][a-z0-9+.-]*:\/\/[^:\s/@]+:([^@\s]+)@([^:/?#\s]+)/i;
const PLACEHOLDER_PASSWORD = /^(?:\[.*\]|<.*>|\$\{.*\}|\*+|x+|password|pass|postgres|secret|changeme|change_me|example|test|your[-_].*|.*placeholder.*)$/i;
const LOCAL_DB_HOST = /^(?:localhost|127\.0\.0\.1|0\.0\.0\.0|host\.docker\.internal|::1|db|postgres|database)$/i;

function looksReal(name, value, patterns) {
  const v = value.trim().replace(/^["']|["']$/g, '');
  if (PLACEHOLDER.test(v) || PUBLIC_DEFAULT_VALUES.has(v) || PUBLIC_VALUE.test(v)) return false;
  const hit = patterns.map((p) => (p.severity !== 'low' ? new RegExp(p.re.source).exec(v) : null)).find(Boolean);
  if (hit) return !isPlaceholderSecret(hit[0]);
  const jwt = new RegExp(JWT_RE.source).exec(v);
  if (jwt) {
    const payload = decodeJwtPayload(jwt[0]);
    if (payload?.iss === 'supabase-demo') return false; // Supabase CLI local keys, published in the docs
    return (payload?.role ?? 'unknown') !== 'anon'; // anon keys are public by design
  }
  // Connection strings carry a database password whatever the variable is called (DATABASE_URL, DIRECT_URL).
  const url = URL_WITH_PASSWORD.exec(v);
  if (url) {
    let password = url[1];
    try { password = decodeURIComponent(password); } catch { /* keep raw */ }
    return !PLACEHOLDER_PASSWORD.test(password) && !LOCAL_DB_HOST.test(url[2]);
  }
  const bare = name.replace(/^(VITE_|NEXT_PUBLIC_|REACT_APP_|EXPO_PUBLIC_)/, '');
  if (SAFE_NAME.test(bare) && !/SECRET|SERVICE_ROLE|PRIVATE_KEY/.test(bare)) return false;
  if (PLACEHOLDER_WORD.test(v)) return false;
  return v.length >= 16 && entropy(v) >= 3.5 && !/^https?:\/\//i.test(v);
}

/** NAME=masked value, never the raw line: the variable name decides nothing about what gets printed. */
const maskedAssign = (v) => `${v.name}=${maskEnvValue(v.value)}`;

function parseEnv(text) {
  const out = [];
  text.split('\n').forEach((raw, i) => {
    const m = /^\s*(?:export\s+)?([A-Za-z_][A-Za-z0-9_.-]*)\s*=\s*(.*)$/.exec(raw);
    if (m) out.push({ name: m[1], value: m[2].replace(/\s+#.*$/, '').trim(), line: i + 1, raw });
  });
  return out;
}

export function checkEnv(ctx) {
  const patterns = loadPatterns();

  // 2a. Public-prefixed env var names that look like secrets (one finding per name).
  const seen = new Map();
  for (const f of ctx.files) {
    if (/\.(md|mdx|markdown|txt|rst)$/i.test(f.path)) continue; // prose mentions are not usage
    const re = new RegExp(PUBLIC_PREFIX.source, 'g');
    let m;
    while ((m = re.exec(f.text))) {
      const name = m[1] + m[2];
      const severity = classifyName(m[2]);
      if (!severity) continue;
      const line = lineAt(f.text, m.index);
      if (!seen.has(name)) seen.set(name, { severity, first: { file: f.path, line }, places: [] });
      const entry = seen.get(name);
      if (!entry.places.some((p) => p.file === f.path)) {
        const text = lineText(f.text, line);
        const assign = isEnvFile(f.path) ? parseEnv(text)[0] : null;
        entry.places.push({ file: f.path, line, text: assign ? maskedAssign(assign) : text });
      }
    }
  }
  for (const [name, e] of seen) {
    const first = e.places[0];
    const others = e.places.slice(1).map((p) => `${p.file}:${p.line}`);
    ctx.add('env.client-exposed-secret', {
      severity: e.severity,
      title: `Secret-looking env var exposed to the browser: ${name}`,
      file: first.file,
      line: first.line,
      evidence: snippet(first.text) + (others.length ? ` (also: ${others.slice(0, 5).join(', ')}${others.length > 5 ? ', …' : ''})` : ''),
    });
  }

  // 2b. .env files present in the repo.
  const rules = readGitignore(ctx.root);
  for (const f of ctx.files.filter((x) => isEnvFile(x.path))) {
    const vars = parseEnv(f.text);
    const real = vars.filter((v) => v.value && looksReal(v.name, v.value, patterns));
    if (isExampleEnv(f.path)) {
      if (real.length) {
        ctx.add('env.example-real-values', {
          title: `Example env file contains real-looking values: ${f.path}`,
          file: f.path, line: real[0].line,
          evidence: `${real.length} real-looking value(s), e.g. ${maskedAssign(real[0])}`,
        });
      }
      continue;
    }
    const tracked = ctx.gitTracked ? ctx.gitTracked.has(f.path) : null;
    const ignored = isGitignored(rules, f.path);
    if (tracked === false || (tracked === null && ignored === true)) {
      ctx.add('env.dotenv-local-only', { file: f.path, line: null, evidence: tracked === false ? 'not in the git index' : 'matched by .gitignore' });
      continue;
    }
    if (real.length) {
      ctx.add('env.dotenv-committed', {
        title: `${f.path} is ${tracked ? 'committed' : 'not git-ignored'} and contains real-looking secrets`,
        file: f.path, line: real[0].line,
        evidence: `${real.length} real-looking value(s): ${real.slice(0, 4).map((v) => v.name).join(', ')}${real.length > 4 ? ', …' : ''}. First: ${maskedAssign(real[0])}`,
      });
    } else if (vars.length) {
      ctx.add('env.dotenv-no-secrets', { file: f.path, line: null, evidence: `${vars.length} variable(s), none look like real secrets` });
    }
  }

  // 2c. .gitignore must exclude .env
  const envIgnored = isGitignored(rules, '.env');
  if (rules === null) {
    ctx.add('env.gitignore-missing-env', { title: 'No .gitignore file (so .env files are not excluded)', file: '.gitignore', line: null, evidence: 'file not found' });
  } else if (!envIgnored) {
    const local = isGitignored(rules, '.env.local');
    ctx.add('env.gitignore-missing-env', {
      file: '.gitignore', line: null,
      evidence: local ? '.env.local is ignored (e.g. via *.local) but plain .env is not' : 'no rule matches .env',
    });
  }
}
