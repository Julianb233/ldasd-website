# Features Research: Estate Planning SaaS Platform

## Executive Summary

Research conducted on leading estate planning platforms (Trust & Will, LegalZoom, FreeWill, Willing, Tomorrow) to identify table stakes features, differentiators, anti-features, user journeys, and compliance requirements for building a self-service estate planning platform serving families across all 50 US states.

---

## Table Stakes (Must Have)

These are features users expect as baseline. Missing any will cause abandonment.

### Core Document Suite
| Document | Purpose | Required |
|----------|---------|----------|
| Last Will & Testament | Asset distribution, guardian designation | Yes |
| Revocable Living Trust | Probate avoidance, asset protection | Yes |
| Financial Power of Attorney | Financial decision-making authority | Yes |
| Healthcare Power of Attorney | Medical decision-making authority | Yes |
| Living Will / Advance Directive | End-of-life care preferences | Yes |
| HIPAA Authorization | Medical record access for designated persons | Yes |

### Platform Fundamentals
- **Guided Questionnaire Flow**: Simple Q&A format walking users through decisions step-by-step
- **State-Specific Documents**: All documents must be tailored to state requirements (all 50 states + DC)
- **Plain Language Explanations**: Each question explains what decision is being made and why it matters
- **Document Generation**: Generate legally-valid PDFs ready for signing
- **Execution Instructions**: Clear, state-specific instructions for signing, witnessing, and notarization
- **Individual AND Couple Plans**: Support single users and couples with joint/mirror documents
- **Mobile-Responsive Design**: Many users complete on mobile devices
- **Secure Document Storage**: Bank-level encryption (AES-256), SOC 2 compliance
- **Unlimited Revisions**: During subscription period (industry standard)
- **Print AND Digital Delivery**: Options for self-printing or mailed documents

### Pricing Expectations (Market Standard)
| Plan Type | Individual | Couples |
|-----------|------------|---------|
| Basic Will | $99-199 | $199-299 |
| Trust Plan | $399-499 | $499-599 |
| Annual Updates | $19-39/year | $19-39/year |

---

## Differentiators

Features that set successful platforms apart from competitors.

### Trust & Will Differentiators
1. **EstateOS Platform**: AI-powered platform that transforms static documents into dynamic, evolving plans
2. **Life Event Intelligence**: Proactive alerts when life changes suggest plan updates needed
3. **Financial Advisor Integration**: Real-time visibility for advisors into client estate plans (20,000+ advisors)
4. **Estate-Planning-Only Focus**: Pure focus vs. LegalZoom's general legal services
5. **Enterprise Partnerships**: B2B2C channel through banks, employers, financial institutions (200+ partners including AARP, USAA, UBS)

### LegalZoom Differentiators
1. **Executor Guide**: Helps named executor manage estate and navigate probate
2. **Bill of Transfer**: Document for moving personal property into revocable trust
3. **Attorney Network at Scale**: Attorneys available in all 50 states
4. **Bundled Ongoing Legal Access**: $16.59/month for unlimited 30-minute attorney consultations
5. **Brand Trust**: Established reputation, 2.1 million+ estate plans created

### FreeWill Differentiators
1. **Free Basic Will**: No-cost will creation funded by nonprofit partnerships
2. **Nonprofit Integration**: 2,300+ nonprofit partners, drives charitable giving
3. **Planned Giving Suite**: Specialized tools for legacy giving to charities
4. **Smart Giving Tools**: DAF grants, stock gifts, QCDs, crypto giving
5. **B2B2C Model**: Nonprofits white-label the tool for their supporters

### Emerging Differentiators to Consider
1. **AI-Powered Summaries**: Natural language explanations of complex documents
2. **Document Ingestion**: Upload existing plans for analysis and migration
3. **Beneficiary Portal**: Real-time access for executors and beneficiaries
4. **Multi-State Property Support**: Special handling for assets in multiple states
5. **Digital Asset Planning**: Cryptocurrency, NFTs, online accounts, passwords
6. **Visualization Tools**: Interactive diagrams showing trust structure and asset flow
7. **Post-Death Workflow**: Guidance for executors after death occurs
8. **Attorney Marketplace**: On-demand attorney review and consultation

---

## Anti-Features (Do NOT Build)

Features that add complexity, legal risk, or low value. Avoid these.

