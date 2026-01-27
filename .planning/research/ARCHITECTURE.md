# Architecture Research

## System Overview

Estate planning SaaS platforms like Trust & Will require a multi-layered architecture that handles sensitive legal documents, secure payments, and state-specific compliance. This document outlines the recommended architecture for the LDASD Estate Planning platform.

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐ │
│  │   Landing   │  │  Dashboard  │  │  Document   │  │  Checkout/Payment   │ │
│  │    Pages    │  │   Portal    │  │   Wizard    │  │       Flow          │ │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────────────┘ │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼─────────────────────────────────────────┐
│                           NEXT.JS API LAYER                                  │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐ │
│  │  Auth API    │  │  Orders API  │  │ Documents   │  │  Webhooks API    │ │
│  │  (Supabase)  │  │              │  │    API      │  │  (Stripe/GHL)    │ │
│  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────────┘ │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼─────────────────────────────────────────┐
│                           SERVICE LAYER                                      │
│  ┌───────────────┐  ┌────────────────┐  ┌────────────────┐                  │
│  │   Document    │  │    Payment     │  │     Email      │                  │
│  │   Generator   │  │    Service     │  │    Service     │                  │
│  │ (@react-pdf)  │  │    (Stripe)    │  │   (Resend)     │                  │
│  └───────────────┘  └────────────────┘  └────────────────┘                  │
└───────────────────────────────────┬─────────────────────────────────────────┘
                                    │
┌───────────────────────────────────▼─────────────────────────────────────────┐
│                           DATA LAYER                                         │
│  ┌────────────────────────────────┐  ┌────────────────────────────────────┐ │
│  │         SUPABASE               │  │          EXTERNAL                  │ │
│  │  ┌──────────┐  ┌────────────┐  │  │  ┌───────────┐  ┌───────────────┐  │ │
│  │  │PostgreSQL│  │  Storage   │  │  │  │  Stripe   │  │  Go High      │  │ │
│  │  │  (data)  │  │  (files)   │  │  │  │  (billing)│  │  Level (CRM)  │  │ │
│  │  └──────────┘  └────────────┘  │  │  └───────────┘  └───────────────┘  │ │
│  └────────────────────────────────┘  └────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Request Flow

```
User Action → Next.js Page/API → Supabase Auth Check → Business Logic →
  → Data Layer (Supabase/Stripe) → Response → UI Update
```

---

## Data Model

### Entity Relationship Diagram

```
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│      users      │       │     couples     │       │    profiles     │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id (PK)         │──1:1──│ id (PK)         │       │ id (PK)         │
│ email           │       │ user1_id (FK)   │───────│ user_id (FK)    │
│ created_at      │       │ user2_id (FK)   │       │ first_name      │
│ email_verified  │       │ created_at      │       │ last_name       │
└────────┬────────┘       └─────────────────┘       │ phone           │
         │                                          │ address         │
         │                                          │ city            │
         │                                          │ state           │
         │                                          │ zip_code        │
         │                                          │ county          │
         │                                          └─────────────────┘
         │
         │1:N
         ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│     orders      │       │  order_items    │       │    products     │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id (PK)         │───1:N─│ id (PK)         │───N:1─│ id (PK)         │
│ user_id (FK)    │       │ order_id (FK)   │       │ slug            │
│ status          │       │ product_id (FK) │       │ name            │
│ subtotal        │       │ quantity        │       │ description     │
│ total           │       │ unit_price      │       │ price_individual│
│ stripe_session  │       │ is_couples      │       │ price_couples   │
│ created_at      │       └─────────────────┘       │ type (will/trust│
│ completed_at    │                                 │  /guardianship) │
└────────┬────────┘                                 └─────────────────┘
         │
         │1:N
         ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│    documents    │       │  doc_versions   │       │   templates     │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ id (PK)         │───1:N─│ id (PK)         │       │ id (PK)         │
│ user_id (FK)    │       │ document_id (FK)│       │ state           │
│ order_id (FK)   │       │ version_number  │       │ doc_type        │
│ template_id(FK) │       │ storage_path    │       │ version         │
│ doc_type        │       │ created_at      │       │ content (JSONB) │
│ state           │       │ created_by      │       │ effective_date  │
│ status          │       └─────────────────┘       │ deprecated_at   │
│ data (JSONB)    │                                 └─────────────────┘
│ created_at      │
│ updated_at      │
│ locked_at       │
└─────────────────┘

┌─────────────────┐       ┌─────────────────┐
│  subscriptions  │       │ subscription_   │
├─────────────────┤       │    history      │
│ id (PK)         │       ├─────────────────┤
│ user_id (FK)    │───1:N─│ id (PK)         │
│ stripe_sub_id   │       │ subscription_id │
│ stripe_customer │       │ event_type      │
│ plan_type       │       │ occurred_at     │
│ status          │       │ metadata (JSONB)│
│ current_period_ │       └─────────────────┘
│   start         │
│ current_period_ │
│   end           │
│ cancel_at       │
│ created_at      │
└─────────────────┘
```

