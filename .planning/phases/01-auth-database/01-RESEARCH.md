# Phase 1: Authentication & Database Foundation - Research

**Researched:** 2026-01-27
**Domain:** Supabase Auth + PostgreSQL RLS with Next.js 14 App Router
**Confidence:** HIGH

## Summary

This phase implements user authentication and database foundation for an estate planning document sales platform. The project already has `@supabase/ssr` (v0.8.0) and `@supabase/supabase-js` (v2.89.0) installed but not configured.

The standard approach for Next.js 14 App Router is cookie-based authentication using the `@supabase/ssr` package with PKCE flow. This requires creating separate Supabase clients for browser and server contexts, implementing middleware for token refresh, and setting up Row Level Security policies on all user-facing tables.

Key requirements include: user registration with email verification, password reset flow, session persistence, a protected dashboard showing purchased documents, and secure logout. The database schema must support users, orders, and documents with proper foreign key relationships.

**Primary recommendation:** Use `@supabase/ssr` with cookie-based auth (not localStorage), create middleware for token refresh, and implement RLS policies on all tables from day one.

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| @supabase/ssr | 0.8.0 | Server-side auth & cookie management | Official Supabase SSR solution, replaces deprecated auth-helpers |
| @supabase/supabase-js | 2.89.0 | Database client & auth API | Core Supabase JavaScript client |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| server-only | latest | Prevent server code from running on client | Import in server client utility to prevent accidental client imports |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| @supabase/ssr | @supabase/auth-helpers-nextjs | auth-helpers is DEPRECATED - breaks in production, causes auth loops |
| Cookie-based auth | localStorage auth | localStorage not accessible server-side, breaks SSR, XSS vulnerable |
| PKCE flow | Implicit flow | Implicit flow tokens not accessible server-side, PKCE is more secure |

**Note:** The project has `@supabase/auth-helpers-nextjs` v0.15.0 installed - this MUST be removed or ignored. Using it will cause authentication loops and session state failures.

**Installation:**
```bash
# Already installed, but verify:
npm install @supabase/supabase-js @supabase/ssr server-only
# Remove deprecated package:
npm uninstall @supabase/auth-helpers-nextjs
```

## Architecture Patterns

### Recommended Project Structure

```
lib/
  supabase/
    client.ts          # Browser client (createBrowserClient)
    server.ts          # Server client (createServerClient with cookies)
    middleware.ts      # Middleware client for token refresh
app/
  (auth)/              # Auth route group (public)
    login/page.tsx
    signup/page.tsx
    forgot-password/page.tsx
    auth/
      callback/route.ts    # Email verification callback
      confirm/route.ts     # Password reset confirmation
  (dashboard)/         # Protected route group
    dashboard/page.tsx
    layout.tsx         # Protected layout with auth check
middleware.ts          # Root middleware for token refresh
```

### Pattern 1: Separate Client Utilities

**What:** Create distinct Supabase clients for browser vs server contexts
**When to use:** Always - required for Next.js 14 App Router

**Browser Client (`lib/supabase/client.ts`):**
```typescript
// Source: https://supabase.com/docs/guides/auth/server-side/creating-a-client
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

**Server Client (`lib/supabase/server.ts`):**
```typescript
// Source: https://supabase.com/docs/guides/auth/server-side/nextjs
import 'server-only'
import { cookies } from 'next/headers'
import { createServerClient } from '@supabase/ssr'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignore - called from Server Component (can't write cookies)
          }
        },
      },
    }
  )
}
```

### Pattern 2: Middleware for Token Refresh

**What:** Next.js middleware that refreshes auth tokens on every request
**When to use:** Always - Server Components cannot write cookies

```typescript
// Source: https://supabase.com/docs/guides/auth/server-side/nextjs
// middleware.ts (project root)
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // IMPORTANT: Use getUser(), NOT getSession() for security
  const { data: { user } } = await supabase.auth.getUser()

  // Redirect to login if accessing protected route without auth
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    // Skip static files and images
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

