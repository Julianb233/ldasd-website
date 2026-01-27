# Roadmap: LDASD Estate Planning Platform

**Version:** 1.0
**Created:** 2026-01-27
**Milestone:** MVP Launch

---

## Milestone 1: MVP Launch

### Overview

Build a full e-commerce estate planning platform matching Trust & Will's feature set: user accounts, document wizards, Stripe payments, membership subscriptions, and Go High Level CRM integration.

**Target:** Production-ready platform with complete purchase-to-document flow

---

## Phase 1: Authentication & Database Foundation

**Focus:** User accounts, database schema, security infrastructure
**Requirements:** AUTH-01 through AUTH-06

### Plans

1. **Supabase Project Setup**
   - Configure Supabase project with proper RLS policies
   - Set up environment variables
   - Create database schema for users, orders, documents

2. **Authentication Implementation**
   - User registration with email/password
   - Email verification flow
   - Password reset flow
   - Session management

3. **User Dashboard Shell**
   - Protected dashboard route
   - Basic layout with sidebar navigation
   - Empty states for documents/orders

### Success Criteria
- [x] User can register with email/password
- [x] Email verification works
- [x] User can log in and see dashboard
- [x] Password reset flow complete
- [x] RLS policies protect user data

### Deliverables
- [x] Supabase schema deployed
- [x] Auth flows working
- [x] Dashboard accessible to logged-in users

**Status: COMPLETE** (2026-01-27)

---

## Phase 2: Payment Processing

**Focus:** Stripe integration, checkout flow, order management
**Requirements:** PAY-01 through PAY-05, PRICE-01 through PRICE-06

### Plans

1. **Stripe Configuration**
   - Create Stripe products and prices
   - Set up webhook endpoint
   - Configure test and production keys

2. **Checkout Implementation**
   - Stripe Checkout session creation
   - Success/cancel page handling
   - Order creation on successful payment

3. **Pricing UI**
   - Individual/couples pricing toggle
   - Product cards with prices
   - Cart functionality
   - Dynamic pricing based on selections

### Success Criteria
- [ ] User can select products and see correct pricing
- [ ] Stripe Checkout works in test mode
- [ ] Order created in database on payment
- [ ] Webhook handles payment events correctly
- [ ] Email receipt sent on purchase

### Deliverables
- [ ] Stripe products configured
- [ ] Checkout flow complete
- [ ] Order management in database

---

## Phase 3: Document Wizard System

**Focus:** Guided questionnaire flow with auto-save
**Requirements:** WIZ-01 through WIZ-06, DOC-01 through DOC-06

### Plans

1. **Wizard Framework**
   - Multi-step form infrastructure
   - Progress indicator component
   - Auto-save on field change
   - Resume from saved state

2. **Will Wizard**
   - Personal information section
   - Beneficiary designation
   - Executor nomination
   - Guardian designation (if children)
   - State-specific questions

3. **Trust Wizard**
   - Trust type selection
   - Trustee designation
   - Asset transfer questions
   - Distribution instructions
   - State-specific variations

4. **POA & Healthcare Directive Wizards**
   - Agent designation
   - Powers granted
   - Healthcare preferences
   - State-specific requirements

### Success Criteria
- [ ] User can start and complete any wizard
- [ ] Progress saves automatically
- [ ] User can resume from any device
- [ ] State-specific questions display correctly
- [ ] Plain language explanations throughout

### Deliverables
- [ ] Wizard framework with auto-save
- [ ] All 4 document wizards complete
- [ ] State-specific question logic

---

## Phase 4: PDF Generation & Delivery

**Focus:** Connect React-PDF templates, document delivery
**Requirements:** PDF-01 through PDF-05

### Plans

1. **PDF Template Integration**
   - Connect existing React-PDF templates
   - Map wizard data to template fields
   - State-specific template variations

2. **Generation Pipeline**
   - Server-side PDF generation
   - Storage in Supabase Storage
   - Signed URL generation for downloads

3. **Delivery System**
   - Download from dashboard
   - Email delivery via Resend
   - Execution instructions page

### Success Criteria
- [ ] PDF generates from completed wizard data
- [ ] State-specific content renders correctly
- [ ] User can download from dashboard
- [ ] Email delivery works
- [ ] Execution instructions included

### Deliverables
- [ ] PDF generation working for all documents
- [ ] Download and email delivery
- [ ] Execution instructions per state

---

## Phase 5: Membership & Subscriptions

**Focus:** Subscription model, document updates
**Requirements:** SUB-01 through SUB-06

### Plans

1. **Subscription Setup**
   - Stripe subscription products
   - 30-day trial configuration
   - Will Plan ($19/yr) and Trust Plan ($39/yr)

2. **Subscription Management**
   - Trial period tracking
   - Automatic subscription creation after trial
   - Renewal handling via webhooks

3. **Update Functionality**
   - Edit documents during subscription
   - Regenerate PDFs after changes
   - Version history tracking

### Success Criteria
- [ ] 30-day trial starts on purchase
- [ ] Subscription charges after trial
- [ ] User can update documents during subscription
- [ ] Renewal handled automatically
- [ ] Membership status shows in dashboard

