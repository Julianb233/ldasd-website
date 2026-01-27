# Codebase Concerns

## Technical Debt

| Location | Issue | Severity |
|----------|-------|----------|
| `/app/api/contact/route.ts:25-26` | TODO: Go High Level integration not implemented - currently logging to console only | High |
| `/app/api/book/route.ts:34-35` | TODO: Go High Level integration not implemented - currently logging to console only | High |
| `/lib/content-data.ts` | Hardcoded contact info with placeholder data doesn't match footer contact info (inconsistency between content-data.ts and Footer.tsx) | Medium |
| `/app/page.tsx` | Price data hardcoded in multiple locations (page.tsx, book/page.tsx, api routes) - not centralized, prone to inconsistency | Medium |
| `/lib/schema.ts` | No error handling for schema generation; relies on external contactInfo data without validation | Medium |
| `/components/HeroCarousel.tsx:35-41` | Carousel auto-advances every 6 seconds but lacks keyboard navigation or accessibility controls for users who prefer manual navigation | Medium |
| Codebase-wide | No centralized error logging or monitoring - errors logged to console only, invisible in production | Medium |
| `/components/Header.tsx` | Desktop submenu relies on mouse events only (onMouseEnter/Leave) - lacks keyboard navigation support | Low |
| `/app/layout.tsx` | Global error handling not configured; no custom error boundary | Low |

## Security

| Category | Issue | Severity | Details |
|----------|-------|----------|---------|
| **Data Exposure** | Contact information displayed in multiple locations with slight variations | Medium | Phone and email hardcoded in Footer.tsx differ from content-data.ts values (858-750-6206 vs placeholder) |
| **API Validation** | Basic email regex validation in API routes | Low | Pattern `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` is simplistic; doesn't prevent valid but malicious inputs or RFC compliance issues |
| **Error Messages** | Generic error messages in API responses | Low | Could leak information via detailed error logs sent to console in production |
| **State Data** | All 50 US states hardcoded in form | Low | Inflates bundle size; consider loading dynamically if expanded to other territories |
| **Form Data** | No rate limiting on form submission endpoints | Medium | `/api/contact` and `/api/book` endpoints lack protection against abuse/spam |
| **Sensitive Info** | Placeholder but visible in source | Low | Service email `sean@ldasd.com` exposed in Footer component |
| **CSRF Protection** | No explicit CSRF token validation visible | Medium | POST endpoints rely on same-site cookies; should verify explicit protection |

## Performance

| Issue | Severity | Details |
|-------|----------|---------|
| Images unoptimized in Next.js config | Low | `next.config.mjs` sets `images: { unoptimized: true }` - disables Next.js Image optimization for Cloudflare Pages compatibility, but reduces performance |
| Carousel auto-advances continuously | Low | 6-second interval with no prefetch - image transitions may cause layout shift; no preloading of next image |
| Large dependency bundle unused | Low | `@stripe/stripe-js` and `@supabase/*` in package.json but no usage detected in codebase; adds ~100KB+ to bundle |
| Schema generation on every page load | Low | `getSchemasForPage()` called for every page render without memoization; breadcrumb generation has inefficient string concatenation |
| No client-side caching for form data | Low | Form submissions reset on page load; no localStorage persistence of draft data |
| Stats hardcoded in multiple locations | Low | Same stats (families protected, rating, etc.) duplicated in `content-data.ts`, `HeroCarousel.tsx`, and `page.tsx` |

## Accessibility (a11y)

| Location | Issue | Severity | Details |
|----------|-------|----------|---------|
| `/components/HeroCarousel.tsx` | Carousel lacks ARIA labels and proper focus management | Medium | Indicator buttons have `aria-label` but images lack `aria-label` attribute for screen readers |
| `/components/Header.tsx:47-57` | Mobile menu toggle missing ARIA attributes | Medium | Button lacks `aria-expanded` and `aria-controls` attributes for screen reader users |
| `/components/Header.tsx:79-93` | Desktop submenu not keyboard accessible | Medium | Dropdown menu only activates on mouse events; keyboard users cannot access submenu items |
| `/app/contact/page.tsx` | Form select for subject missing proper labeling | Low | Select element uses generic `<option>` without `aria-label` for context |
| `/app/book/page.tsx:282-314` | Radio button groups lack proper `fieldset` and `legend` | Low | Product selection radio buttons not semantically grouped |
| All form components | Success/error messages not announced to screen readers | Low | Toast notifications use `react-hot-toast` but no ARIA live region specified |
| `/app/page.tsx:191-198` | Check mark list lacks semantic structure | Low | Uses DIV and SVG instead of proper list markup for screen reader users |
| Color contrast | Potential contrast issues with light text on colored backgrounds | Low | Some elements use `text-white/70` on colored backgrounds that may not meet WCAG AA standards |

