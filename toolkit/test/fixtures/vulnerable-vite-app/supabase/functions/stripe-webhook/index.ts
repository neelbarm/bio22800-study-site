import { createClient } from 'npm:@supabase/supabase-js@2';

const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);

Deno.serve(async (req) => {
  const event = await req.json();
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    await supabase.from('profiles').update({ is_paid: true }).eq('email', session.customer_email);
  }
  return new Response('ok');
});
