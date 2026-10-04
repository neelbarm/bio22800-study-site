import Stripe from 'stripe';
import { supabaseAdmin } from '@/lib/supabase/admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const signature = req.headers.get('stripe-signature');
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return new Response('Invalid signature', { status: 400 });
  }

  // Record the event id first; a duplicate delivery hits the primary key and is skipped.
  const { error: duplicate } = await supabaseAdmin.from('stripe_events').insert({ id: event.id });
  if (duplicate) return new Response('Already processed', { status: 200 });

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    await supabaseAdmin.from('subscriptions').upsert({ user_id: session.client_reference_id, status: 'active' });
  }
  return new Response('ok');
}
