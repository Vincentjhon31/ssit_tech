-- Create profiles table for storing user profile data
-- This moves bulky profile fields OUT of user_metadata (which bloats the JWT/cookie)
-- and into a proper database table.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  company text default '',
  phone text default '',
  location text default '',
  website text default '',
  bio text default '',
  updated_at timestamptz default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Users can read their own profile
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

-- Users can insert their own profile
create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Service role (admin) can read all profiles
create policy "Service role can read all profiles"
  on public.profiles for select
  using (auth.role() = 'service_role');

-- Auto-create a profile row when a new user signs up
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger on auth.users insert
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Migrate existing user_metadata into profiles for current users
insert into public.profiles (id, company, phone, location, website, bio)
select
  id,
  coalesce(raw_user_meta_data->>'company', ''),
  coalesce(raw_user_meta_data->>'phone', ''),
  coalesce(raw_user_meta_data->>'location', ''),
  coalesce(raw_user_meta_data->>'website', ''),
  coalesce(raw_user_meta_data->>'bio', '')
from auth.users
on conflict (id) do update set
  company = excluded.company,
  phone = excluded.phone,
  location = excluded.location,
  website = excluded.website,
  bio = excluded.bio;
