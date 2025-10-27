-- Supabase initialization for Giggle
-- Run this in Supabase SQL Editor to create gigs and transactions tables,
-- enable RLS, add owner trigger and safe policies.

-- 1) Create gigs table
create table if not exists public.gigs (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  payout text,
  tags text[],
  location text,
  boosted boolean default false,
  created_at timestamptz default now(),
  user_id uuid,
  claimed boolean default false,
  completed boolean default false,
  private boolean default false
);

-- 2) Create transactions table
create table if not exists public.transactions (
  id uuid default gen_random_uuid() primary key,
  gig_id uuid references public.gigs(id) on delete set null,
  label text,
  amount numeric default 0,
  created_at timestamptz default now(),
  status text default 'pending', -- pending | available
  actor_id uuid -- who caused the transaction (user id)
);

-- 3) Enable Row Level Security
alter table public.gigs enable row level security;
alter table public.transactions enable row level security;

-- 4) Trigger: set gig owner to auth.uid() on insert when not provided
create or replace function public.set_gig_owner()
returns trigger as $$
begin
  if new.user_id is null then
    new.user_id := auth.uid();
  end if;
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists set_gig_owner on public.gigs;
create trigger set_gig_owner
before insert on public.gigs
for each row execute procedure public.set_gig_owner();

-- 5) Policies for gigs
create policy if not exists "allow insert for authenticated" on public.gigs
  for insert
  with check (auth.role() = 'authenticated');

-- public feed: show non-private gigs
create policy if not exists "allow select public gigs" on public.gigs
  for select
  using (coalesce(private, false) = false);

create policy if not exists "allow update by owner" on public.gigs
  for update
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy if not exists "allow delete by owner" on public.gigs
  for delete
  using (user_id = auth.uid());

-- 6) Policies for transactions
create policy if not exists "allow insert transactions for authenticated" on public.transactions
  for insert
  with check (auth.role() = 'authenticated');

create policy if not exists "allow select transactions by actor" on public.transactions
  for select
  using (actor_id = auth.uid());

-- 7) Indexes
create index if not exists gigs_created_at_idx on public.gigs (created_at desc);
create index if not exists transactions_created_at_idx on public.transactions (created_at desc);

-- End of file