### High Legal Risk
| Anti-Feature | Why Avoid |
|--------------|-----------|
| Tax Planning/Optimization | Constitutes legal/financial advice; requires licensed professionals |
| Asset Protection Trusts | Complex state-specific requirements; high malpractice exposure |
| Special Needs Trusts | Requires attorney; can jeopardize beneficiary's public benefits |
| Irrevocable Trusts | Complex tax implications; typically require attorney drafting |
| Business Succession Planning | Entity-specific; requires business law expertise |
| International Estate Planning | Cross-border tax treaties; requires specialized knowledge |
| Contested Will Guidance | Litigation-adjacent; unauthorized practice of law concerns |

### Low Value / High Complexity
| Anti-Feature | Why Avoid |
|--------------|-----------|
| Pet Trusts | Niche use case; complex state variations; low demand |
| Funeral Pre-Planning | Separate industry with own regulations |
| Life Insurance Sales | Different regulatory regime; conflicts with planning advice |
| Probate Filing Services | Requires state-specific court filings; attorney territory |
| Real Estate Title Transfers | Deed recording is complex; county-specific; notary required |
| 401(k)/IRA Beneficiary Changes | Handled by custodians; creates liability if errors occur |
| Direct Bank Integrations | Security risk; regulatory complexity; limited user value |
| Blockchain Will Storage | Gimmick; no legal benefit; adds complexity |
| AI Legal Advice | Unauthorized practice of law; high liability |

### Scope Creep Traps
| Anti-Feature | Why Avoid |
|--------------|-----------|
| General Legal Document Creator | Dilutes estate planning focus; LegalZoom already dominates |
| Family Messaging/Communication | Social feature creep; not core value |
| Family Tree Builder | Nice-to-have but not essential; many free alternatives |
| Asset Inventory Tracking | Maintenance burden; users don't keep updated |
| Reminder Systems | Users ignore them; creates noise |
| Gamification | Estate planning is serious; gamification feels inappropriate |

---

## User Journey

### Typical Flow: Landing to Document Delivery

```
Phase 1: Discovery & Education (5-10 minutes)
├── Landing page with product explanation
├── "What do I need?" quiz based on situation
│   └── Questions: married?, kids?, assets > $X?, property in multiple states?
├── Recommendation: Will vs. Trust plan
└── Pricing transparency before account creation

Phase 2: Account & Onboarding (2-3 minutes)
├── Account creation (email, password)
├── Select Individual or Couples plan
├── Payment (or free trial start)
└── State selection (determines document templates)

Phase 3: Questionnaire - Personal Info (10-15 minutes)
├── Your information (name, DOB, address, SSN optional)
├── Spouse information (if applicable)
├── Children and dependents
│   └── Ages, special needs, guardianship preferences
└── Progress saved automatically

Phase 4: Questionnaire - Asset Distribution (15-20 minutes)
├── Primary residence
├── Other real estate
├── Financial accounts (banks, investments)
├── Personal property (vehicles, jewelry, collections)
├── Digital assets (cryptocurrency, online accounts)
├── Beneficiary designations
│   └── Primary, contingent, percentages
└── Charitable giving intentions (optional)

Phase 5: Questionnaire - Decision Makers (10-15 minutes)
├── Executor selection (primary + backup)
├── Financial Power of Attorney agent
├── Healthcare Power of Attorney agent
├── HIPAA authorization recipients
├── Trustee selection (for trust plans)
└── Guardian selection (if minor children)

Phase 6: Questionnaire - Healthcare Wishes (5-10 minutes)
├── Living will preferences
│   └── Life support, pain management, organ donation
└── End-of-life care instructions

Phase 7: Review & Document Generation (10-15 minutes)
├── Summary of all selections
├── Edit capability for any section
├── Attorney review upsell (optional)
├── Generate documents (PDF)
└── Delivery options (download, print, mail)

Phase 8: Execution Guidance (User's responsibility)
├── State-specific signing instructions
├── Witness requirements explained
├── Notarization requirements explained
├── Self-proving affidavit instructions
├── Document storage recommendations
└── Trust funding checklist (for trust plans)

Phase 9: Ongoing Relationship
├── Annual check-in emails
├── Life event prompts (did you get married? have a child?)
├── Document revision capability
├── Subscription renewal
└── Attorney consultation upsell
```

