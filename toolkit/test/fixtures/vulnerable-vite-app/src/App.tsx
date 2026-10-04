import { supabase } from '@/integrations/supabase/client';

export async function register(email: string, password: string) {
  const { error } = await supabase.auth.signUp({ email, password });
  if (error) throw error;
}

export default function App() {
  return <main>Welcome</main>;
}