### Pattern 3: PKCE Auth Flow with Email Confirmation

**What:** Secure email verification using token_hash exchange
**When to use:** For email signup confirmation and password reset

```typescript
// app/auth/confirm/route.ts
// Source: https://supabase.com/docs/guides/auth/server-side/nextjs
import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as 'email' | 'recovery' | null
  const next = searchParams.get('next') ?? '/dashboard'

  if (token_hash && type) {
    const supabase = await createClient()
    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })

    if (!error) {
      return NextResponse.redirect(new URL(next, request.url))
    }
  }

  // Redirect to error page if verification fails
  return NextResponse.redirect(new URL('/auth/error', request.url))
}
```

### Pattern 4: Profile Table with Trigger

**What:** Automatic profile creation when user signs up
**When to use:** To store additional user data beyond auth.users

```sql
-- Source: https://supabase.com/docs/guides/auth/managing-user-data
-- Create profiles table
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  email text,
  full_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  primary key (id)
);

alter table public.profiles enable row level security;

-- Trigger function to create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data ->> 'full_name'
  );
  return new;
end;
$$;

-- Create trigger
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

### Anti-Patterns to Avoid

- **Using getSession() on server:** Never trust `supabase.auth.getSession()` in server code - it doesn't revalidate tokens. Always use `supabase.auth.getUser()`.
- **Importing from auth-helpers-nextjs:** This package is deprecated and WILL break in production.
- **Using individual cookie methods:** Don't use `get`/`set`/`remove` cookie methods - use `getAll`/`setAll` pattern.
- **Skipping middleware matcher:** Without matcher, middleware runs on every request including static files, causing 400 errors and slow page loads.
- **Using FOR ALL in RLS policies:** Always create separate policies for SELECT, INSERT, UPDATE, DELETE.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Password hashing | Custom bcrypt implementation | Supabase Auth built-in | Security vulnerabilities, timing attacks |
| Email verification | Custom token generation | `supabase.auth.signUp()` with confirm email | Token security, expiration handling |
| Password reset | Custom reset flow | `supabase.auth.resetPasswordForEmail()` | Secure token generation, rate limiting |
| Session management | Custom JWT handling | @supabase/ssr cookie management | Cookie security, refresh token rotation |
| Protected routes | Custom auth middleware | Supabase middleware pattern | Token refresh, proper cookie handling |
| User profiles | Custom user table without FK | Profile table with `auth.users` FK | Cascading deletes, referential integrity |

**Key insight:** Supabase Auth handles all the complex security concerns (password hashing, token rotation, rate limiting). Custom implementations inevitably have security holes.

## Common Pitfalls

### Pitfall 1: Using getSession() Instead of getUser() on Server

**What goes wrong:** Session data comes from cookies which could be tampered with. getSession() doesn't verify the JWT signature.
**Why it happens:** getSession() is easier to use and works on client-side code.
**How to avoid:** Always use `supabase.auth.getUser()` in server-side code (Server Components, API routes, middleware).
**Warning signs:** Auth state mismatches between client and server, security vulnerabilities.

### Pitfall 2: Missing Middleware Matcher

**What goes wrong:** Middleware runs on every request (including images, CSS, favicons), causing 400 errors and slow page loads.
**Why it happens:** Default Next.js middleware runs on all routes.
**How to avoid:** Always include a matcher that excludes static files:
```typescript
export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)']
}
```
**Warning signs:** Pages feel slow, 400 errors in console, middleware called 9+ times per page load.

### Pitfall 3: Importing auth-helpers Package

**What goes wrong:** Authentication loops, session state fails to persist, random logouts.
**Why it happens:** Mixing deprecated auth-helpers with @supabase/ssr.
**How to avoid:** Remove `@supabase/auth-helpers-nextjs` from package.json. Never import from it.
**Warning signs:** `import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'` in code.

