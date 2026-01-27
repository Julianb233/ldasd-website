# Phase 2: Payment Processing - Research

**Researched:** 2026-01-27
**Domain:** Stripe Checkout + Webhooks + Order Management with Next.js 14 App Router
**Confidence:** HIGH

## Summary

This phase implements Stripe payment processing for an estate planning document sales platform. The project already has `stripe` (v20.1.0) and `@stripe/stripe-js` (v8.6.0) installed but not configured. The existing database has an `orders` table with `stripe_session_id`, `stripe_payment_intent_id`, `is_couples`, `status`, `amount_cents`, and `product_type` columns - ready for payment integration.

The standard approach for Next.js 14 App Router is **Stripe Checkout** (hosted payment page) combined with **Server Actions** for session creation and **Webhook handlers** for payment confirmation. This provides PCI compliance without handling card data directly and integrates naturally with the existing Supabase/auth patterns.

Key requirements include: Stripe product/price catalog, checkout session creation, success/cancel page handling, webhook-based order fulfillment, and email receipt via Resend. Pricing must support individual and couples tiers across five product types.

**Primary recommendation:** Use Stripe Checkout with pre-created Price IDs (not price_data) for predictable catalog management. Create webhook handler using `req.text()` for raw body access. Store `user_id` and `order_id` in session metadata for database reconciliation.

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| stripe | 20.1.0 | Server-side Stripe API client | Official Node.js SDK, handles API calls and webhook verification |
| @stripe/stripe-js | 8.6.0 | Client-side Stripe.js loader | Required by PCI compliance, loads from Stripe's servers |
| resend | 6.6.0 | Transactional email delivery | Already installed, simple API for purchase receipts |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @supabase/ssr | 0.8.0 | Server client for order creation | Already configured from Phase 1 |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Stripe Checkout (hosted) | Stripe Elements (embedded) | Elements requires more code, handles card data directly, more customization but more PCI scope |
| Pre-created Price IDs | price_data (inline pricing) | price_data doesn't appear in Dashboard catalog, harder to manage, but allows dynamic pricing |
| Webhook for fulfillment | Polling checkout session | Polling is unreliable, doesn't scale, misses events during downtime |

**Note:** For estate planning documents with fixed pricing, pre-created Prices are preferred. Dynamic price_data is better for variable pricing (e.g., by-the-pound shipping).

**Installation:**
```bash
# Already installed, verify:
npm list stripe @stripe/stripe-js resend

# No additional packages needed
```

## Architecture Patterns

### Recommended Project Structure

```
lib/
  stripe/
    client.ts              # Server-side Stripe instance
    products.ts            # Product/price ID constants and pricing config
  resend/
    client.ts              # Resend instance
    templates/
      receipt.tsx          # React Email receipt template
app/
  api/
    checkout/
      route.ts             # POST: Create checkout session
    webhooks/
      stripe/
        route.ts           # POST: Handle Stripe webhooks
  checkout/
    success/page.tsx       # Success page after payment
    cancel/page.tsx        # Cancel/return page
  (dashboard)/
    dashboard/
      orders/page.tsx      # Purchase history (uses existing orders table)
lib/
  actions/
    checkout.ts            # Server actions for checkout flow
```

### Pattern 1: Stripe Server Client

**What:** Create a singleton Stripe instance for server-side use
**When to use:** All API routes and server actions that call Stripe

```typescript
// lib/stripe/client.ts
import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-12-18.acacia', // Use latest stable API version
  typescript: true,
})
```

### Pattern 2: Product and Price Configuration

**What:** Centralized pricing constants matching Stripe catalog
**When to use:** Checkout session creation, pricing UI display