### Time Expectations
| Plan Type | Questionnaire Time | Total Time to Completion |
|-----------|-------------------|-------------------------|
| Basic Will | 15-25 minutes | 30-45 minutes |
| Trust Plan | 30-45 minutes | 1-2 hours |

### Drop-off Points to Monitor
1. **Pricing page**: Sticker shock; unclear value
2. **Start of questionnaire**: Overwhelm; too many questions upfront
3. **Beneficiary section**: Decision paralysis about percentages
4. **Executor selection**: Users don't know who to choose
5. **Healthcare wishes**: Emotional difficulty; users avoid
6. **Review page**: Document length is intimidating
7. **Execution step**: Confused about notarization; abandon

---

## Legal/Compliance Requirements

### Document Validity Requirements by State

#### Will Requirements (Universal)
- **Testator Requirements**: 18+ years old, of sound mind
- **Signature**: Testator must sign (or direct someone to sign in presence)
- **Witnesses**: 2 witnesses required in all states (Louisiana requires notary too)
- **Witness Qualifications**: Adults (18+), of sound mind, disinterested (not beneficiaries)
- **Presence**: Testator and witnesses must sign in each other's presence

#### Self-Proving Affidavit
- Available in 48 states + DC (not Ohio, not DC as of 2025)
- Requires notary signature
- Eliminates need for witnesses to testify in probate court

#### Electronic Wills (eWills)
- **States with eWill laws**: ~10 states with varying requirements
- **Remote witnessing**: Permitted in ~8 states
- **Not recommended**: Cross-state validity is uncertain; stick to traditional execution
- **Exception**: May offer for states with clear eWill statutes

#### Trust Requirements
- **Signature**: Grantor/settlor must sign
- **Notarization**: Not universally required but recommended
- **Funding**: Trust must be funded (assets transferred) to be effective
- **State variations**: Some states (e.g., Connecticut) have unique transfer tax issues

#### Power of Attorney Requirements
| State Category | Witness Requirement | Notary Requirement |
|----------------|--------------------|--------------------|
| Most States | 0-2 witnesses | Yes |
| Florida | 2 witnesses | Yes |
| Pennsylvania | 2 witnesses | Yes |

### Platform Compliance Requirements

#### Data Security
- **SOC 2 Type II**: Industry standard for SaaS handling sensitive data
- **Encryption**: AES-256 for data at rest and in transit
- **Multi-Factor Authentication**: For user accounts
- **GDPR/CCPA Compliance**: If serving California or international users

#### Unauthorized Practice of Law (UPL)
- **Do NOT provide**: Legal advice, recommendations, or interpretations
- **Do provide**: Information, document templates, general education
- **Safe harbor**: "This is not legal advice. Consult an attorney for your specific situation."
- **Disclaimers**: Required on every page/document

#### E-SIGN Act / UETA Compliance
- Electronic signatures valid in 47 states + DC
- Retain records of consent to electronic transactions
- Provide option for paper documents if requested

#### State Bar Considerations
- Some state bars have issued opinions on online document services
- Maintain list of excluded scenarios that require attorney involvement
- Clear escalation path to licensed attorneys when needed

### Documents That REQUIRE Attorney Involvement
- Estates over federal exemption ($13.61M in 2024; $15M in 2026)
- Estates with state estate tax exposure (12 states + DC)
- Blended families with complex inheritance desires
- Special needs beneficiaries
- Business owners with succession needs
- Property in multiple countries
- Prior divorces with complex asset division

---

## Feature Comparison Matrix

| Feature | Trust & Will | LegalZoom | FreeWill | Our Recommendation |
|---------|--------------|-----------|----------|-------------------|
| **Basic Will** | $199 | $99 | Free | Competitive pricing |
| **Trust Plan** | $499 | $399 | N/A (CA only) | $399-449 |
| **50 State Coverage** | Yes | Yes | Yes | Required |
| **Couples Pricing** | +$100 | +$100 | Free | +$100 |
| **Attorney Review** | $299/year add-on | Included in Premium | N/A | Optional add-on |
| **HIPAA Authorization** | Included | Included | Included | Include |
| **Living Will** | Included | Included | Included | Include |
| **Financial POA** | Included | Included | Included | Include |
| **Healthcare POA** | Included | Included | Included | Include |
| **Executor Guide** | No | Yes | No | Consider adding |
| **Trust Funding Guide** | Yes | Yes (Bill of Transfer) | N/A | Essential for trust |
| **Unlimited Revisions** | 1 year, then $19-39/yr | Premium only | Yes | 1 year included |
| **Document Storage** | Yes | Yes | Yes | Include |
| **Mobile App** | No | No | No | Web-first, responsive |
| **Financial Advisor Portal** | Yes (B2B) | No | No | Phase 2 feature |
| **Nonprofit Integration** | Yes (B2B) | No | Core model | Phase 2 feature |
| **Charitable Giving Tools** | Basic | Basic | Extensive | Basic in v1 |
| **AI Features** | Document summaries | No | No | Consider for v2 |
| **Remote Notarization** | Guidance only | Guidance only | Guidance only | Guidance only |