### Pitfall 4: Missing RLS Policies on New Tables

**What goes wrong:** Once RLS is enabled, public/anon users cannot access data without policies.
**Why it happens:** Forgetting to create policies after enabling RLS.
**How to avoid:** Create policies immediately after enabling RLS. Test with both authenticated and unauthenticated users.
**Warning signs:** Empty data returned from queries that should have results.

### Pitfall 5: Using service_role Key in Client Code

**What goes wrong:** Full database access bypasses all RLS, exposing all user data.
**Why it happens:** Confusion between anon key and service_role key.
**How to avoid:** Only use `NEXT_PUBLIC_SUPABASE_ANON_KEY` in client code. service_role key is for server-side admin operations only.
**Warning signs:** Environment variable named `NEXT_PUBLIC_SUPABASE_SERVICE_ROLE_KEY`.

### Pitfall 6: Redirect URLs Not Configured

**What goes wrong:** Email verification and password reset links fail with "invalid redirect" errors.
**Why it happens:** Supabase requires explicit allowlist of redirect URLs.
**How to avoid:** Add all redirect URLs to Supabase Dashboard > Authentication > URL Configuration. Include localhost for development.
**Warning signs:** "Invalid redirect URL" errors when clicking email links.

## Code Examples

### Sign Up with Email

```typescript
// Source: https://supabase.com/docs/guides/auth/passwords
// Server Action for signup
'use server'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
      data: {
        full_name: formData.get('fullName') as string,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  // User created but needs email verification
  redirect('/signup/verify-email')
}
```

### Sign In with Email

```typescript
// Source: https://supabase.com/docs/guides/auth/passwords
'use server'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  })

  if (error) {
    return { error: error.message }
  }

  redirect('/dashboard')
}
```

### Password Reset Flow

```typescript
// Source: https://supabase.com/docs/guides/auth/passwords
// Step 1: Request reset email
'use server'
import { createClient } from '@/lib/supabase/server'

export async function requestPasswordReset(email: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

// Step 2: Update password (after clicking email link)
export async function updatePassword(newPassword: string) {
  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}
```

### Protected Server Component

```typescript
// Source: https://supabase.com/docs/guides/auth/server-side/nextjs
// app/(dashboard)/dashboard/page.tsx
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // Fetch user-specific data
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single()

  return (
    <div>
      <h1>Welcome, {profile?.full_name}</h1>
      {/* Dashboard content */}
    </div>
  )
}
```

### Sign Out

```typescript
// Source: https://supabase.com/docs/guides/auth/server-side/nextjs
'use server'
import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
```

### RLS Policy Examples