### Key Tables

#### `users` (Supabase Auth)
Managed by Supabase Auth - stores authentication credentials.

```sql
-- Extended via profiles table (see below)
```

#### `profiles`
Extended user information for document generation.

```sql
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  city TEXT,
  state TEXT CHECK (state ~ '^[A-Z]{2}$'),
  zip_code TEXT,
  county TEXT,
  date_of_birth DATE,
  -- Spouse info for couples
  spouse_id UUID REFERENCES profiles(id),
  is_married BOOLEAN DEFAULT false,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `orders`
Purchase records linking users to products.

```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  status TEXT NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'refunded')),
  subtotal INTEGER NOT NULL, -- cents
  tax INTEGER DEFAULT 0,
  total INTEGER NOT NULL,
  stripe_payment_intent_id TEXT,
  stripe_checkout_session_id TEXT,
  is_couples BOOLEAN DEFAULT false,
  -- Metadata
  metadata JSONB DEFAULT '{}',
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  refunded_at TIMESTAMPTZ
);
```

#### `documents`
Core document records with form data stored as JSONB.

```sql
CREATE TABLE documents (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  order_id UUID REFERENCES orders(id),
  template_id UUID REFERENCES templates(id),
  doc_type TEXT NOT NULL CHECK (doc_type IN ('will', 'trust', 'guardianship', 'poa', 'healthcare_directive')),
  state TEXT NOT NULL CHECK (state ~ '^[A-Z]{2}$'),
  status TEXT NOT NULL DEFAULT 'draft'
    CHECK (status IN ('draft', 'in_progress', 'pending_review', 'complete', 'locked')),
  -- Form data stored as JSONB for flexibility
  data JSONB NOT NULL DEFAULT '{}',
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  locked_at TIMESTAMPTZ, -- Set when document is finalized
  -- Constraints
  CONSTRAINT valid_data CHECK (jsonb_typeof(data) = 'object')
);
```

#### `subscriptions`
Membership tracking synced with Stripe.

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  stripe_subscription_id TEXT UNIQUE NOT NULL,
  stripe_customer_id TEXT NOT NULL,
  plan_type TEXT NOT NULL CHECK (plan_type IN ('will_plan', 'trust_plan')),
  status TEXT NOT NULL DEFAULT 'active'
    CHECK (status IN ('active', 'past_due', 'canceled', 'incomplete', 'trialing')),
  -- Stripe period tracking
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  cancel_at TIMESTAMPTZ,
  canceled_at TIMESTAMPTZ,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### `templates`
State-specific document templates with versioning.

```sql
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  state TEXT NOT NULL CHECK (state ~ '^[A-Z]{2}$'),
  doc_type TEXT NOT NULL,
  version INTEGER NOT NULL DEFAULT 1,
  -- Template content and configuration
  content JSONB NOT NULL, -- Template configuration/overrides
  legal_notes TEXT, -- State-specific legal requirements
  effective_date DATE NOT NULL,
  deprecated_at TIMESTAMPTZ,
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW(),
  -- Unique constraint per state/type/version
  UNIQUE (state, doc_type, version)
);
```

---

## Document Generation Flow

### Architecture for Scale

```
┌──────────────────────────────────────────────────────────────────────────┐
│                        DOCUMENT GENERATION PIPELINE                       │
└──────────────────────────────────────────────────────────────────────────┘

      User Submits Form                    Validation Layer
           │                                     │
           ▼                                     ▼
