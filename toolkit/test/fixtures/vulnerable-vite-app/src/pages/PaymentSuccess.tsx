import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

export default function PaymentSuccess() {
  const [params] = useSearchParams();

  useEffect(() => {
    const sessionId = params.get('session_id');
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('session', session);
      if (session && sessionId) {
        supabase.from('profiles').update({ is_paid: true, plan: 'pro' }).eq('id', session.user.id);
      }
    });
  }, [params]);

  return <h1>Thanks! Your account is now Pro.</h1>;
}
