---
phase: 01-auth-database
plan: 02
status: completed
completed_at: 2026-01-27
---

# Plan 02 Summary: Database Schema

## What Was Built

### Task 1: Database Schema SQL File
**File:** `supabase/schema.sql`

Created complete database schema with:
- **3 Tables:**
  - `profiles` - Extends auth.users with user metadata (id, email, full_name, timestamps)
  - `orders` - Tracks purchases (user_id, product_type, amount_cents, status, stripe fields)
  - `documents` - Generated PDFs (order_id, document_type, storage_path, version)

- **5 RLS Policies:**
  - Users can view own profile
  - Users can update own profile
  - Users can view own orders
  - Users can insert own orders
  - Users can view documents from own orders

- **2 Trigger Functions:**
  - `handle_new_user()` - Creates profile row on user signup
  - `handle_updated_at()` - Updates timestamp on row changes

- **5 Triggers:**
  - `on_auth_user_created` - Fires on auth.users INSERT
  - `profiles_updated_at` - Fires on profiles UPDATE
  - `orders_updated_at` - Fires on orders UPDATE
  - `documents_updated_at` - Fires on documents UPDATE

- **2 Indexes:**
  - `orders_user_id_idx` - For RLS policy performance
  - `documents_order_id_idx` - For RLS policy performance

### Task 2: TypeScript Types
**File:** `lib/supabase/types.ts`

Created type definitions:
- `Profile`, `Order`, `Document` - Row types matching tables
- `ProfileInsert`, `OrderInsert`, `DocumentInsert` - Insert types with optional auto-generated fields
- `ProfileUpdate`, `OrderUpdate`, `DocumentUpdate` - Partial update types
- `Database` - Schema type for typed Supabase client

## Key Design Decisions

1. **RLS Policy Pattern:** Used `(SELECT auth.uid())` subquery pattern for performance per Supabase best practices
2. **Separate Policies:** Individual policies for SELECT, INSERT, UPDATE instead of FOR ALL for clarity
3. **Foreign Keys:**
   - profiles.id -> auth.users.id (1:1)
   - orders.user_id -> auth.users.id (many:1)
   - documents.order_id -> orders.id (many:1)
4. **Document Access:** Through order ownership, not direct user_id
5. **SECURITY DEFINER:** On trigger function to allow system-level inserts to profiles

## User Action Required

**Deploy schema to Supabase:**
1. Go to Supabase Dashboard -> SQL Editor -> New Query
2. Copy contents of `supabase/schema.sql`
3. Execute the query
4. Verify with commented verification queries at bottom of file

## Commits

1. `feat(01-02): create database schema SQL file`
2. `feat(01-02): create TypeScript types for database tables`

## Files Created

```
supabase/
  schema.sql          # Complete database DDL (169 lines)
lib/
  supabase/
    types.ts          # TypeScript types (76 lines)
```
