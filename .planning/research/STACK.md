# Technology Stack Research

> Estate Planning SaaS Platform - Technology Stack Analysis
> Research Date: 2026-01-27

## Executive Summary

Building an estate planning platform similar to Trust & Will requires a robust, secure, and scalable technology stack. The chosen stack (Next.js 14, TypeScript, Tailwind CSS, Supabase, Stripe, Resend) aligns well with 2026 best practices for legal document SaaS applications. This document provides research findings and recommendations for each major component.

---

## Core Framework

### Current Choice: Next.js 14 + TypeScript + Tailwind CSS

**Assessment: Excellent Choice**

The Next.js + Supabase combination has become the dominant stack for modern SaaS applications in 2025-2026. This pairing offers:

- **Server Components & App Router**: Next.js 14's App Router enables efficient server-side rendering crucial for SEO (landing pages, educational content) while maintaining client-side interactivity for document creation flows
- **TypeScript**: Essential for legal document generation where type safety prevents data integrity issues
- **Tailwind CSS**: Rapid UI development with consistent styling; pairs excellently with component libraries like shadcn/ui

**Production-Ready Boilerplate Patterns:**
- [Makerkit](https://makerkit.dev/next-supabase) - Production-ready with Stripe billing, multi-tenancy
- [Supastarter](https://supastarter.dev/) - Popular among indie hackers and micro-SaaS builders
- [SupaSaaS](https://razikus.gumroad.com/l/supatemplate) - Complete multi-tenant architecture with Paddle/Stripe

**Key Architectural Decisions:**
1. Use Server Components for document preview rendering
2. Use Client Components for interactive form wizards
3. Implement API routes for PDF generation (heavy processing)
4. Use Edge Functions for lightweight operations (auth checks)

---

## Document Generation

### The Critical Challenge

Legal document generation is the core differentiator for estate planning platforms. Two primary approaches exist:

### Option 1: React-PDF (Recommended for Scale)

**Pros:**
- Ultra-lightweight, significantly faster than Puppeteer
- Works in Node.js and browsers
- Direct React component-to-PDF conversion
- No external dependencies (Chromium)
- Better for high-volume generation (>1,000 docs/day)

**Cons:**
- Requires custom component development
- Learning curve for complex layouts
- May need separate styling from web UI

**Best For:** Production applications with significant document volume

### Option 2: Puppeteer (Recommended for Prototyping)

**Pros:**
- Pixel-perfect HTML/CSS rendering
- Use existing web templates directly
- Easier for complex styling (CSS Grid, Flexbox)
- Better for one-off or low-volume generation

**Cons:**
- Large container size (Headless Chrome)
- Slow startup (~3.2s browser launch + ~1.5s PDF generation)
- Memory intensive
- Complex to scale horizontally

**Performance Metrics (per document):**
| Step | Time |
|------|------|
| Browser startup | ~3.2s |
| PDF generation | ~1.5s |
| Storage upload | ~0.5s |
| Total | ~5.2s |

### Scaling Strategy

For high-volume scenarios:
1. **Batch Processing**: Generate multiple PDFs per invocation
2. **Worker Queues**: Use Inngest or similar for async processing
3. **Pre-rendering**: Cache common template sections
4. **CDN Delivery**: Store generated PDFs in Supabase Storage with CDN

### Recommended Architecture

```
User Request
    |
    v
API Route (Next.js)
    |
    v
Queue (Inngest/Trigger.dev)
    |
    v
Worker (React-PDF)
    |
    v
Supabase Storage
    |
    v
Signed URL to User
```

---

## State-Specific Legal Document Templates

### The Challenge

Estate planning documents must comply with state-specific requirements:
- Witness requirements vary by state
- Notarization rules differ
- Community property vs. common law states
- Common law marriage recognition
- Specific statutory language requirements

### Recommended Architecture: Template Composition Pattern

```typescript
// Template structure
interface LegalTemplate {
  baseContent: string;           // Universal legal language
  stateOverrides: {
    [stateCode: string]: {
      sections: SectionOverride[];
      witnesses: WitnessRequirements;
      notarization: NotarizationRules;
      specificClauses: Clause[];
    };
  };
  requiredFields: FieldDefinition[];
}
```

### Implementation Strategy

1. **Base Templates**: Create foundational document structures with common elements
2. **State Modules**: Override/extend base templates with state-specific requirements
3. **Dynamic Interview**: Use questionnaire flow to gather state-appropriate information
4. **Validation Layer**: Verify all state requirements are met before generation

### Data Model

```sql
-- Document templates table
CREATE TABLE document_templates (
  id UUID PRIMARY KEY,
  document_type TEXT NOT NULL, -- 'will', 'trust', 'poa_healthcare', etc.
  state_code TEXT, -- NULL for base templates
  version INTEGER NOT NULL,
  content JSONB NOT NULL,
  effective_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- State requirements reference
CREATE TABLE state_requirements (
  state_code TEXT PRIMARY KEY,
  witness_count INTEGER NOT NULL,
  notarization_required BOOLEAN NOT NULL,
  self_proving_affidavit BOOLEAN,
  community_property BOOLEAN,
  specific_clauses JSONB
);
```

### Professional References

- [WealthCounsel Wealth Docx](https://www.wealthcounsel.com/software-for-attorneys/wealth-docx-complete) - Professional-grade templates used by attorneys
- [ADAPT](https://adaptdocs.com/) - 20+ years of legal templates with dynamic interviews
- [Gavel](https://www.gavel.io/estate-planning-software) - Complex document automation for trusts and wills

---

## Authentication & Database

### Current Choice: Supabase

**Assessment: Excellent Choice**

Supabase provides a comprehensive backend with PostgreSQL, authentication, storage, and real-time capabilities.

### Row Level Security (RLS) - Critical for Legal Documents

**Must-Have Policies:**

```sql
-- Enable RLS on all tables
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE estate_plans ENABLE ROW LEVEL SECURITY;

-- Documents: Users can only access their own
CREATE POLICY "Users can view own documents"
  ON documents FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own documents"
  ON documents FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Estate plans with family sharing
CREATE POLICY "Users can view shared plans"
  ON estate_plans FOR SELECT
  USING (
    auth.uid() = owner_id
    OR auth.uid() IN (
      SELECT shared_with_user_id
      FROM plan_shares
      WHERE plan_id = estate_plans.id
    )
  );
```

### Performance Best Practices

1. **Index auth.uid() columns**: Add indexes for columns used in RLS policies
   ```sql
   CREATE INDEX idx_documents_user_id ON documents(user_id);
   ```

2. **Cache function results**: Wrap auth functions in subselects
   ```sql
   -- Instead of: auth.uid() = user_id
   -- Use: (SELECT auth.uid()) = user_id
   ```

3. **Keep policies simple**: Avoid complex joins in RLS policies

### Storage Security for Documents

```sql
-- Secure document storage bucket
CREATE POLICY "Users can upload to own folder"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'documents'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can view own documents"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'documents'
    AND (storage.foldername(name))[1] = auth.uid()::text
  );
```

### Security Warnings

- **Never use `service_role` keys in client code** - They bypass RLS
- **Don't trust `user_metadata` in RLS policies** - Users can modify it
- **Secure custom functions** - Place in non-exposed schemas
- **Test RLS locally** - Use Supabase CLI for thorough testing

### Role-Based Access Control (RBAC)

For family sharing and advisor access:

```sql
-- Custom claims for roles
CREATE TYPE user_role AS ENUM ('owner', 'spouse', 'advisor', 'beneficiary');

-- Role-based access
CREATE POLICY "Advisors can view client plans"
  ON estate_plans FOR SELECT
  USING (
    auth.uid() = owner_id
    OR EXISTS (
      SELECT 1 FROM plan_access
      WHERE plan_id = estate_plans.id
      AND user_id = auth.uid()
      AND role IN ('spouse', 'advisor')
    )
  );
```

---

## Payments & Subscriptions

### Current Choice: Stripe

**Assessment: Industry Standard**

Stripe is the dominant choice for SaaS subscription billing. For estate planning, consider these patterns:

### Pricing Model Recommendations

| Model | Use Case | Example |
|-------|----------|---------|
| **Flat-rate** | Single document (Will only) | $89 one-time |
| **Tiered** | Comprehensive plans | Basic ($159), Complete ($259), Family ($399) |
| **Per-document** | A la carte additions | Base plan + $49/additional document |

### Subscription vs. One-Time

Estate planning typically uses **hybrid models**:
- One-time payment for document creation
- Annual subscription for updates, storage, and amendments

### Implementation Architecture

```typescript
// Products map to plans
const PRODUCTS = {
  will_basic: 'prod_xxx',      // One-time
  trust_complete: 'prod_yyy',   // One-time
  annual_updates: 'prod_zzz',   // Subscription
};

// Prices map to options
const PRICES = {
  will_basic: 'price_xxx',
  trust_complete: 'price_yyy',
  annual_monthly: 'price_zzz_monthly',
  annual_yearly: 'price_zzz_yearly',
};
```

### Webhook Best Practices

```typescript
// Critical events to handle
const CRITICAL_EVENTS = [
  'checkout.session.completed',   // Grant access
  'invoice.payment_succeeded',    // Renew access
  'invoice.payment_failed',       // Notify user
  'customer.subscription.deleted', // Revoke access
];

// Webhook handler pattern
export async function POST(req: Request) {
  const event = await verifyWebhookSignature(req);

  // Acknowledge immediately
  // Process asynchronously via queue
  await inngest.send({
    name: 'stripe/webhook.received',
    data: { event }
  });

  return new Response('OK', { status: 200 });
}
```

### Revenue Recovery

Enable Stripe's built-in features:
- **Smart Retries**: Automatic retry of failed payments
- **Failed payment emails**: Customer notifications
- **Dunning management**: Escalating recovery attempts

### Database Schema

```sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  stripe_customer_id TEXT NOT NULL,
  stripe_subscription_id TEXT,
  status TEXT NOT NULL, -- 'active', 'past_due', 'canceled'
  current_period_end TIMESTAMPTZ,
  plan_type TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE purchases (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  stripe_payment_intent_id TEXT NOT NULL,
  product_type TEXT NOT NULL,
  amount_cents INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Email Delivery

### Current Choice: Resend

**Assessment: Excellent Choice**

Resend is purpose-built for transactional email with developer-first approach.

### Integration with React Email

```typescript
// emails/DocumentReady.tsx
import { Html, Head, Body, Container, Text, Button } from '@react-email/components';

export function DocumentReadyEmail({ userName, documentType, downloadUrl }) {
  return (
    <Html>
      <Head />
      <Body style={main}>
        <Container>
          <Text>Hi {userName},</Text>
          <Text>Your {documentType} is ready for review.</Text>
          <Button href={downloadUrl}>
            Download Document
          </Button>
        </Container>
      </Body>
    </Html>
  );
}
```

### Email Types for Estate Planning

| Email Type | Trigger | Priority |
|------------|---------|----------|
| Welcome | Account creation | High |
| Document Ready | PDF generation complete | High |
| Signature Reminder | Pending signatures | Medium |
| Annual Review | 1 year since creation | Medium |
| Payment Receipt | Successful payment | High |
| Payment Failed | Failed payment | Critical |

### Best Practices

1. **Domain Verification**: Required for deliverability
2. **Plain Text Fallbacks**: Always include for compatibility
3. **Environment Variables**: Never expose API keys
4. **Testing**: Use Resend's test mode in development
5. **Monitoring**: Track delivery rates and bounces

### Async Processing with Inngest

```typescript
// Decouple email sending from user requests
export const sendDocumentReadyEmail = inngest.createFunction(
  { id: 'send-document-ready-email' },
  { event: 'document/generated' },
  async ({ event }) => {
    const { userId, documentId } = event.data;

    const [user, document] = await Promise.all([
      getUser(userId),
      getDocument(documentId)
    ]);

    await resend.emails.send({
      from: 'Estate Plan <documents@yourdomain.com>',
      to: user.email,
      subject: `Your ${document.type} is ready`,
      react: DocumentReadyEmail({
        userName: user.name,
        documentType: document.type,
        downloadUrl: document.signedUrl
      })
    });
  }
);
```

---

## Additional Considerations

### E-Signature Integration

For legally binding signatures, consider:
- **DocuSign**: Industry standard, expensive
- **HelloSign (Dropbox Sign)**: Developer-friendly API
- **SignWell**: More affordable alternative
- **Self-hosted**: Use PKI for digital signatures (complex)

### Document Storage & Encryption

```sql
-- Encrypted document storage
CREATE TABLE encrypted_documents (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  encrypted_content BYTEA NOT NULL, -- Client-side encrypted
  content_hash TEXT NOT NULL, -- For integrity verification
  encryption_metadata JSONB, -- Key derivation info
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

### Compliance Considerations

- **SOC 2 Type II**: Required for handling sensitive legal documents
- **Data residency**: Some states may have requirements
- **Audit logging**: Track all document access and modifications
- **Data retention**: Define clear policies for document storage

---

## Recommendations

| Component | Recommendation | Rationale |
|-----------|----------------|-----------|
| **Framework** | Next.js 14 + TypeScript | Industry standard, excellent DX, SEO-friendly |
| **Styling** | Tailwind CSS + shadcn/ui | Rapid development, consistent design system |
| **Database** | Supabase (PostgreSQL) | RLS for security, real-time capabilities, integrated auth |
| **Auth** | Supabase Auth | Seamless integration, JWT-based, supports OAuth |
| **PDF Generation** | React-PDF (primary) | Performance at scale, no external dependencies |
| **PDF Backup** | Puppeteer (edge cases) | Complex layouts requiring exact CSS rendering |
| **Payments** | Stripe | Industry standard, excellent docs, flexible pricing models |
| **Email** | Resend + React Email | Developer experience, deliverability, React components |
| **Queue/Jobs** | Inngest or Trigger.dev | Async processing for PDF generation and emails |
| **File Storage** | Supabase Storage | Integrated RLS, CDN delivery, signed URLs |
| **E-Signatures** | HelloSign/SignWell | Cost-effective, good API, legally binding |

### Architecture Overview

```
[Client - Next.js App]
        |
        v
[API Layer - Next.js API Routes / Server Actions]
        |
    +---+---+---+---+
    |   |   |   |   |
    v   v   v   v   v
[Supabase] [Stripe] [Resend] [Inngest] [PDF Worker]
    |
    v
[PostgreSQL + Storage + Auth]
```

### Scaling Considerations

1. **Vercel**: Excellent for Next.js, auto-scaling
2. **Supabase**: Start with Pro plan, upgrade as needed
3. **PDF Generation**: Move to dedicated workers at scale (>1000 docs/day)
4. **CDN**: Use Vercel Edge or Cloudflare for global document delivery

---

## Sources

### SaaS Architecture
- [Makerkit - Next.js Supabase Boilerplate](https://makerkit.dev/next-supabase)
- [Supastarter - SaaS Starter Kit](https://supastarter.dev/)
- [WriterDock - Best Tech Stack for SaaS 2026](https://writerdock.in/blog/the-ultimate-guide-to-the-best-tech-stack-for-saas-in-2026)

### PDF Generation
- [DEV Community - How to Generate PDFs in 2025](https://dev.to/michal_szymanowski/how-to-generate-pdfs-in-2025-26gi)
- [Peakflo - PDF Generation at Scale](https://peakflo.hashnode.dev/pdf-generation-at-scale)
- [Nutrient - JavaScript PDF Libraries](https://www.nutrient.io/blog/javascript-pdf-libraries/)
- [npm Compare - PDF Libraries](https://npm-compare.com/html-pdf,pdfkit,pdfmake,puppeteer,react-pdf,wkhtmltopdf)

### Supabase & Security
- [Supabase - Row Level Security](https://supabase.com/docs/guides/database/postgres/row-level-security)
- [Supabase - Storage Access Control](https://supabase.com/docs/guides/storage/security/access-control)
- [Supabase - Custom Claims & RBAC](https://supabase.com/docs/guides/database/postgres/custom-claims-and-role-based-access-control-rbac)
- [Leanware - Supabase Best Practices](https://www.leanware.co/insights/supabase-best-practices)

### Stripe & Payments
- [Stripe - SaaS Subscription Models](https://stripe.com/resources/more/saas-subscription-models-101-a-guide-for-getting-started)
- [Stripe - Build Subscriptions](https://docs.stripe.com/billing/subscriptions/build-subscriptions)
- [Alguna - Best Subscription Billing Software 2026](https://blog.alguna.com/subscription-billing-software/)

### Email
- [Resend - Send with Next.js](https://resend.com/docs/send-with-nextjs)
- [Knock - Top Transactional Email Services 2026](https://knock.app/blog/the-top-transactional-email-services-for-developers)

### Estate Planning Software
- [Trust & Will](https://trustandwill.com/)
- [WealthCounsel - Wealth Docx](https://www.wealthcounsel.com/software-for-attorneys/wealth-docx-complete)
- [ADAPT Docs](https://adaptdocs.com/)
- [Gavel - Estate Planning Software](https://www.gavel.io/estate-planning-software)
