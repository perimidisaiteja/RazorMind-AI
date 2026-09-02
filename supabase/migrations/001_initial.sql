create extension if not exists pgcrypto;

create table if not exists merchants (id uuid primary key default gen_random_uuid(), name text not null, created_at timestamptz default now());
create table if not exists products (id uuid primary key default gen_random_uuid(), merchant_id uuid references merchants(id) on delete cascade, name text not null, price numeric(12,2) not null, category text, stock integer default 0, created_at timestamptz default now());
create table if not exists customers (id uuid primary key default gen_random_uuid(), merchant_id uuid references merchants(id) on delete cascade, email text, name text, created_at timestamptz default now());
create table if not exists orders (id uuid primary key default gen_random_uuid(), merchant_id uuid references merchants(id) on delete cascade, customer_id uuid references customers(id), razorpay_order_id text, razorpay_payment_id text, amount numeric(12,2) not null, status text default 'created', created_at timestamptz default now());
create table if not exists order_items (id uuid primary key default gen_random_uuid(), order_id uuid references orders(id) on delete cascade, product_id uuid references products(id), quantity integer not null default 1, unit_price numeric(12,2) not null);
create table if not exists ai_recommendations (id uuid primary key default gen_random_uuid(), merchant_id uuid references merchants(id) on delete cascade, title text not null, rationale text, confidence integer, estimated_revenue numeric(12,2), status text default 'open', created_at timestamptz default now());
create table if not exists ai_actions (id uuid primary key default gen_random_uuid(), recommendation_id uuid references ai_recommendations(id) on delete cascade, action_type text not null, payload jsonb default '{}'::jsonb, result jsonb default '{}'::jsonb, created_at timestamptz default now());

create index if not exists products_merchant_idx on products(merchant_id);
create index if not exists orders_merchant_idx on orders(merchant_id);
create index if not exists recommendations_merchant_idx on ai_recommendations(merchant_id);