---

## Implementation Priority Recommendations

### MVP (Phase 1)
1. Will creation flow with all 50 state templates
2. Healthcare documents (Living Will, Healthcare POA, HIPAA)
3. Financial POA
4. Guided questionnaire with progress saving
5. PDF generation and download
6. State-specific execution instructions
7. Basic account and document management

### Phase 2
1. Trust creation (Revocable Living Trust)
2. Trust funding checklist and guidance
3. Couples/joint plans
4. Attorney review marketplace integration
5. Annual subscription and revision capability

### Phase 3
1. B2B channel (financial advisors, employers)
2. Nonprofit partnerships (FreeWill-style model)
3. Enterprise white-label solution
4. Advanced analytics and life event triggers

---

## Sources

- [Trust & Will Platform](https://trustandwill.com/)
- [Trust & Will EstateOS Launch](https://www.prnewswire.com/news-releases/trust--will-unveils-estateos-the-first-intelligent-platform-for-modern-legacy-planning--and-announces-inaugural-generations-conference-302488924.html)
- [Trust & Will Attorney Platform Launch 2026](https://www.prnewswire.com/news-releases/trust--will-launches-an-attorney-platform-to-support-the-next-generation-of-estate-planning-attorneys-302658297.html)
- [LegalZoom Estate Planning](https://www.legalzoom.com/personal/estate-planning/estate-planning-bundle.html)
- [LegalZoom vs Trust & Will Comparison](https://www.legalzoom.com/articles/trust-and-will-vs-legalzoom)
- [FreeWill Platform](https://www.freewill.com/)
- [FreeWill for Nonprofits](https://www.nonprofits.freewill.com/)
- [CNBC Best Online Will Makers 2026](https://www.cnbc.com/select/best-online-will-makers/)
- [NCOA Best Online Will Makers Guide](https://www.ncoa.org/product-resources/estate-planning/best-online-will-makers/)
- [State Will Requirements - LegalZoom](https://www.legalzoom.com/articles/state-requirements-for-a-last-will)
- [eWill Legislation Guide 2024](https://www.lambergg.com/insights/2024-state-by-state-ewill-legislation-guide-electronic-will-requirements-across-all-50-states)
- [HIPAA Authorization in Estate Planning](https://www.legalzoom.com/articles/when-and-how-to-use-a-hipaa-form-in-your-estate-plan)
- [HHS HIPAA POA Guidance](https://www.hhs.gov/hipaa/for-professionals/faq/3000/does-having-health-care-power-attorney-allow-access-patients-medical-mental-health-records-under-hipaa/index.html)
- [DIY Estate Planning Risks - ABA](https://www.americanbar.org/groups/real_property_trust_estate/resources/estate-planning/diy-estate-planning/)
- [Legal Risks of DIY Platforms](https://bflawmd.com/the-legal-risks-of-diy-estate-planning-platforms/)
- [Trust Validity Across States](https://smartasset.com/estate-planning/are-trusts-valid-from-state-state)
- [Funding Revocable Trusts](https://frankkraft.com/what-can-and-what-cannot-be-used-to-fund-a-revocable-living-trust/)
- [Will Witness Requirements](https://www.freewill.com/learn/witness-requirements-who-can-witness-a-will)
- [Notarization Requirements](https://www.freewill.com/learn/does-a-will-have-to-be-notarized)
- [Estate Planning Software for Advisors 2025](https://www.rightcapital.com/blog/estate-planning-software-for-financial-advisors/)
- [Quicken WillMaker](https://store.nolo.com/products/quicken-willmaker-plus-wqp.html)

---

*Research completed: January 2026*
*Platform context: Self-service estate planning with optional attorney support, serving families across all 50 US states*