```typescript
// lib/stripe/products.ts
// Prices created in Stripe Dashboard or via API
// Format: price_xxxx from Stripe Dashboard

export const STRIPE_PRICES = {
  will: {
    individual: process.env.STRIPE_PRICE_WILL_INDIVIDUAL!,     // $159
    couples: process.env.STRIPE_PRICE_WILL_COUPLES!,           // $299
  },
  trust: {
    individual: process.env.STRIPE_PRICE_TRUST_INDIVIDUAL!,    // $399
    couples: process.env.STRIPE_PRICE_TRUST_COUPLES!,          // $599
  },
  poa: {
    individual: process.env.STRIPE_PRICE_POA!,                 // $79
  },
  'healthcare-directive': {
    individual: process.env.STRIPE_PRICE_HEALTHCARE!,          // $79
  },
  'estate-plan': {
    individual: process.env.STRIPE_PRICE_ESTATE_INDIVIDUAL!,   // Bundle price
    couples: process.env.STRIPE_PRICE_ESTATE_COUPLES!,         // Bundle price
  },
  'attorney-support': {
    addon: process.env.STRIPE_PRICE_ATTORNEY!,                 // $299
  },
} as const

export type ProductType = 'will' | 'trust' | 'poa' | 'healthcare-directive' | 'estate-plan'
export type PricingTier = 'individual' | 'couples'

// Display prices (for UI - keep in sync with Stripe)
export const DISPLAY_PRICES = {
  will: { individual: 15900, couples: 29900 },      // cents
  trust: { individual: 39900, couples: 59900 },
  poa: { individual: 7900 },
  'healthcare-directive': { individual: 7900 },
  'estate-plan': { individual: 69900, couples: 89900 },
  'attorney-support': { addon: 29900 },
} as const
```

### Pattern 3: Checkout Session Creation (Server Action)

**What:** Server action to create Stripe Checkout session
**When to use:** When user clicks "Buy" or "Checkout" button

```typescript
// lib/actions/checkout.ts
'use server'

import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { stripe } from '@/lib/stripe/client'
import { STRIPE_PRICES, type ProductType, type PricingTier } from '@/lib/stripe/products'

export type CheckoutResult = {
  error?: string
  url?: string
}

export async function createCheckoutSession(
  productType: ProductType,
  pricingTier: PricingTier,
): Promise<CheckoutResult> {
  const supabase = await createClient()

  // Get authenticated user
  const { data: { user }, error: userError } = await supabase.auth.getUser()

  if (userError || !user) {
    return { error: 'Please log in to continue' }
  }

  // Get price ID from config
  const priceConfig = STRIPE_PRICES[productType]
  const priceId = pricingTier === 'couples' && 'couples' in priceConfig
    ? priceConfig.couples
    : priceConfig.individual

  if (!priceId) {
    return { error: 'Invalid product configuration' }
  }

  try {
    // Create pending order in database first
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        user_id: user.id,
        product_type: productType,
        amount_cents: 0, // Will be updated by webhook
        status: 'pending',
        is_couples: pricingTier === 'couples',
      })
      .select()
      .single()

    if (orderError || !order) {
      console.error('Order creation error:', orderError)
      return { error: 'Failed to create order' }
    }

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      customer_email: user.email,
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
      metadata: {
        user_id: user.id,
        order_id: order.id,
        product_type: productType,
        is_couples: String(pricingTier === 'couples'),
      },
    })

    // Update order with session ID
    await supabase
      .from('orders')
      .update({ stripe_session_id: session.id })
      .eq('id', order.id)

    if (!session.url) {
      return { error: 'Failed to create checkout session' }
    }

    return { url: session.url }
  } catch (err) {
    console.error('Checkout error:', err)
    return { error: 'Failed to create checkout session' }
  }
}
```

### Pattern 4: Webhook Handler (Critical for Order Fulfillment)

**What:** API route to handle Stripe webhook events
**When to use:** Stripe sends events after payment completion

