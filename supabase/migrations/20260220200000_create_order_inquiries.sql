-- Order Inquiries table
-- Allows clients to submit order/inquiry requests for products
create table if not exists public.order_inquiries (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null,
  product_name text not null default '',
  quantity integer not null default 1 check (quantity >= 1),
  message text not null default '',
  status text not null default 'pending' check (status in ('pending', 'reviewed', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.order_inquiries enable row level security;

-- Users can read their own inquiries
create policy "Users can view own inquiries"
  on public.order_inquiries
  for select
  using (auth.uid() = user_id);

-- Users can insert their own inquiries
create policy "Users can insert own inquiries"
  on public.order_inquiries
  for insert
  with check (auth.uid() = user_id);

-- Service role can do everything (for admin access)
create policy "Service role full access"
  on public.order_inquiries
  for all
  using (true)
  with check (true);