### Deliverables
- [ ] Subscription products in Stripe
- [ ] Trial and renewal logic
- [ ] Document update capability

---

## Phase 6: Couples & Packages

**Focus:** Couples pricing, shared access, bundles
**Requirements:** COUP-01 through COUP-04

### Plans

1. **Couples Pricing**
   - Couples toggle on product pages
   - Couples checkout flow
   - Two document sets generation

2. **Shared Access**
   - Invite partner to shared account
   - Both users see same dashboard
   - Permission management

3. **Bundle Packages**
   - Complete Estate Plan bundle
   - Bundle pricing logic
   - Package comparison UI

### Success Criteria
- [ ] Couples pricing works correctly
- [ ] Both partners can access documents
- [ ] Mirror wills/trusts generate for couples
- [ ] Bundle pricing displays and works

### Deliverables
- [ ] Couples feature complete
- [ ] Shared account access
- [ ] Bundle packages available

---

## Phase 7: Compliance & Legal

**Focus:** UPL protection, state-specific requirements
**Requirements:** COMP-01 through COMP-05

### Plans

1. **UPL Compliance**
   - Disclaimer components
   - "Not legal advice" banners
   - Terms of service updates

2. **State-Specific Content**
   - Witnessing instructions per state
   - Notarization requirements
   - Execution checklist generation

3. **Legal Pages**
   - Updated privacy policy
   - Terms of service
   - Disclaimer page

### Success Criteria
- [ ] UPL disclaimers on all flows
- [ ] State-specific instructions accurate
- [ ] Legal pages complete and accessible

### Deliverables
- [ ] Compliance infrastructure
- [ ] State instruction database
- [ ] Legal pages updated

---

## Phase 8: CRM Integration & Launch

**Focus:** Go High Level integration, final testing, launch
**Requirements:** CRM-01 through CRM-04

### Plans

1. **Go High Level Integration**
   - Contact form to GHL
   - Purchase notifications
   - Lead tagging by product

2. **Abandoned Cart Recovery**
   - Track incomplete checkouts
   - Send to GHL as leads
   - Recovery email setup

3. **Launch Preparation**
   - End-to-end testing
   - Performance optimization
   - Production deployment

### Success Criteria
- [ ] Contact form goes to GHL
- [ ] Purchases create/update contacts
- [ ] Abandoned carts captured
- [ ] All flows tested end-to-end
- [ ] Production deployment complete

### Deliverables
- [ ] GHL integration complete
- [ ] Abandoned cart recovery
- [ ] Production-ready platform

---

## Phase Dependencies

```
Phase 1 (Auth) ──────────────┐
                             │
Phase 2 (Payments) ←─────────┤
        │                    │
        └───→ Phase 3 (Wizard) ←────────────┤
                    │                       │
                    └───→ Phase 4 (PDF) ←───┤
                              │             │
                              └───→ Phase 5 (Subscriptions)
                                      │
                    ┌─────────────────┘
                    │
Phase 6 (Couples) ←─┤
                    │
Phase 7 (Compliance)│
                    │
Phase 8 (CRM/Launch)
```

**Critical Path:** Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5 → Phase 8

**Parallel Work:**
- Phase 6 (Couples) can start after Phase 2
- Phase 7 (Compliance) can run alongside other phases

---

## Requirement Traceability

| Phase | Requirements Covered |
|-------|---------------------|
| 1 | AUTH-01 through AUTH-06 |
| 2 | PAY-01 through PAY-05, PRICE-01 through PRICE-06 |
| 3 | WIZ-01 through WIZ-06, DOC-01 through DOC-06 |
| 4 | PDF-01 through PDF-05 |
| 5 | SUB-01 through SUB-06 |
| 6 | COUP-01 through COUP-04 |
| 7 | COMP-01 through COMP-05 |
| 8 | CRM-01 through CRM-04 |

**Coverage:** 44/44 must-have requirements mapped (100%)

---

## Risk Mitigation

| Phase | Top Risk | Mitigation |
|-------|----------|------------|
| 1 | Supabase RLS complexity | Test policies thoroughly, use Supabase dashboard |
| 2 | Stripe webhook failures | Implement retry logic, logging |
| 3 | State variation complexity | Build state config early, test all states |
| 4 | PDF generation errors | Template testing per state, error handling |
| 5 | Subscription edge cases | Test trial expiry, failed payments |
| 6 | Couples data sharing | Clear permission model, test access |
| 7 | UPL compliance gaps | Legal review before launch |
| 8 | GHL API complexity | Sandbox testing, error handling |

---

## Success Metrics

**Launch Criteria:**
- All must-have requirements (44) complete
- End-to-end purchase flow working
- PDF generation for all 4 documents
- Subscription model active
- GHL integration working
- Compliance review passed

**Post-Launch Targets (30 days):**
- 100+ completed purchases
- < 5% support tickets per order
- > 80% wizard completion rate
- Zero UPL compliance issues

---

*Roadmap derived from REQUIREMENTS.md and research synthesis.*
