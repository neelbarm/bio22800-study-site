-- Fake fixture: schema as an AI app builder might generate it.
create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  email text,
  is_paid boolean default false,
  credits integer default 0
);
alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone" on public.profiles
  for select using (true);

create policy "Anyone can update profiles" on public.profiles
  for update using (true);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  amount_cents integer not null
);

create table public.messages (
  id bigint generated always as identity primary key,
  body text
);
alter table public.messages enable row level security;

create policy "Visitors can post messages" on public.messages
  for insert to anon with check (true);

create or replace function public.increment_credits(uid uuid, amount int)
returns void
language plpgsql
security definer
as $$
begin
  update public.profiles set credits = credits + amount where id = uid;
end;
$$;

insert into storage.buckets (id, name, public) values ('avatars', 'avatars', true);
