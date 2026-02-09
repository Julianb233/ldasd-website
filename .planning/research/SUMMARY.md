# Research Summary: LDASD Estate Planning Platform

**Synthesis Date:** 2026-01-27
**Research Documents:** STACK.md, FEATURES.md, ARCHITECTURE.md, PITFALLS.md

---

## Key Strategic Insights

### 1. Technology Stack Decision

**Recommendation:** Current stack is excellent - Next.js 14 + Supabase + Stripe + Resend

| Component | Choice | Rationale |
|-----------|--------|-----------|
| Framework | Next.js 14 (App Router) | Industry standard for SaaS, already in use |
| Auth + DB | Supabase | Already installed, PostgreSQL + Auth + RLS built-in |
| Payments | Stripe | Already installed, handles one-time + subscriptions |
| Email | Resend | Already installed, transactional emails |
| PDF Generation | React-PDF | Already have templates, fast, lightweight |
| CRM | Go High Level | Client requirement, webhook integration |

### 2. Feature Prioritization

**Table Stakes (Must Have):**
- Core document suite (Will, Trust, POA, Healthcare Directive, HIPAA)
- Guided questionnaire flow with save/resume
- All 50 states with state-specific templates
- Couples pricing (individual AND couples)
- Secure document storage (AES-256)
- Membership for updates ($19-39/year)

**Differentiators:**
- Attorney support add-on ($299)
- Interactive "Find Your Plan" quiz
- Trust funding guidance and checklists
- Clear execution instructions per state

**Anti-Features (Do NOT Build):**
- Tax planning/optimization (legal risk)
- Special needs trusts (requires attorney)
- International estate planning
- Deed transfers (out of scope)
- AI legal advice (UPL risk)

### 3. Architecture Pattern

**Recommended Flow:**
```
User → Quiz → Product Selection → Checkout (Stripe)
                                      ↓
                              Order Created (Supabase)
                                      ↓
                              Guided Questionnaire
                                      ↓
                              Document Generation (React-PDF)
                                      ↓
                              Delivery (Download + Email)
                                      ↓
                              Dashboard (View/Update/Print)
```

**Key Architectural Decisions:**
1. Supabase RLS for document-level security
2. Stripe Checkout for payment (not custom forms)
3. React-PDF for server-side document generation
4. JSONB storage for document data (flexible schema)
5. Webhook-driven subscription management

### 4. Critical Compliance Requirements

**Unauthorized Practice of Law (UPL) Prevention:**
- Clear disclaimers: "legal information, not legal advice"
- Don't limit options based on user characteristics
- Provide information, not personalized recommendations
- Attorney review option for complex situations

**State-Specific Requirements:**
- 50 different template sets required
- Witness requirements vary (1-3 witnesses)
- Notarization varies (required in some states)
- Community property (9 states) vs. common law
- Electronic will laws vary (only ~20 states)

**Document Validity:**
- State-specific execution instructions critical
- Unfunded trusts = platform failure (70% fail rate)
- Witness/notary integration essential

### 5. Top Risks to Mitigate

| Risk | Severity | Mitigation |
|------|----------|------------|
| UPL violations | Critical | Clear disclaimers, attorney review option, no personalized advice |
| Invalid documents | Critical | State-specific templates, attorney review, thorough testing |
| Unfunded trusts | High | Clear funding guidance, checklists, follow-up reminders |
| Cart abandonment | High | Save/resume, progress indicators, clear pricing |
| Security breach | High | SOC 2 compliance, encryption, RLS policies |

---

## Recommended Build Phases

Based on architecture research, suggested build order:

| Phase | Focus | Deliverable |
|-------|-------|-------------|
| 1. Auth & Database | Supabase setup, user accounts | User registration, login, dashboard shell |
| 2. Payments | Stripe integration | Checkout flow, order creation |
| 3. Document Wizard | Questionnaire system | Guided document creation with save/resume |
| 4. PDF Generation | Connect templates | Document download and email delivery |
| 5. Subscriptions | Membership model | Annual updates, renewal management |
| 6. Couples & Extras | Couples pricing, attorney add-on | Full product lineup |
| 7. CRM Integration | Go High Level | Lead capture, customer tagging |
| 8. Polish & Launch | Testing, compliance review | Production-ready platform |

**Critical Path:** Auth → Payments → Wizard → PDF → Subscriptions → Launch

---

## Cost Considerations

| Service | Est. Monthly Cost |
|---------|-------------------|
| Supabase Pro | $25 |
| Stripe (2.9% + 30¢/transaction) | Variable |
| Resend | $20 |
| Vercel Pro | $20 |
| **Total (excluding Stripe fees)** | ~$65/mo |

---

## Success Criteria

**Technical:**
- < 3s page load time
- < 10s PDF generation
- 99.9% uptime
- Zero PII exposure

**Business:**
- Checkout conversion > 3%
- Document completion > 80%
- Support tickets < 5% of orders

**Compliance:**
- Clear UPL disclaimers on every flow
- State-specific templates for all 50 states
- Attorney review option available
- SOC 2 compliance (future milestone)

---

*Research synthesized from 4 parallel research agents. Detailed documents in `.planning/research/`*
