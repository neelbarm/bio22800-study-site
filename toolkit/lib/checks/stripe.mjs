// Check 4: Stripe secret usage in the client, webhook verification, fulfillment.
import { snippet } from '../patterns.mjs';
import { lineAt, lineText, isClientFile, isMaybeClientFile, isCodeFile, isTestFile, isCommentLine, isServerHandler, localImports } from '../context.mjs';

const CLIENT_STRIPE_SECRET = [
  /\bSTRIPE_SECRET\w*/,
  /\bSTRIPE_SK\b/,
  /\bnew\s+Stripe\s*\(/,
  /\bfrom\s+['"]stripe['"]/,
  /\brequire\(\s*['"]stripe['"]\s*\)/,
];
const WEBHOOK_EVENT = /checkout\.session\.completed|payment_intent\.succeeded|invoice\.(?:paid|payment_succeeded)|customer\.subscription\.(?:created|updated|deleted)|stripe\.webhooks|constructEvent/;
const VERIFY = /constructEvent(?:Async)?\s*\(/;
const PARSE_FIRST = /\b(?:req|request)\.json\s*\(\s*\)|express\.json\s*\(|bodyParser\.json\s*\(|JSON\.parse\s*\(\s*(?:await\s+)?(?:req|request|body|rawBody|event)\b/;
const IDEMPOTENT = /\b(?:event|evt|stripeEvent)\.id\b|idempot|processed_events|stripe_events|webhook_events|onConflict|on\s+conflict|\.upsert\s*\(/i;
const PAID_WRITE =
  /\.(?:update|upsert|insert)\s*\(\s*\{[^}]*\b(?:paid|is_paid|isPaid|has_paid|hasPaid|is_pro|isPro|is_premium|isPremium|premium|subscription_status|subscribed|plan|tier|credits|payment_status|paymentStatus)\b[^}]*\}/;
const SUCCESS_CONTEXT = /session_id|payment_intent|redirect_status|checkout[_-]?session|searchParams\.get\(\s*['"](?:success|paid)['"]/;

// The file reads an incoming HTTP request (Express, Next, Deno, Netlify, ...).
const READS_REQUEST = /\b(?:req|request)\s*\.\s*(?:text|json|arrayBuffer|body|rawBody|headers)\b|\bevent\.body\b|express\.raw\s*\(|bodyParser|\bDeno\.serve\s*\(|\bserve\s*\(\s*async/;
// Fallback parse of the raw body (or the parsed request) instead of a verified event.
const FALLBACK_PARSE = /JSON\.parse\s*\(\s*(?:await\s+)?(?:body|rawBody|raw|payload|text|buf|buffer|requestBody|reqBody|req\.body|request\.body)\b|\b(?:req|request)\.json\s*\(\s*\)/;
const SIG_OR_SECRET = /sig|signature|secret|STRIPE_WEBHOOK/i;

/**
 * Webhook endpoints only: a file that answers HTTP (route handler, Edge Function, pages/api, ...)
 * or reads a request itself. A module that receives an already-verified event from the route
 * is not an endpoint.
 */
export const isStripeWebhookFile = (f, ctx = null) =>
  isCodeFile(f.path) && !isTestFile(f.path) && /stripe/i.test(`${f.path}\n${f.text}`) && (WEBHOOK_EVENT.test(f.text) || /webhook/i.test(f.path)) &&
  (isServerHandler(f.path, f.text, ctx) || READS_REQUEST.test(f.text));

/** Forward scan with a brace stack, skipping strings and comments. Returns block bounds for `pos`. */
function blocks(text) {
  const opens = []; // [{ at, close }]
  const stack = [];
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (c === '/' && text[i + 1] === '/') { const e = text.indexOf('\n', i); i = e < 0 ? text.length : e; continue; }
    if (c === '/' && text[i + 1] === '*') { const e = text.indexOf('*/', i + 2); i = e < 0 ? text.length : e + 1; continue; }
    if (c === '"' || c === "'" || c === '`') {
      let j = i + 1;
      while (j < text.length && text[j] !== c) { if (text[j] === '\\') j++; j++; }
      i = j;
      continue;
    }
    if (c === '{') { const b = { at: i, close: text.length }; opens.push(b); stack.push(b); }
    else if (c === '}') { const b = stack.pop(); if (b) b.close = i; }
  }
  return opens;
}

const innermost = (bl, pos) => bl.filter((b) => b.at < pos && pos < b.close).sort((a, b) => b.at - a.at)[0] || null;
const blockAfter = (text, bl, from) => {
  const m = /^\s*(?:else\b|catch\b\s*(?:\([^)]*\))?)\s*/.exec(text.slice(from));
  if (!m) return null;
  const at = from + m[0].length;
  return text[at] === '{' ? bl.find((b) => b.at === at) || null : { at, close: text.indexOf(';', at) < 0 ? text.length : text.indexOf(';', at) };
};

/**
 * Is constructEvent() only one of two paths? Catches
 *   if (sig && secret) { constructEvent } else { JSON.parse(body) }
 *   if (!secret) { JSON.parse(body) } else { constructEvent }
 *   try { constructEvent } catch { JSON.parse(body) }
 *   sig ? constructEvent(...) : JSON.parse(body)
 *   let event = JSON.parse(body); if (sig) { event = constructEvent(...) }
 * Returns the index of the fallback (or of the guard), or -1.
 */
export function optionalVerification(text, verify) {
  const bl = blocks(text);
  const inner = innermost(bl, verify);
  // Ternary on the same statement.
  const stmtStart = Math.max(text.lastIndexOf(';', verify), text.lastIndexOf('{', verify), text.lastIndexOf('\n\n', verify));
  const stmtEnd = (() => { const e = text.indexOf(';', verify); return e < 0 ? text.length : e; })();
  const stmt = text.slice(stmtStart + 1, stmtEnd);
  if (/\?[^:?]*constructEvent|constructEvent[^;]*?:\s*(?:await\s+)?(?:JSON\.parse|\w+\.json\s*\()/.test(stmt) && SIG_OR_SECRET.test(stmt.split('?')[0]) && FALLBACK_PARSE.test(stmt)) {
    return stmtStart + 1;
  }
  if (!inner) return -1;
  const head = text.slice(Math.max(0, inner.at - 300), inner.at);
  const ifM = /\bif\s*\(((?:[^()]|\([^()]*\))*)\)\s*$/.exec(head);
  if (ifM) {
    // The block runs only when a signature/secret test passes. Unsafe when there is a fallback anywhere.
    if (SIG_OR_SECRET.test(ifM[1])) {
      const fb = text.search(FALLBACK_PARSE);
      if (fb >= 0) return fb;
    }
    const other = blockAfter(text, bl, inner.close + 1);
    if (other && FALLBACK_PARSE.test(text.slice(other.at, other.close))) return other.at + text.slice(other.at, other.close).search(FALLBACK_PARSE);
    return -1;
  }
  if (/\belse\s*$/.test(head)) {
    // Find the if-block that precedes this else and look for the fallback there.
    const before = text.slice(0, inner.at).replace(/\s*else\s*$/, '');
    const prev = bl.filter((b) => b.close === before.length - 1)[0];
    if (prev && FALLBACK_PARSE.test(text.slice(prev.at, prev.close))) return prev.at + text.slice(prev.at, prev.close).search(FALLBACK_PARSE);
    return -1;
  }
  if (/\btry\s*$/.test(head)) {
    const handler = blockAfter(text, bl, inner.close + 1);
    if (handler) {
      const body = text.slice(handler.at, handler.close);
      const fb = body.search(FALLBACK_PARSE);
      const exits = body.search(/\breturn\b|\bthrow\b|res\.status\(\s*4/);
      if (fb >= 0 && (exits < 0 || fb < exits)) return handler.at + fb;
    }
  }
  return -1;
}

export function checkStripe(ctx) {
  const secretLines = new Set(ctx.findings.filter((x) => x.category === 'secrets').map((x) => `${x.file}:${x.line}`));

  for (const f of ctx.files) {
    if (!isCodeFile(f.path)) continue;
    const client = isClientFile(f.path, f.text, ctx);

    // 4a. Stripe secret / server SDK in client code (one finding per file).
    if (client) {
      const lines = f.text.split('\n');
      const idx = lines.findIndex((l, i) => !isCommentLine(l) && !secretLines.has(`${f.path}:${i + 1}`) && CLIENT_STRIPE_SECRET.some((r) => r.test(l)));
      if (idx >= 0) {
        const maybe = isMaybeClientFile(f.path, f.text, ctx);
        ctx.add('stripe.secret-in-client', {
          ...(maybe ? {
            severity: 'medium', tier4: false,
            title: 'Stripe server SDK or secret in a component that may run in the browser (no \'use client\'; verify)',
          } : {}),
          file: f.path, line: idx + 1, evidence: snippet(lines[idx]),
        });
      }
    }

    // 4b-d. Webhook handlers.
    if (!client && isStripeWebhookFile(f, ctx)) {
      const anchor = f.text.search(WEBHOOK_EVENT);
      const anchorLine = lineAt(f.text, Math.max(anchor, 0));
      const verify = f.text.search(VERIFY);
      const optional = verify < 0 ? -1 : optionalVerification(f.text, verify);
      if (verify < 0) {
        ctx.add('stripe.webhook-no-signature', { file: f.path, line: anchorLine, evidence: snippet(lineText(f.text, anchorLine)) });
      } else if (optional >= 0) {
        const at = lineAt(f.text, optional);
        ctx.add('stripe.webhook-optional-verification', { file: f.path, line: at, evidence: snippet(lineText(f.text, at)) });
      } else {
        const parse = f.text.search(PARSE_FIRST);
        const pagesApi = /(^|\/)pages\/api\//.test(f.path) && !/bodyParser\s*:\s*false/.test(f.text);
        if ((parse >= 0 && parse < verify) || pagesApi) {
          const at = parse >= 0 && parse < verify ? lineAt(f.text, parse) : lineAt(f.text, verify);
          ctx.add('stripe.webhook-parsed-body', {
            file: f.path, line: at,
            evidence: pagesApi && !(parse >= 0 && parse < verify) ? 'pages/api route without `export const config = { api: { bodyParser: false } }`' : snippet(lineText(f.text, at)),
          });
        }
      }
      // Fulfillment often lives in a module the route imports (lib/stripe/handlers.ts).
      const related = [f, ...localImports(f, ctx), ...localImports(f, ctx).flatMap((m) => localImports(m, ctx))];
      if (!related.some((x) => IDEMPOTENT.test(x.text))) {
        ctx.add('stripe.webhook-no-idempotency', { file: f.path, line: anchorLine, evidence: 'no event.id tracking, upsert or unique constraint handling found in this handler' });
      }
    }

    // 4e. Fulfillment on the client success page.
    if (client && (/success|thank|confirm|complete|return/i.test(f.path) || SUCCESS_CONTEXT.test(f.text))) {
      const m = PAID_WRITE.exec(f.text);
      if (m) {
        const line = lineAt(f.text, m.index);
        ctx.add('stripe.client-fulfillment', { file: f.path, line, evidence: snippet(m[0].split('\n').join(' ')) });
      }
    }
  }
}
