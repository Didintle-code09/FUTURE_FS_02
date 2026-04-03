create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone_number text not null default '',
  source text not null default 'website',
  status text not null default 'new',
  notes jsonb not null default '[]'::jsonb,
  company text not null default '',
  last_contacted timestamptz,
  created_by uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