```typescript
// app/api/webhooks/stripe/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe/client'
import { createClient } from '@supabase/supabase-js'
import type Stripe from 'stripe'

// Use service role client for webhook (bypasses RLS)
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

export async function POST(req: NextRequest) {
  // CRITICAL: Use req.text() not req.json() for signature verification
  const body = await req.text()
  const signature = req.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    )
  } catch (err) {
    console.error('Webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  // Handle checkout completion
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    const orderId = session.metadata?.order_id
    const userId = session.metadata?.user_id

    if (!orderId || !userId) {
      console.error('Missing metadata in session:', session.id)
      return NextResponse.json({ error: 'Missing metadata' }, { status: 400 })
    }

    // Update order status to completed
    const { error: updateError } = await supabaseAdmin
      .from('orders')
      .update({
        status: 'completed',
        amount_cents: session.amount_total || 0,
        stripe_payment_intent_id: session.payment_intent as string,
      })
      .eq('id', orderId)
      .eq('user_id', userId) // Extra safety check

    if (updateError) {
      console.error('Order update failed:', updateError)
      return NextResponse.json({ error: 'Database update failed' }, { status: 500 })
    }

    // Send receipt email (async, don't block webhook response)
    sendReceiptEmail(session, orderId).catch(console.error)
  }

  // Handle refunds
  if (event.type === 'charge.refunded') {
    const charge = event.data.object as Stripe.Charge
    const paymentIntentId = charge.payment_intent as string

    if (paymentIntentId) {
      await supabaseAdmin
        .from('orders')
        .update({ status: 'refunded' })
        .eq('stripe_payment_intent_id', paymentIntentId)
    }
  }

  return NextResponse.json({ received: true })
}

async function sendReceiptEmail(
  session: Stripe.Checkout.Session,
  orderId: string,
) {
  // Import Resend dynamically to keep webhook fast
  const { Resend } = await import('resend')
  const resend = new Resend(process.env.RESEND_API_KEY)

  const customerEmail = session.customer_details?.email || session.customer_email

  if (!customerEmail) {
    console.error('No customer email for receipt')
    return
  }

  await resend.emails.send({
    from: 'LDASD Estate Planning <orders@ldasd.com>',
    to: customerEmail,
    subject: 'Your LDASD Estate Planning Purchase',
    html: `
      <h1>Thank you for your purchase!</h1>
      <p>Order ID: ${orderId}</p>
      <p>Amount: $${((session.amount_total || 0) / 100).toFixed(2)}</p>
      <p>You can access your documents in your dashboard.</p>
    `,
  })
}
```

### Pattern 5: Success Page with Session Verification

**What:** Verify payment status before showing success message
**When to use:** Success page after Stripe redirect

```typescript
// app/checkout/success/page.tsx
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { stripe } from '@/lib/stripe/client'

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const params = await searchParams
  const sessionId = params.session_id

  if (!sessionId) {
    redirect('/dashboard')
  }

  // Verify the session is complete (defense in depth)
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      redirect('/checkout/cancel')
    }
  } catch {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-sage flex items-center justify-center">
      <div className="bg-white rounded-3xl p-12 shadow-premium max-w-md text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-4">
          Payment Successful!
        </h1>
        <p className="text-foreground/70 mb-8">
          Thank you for your purchase. You'll receive a confirmation email shortly.
        </p>
        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-white font-semibold hover:bg-primary/90 transition-colors"
        >
          Go to Dashboard
        </Link>
      </div>
    </div>
  )
}
```

### Anti-Patterns to Avoid

- **Using req.json() in webhook:** This parses the body before signature verification, causing failures. Always use `req.text()`.
- **Trusting client-side prices:** Never accept `amount` from client. Always use Stripe Price IDs or fetch from database.
- **Skipping webhook verification:** Always verify `stripe-signature` header. Never process unverified events.
- **Using anon key in webhook:** Webhook runs without user context. Use `SUPABASE_SERVICE_ROLE_KEY` to bypass RLS.
- **Blocking webhook response:** Return 200 quickly, process async work (emails) in background.
- **Hardcoding Price IDs:** Use environment variables so test/production have different catalogs.

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Payment form | Custom card input | Stripe Checkout | PCI compliance, liability, fraud protection |
| Price calculation | Client-side math | Stripe line_items | Tamper-proof, handles tax, discounts |
| Payment verification | Custom validation | Webhook + signature | Stripe handles edge cases, retries |
| Receipt emails | Custom SMTP | Resend or Stripe receipts | Deliverability, templates, tracking |
| Refund handling | Manual status updates | Webhook events | Handles partial refunds, disputes |

## Common Pitfalls

### Pitfall 1: Webhook Signature Verification Fails