┌─────────────────────┐              ┌─────────────────────┐
│   Document Wizard   │    ─────►    │   Form Validator    │
│   (React Client)    │              │   (Zod Schemas)     │
└─────────────────────┘              └──────────┬──────────┘
                                                │
                                                ▼
                                     ┌─────────────────────┐
                                     │  State Template     │
                                     │    Resolver         │
                                     └──────────┬──────────┘
                                                │
                        ┌───────────────────────┼───────────────────────┐
                        │                       │                       │
                        ▼                       ▼                       ▼
              ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
              │   Will Template │    │  Trust Template │    │ Guardian Templ. │
              │    (CA, TX...)  │    │   (CA, TX...)   │    │   (CA, TX...)   │
              └─────────────────┘    └─────────────────┘    └─────────────────┘
                        │                       │                       │
                        └───────────────────────┼───────────────────────┘
                                                │
                                                ▼
                                     ┌─────────────────────┐
                                     │   @react-pdf        │
                                     │   PDF Renderer      │
                                     └──────────┬──────────┘
                                                │
                        ┌───────────────────────┼───────────────────────┐
                        │                       │                       │
                        ▼                       ▼                       ▼
              ┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
              │ Supabase Storage│    │   Email (Resend)│    │ User Dashboard  │
              │   (Archive)     │    │   (Delivery)    │    │   (Download)    │
              └─────────────────┘    └─────────────────┘    └─────────────────┘
```

### Implementation Strategy

#### 1. Form Data Collection (Client-Side)
```typescript
// lib/document-wizard/types.ts
interface DocumentWizardState {
  currentStep: number;
  documentType: 'will' | 'trust' | 'guardianship';
  formData: Partial<WillData | TrustData | GuardianshipData>;
  validationErrors: Record<string, string>;
  isDirty: boolean;
  lastSavedAt: Date | null;
}

// Use React Hook Form + Zod for validation
const willSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  state: z.string().length(2, 'Select a valid state'),
  // ... all fields from existing WillData interface
});
```

#### 2. Auto-Save with Debounce
```typescript
// Save draft to Supabase every 30 seconds or on field blur
const saveDraft = useDebouncedCallback(async (data: Partial<WillData>) => {
  await supabase
    .from('documents')
    .upsert({
      id: documentId,
      user_id: userId,
      doc_type: 'will',
      status: 'draft',
      data: data,
      updated_at: new Date().toISOString()
    });
}, 30000);
```

#### 3. PDF Generation (Server-Side API Route)
```typescript
// app/api/documents/[id]/generate/route.ts
import { renderToBuffer } from '@react-pdf/renderer';
import { WillDocument } from '@/lib/templates/will';

export async function POST(req: Request, { params }: { params: { id: string } }) {
  // 1. Verify auth & ownership
  const { user } = await getUser(req);

  // 2. Fetch document data
  const { data: doc } = await supabase
    .from('documents')
    .select('*')
    .eq('id', params.id)
    .eq('user_id', user.id)
    .single();

  // 3. Get state-specific template config
  const template = await getTemplateForState(doc.state, doc.doc_type);

  // 4. Merge template config with user data
  const documentData = mergeTemplateWithData(template, doc.data);

  // 5. Generate PDF
  const pdfBuffer = await renderToBuffer(
    <WillDocument data={documentData} />
  );

  // 6. Store in Supabase Storage
  const { data: file } = await supabase.storage
    .from('documents')
    .upload(`${user.id}/${doc.id}/v${doc.version}.pdf`, pdfBuffer, {
      contentType: 'application/pdf',
      upsert: true
    });

  // 7. Create version record
  await supabase.from('doc_versions').insert({
    document_id: doc.id,
    version_number: doc.version,
    storage_path: file.path,
  });

  // 8. Return signed URL for download
  const { data: signedUrl } = await supabase.storage
    .from('documents')
    .createSignedUrl(file.path, 3600); // 1 hour expiry

  return Response.json({ downloadUrl: signedUrl.signedUrl });
}
```

#### 4. Scaling Considerations

**For MVP (Current Volume):**
- Synchronous PDF generation in API route
- Direct upload to Supabase Storage
- Works well for < 100 documents/day

**For Scale (Future):**
```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  API Request    │────►│   Queue Job     │────►│  Background     │
│  (Immediate)    │     │  (Inngest/QS)   │     │  Worker         │
└─────────────────┘     └─────────────────┘     └────────┬────────┘
                                                         │
                              ┌───────────────────────────┘
                              │
                              ▼
                   ┌─────────────────────┐
                   │  Notify User        │
                   │  (Email + Webhook)  │
                   └─────────────────────┘
