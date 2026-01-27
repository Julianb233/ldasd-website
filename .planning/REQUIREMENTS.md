# Requirements: LDASD Estate Planning Platform

**Version:** 1.0
**Date:** 2026-01-27
**Status:** Draft - Pending Validation

---

## MVP Scope (Milestone 1)

### Must Have (M)

**Authentication & User Accounts**
- [AUTH-01] User registration with email/password (Supabase Auth)
- [AUTH-02] Email verification flow
- [AUTH-03] Password reset flow
- [AUTH-04] User login with session persistence
- [AUTH-05] User dashboard showing purchased documents
- [AUTH-06] Secure logout from any page

**Document Products**
- [DOC-01] Last Will & Testament product page and wizard
- [DOC-02] Living Trust product page and wizard
- [DOC-03] Power of Attorney product page and wizard
- [DOC-04] Healthcare Directive product page and wizard
- [DOC-05] State-specific templates for all 50 states
- [DOC-06] State selection in wizard with validation

**Pricing & Packages**
- [PRICE-01] Individual pricing: Will $199, Trust $499
- [PRICE-02] Couples pricing: Will $299, Trust $599
- [PRICE-03] POA and Healthcare Directive pricing ($99-149 each)
- [PRICE-04] Complete Estate Plan bundle pricing
- [PRICE-05] Pricing toggle (individual/couples) on product pages
- [PRICE-06] Dynamic cart with package combinations

**Payment Processing (Stripe)**
- [PAY-01] Stripe Checkout integration for one-time purchases
- [PAY-02] Order creation in database on successful payment
- [PAY-03] Payment confirmation page
- [PAY-04] Email receipt on purchase (Resend)
- [PAY-05] Secure webhook handling for payment events

**Document Wizard**
- [WIZ-01] Guided questionnaire flow for each document type
- [WIZ-02] Progress indicator showing completion percentage
- [WIZ-03] Auto-save on every field change
- [WIZ-04] Resume from where user left off
- [WIZ-05] Plain language explanations for legal terms
- [WIZ-06] State-specific questions based on selection

**PDF Generation & Delivery**
- [PDF-01] Generate legally-formatted PDF from wizard data
- [PDF-02] State-specific document formatting
- [PDF-03] Download from user dashboard
- [PDF-04] Email delivery of documents (Resend)
- [PDF-05] Execution instructions page per state

**Membership & Subscriptions**
- [SUB-01] 30-day free update period after purchase
- [SUB-02] Will Plan membership: $19/year after trial
- [SUB-03] Trust Plan membership: $39/year after trial
- [SUB-04] Stripe subscription creation
- [SUB-05] Membership status display in dashboard
- [SUB-06] Subscription renewal via Stripe

**Couples Features**
- [COUP-01] Couples package option at checkout
- [COUP-02] Two sets of documents for couples
- [COUP-03] Shared account access for couples
- [COUP-04] Mirror will/trust generation

**Compliance & Legal**
- [COMP-01] UPL disclaimer on all document flows
- [COMP-02] "Not legal advice" banner throughout
- [COMP-03] State-specific witnessing instructions
- [COMP-04] Notarization requirements display
- [COMP-05] Clear terms of service and privacy policy

**CRM Integration (Go High Level)**
- [CRM-01] Contact form submissions to GHL
- [CRM-02] Lead capture from incomplete checkouts
- [CRM-03] Customer tagging by product purchased
- [CRM-04] Purchase confirmation to CRM

### Should Have (S)

**User Experience**
- [S-01] "Find Your Plan" interactive quiz
- [S-02] Trust funding checklist and guidance
- [S-03] Document comparison tool
- [S-04] FAQ tooltips throughout wizard
- [S-05] Mobile-optimized wizard experience

**Attorney Support**
- [S-06] Attorney consultation add-on ($299)
- [S-07] Attorney booking/scheduling flow
- [S-08] State-specific attorney matching

**Enhanced Documents**
- [S-09] HIPAA Authorization document
- [S-10] Guardianship designation (included with Will)
- [S-11] Document versioning history
- [S-12] Side-by-side version comparison

**Trust Indicators**
- [S-13] Customer review integration (Trustpilot or similar)
- [S-14] Press/media logos section
- [S-15] Statistics display (families served, rating)
- [S-16] Money-back guarantee badge

**Analytics**
- [S-17] Conversion tracking (checkout funnel)
- [S-18] Document completion rate tracking
- [S-19] A/B testing infrastructure

### Could Have (C)

- [C-01] Multiple beneficiary management interface
- [C-02] Asset inventory tracker
- [C-03] Document sharing with executor
- [C-04] SMS notifications for important events
- [C-05] Physical document mailing option
- [C-06] Estate planning educational blog integration
- [C-07] Referral program
- [C-08] Gift certificates for estate planning

### Won't Have (W) - This Version

- [W-01] Deed transfer services
- [W-02] Tax planning or optimization
- [W-03] Special needs trusts
- [W-04] Business succession planning
- [W-05] International estate planning
- [W-06] Mobile app (native iOS/Android)
- [W-07] AI legal advice or recommendations
- [W-08] Full attorney marketplace
- [W-09] Probate filing assistance

---

## Technical Requirements

### Performance
- Page load time: < 3 seconds (LCP)
- PDF generation: < 10 seconds
- Wizard auto-save: < 500ms
- Checkout completion: < 30 seconds

### Security
- HTTPS enforced (TLS 1.3+)
- API keys in environment variables only
- Supabase RLS on all document tables
- PII encryption at rest
- No sensitive data in logs

### Compliance
- UPL disclaimers on all flows
- State-specific document templates
- Clear "not legal advice" messaging
- 5-year document retention capability
- GDPR/CCPA consent mechanisms

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader compatible
- Minimum 16px font size
- Sufficient color contrast

---

## Acceptance Criteria

### User Accounts
- [ ] User can register, verify email, and log in
- [ ] User can reset forgotten password
- [ ] Dashboard shows all purchased documents
- [ ] User can download any purchased document

### Payments
- [ ] User can purchase document package via Stripe
- [ ] Order created in database on payment
- [ ] User receives email receipt
- [ ] Couples pricing works correctly

### Document Wizard
- [ ] User can complete wizard for all 4 document types
- [ ] Progress saves automatically
- [ ] User can resume from any device
- [ ] State-specific questions appear correctly

### PDF Generation
- [ ] PDF generates with correct state-specific content
- [ ] Execution instructions included
- [ ] PDF downloads from dashboard
- [ ] Email delivery works

### Subscriptions
- [ ] 30-day free trial starts on purchase
- [ ] Subscription charges after trial
- [ ] User can update documents during subscription
- [ ] Renewal handled automatically

### CRM
- [ ] Contact form goes to GHL
- [ ] Abandoned checkouts captured as leads
- [ ] Purchases tagged in CRM

---

## Dependencies

| Requirement | Depends On |
|-------------|------------|
| WIZ-* | AUTH-01 (user must be logged in) |
| PDF-* | WIZ-* (wizard must be complete) |
| SUB-* | PAY-* (initial purchase required) |
| COUP-* | PRICE-02 (couples pricing defined) |
| CRM-* | PAY-05 (webhooks working) |

---

## Traceability

*To be updated by roadmap - maps requirements to phases*

---

*Requirements derived from PROJECT.md and research synthesis.*
