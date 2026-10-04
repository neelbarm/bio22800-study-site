import { createClient } from '@/lib/supabase/server';

// Fulfillment happens in the Stripe webhook; this page only reads the status.
export default async function SuccessPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: sub } = await supabase.from('subscriptions').select('status').eq('user_id', user?.id ?? '').maybeSingle();
  return <p>{sub?.status === 'active' ? 'You are all set.' : 'Payment is processing; this page will update shortly.'}</p>;
}