## Missing Features & Incomplete Implementation

| Feature | Status | Details |
|---------|--------|---------|
| **Go High Level CRM Integration** | Stubbed (TODO) | Both contact and booking forms log to console instead of sending to CRM system. Full integration required for production. |
| **Payment Processing** | Not Implemented | Stripe library imported but no payment flow visible. Estate plans require pricing but no checkout. |
| **Admin Dashboard** | Not Implemented | No way to view/manage submitted form data; currently only console.log() |
| **Email Notifications** | Not Implemented | No email confirmations to users or admins after form submission |
| **Document Generation** | Not Implemented | Templates exist (`/lib/templates/`) but generation/download logic not visible |
| **Search Functionality** | Not Implemented | Website schema includes search action but no search page exists (`/search`) |
| **User Accounts** | Not Implemented | Supabase auth imported but not used; no account creation or login flow |
| **Database** | Not Implemented | Supabase client imported but no database integration visible |
| **Phone Number Validation** | Not Implemented | Phone field accepts any input; no format validation (e.g., US phone format) |
| **State-Specific Document Customization** | Missing | Products claim customization by state but no state-specific logic visible |

## Documentation Gaps

| Area | Impact | Details |
|------|--------|---------|
| **API Routes** | Medium | No documentation of form submission endpoints - what they expect, what they return, how errors are handled |
| **Schema.ts Functions** | Medium | Complex schema generation functions lack JSDoc comments; unclear which schemas apply to which pages |
| **Component Props** | Low | Reusable components (HeroCarousel, SchemaMarkup) lack TypeScript documentation/comments |
| **Environment Variables** | Medium | README mentions .env.local but no example .env.example file provided |
| **Content Data** | Medium | Central content-data.ts file has inconsistent data; unclear which values are source of truth |
| **Deployment** | Low | Cloudflare Pages configuration exists but deployment process not documented |
| **Error Handling** | High | No guide for handling API errors or implementing retry logic |
| **Testing** | High | No test files visible; no testing strategy documented |

## Data Consistency Issues

| Issue | Severity | Details |
|-------|----------|---------|
| Contact information mismatch | Medium | Two versions of contact info exist: `content-data.ts` (placeholder with 800 number) vs actual `Footer.tsx` (858 number, sean@) |
| Price information scattered | Medium | Prices defined in: `book/page.tsx` (hardcoded), `app/api/book/route.ts` (hardcoded), `content-data.ts` (different values) |
| Stats duplicated | Low | Family count, rating, and starting price appear in `content-data.ts`, `HeroCarousel.tsx`, and `page.tsx` |
| Product list inconsistent | Low | Products list differs slightly between `page.tsx` and `book/page.tsx` descriptions |

## Recommendations - Priority Fixes

### High Priority
1. **Implement Go High Level Integration** - Contact and booking forms are non-functional for lead capture
2. **Centralize all pricing and contact data** - Create single source of truth; export from content-data.ts
3. **Implement form submission validation** - Add server-side validation, rate limiting, and proper error handling
4. **Remove unused dependencies** - Strip Stripe, Supabase, and react-pdf if not implemented
5. **Add basic error logging** - Implement proper logging service (Sentry, LogRocket, etc.) instead of console.log

### Medium Priority
6. **Implement proper accessibility** - Add keyboard navigation, ARIA labels, and screen reader support
7. **Add missing integrations** - Payment processing, email notifications, database persistence
8. **Improve form UX** - Phone number validation, draft auto-save, better error messages
9. **Document API routes** - Add JSDoc and OpenAPI/Swagger documentation
10. **Add error boundaries** - Implement React error boundary and global error handling

### Low Priority
11. **Optimize images** - Re-enable Next.js image optimization where possible
12. **Add client-side caching** - Persist form drafts and form state
13. **Create component documentation** - Add Storybook or similar for component library
14. **Add analytics** - Implement tracking for form submissions and page views
15. **Optimize schema generation** - Add memoization and reduce string concatenation

## Blockers for Production

- Go High Level CRM integration incomplete (forms won't capture leads)
- No payment/checkout flow (products can't be purchased)
- Form data not persisted anywhere (no database integration)
- No email notifications (users won't receive confirmations)
- Missing keyboard navigation and a11y features (fails accessibility audit)
- Inconsistent data across codebase (confusing for maintenance)
