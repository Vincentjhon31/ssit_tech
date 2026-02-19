-- Product categories table – allows admins to add custom categories beyond the
-- three defaults (cctv, access_point, switch).
-- Run in Supabase Dashboard: SQL Editor → New query → paste and run.

-- 1. Create the table ---------------------------------------------------------
create table if not exists public.product_categories (
  id         uuid        primary key default gen_random_uuid(),
  name       text        not null unique,          -- slug used in products.category
  label      text        not null,                 -- display name shown in UI
  created_at timestamptz not null default now()
);

-- 2. RLS: only service-role (admin client) can access -------------------------
alter table public.product_categories enable row level security;
-- No policy = only service key bypasses RLS; anon/authenticated cannot read/write.

-- 4. Remove the hardcoded CHECK constraint on products.category ---------------
-- The inline CHECK in the original migration is auto-named products_category_check.
alter table public.products drop constraint if exists products_category_check;

comment on table public.product_categories is 'Admin-managed list of product categories';
