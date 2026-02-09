# LDASD Estate Planning Platform

## What This Is

A full-featured online estate planning platform for LDASD, modeled after Trust & Will (industry leader). The platform enables customers to create legally valid wills, trusts, and related documents through a guided online process, with user accounts, membership subscriptions, and attorney support options.

## Core Value

Provide affordable, accessible estate planning documents to families across all 50 states with a modern self-service platform that matches the Trust & Will experience - user accounts, couples pricing, membership updates, and attorney consultations.

## Requirements

### Validated

(Existing codebase provides foundation)

- Marketing website with 20 pages (Next.js 14, Tailwind CSS)
- Product pages for Will, Trust, Guardianship, Estate Plan, POA, Healthcare Directive
- Booking form with state selection and pricing calculator
- Contact form structure
- Educational content hub (Learn center, FAQ, Blog, Guides)
- PDF templates for will/trust/guardianship documents
- SEO/Schema markup implementation
- Professional responsive design

### Active

**User Accounts & Authentication**
- [ ] User registration and login (Supabase Auth)
- [ ] User dashboard to view purchased documents
- [ ] Document edit/update capability
- [ ] Password reset flow
- [ ] Email verification

**Couples Pricing**
- [ ] Individual pricing: Will $199, Trust $499
- [ ] Couples pricing: Will $299, Trust $599
- [ ] Pricing toggle on product pages and checkout
- [ ] Shared document access for couples

**Payment Processing (Stripe)**
- [ ] One-time product purchases
- [ ] Membership subscriptions ($19/yr Will, $39/yr Trust)
- [ ] 30-day free update period included with purchase
- [ ] Secure checkout flow
- [ ] Payment receipts and invoices

**Membership Model**
- [ ] 30 days free document updates after purchase
- [ ] Will Plan membership: $19/year
- [ ] Trust Plan membership: $39/year
- [ ] Membership dashboard showing status
- [ ] Renewal reminders

**Document Generation**
- [ ] Connect existing PDF templates to purchase flow
- [ ] State-specific document customization
- [ ] PDF download from user dashboard
- [ ] Email delivery of documents (Resend)
- [ ] Document versioning for updates

**Attorney Support Add-on**
- [ ] Attorney consultation add-on ($299)
- [ ] Booking/scheduling integration
- [ ] State-specific attorney matching
- [ ] Infrastructure for future attorney partnerships

**Go High Level CRM Integration**
- [ ] Contact form submissions to GHL
- [ ] Lead capture from incomplete purchases
- [ ] Customer tagging by product interest
- [ ] Purchase notifications to CRM

**Interactive Features**
- [ ] "Find Your Plan" quiz (like Trust & Will)
- [ ] Dynamic pricing calculator
- [ ] Progress saving during document creation
- [ ] Form auto-save with draft recovery

**Trust Indicators**
- [ ] Customer review integration
- [ ] Press/media logos section
- [ ] BBB and certification badges
- [ ] Statistics (families served, rating, etc.)

### Out of Scope

- Deed transfer services - focus on wills/trusts only
- Mobile app - web-first approach
- Live chat/chatbot - contact form and email support only
- Physical document mailing - digital delivery only
- Full attorney marketplace - single add-on option for now

## Context

**Reference Model:**
- Trust & Will (trustandwill.com) - industry leader with 1M+ users
- Features to match: user accounts, couples pricing, membership updates, attorney support, guided document creation, EstateOS-style platform

**Client Background:**
- LDASD Estate Planning based in San Diego, CA
- Existing website built but not fully functional
- Uses Go High Level for CRM/marketing
- Target market: families across all 50 states

**Existing Codebase:**
- Next.js 14 with TypeScript and Tailwind CSS
- 20 pages already built (marketing + product pages)
- PDF templates exist (will, trust, guardianship)
- Stripe, Supabase, Resend packages installed but not integrated
- Go High Level integration marked as TODO

**Operator Model:**
- Developer (Julian) builds and maintains platform
- Client manages business operations and attorney partnerships
- Self-service for end customers (no manual document creation)

## Constraints

- **Tech Stack**: Next.js 14, Supabase (auth + DB), Stripe (payments), Resend (email), Go High Level (CRM) - all already installed
- **Legal**: Documents must be state-specific and legally valid in all 50 states
- **Pricing**: Match Trust & Will pricing model (individual/couples, membership tiers)
- **Timeline**: Build incrementally - lead capture first, then payments, then full platform
- **Branding**: Maintain existing LDASD brand identity and design system

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Match Trust & Will model | Industry-proven UX and pricing, user expectation baseline | — Pending |
| Supabase for auth + database | Already installed, PostgreSQL + Auth, serverless-friendly | — Pending |
| Stripe for payments | Already installed, handles one-time + subscriptions | — Pending |
| No deeds service | Focus on core will/trust offering, reduce scope | — Pending |
| Couples pricing | Trust & Will standard, increases average order value | — Pending |
| Membership model | Recurring revenue, matches Trust & Will ($19-39/yr) | — Pending |
| Attorney support add-on | Revenue opportunity, differentiator, $299 add-on | — Pending |

---
*Last updated: 2026-01-27 after initialization with reference site research*