```

Options for background processing:
- **Inngest** - Serverless job queue with Next.js integration
- **QStash** (Upstash) - HTTP-based message queue
- **Supabase Edge Functions** - Triggered by database changes

---

## Payment & Subscription Flow

### Checkout Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          STRIPE CHECKOUT FLOW                                │
└─────────────────────────────────────────────────────────────────────────────┘

                    User Clicks "Get Started"
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                        PRODUCT SELECTION PAGE                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐                  │
│  │    Will     │  │   Trust     │  │    Estate Plan      │                  │
│  │    $199     │  │    $499     │  │       $699          │                  │
│  │  (or $299)  │  │  (or $599)  │  │     (or $799)       │                  │
│  │   couples   │  │   couples   │  │      couples        │                  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘                  │
│                                                                              │
│            ┌──────────────────────────────────────────────┐                 │
│            │  [ ] Add spouse/partner (+$100)              │                 │
│            │  [ ] Attorney Review (+$299)                 │                 │
│            └──────────────────────────────────────────────┘                 │
└─────────────────────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Create Stripe   │
                    │ Checkout Session│
                    └────────┬────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────────────────┐
│                      STRIPE HOSTED CHECKOUT                                  │
│                                                                              │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │  • Handles payment form UI                                            │  │
│  │  • PCI compliance (no card data touches our servers)                  │  │
│  │  • Apple Pay / Google Pay support                                     │  │
│  │  • International payment methods                                       │  │
│  └───────────────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
                              │
              ┌───────────────┴───────────────┐
              │                               │
              ▼                               ▼
    ┌─────────────────┐             ┌─────────────────┐
    │ Success Page    │             │ Webhook Handler │
    │ /checkout/      │             │ /api/webhooks/  │
    │ success         │             │ stripe          │
    └────────┬────────┘             └────────┬────────┘
              │                               │
              │                               ▼
              │                     ┌─────────────────┐
              │                     │ Process Order   │
              │                     │ • Create order  │
              │                     │ • Grant access  │
              │                     │ • Send email    │
              │                     │ • Sync CRM      │
              │                     └─────────────────┘
              │
              ▼
    ┌─────────────────────────────────────────────────────────────────────────┐
    │                         USER DASHBOARD                                   │
    │  Documents ready for completion                                          │
    └─────────────────────────────────────────────────────────────────────────┘
```

### Stripe Integration Code

#### 1. Create Checkout Session
```typescript
// app/api/checkout/route.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { user } = await getUser(req);
  const { productId, isCouples, addAttorney } = await req.json();

  // Get product from database
  const product = await getProduct(productId);

  // Build line items
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [
    {
      price_data: {
        currency: 'usd',
        product_data: {
          name: isCouples ? `${product.name} (Couples)` : product.name,
          description: product.description,
        },
        unit_amount: isCouples ? product.price_couples : product.price_individual,
      },
      quantity: 1,
    },
  ];

  if (addAttorney) {
    lineItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: 'Attorney Review',
          description: 'Professional attorney review of your documents',
        },
        unit_amount: 29900, // $299
      },
      quantity: 1,
    });
  }

  // Create checkout session
  const session = await stripe.checkout.sessions.create({
    customer_email: user.email,
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.NEXT_PUBLIC_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.NEXT_PUBLIC_URL}/checkout/canceled`,
    metadata: {
      user_id: user.id,
      product_id: productId,
      is_couples: isCouples.toString(),
      add_attorney: addAttorney.toString(),
    },
  });

  // Create pending order
  await supabase.from('orders').insert({
    user_id: user.id,
    status: 'pending',
    subtotal: session.amount_subtotal!,
    total: session.amount_total!,
    stripe_checkout_session_id: session.id,
    is_couples: isCouples,
    metadata: { product_id: productId, add_attorney: addAttorney },
  });

  return Response.json({ url: session.url });
}
```

#### 2. Webhook Handler
```typescript
// app/api/webhooks/stripe/route.ts
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    return new Response('Webhook signature verification failed', { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;
      await handleSuccessfulPayment(session);
      break;
    }

    case 'customer.subscription.created':
    case 'customer.subscription.updated': {
      const subscription = event.data.object as Stripe.Subscription;
      await syncSubscription(subscription);
      break;
    }

    case 'customer.subscription.deleted': {
      const subscription = event.data.object as Stripe.Subscription;
      await cancelSubscription(subscription);
      break;
    }

    case 'invoice.payment_failed': {
      const invoice = event.data.object as Stripe.Invoice;
      await handleFailedPayment(invoice);
      break;
    }
  }

  return new Response('OK', { status: 200 });
}