**What goes wrong:** `stripe.webhooks.constructEvent()` throws "No signatures found matching expected signature"
**Why it happens:** Next.js App Router may parse body as JSON before you access it, or using wrong webhook secret
**How to avoid:**
- Use `await req.text()` not `await req.json()`
- Use the correct webhook secret (different for CLI vs Dashboard vs test vs live)
- Don't configure body parser (App Router has it disabled by default)
**Warning signs:** 400 errors from webhook endpoint, orders stuck in "pending"

### Pitfall 2: Missing Supabase Service Role Key in Webhook

**What goes wrong:** RLS blocks webhook updates, orders never complete
**Why it happens:** Webhook runs without user session, anon key can't update other users' orders
**How to avoid:**
- Create separate Supabase client with `SUPABASE_SERVICE_ROLE_KEY` for webhook
- Add `user_id` to metadata for extra validation
**Warning signs:** Orders stay pending forever, "permission denied" in logs

### Pitfall 3: Price Mismatch Between UI and Stripe

**What goes wrong:** User sees $159 but Stripe charges $199 (or reverse)
**Why it happens:** Hardcoded display prices don't match Stripe catalog
**How to avoid:**
- Single source of truth for prices (Stripe or env vars)
- Use Stripe API to fetch prices for display, or keep `DISPLAY_PRICES` const in sync
- Test mode has separate price IDs from production
**Warning signs:** Customer complaints, refund requests, inconsistent amounts

### Pitfall 4: Duplicate Order Creation

**What goes wrong:** Multiple orders created for single payment
**Why it happens:** User clicks checkout twice, webhook fires multiple times (retries)
**How to avoid:**
- Check for existing pending order with same session_id before creating
- Use Stripe metadata to track order_id
- Make webhook handler idempotent (check if already completed)
**Warning signs:** Duplicate orders in database, inflated revenue reports

### Pitfall 5: Testing with Wrong Webhook Secret

**What goes wrong:** Webhooks work locally but fail in production (or vice versa)
**Why it happens:** Stripe CLI uses different secret than Dashboard webhooks
**How to avoid:**
- `stripe listen` shows CLI webhook secret in terminal
- Dashboard webhook has "Reveal secret" button
- Use different env vars: `STRIPE_WEBHOOK_SECRET_LOCAL` vs `STRIPE_WEBHOOK_SECRET`
**Warning signs:** 400 errors only in one environment

### Pitfall 6: Forgetting Cancel Page

**What goes wrong:** User closes Stripe Checkout or clicks back, gets 404
**Why it happens:** cancel_url not created
**How to avoid:**
- Always create both success and cancel pages
- Cancel page should encourage retry, show cart contents
**Warning signs:** User complaints about broken flow

## Code Examples

### Environment Variables Required

```bash
# .env.local
# Stripe (get from Dashboard > Developers > API keys)
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# Webhook secret (from `stripe listen` or Dashboard > Webhooks)
STRIPE_WEBHOOK_SECRET=whsec_...

# Stripe Price IDs (create in Dashboard > Products)
STRIPE_PRICE_WILL_INDIVIDUAL=price_...
STRIPE_PRICE_WILL_COUPLES=price_...
STRIPE_PRICE_TRUST_INDIVIDUAL=price_...
STRIPE_PRICE_TRUST_COUPLES=price_...
STRIPE_PRICE_POA=price_...
STRIPE_PRICE_HEALTHCARE=price_...
STRIPE_PRICE_ESTATE_INDIVIDUAL=price_...
STRIPE_PRICE_ESTATE_COUPLES=price_...
STRIPE_PRICE_ATTORNEY=price_...

# Resend (for receipts)
RESEND_API_KEY=re_...

# Supabase service role (for webhook - bypasses RLS)
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Existing from Phase 1
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Creating Stripe Products (Dashboard or API)

```typescript
// One-time setup script (run once, not in app code)
// Can also be done in Stripe Dashboard

import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

