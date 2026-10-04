// Check 4: Stripe secret usage in the client, webhook verification, fulfillment.
import { snippet } from '../patterns.mjs';
import { lineAt, lineText, isClientFile, isCodeFile, isTestFile, isCommentLine } from '../context.mjs';

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

export const isStripeWebhookFile = (f) =>
  isCodeFile(f.path) && !isTestFile(f.path) && /stripe/i.test(`${f.path}\n${f.text}`) && (WEBHOOK_EVENT.test(f.text) || /webhook/i.test(f.path));

export function checkStripe(ctx) {
  const secretLines = new Set(ctx.findings.filter((x) => x.category === 'secrets').map((x) => `${x.file}:${x.line}`));

  for (const f of ctx.files) {
    if (!isCodeFile(f.path)) continue;
    const client = isClientFile(f.path, f.text, ctx);

    // 4a. Stripe secret / server SDK in client code (one finding per file).
    if (client) {
      const lines = f.text.split('\n');
      const idx = lines.findIndex((l, i) => !isCommentLine(l) && !secretLines.has(`${f.path}:${i + 1}`) && CLIENT_STRIPE_SECRET.some((r) => r.test(l)));
      if (idx >= 0) ctx.add('stripe.secret-in-client', { file: f.path, line: idx + 1, evidence: snippet(lines[idx]) });
    }

    // 4b-d. Webhook handlers.
    if (!client && isStripeWebhookFile(f)) {
      const anchor = f.text.search(WEBHOOK_EVENT);
      const anchorLine = lineAt(f.text, Math.max(anchor, 0));
      const verify = f.text.search(VERIFY);
      if (verify < 0) {
        ctx.add('stripe.webhook-no-signature', { file: f.path, line: anchorLine, evidence: snippet(lineText(f.text, anchorLine)) });
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
      if (!IDEMPOTENT.test(f.text)) {
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