async function handleSuccessfulPayment(session: Stripe.Checkout.Session) {
  const { user_id, product_id, is_couples, add_attorney } = session.metadata!;

  // 1. Update order status
  await supabase
    .from('orders')
    .update({
      status: 'completed',
      completed_at: new Date().toISOString(),
      stripe_payment_intent_id: session.payment_intent as string,
    })
    .eq('stripe_checkout_session_id', session.id);

  // 2. Create document record(s)
  const product = await getProduct(product_id);
  const docTypes = getDocTypesForProduct(product.type); // e.g., estate-plan = [will, trust, poa]

  for (const docType of docTypes) {
    await supabase.from('documents').insert({
      user_id,
      order_id: session.id,
      doc_type: docType,
      status: 'draft',
      data: {},
    });
  }

  // 3. Send confirmation email
  await sendPurchaseConfirmation(user_id, session);

  // 4. Sync to Go High Level
  await syncToGHL({ event: 'purchase', user_id, product_id, amount: session.amount_total });
}
```

### Subscription Flow (Membership)

```typescript
// app/api/subscriptions/create/route.ts
export async function POST(req: Request) {
  const { user } = await getUser(req);
  const { planType } = await req.json(); // 'will_plan' or 'trust_plan'

  // Get or create Stripe customer
  let customerId = await getStripeCustomerId(user.id);

  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { user_id: user.id },
    });
    customerId = customer.id;
    await saveStripeCustomerId(user.id, customerId);
  }

  // Get price ID for plan
  const priceId = planType === 'will_plan'
    ? process.env.STRIPE_WILL_PLAN_PRICE_ID
    : process.env.STRIPE_TRUST_PLAN_PRICE_ID;

  // Create subscription with 30-day trial (free update period)
  const subscription = await stripe.subscriptions.create({
    customer: customerId,
    items: [{ price: priceId }],
    trial_period_days: 30,
    payment_behavior: 'default_incomplete',
    expand: ['latest_invoice.payment_intent'],
  });

  // Store subscription
  await supabase.from('subscriptions').insert({
    user_id: user.id,
    stripe_subscription_id: subscription.id,
    stripe_customer_id: customerId,
    plan_type: planType,
    status: subscription.status,
    current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
    current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
  });

  return Response.json({ subscription_id: subscription.id });
}
```

---

## Security Considerations

### 1. Authentication & Authorization

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                        SECURITY ARCHITECTURE                                 │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Supabase      │     │   Row Level     │     │   API Route     │
│   Auth (JWT)    │────►│   Security      │────►│   Middleware    │
│                 │     │   (RLS)         │     │                 │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

#### Row Level Security (RLS) Policies
```sql
-- Users can only see their own documents
CREATE POLICY "Users can view own documents"
  ON documents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own documents"
  ON documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own unlocked documents"
  ON documents FOR UPDATE
  USING (auth.uid() = user_id AND locked_at IS NULL)
  WITH CHECK (auth.uid() = user_id);

-- Couples can view shared documents
CREATE POLICY "Couples can view shared documents"
  ON documents FOR SELECT
  USING (
    auth.uid() = user_id OR
    auth.uid() IN (
      SELECT user2_id FROM couples WHERE user1_id = user_id
      UNION
      SELECT user1_id FROM couples WHERE user2_id = user_id
    )
  );

-- Orders are private to user
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (auth.uid() = user_id);
```

### 2. Document Storage Security

```typescript
// lib/storage/secure-access.ts

// 1. Use private buckets (no public access)
const DOCUMENTS_BUCKET = 'documents'; // Configured as private in Supabase

// 2. Generate signed URLs with short expiry
export async function getSecureDocumentUrl(
  userId: string,
  documentId: string
): Promise<string> {
  // Verify ownership first
  const { data: doc } = await supabase
    .from('documents')
    .select('id')
    .eq('id', documentId)
    .eq('user_id', userId)
    .single();

  if (!doc) throw new Error('Unauthorized');

  // Get latest version
  const { data: version } = await supabase
    .from('doc_versions')
    .select('storage_path')
    .eq('document_id', documentId)
    .order('version_number', { ascending: false })
    .limit(1)
    .single();

  // Generate signed URL (1 hour expiry)
  const { data } = await supabase.storage
    .from(DOCUMENTS_BUCKET)
    .createSignedUrl(version.storage_path, 3600);

  return data.signedUrl;
}

// 3. Organize files by user ID (isolation)
// Storage path pattern: {user_id}/{document_id}/v{version}.pdf
```

### 3. PII Handling

```typescript
// lib/security/pii.ts