async function createProducts() {
  // Create Will product
  const willProduct = await stripe.products.create({
    name: 'Last Will & Testament',
    description: 'Legally binding will with guardianship designation',
    metadata: { product_type: 'will' },
  })

  // Create individual price
  const willIndividualPrice = await stripe.prices.create({
    product: willProduct.id,
    unit_amount: 15900, // $159.00
    currency: 'usd',
    metadata: { tier: 'individual' },
  })

  // Create couples price
  const willCouplesPrice = await stripe.prices.create({
    product: willProduct.id,
    unit_amount: 29900, // $299.00
    currency: 'usd',
    metadata: { tier: 'couples' },
  })

  console.log('Will Individual Price ID:', willIndividualPrice.id)
  console.log('Will Couples Price ID:', willCouplesPrice.id)

  // Repeat for trust, poa, healthcare-directive, estate-plan, attorney-support
}
```

### Checkout Button Component

```typescript
// components/CheckoutButton.tsx
'use client'

import { useState } from 'react'
import { createCheckoutSession } from '@/lib/actions/checkout'
import type { ProductType, PricingTier } from '@/lib/stripe/products'

export default function CheckoutButton({
  productType,
  pricingTier,
  children,
}: {
  productType: ProductType
  pricingTier: PricingTier
  children: React.ReactNode
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCheckout() {
    setLoading(true)
    setError(null)

    const result = await createCheckoutSession(productType, pricingTier)

    if (result.error) {
      setError(result.error)
      setLoading(false)
      return
    }

    if (result.url) {
      // Redirect to Stripe Checkout
      window.location.href = result.url
    }
  }

  return (
    <div>
      <button
        onClick={handleCheckout}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white hover:bg-accent transition-all duration-300 disabled:opacity-50"
      >
        {loading ? 'Processing...' : children}
      </button>
      {error && (
        <p className="mt-2 text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}
```

### Pricing Toggle Component

```typescript
// components/PricingToggle.tsx
'use client'

import { useState } from 'react'
import type { PricingTier } from '@/lib/stripe/products'

export default function PricingToggle({
  onChange,
  defaultTier = 'individual',
}: {
  onChange: (tier: PricingTier) => void
  defaultTier?: PricingTier
}) {
  const [tier, setTier] = useState<PricingTier>(defaultTier)

  function handleChange(newTier: PricingTier) {
    setTier(newTier)
    onChange(newTier)
  }

  return (
    <div className="flex items-center justify-center gap-4 p-1 bg-gray-100 rounded-full">
      <button
        onClick={() => handleChange('individual')}
        className={`px-6 py-2 rounded-full font-medium transition-all ${
          tier === 'individual'
            ? 'bg-primary text-white shadow-md'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Individual
      </button>
      <button
        onClick={() => handleChange('couples')}
        className={`px-6 py-2 rounded-full font-medium transition-all ${
          tier === 'couples'
            ? 'bg-primary text-white shadow-md'
            : 'text-gray-600 hover:text-gray-900'
        }`}
      >
        Couples
      </button>
    </div>
  )
}
```

### Testing Webhook Locally

```bash
# Terminal 1: Run Next.js dev server
npm run dev

# Terminal 2: Forward Stripe webhooks to local server
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# Note the webhook signing secret output (whsec_...) and add to .env.local

# Terminal 3: Trigger test events
stripe trigger checkout.session.completed
```

### Purchase History in Dashboard

```typescript
// app/(dashboard)/dashboard/orders/page.tsx
import { createClient } from '@/lib/supabase/server'

export default async function OrdersPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Purchase History</h1>

      {orders && orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white rounded-xl border p-6 flex justify-between items-center"
            >
              <div>
                <p className="font-semibold">{formatProductType(order.product_type)}</p>
                <p className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="font-bold">${(order.amount_cents / 100).toFixed(2)}</p>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  order.status === 'completed' ? 'bg-green-100 text-green-800' :
                  order.status === 'refunded' ? 'bg-gray-100 text-gray-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {order.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500">No purchases yet.</p>
      )}
    </div>
  )
}

function formatProductType(type: string) {
  const labels: Record<string, string> = {
    will: 'Last Will & Testament',
    trust: 'Living Trust',
    poa: 'Power of Attorney',
    'healthcare-directive': 'Healthcare Directive',
    'estate-plan': 'Complete Estate Plan',
  }
  return labels[type] || type
}
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| API routes for checkout | Server Actions | 2024 | Cleaner code, automatic loading states |
| Custom payment forms | Stripe Checkout | Long-standing | PCI compliance, better conversion |
| Pages Router webhooks | App Router with req.text() | 2024 | No body parser config needed |
| amount param in session | Price IDs in catalog | 2023 | Tamper-proof, centralized pricing |
| Manual receipt emails | Stripe Receipts or Resend | Long-standing | Better deliverability |

**Current best practices (2025):**
- Use Server Actions for checkout initiation
- Use Stripe Checkout (not Elements) for simple flows
- Pre-create products/prices in Stripe Dashboard
- Use metadata for order tracking
- Handle fulfillment via webhook, not success page

## Database Schema Notes

The existing `orders` table from Phase 1 is well-designed for payment integration:

```sql
-- Already exists from Phase 1
create table public.orders (
  id uuid default gen_random_uuid() primary key,
  user_id uuid not null references auth.users on delete cascade,
  product_type text not null,          -- 'will', 'trust', etc.
  amount_cents integer not null,        -- Final amount from Stripe
  status text default 'pending',        -- 'pending' -> 'completed' | 'refunded'
  stripe_session_id text,               -- Checkout session ID
  stripe_payment_intent_id text,        -- Payment intent for refund lookup
  is_couples boolean default false,     -- Pricing tier
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);
```

**No schema changes needed** for payment processing.

## Open Questions

1. **Stripe receipts vs Resend emails**
   - What we know: Stripe can send automatic receipts; Resend is already installed
   - What's unclear: Whether to use Stripe's receipts or custom Resend templates
   - Recommendation: Start with Resend for more control over branding and content. Can enable Stripe receipts as backup.

2. **Cart functionality**
   - What we know: Requirements mention "cart functionality" and "package combinations"
   - What's unclear: Single product checkout or multi-product cart?
   - Recommendation: Start with single product checkout (simpler). Cart can be Phase 6 with bundles.

3. **Pricing verification**
   - What we know: Display prices in UI, actual charge via Stripe
   - What's unclear: Whether to fetch prices from Stripe API for display or maintain const
   - Recommendation: Use const for display (faster), ensure sync with Stripe catalog. Fetch from Stripe only if prices change frequently.

4. **Couples document handling**
   - What we know: Couples pay more, get "two sets of documents"
   - What's unclear: Does Phase 2 need to handle document generation?
   - Recommendation: No - Phase 2 creates order with is_couples flag. Phase 3/4 handle document generation.

## Sources

### Primary (HIGH confidence)
- [Stripe Checkout Quickstart - Next.js](https://docs.stripe.com/checkout/quickstart?client=next) - Official integration guide
- [Receive Stripe events in your webhook endpoint](https://docs.stripe.com/webhooks) - Webhook setup
- [Stripe + Next.js 15: The Complete 2025 Guide](https://www.pedroalonso.net/blog/stripe-nextjs-complete-guide-2025/) - Modern patterns
- [Create a Checkout Session API](https://docs.stripe.com/api/checkout/sessions/create) - API reference
- [Metadata use cases](https://docs.stripe.com/metadata/use-cases) - Order tracking patterns

### Secondary (MEDIUM confidence)
- [Next.js App Router + Stripe Webhook Signature Verification](https://kitson-broadhurst.medium.com/next-js-app-router-stripe-webhook-signature-verification-ea9d59f3593f) - req.text() pattern
- [Send emails with Next.js - Resend](https://resend.com/docs/send-with-nextjs) - Email integration
- [How products and prices work](https://docs.stripe.com/products-prices/how-products-and-prices-work) - Catalog model

### Tertiary (LOW confidence)
- GitHub issues on Next.js webhook body parsing (verified solutions)
- Community examples of Supabase + Stripe integration

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Verified with official Stripe documentation and installed packages
- Architecture: HIGH - Patterns from official guides + existing codebase patterns
- Pitfalls: HIGH - Documented in official troubleshooting and verified by community
- Code examples: MEDIUM - Based on official patterns, adapted for this codebase

**Research date:** 2026-01-27
**Valid until:** 2026-02-27 (stable domain, 30-day validity)
