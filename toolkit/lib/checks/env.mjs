// Check 2: client-exposed env vars, committed .env files, .gitignore coverage.
import { loadPatterns, snippet, entropy, JWT_RE, decodeJwtPayload } from '../patterns.mjs';
import { lineAt, lineText, isEnvFile, isExampleEnv, readGitignore, isGitignored } from '../context.mjs';

const PUBLIC_PREFIX = /\b(VITE_|NEXT_PUBLIC_|REACT_APP_|EXPO_PUBLIC_)([A-Z0-9_]+)\b/g;
const SAFE_NAME = /(PUBLISHABLE|ANON|PUBLIC_KEY|SITE_KEY|_URL$|_URI$|_ID$|_HOST$|_DOMAIN$|_REGION$|PROJECT_REF|MEASUREMENT)/;
const CRITICAL_NAME = /(SERVICE_ROLE|SERVICE_KEY|STRIPE_SECRET|STRIPE_SK|OPENAI|ANTHROPIC|CLAUDE|PRIVATE_KEY|DATABASE_URL|DB_URL|POSTGRES|AWS_SECRET|WEBHOOK_SECRET|JWT_SECRET)/;
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

function looksReal(name, value, patterns) {
  const v = value.trim().replace(/^["']|["']$/g, '');
  if (PLACEHOLDER.test(v)) return false;
  if (patterns.some((p) => p.severity !== 'low' && new RegExp(p.re.source).test(v))) return true;
  const jwt = new RegExp(JWT_RE.source).exec(v);
  if (jwt) return (decodeJwtPayload(jwt[0])?.role ?? 'unknown') !== 'anon'; // anon keys are public by design
  const bare = name.replace(/^(VITE_|NEXT_PUBLIC_|REACT_APP_|EXPO_PUBLIC_)/, '');
  if (SAFE_NAME.test(bare) && !/SECRET|SERVICE_ROLE|PRIVATE_KEY/.test(bare)) return false;
  if (/^[a-z][a-z0-9+.-]*:\/\/[^:\s/]+:[^@\s]{3,}@/i.test(v)) return true; // URL with password
  return v.length >= 16 && entropy(v) >= 3.5 && !/^https?:\/\//i.test(v);
}

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
      if (!entry.places.some((p) => p.file === f.path)) entry.places.push({ file: f.path, line, text: lineText(f.text, line) });
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
          evidence: `${real.length} real-looking value(s), e.g. ${snippet(real[0].raw)}`,
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
        evidence: `${real.length} real-looking value(s): ${real.slice(0, 4).map((v) => v.name).join(', ')}${real.length > 4 ? ', …' : ''}. First: ${snippet(real[0].raw)}`,
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