// 1. Encrypt sensitive fields at rest
import { createCipheriv, createDecipheriv, randomBytes } from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!; // 32 bytes

export function encryptPII(data: string): { encrypted: string; iv: string } {
  const iv = randomBytes(16);
  const cipher = createCipheriv('aes-256-gcm', Buffer.from(ENCRYPTION_KEY, 'hex'), iv);
  let encrypted = cipher.update(data, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  const authTag = cipher.getAuthTag();
  return {
    encrypted: encrypted + authTag.toString('hex'),
    iv: iv.toString('hex'),
  };
}

export function decryptPII(encrypted: string, iv: string): string {
  const decipher = createDecipheriv(
    'aes-256-gcm',
    Buffer.from(ENCRYPTION_KEY, 'hex'),
    Buffer.from(iv, 'hex')
  );
  const authTag = Buffer.from(encrypted.slice(-32), 'hex');
  const encryptedText = encrypted.slice(0, -32);
  decipher.setAuthTag(authTag);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
  decrypted += decipher.final('utf8');
  return decrypted;
}

// 2. Fields to encrypt
const PII_FIELDS = ['ssn', 'date_of_birth', 'bank_account', 'driver_license'];

// 3. Mask PII in logs
export function maskPII(data: Record<string, any>): Record<string, any> {
  const masked = { ...data };
  PII_FIELDS.forEach(field => {
    if (masked[field]) {
      masked[field] = '***REDACTED***';
    }
  });
  return masked;
}
```

### 4. API Security

```typescript
// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Check auth for protected routes
  const protectedPaths = ['/dashboard', '/documents', '/api/documents', '/api/checkout'];
  const isProtected = protectedPaths.some(path => req.nextUrl.pathname.startsWith(path));

  if (isProtected) {
    const { data: { session } } = await supabase.auth.getSession();

    if (!session) {
      // Redirect to login or return 401 for API
      if (req.nextUrl.pathname.startsWith('/api/')) {
        return new Response('Unauthorized', { status: 401 });
      }
      return NextResponse.redirect(new URL('/login', req.url));
    }
  }

  // Add security headers
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('X-Frame-Options', 'DENY');
  res.headers.set('X-XSS-Protection', '1; mode=block');
  res.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|public/).*)'],
};
```

### 5. Webhook Security

```typescript
// Verify Stripe webhook signatures
const sig = req.headers.get('stripe-signature');
try {
  event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
} catch (err) {
  return new Response('Invalid signature', { status: 400 });
}

// Verify Go High Level webhooks
const ghlSignature = req.headers.get('x-ghl-signature');
const expectedSignature = crypto
  .createHmac('sha256', process.env.GHL_WEBHOOK_SECRET!)
  .update(body)
  .digest('hex');
if (ghlSignature !== expectedSignature) {
  return new Response('Invalid signature', { status: 400 });
}
```

### 6. Rate Limiting

```typescript
// lib/rate-limit.ts
import { Ratelimit } from '@upstash/ratelimit';
import { Redis } from '@upstash/redis';

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_URL!,
  token: process.env.UPSTASH_REDIS_TOKEN!,
});

export const rateLimiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '60 s'), // 10 requests per minute
  analytics: true,
});

// Use in API routes
export async function checkRateLimit(identifier: string): Promise<boolean> {
  const { success, remaining } = await rateLimiter.limit(identifier);
  return success;
}
```

---

## State-Specific Document Templates

### Template Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                     STATE-SPECIFIC TEMPLATE SYSTEM                           │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│  Base Template  │────►│ State Override  │────►│  Final Document │
│  (Common Law)   │     │  (CA, TX, etc)  │     │  (Rendered PDF) │
└─────────────────┘     └─────────────────┘     └─────────────────┘
```

### Implementation