```sql
-- Source: https://supabase.com/docs/guides/database/postgres/row-level-security
-- Profiles: Users can only view/edit their own profile
create policy "Users can view own profile"
  on profiles for select
  using ((select auth.uid()) = id);

create policy "Users can update own profile"
  on profiles for update
  using ((select auth.uid()) = id);

-- Orders: Users can only view their own orders
create policy "Users can view own orders"
  on orders for select
  using ((select auth.uid()) = user_id);

-- Documents: Users can only access documents from their orders
create policy "Users can view purchased documents"
  on documents for select
  using (
    exists (
      select 1 from orders
      where orders.id = documents.order_id
      and orders.user_id = (select auth.uid())
    )
  );
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| @supabase/auth-helpers-nextjs | @supabase/ssr | 2024 | Must migrate, helpers deprecated |
| localStorage for tokens | Cookie-based auth | 2024 | Required for SSR support |
| getSession() for auth check | getUser() for server-side | 2024 | Security improvement |
| Individual cookie methods | getAll/setAll cookie pattern | 2024 | Required for @supabase/ssr |
| Implicit auth flow | PKCE flow for SSR | 2024 | More secure, server-accessible |

**Deprecated/outdated:**
- `@supabase/auth-helpers-nextjs` - Deprecated in favor of `@supabase/ssr`
- `createClientComponentClient()` - Old auth-helpers function
- `createRouteHandlerClient()` - Old auth-helpers function
- `createServerComponentClient()` - Old auth-helpers function

## Database Schema Recommendations

Based on the requirements (users, orders, documents), the recommended schema:

```sql
-- Users profile (extends auth.users)
create table public.profiles (
  id uuid not null references auth.users on delete cascade primary key,
  email text,
  full_name text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Orders
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users on delete cascade,
  product_type text not null, -- 'will', 'trust', 'guardianship', 'estate-plan'
  amount_cents integer not null,
  status text default 'pending', -- 'pending', 'completed', 'refunded'
  stripe_session_id text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Documents (generated PDFs)
create table public.documents (
  id uuid default gen_random_uuid() primary key,
  order_id uuid not null references orders on delete cascade,
  document_type text not null,
  storage_path text, -- Supabase Storage path
  generated_at timestamptz default now()
);

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.orders enable row level security;
alter table public.documents enable row level security;

-- Create indexes for RLS policy performance
create index orders_user_id_idx on orders(user_id);
create index documents_order_id_idx on documents(order_id);
```

## Open Questions

1. **Email template customization**
   - What we know: Supabase provides default email templates that can be customized in the dashboard
   - What's unclear: Whether to use custom SMTP (Resend is already installed) or Supabase's built-in email service
   - Recommendation: Start with Supabase's built-in email (2 emails/hour limit for testing), then configure Resend for production

2. **Static export compatibility**
   - What we know: Current site uses `next export` for Cloudflare Pages deployment
   - What's unclear: Whether static export is compatible with auth middleware and server components
   - Recommendation: Will need to switch from static export to dynamic rendering for auth pages. May need to use Vercel or another host that supports Next.js edge runtime.

3. **Session duration**
   - What we know: Supabase default session is 1 hour with refresh tokens
   - What's unclear: Optimal session duration for estate planning document site
   - Recommendation: Use default settings initially, adjust based on user feedback

## Sources

### Primary (HIGH confidence)
- [Setting up Server-Side Auth for Next.js | Supabase Docs](https://supabase.com/docs/guides/auth/server-side/nextjs) - Complete SSR auth setup
- [Creating a Supabase client for SSR | Supabase Docs](https://supabase.com/docs/guides/auth/server-side/creating-a-client) - Client utility patterns
- [Row Level Security | Supabase Docs](https://supabase.com/docs/guides/database/postgres/row-level-security) - RLS policies and patterns
- [Password-based Auth | Supabase Docs](https://supabase.com/docs/guides/auth/passwords) - Sign up, sign in, password reset
- [User Management | Supabase Docs](https://supabase.com/docs/guides/auth/managing-user-data) - Profile trigger pattern

### Secondary (MEDIUM confidence)
- [Migrating to SSR from Auth Helpers | Supabase Docs](https://supabase.com/docs/guides/auth/server-side/migrating-to-ssr-from-auth-helpers) - Migration guidance
- [Troubleshooting Next.js Supabase Auth Issues | Supabase Docs](https://supabase.com/docs/guides/troubleshooting/how-do-you-troubleshoot-nextjs---supabase-auth-issues-riMCZV) - Common issues

### Tertiary (LOW confidence)
- Community blog posts about middleware performance issues (verified with official docs)
- Makerkit framework patterns (verified concepts align with official docs)

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Verified with official Supabase documentation
- Architecture: HIGH - Patterns from official Next.js + Supabase guides
- Pitfalls: HIGH - Documented in official troubleshooting and migration guides
- Database schema: MEDIUM - Based on common patterns, may need adjustment for specific product needs

**Research date:** 2026-01-27
**Valid until:** 2026-02-27 (stable domain, 30-day validity)
