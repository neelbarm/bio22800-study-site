-- Fake fixture: a schema with RLS done right.
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  display_name text
);
alter table public.profiles enable row level security;

create policy "Users read own profile" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);

create policy "Users update own profile" on public.profiles
  for update to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create table public.subscriptions (
  user_id uuid primary key references auth.users on delete cascade,
  status text not null default 'inactive'
);
alter table public.subscriptions enable row level security;

create policy "Users read own subscription" on public.subscriptions
  for select to authenticated using ((select auth.uid()) = user_id);

-- Written only by the webhook (service role); no policies, so clients cannot touch it.
create table public.stripe_events (
  id text primary key,
  received_at timestamptz not null default now()
);
alter table public.stripe_events enable row level security;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

insert into storage.buckets (id, name, public) values ('invoices', 'invoices', false);