```typescript
// lib/templates/state-configs/index.ts

export interface StateConfig {
  state: string;
  stateName: string;
  witnessRequirements: {
    count: number;
    ageRequirement: number;
    notaryRequired: boolean;
    selfProvingAffidavitAvailable: boolean;
  };
  willRequirements: {
    minimumAge: number;
    holographicAllowed: boolean;
    nuncupativeAllowed: boolean;
    electronicWillAllowed: boolean;
  };
  trustRequirements: {
    pourOverWillRecommended: boolean;
    separateCertificateRequired: boolean;
    fundingRequirements: string[];
  };
  legalDisclaimer: string;
  effectiveDate: string;
}

// State-specific configurations
export const stateConfigs: Record<string, StateConfig> = {
  CA: {
    state: 'CA',
    stateName: 'California',
    witnessRequirements: {
      count: 2,
      ageRequirement: 18,
      notaryRequired: false,
      selfProvingAffidavitAvailable: true,
    },
    willRequirements: {
      minimumAge: 18,
      holographicAllowed: true,
      nuncupativeAllowed: false,
      electronicWillAllowed: false,
    },
    trustRequirements: {
      pourOverWillRecommended: true,
      separateCertificateRequired: true,
      fundingRequirements: ['real_estate', 'bank_accounts', 'investments'],
    },
    legalDisclaimer: 'This document is valid under California Probate Code...',
    effectiveDate: '2024-01-01',
  },
  TX: {
    state: 'TX',
    stateName: 'Texas',
    witnessRequirements: {
      count: 2,
      ageRequirement: 14,
      notaryRequired: false,
      selfProvingAffidavitAvailable: true,
    },
    willRequirements: {
      minimumAge: 18,
      holographicAllowed: true,
      nuncupativeAllowed: true, // Limited circumstances
      electronicWillAllowed: false,
    },
    trustRequirements: {
      pourOverWillRecommended: true,
      separateCertificateRequired: false,
      fundingRequirements: ['real_estate', 'bank_accounts'],
    },
    legalDisclaimer: 'This document is valid under Texas Estates Code...',
    effectiveDate: '2024-01-01',
  },
  // ... configurations for all 50 states
};

// Template merger
export function mergeTemplateWithStateConfig(
  baseTemplate: WillDocument,
  stateConfig: StateConfig,
  userData: WillData
): WillData {
  return {
    ...userData,
    state: stateConfig.state,
    // Apply state-specific requirements
    _stateConfig: {
      witnessCount: stateConfig.witnessRequirements.count,
      notaryRequired: stateConfig.witnessRequirements.notaryRequired,
      legalDisclaimer: stateConfig.legalDisclaimer,
    },
  };
}
```

### Database-Driven Template Overrides

```sql
-- Store state-specific text overrides in database
INSERT INTO templates (state, doc_type, version, content, effective_date) VALUES
('CA', 'will', 1, '{
  "attestation_clause": "We, the undersigned, declare under penalty of perjury under the laws of the State of California...",
  "witness_requirements": "Two witnesses required, must be at least 18 years old and of sound mind",
  "notary_section": "Optional - Self-proving affidavit available",
  "legal_warnings": ["California community property state - spouse may have automatic rights"]
}', '2024-01-01'),
('TX', 'will', 1, '{
  "attestation_clause": "We, the undersigned, declare that the foregoing instrument was...",
  "witness_requirements": "Two witnesses required, must be at least 14 years old",
  "notary_section": "Optional - Self-proving affidavit available",
  "legal_warnings": ["Texas community property state - spouse may have automatic rights"]
}', '2024-01-01');
```

---

## Suggested Build Order

