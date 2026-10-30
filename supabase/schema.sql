-- Starter schema for the ecom project.
-- Run this in the Supabase Dashboard > SQL Editor to create the base tables.

-- Products table
create table if not exists public.products (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  description text,
  price       numeric(10, 2) not null default 0,
  stock       integer not null default 0,
  image_url   text,
  created_at  timestamptz not null default now()
);

-- Enable Row Level Security
alter table public.products enable row level security;

-- Allow anyone (including anon) to read products
create policy "Products are viewable by everyone"
  on public.products
  for select
  using (true);

-- Only authenticated users can insert/update/delete (adjust to your needs)
create policy "Authenticated users can manage products"
  on public.products
  for all
  to authenticated
  using (true)
  with check (true);
