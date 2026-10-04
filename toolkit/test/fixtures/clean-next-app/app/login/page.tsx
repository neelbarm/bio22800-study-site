'use client';
import { createBrowserClient } from '@supabase/ssr';

const supabase = createBrowserClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function LoginPage() {
  async function signUp(email: string, password: string) {
    await supabase.auth.signUp({ email, password, options: { emailRedirectTo: `${location.origin}/auth/callback` } });
  }
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        void signUp(String(data.get('email')), String(data.get('password')));
      }}
    >
      <input name="email" type="email" />
      <input name="password" type="password" />
      <button type="submit">Create account</button>
    </form>
  );
}