### Phase 1: Foundation (Week 1-2)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  1. Supabase Setup                                                           │
│     ├── Database schema (users, profiles, orders, documents)                │
│     ├── Row Level Security policies                                          │
│     ├── Storage bucket configuration                                         │
│     └── Auth configuration (email/password + magic link)                    │
│                                                                              │
│  2. Authentication Integration                                               │
│     ├── Sign up / Sign in pages                                             │
│     ├── Password reset flow                                                  │
│     ├── Email verification                                                   │
│     ├── Auth middleware for protected routes                                │
│     └── Profile creation on signup                                          │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Phase 2: Payment & Orders (Week 3-4)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  3. Stripe Integration                                                       │
│     ├── Product and price setup in Stripe dashboard                         │
│     ├── Checkout session creation API                                        │
│     ├── Webhook handler for payment events                                   │
│     ├── Order management (create, update, complete)                          │
│     └── Success/cancel pages                                                 │
│                                                                              │
│  4. User Dashboard (MVP)                                                     │
│     ├── Order history view                                                   │
│     ├── Document list (purchased products)                                  │
│     └── Basic profile management                                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Phase 3: Document Wizard (Week 5-7)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  5. Document Creation Flow                                                   │
│     ├── Multi-step form wizard component                                    │
│     ├── Form validation (Zod schemas)                                        │
│     ├── Auto-save functionality                                             │
│     ├── Progress tracking                                                   │
│     └── State selection with template linking                               │
│                                                                              │
│  6. PDF Generation                                                           │
│     ├── Connect existing React PDF templates                                │
│     ├── State-specific template configuration                               │
│     ├── PDF generation API endpoint                                          │
│     ├── Secure storage upload                                               │
│     └── Download via signed URLs                                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Phase 4: Subscriptions & Email (Week 8-9)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  7. Subscription Management                                                  │
│     ├── Subscription plans setup in Stripe                                  │
│     ├── 30-day free trial integration                                        │
│     ├── Subscription status tracking                                         │
│     ├── Update access based on subscription                                  │
│     └── Cancellation flow                                                   │
│                                                                              │
│  8. Email Notifications (Resend)                                             │
│     ├── Purchase confirmation emails                                         │
│     ├── Document ready notifications                                         │
│     ├── Subscription renewal reminders                                       │
│     └── Password reset emails                                               │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Phase 5: Couples & CRM (Week 10-11)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  9. Couples Feature                                                          │
│     ├── Couples pricing toggle on checkout                                  │
│     ├── Partner invitation flow                                             │
│     ├── Shared document access                                               │
│     └── Couples dashboard view                                              │
│                                                                              │
│  10. Go High Level Integration                                               │
│      ├── Contact form → GHL lead                                            │
│      ├── Purchase → GHL customer tag                                         │
│      ├── Abandoned cart → GHL lead capture                                  │
│      └── Webhook handlers for two-way sync                                  │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Phase 6: Polish & Launch (Week 12)
```
┌─────────────────────────────────────────────────────────────────────────────┐
│  11. Final Polish                                                            │
│      ├── Error handling and edge cases                                      │
│      ├── Loading states and UX improvements                                 │
│      ├── Mobile responsiveness audit                                         │
│      └── Performance optimization                                           │
│                                                                              │
│  12. Security & Testing                                                      │
│      ├── Security audit (auth, RLS, encryption)                             │
│      ├── End-to-end testing                                                  │
│      ├── Payment flow testing (test mode)                                   │
│      └── Documentation updates                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Implementation Priority Matrix

| Component | Business Value | Technical Complexity | Dependencies | Priority |
|-----------|---------------|---------------------|--------------|----------|
| Auth (Supabase) | High | Low | None | 1 |
| Checkout (Stripe) | Critical | Medium | Auth | 2 |
| Order Management | Critical | Low | Auth, Stripe | 3 |
| User Dashboard | High | Low | Auth, Orders | 4 |
| Document Wizard | Critical | High | Auth, Orders | 5 |
| PDF Generation | Critical | Medium | Templates, Storage | 6 |
| Email (Resend) | Medium | Low | Auth, Orders | 7 |
| Subscriptions | High | Medium | Stripe, Auth | 8 |
| Couples Feature | Medium | Medium | Auth, Orders | 9 |
| GHL Integration | Medium | Low | Orders | 10 |

---

## Key Technical Decisions Summary

| Area | Decision | Rationale |
|------|----------|-----------|
| **Auth** | Supabase Auth | Already installed, handles JWT, magic links, OAuth |
| **Database** | Supabase PostgreSQL | RLS, JSONB for flexible document data, integrated storage |
| **Payments** | Stripe Checkout (hosted) | PCI compliance, minimal frontend code, handles all payment methods |
| **PDF Generation** | @react-pdf/renderer (server-side) | Already have templates, React-based, no external dependencies |
| **Document Storage** | Supabase Storage | Integrated with RLS, signed URLs, cost-effective |
| **Email** | Resend | Simple API, good deliverability, React email templates |
| **State Templates** | Database config + Code base | Base templates in code, state overrides in DB for easy updates |
| **Background Jobs** | Inngest (future) | If needed for PDF queue, start synchronous for MVP |

---

## Environment Variables Required

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
SUPABASE_SERVICE_ROLE_KEY=xxx

# Stripe
STRIPE_SECRET_KEY=sk_live_xxx
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
STRIPE_WILL_PLAN_PRICE_ID=price_xxx
STRIPE_TRUST_PLAN_PRICE_ID=price_xxx

# Resend
RESEND_API_KEY=re_xxx

# Go High Level
GHL_API_KEY=xxx
GHL_LOCATION_ID=xxx
GHL_WEBHOOK_SECRET=xxx

# Security
ENCRYPTION_KEY=xxx (32 bytes hex)

# App
NEXT_PUBLIC_URL=https://ldasdestateplanning.com
```

---

*Document generated: 2026-01-27*
*Reference: Trust & Will platform architecture patterns*
