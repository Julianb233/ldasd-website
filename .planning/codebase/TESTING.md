# Testing

## Framework

### Current Status
- **No testing framework installed** in package.json
- No test runner dependencies (`jest`, `vitest`, `playwright`, etc.)
- No test configuration files (`.eslintrc`, `.prettierrc`, `jest.config.js`, etc.)

### Testing Stack
- None currently implemented
- Codebase is production-ready but untested

---

## Test Structure

### Project Layout
```
/opt/agency-workspace/ldasd-website/
├── components/          (Reusable components - need unit tests)
├── app/                 (Pages and routes - need integration tests)
├── lib/                 (Utilities and helpers - need unit tests)
├── app/api/            (API routes - need endpoint tests)
└── (no __tests__ or .test.ts files currently)
```

### Recommended Structure (Not Yet Implemented)
```
components/
├── Header.tsx
├── Header.test.tsx         ← Unit test
├── Footer.tsx
└── Footer.test.tsx         ← Unit test

lib/
├── schema.ts
├── schema.test.ts          ← Unit test
└── content-data.ts

app/api/
├── contact/
│   ├── route.ts
│   └── route.test.ts       ← Integration test
└── book/
    ├── route.ts
    └── route.test.ts       ← Integration test
```

---

## Coverage

### Components (Untested)
- **Header.tsx**: Navigation, mobile menu toggle, submenu interactions
- **Footer.tsx**: Footer layout and links (not yet examined)
- **HeroCarousel.tsx**: Image carousel, auto-rotation (6s interval), manual navigation
- **SchemaMarkup.tsx**: Schema generation and rendering
- **WhoWeServeCarousel.tsx**: Carousel functionality (not yet examined)

### Pages (Untested)
- **Home page** (`/app/page.tsx`): Hero section, statistics, product cards, testimonials
- **Product pages**: Individual product detail pages
- **Pricing page**: Pricing comparison tables
- **Contact page**: Contact form
- **Book/booking page**: Booking form with pricing calculation
- **Learn/FAQ page**: FAQ content display
- **Learn/Guides page**: Guide content display
- **About page**: About company information
- **Legal pages**: Privacy and Terms pages

### API Routes (Untested)
- **POST /api/contact**: Form validation, email format check, success/error responses
- **POST /api/book**: Form validation, product pricing lookup, spouse surcharge calculation

### Utilities (Untested)
- **Schema generation** (`lib/schema.ts`):
  - `generateOrganizationSchema()`
  - `generateServiceSchema()`
  - `generateFAQSchema()`
  - `generateReviewSchema()`
  - `generateAggregateRatingSchema()`
  - `generateBreadcrumbSchema()`
  - `generateHowToSchema()`
  - `generateWebsiteSchema()`
  - `getSchemasForPage()`

- **Styling utilities** (`lib/templates/styles.ts`):
  - PDF document stylesheets
  - `formatDate()` helper
  - `getOrdinal()` helper

- **Content data** (`lib/content-data.ts`): Data structure validation

### Third-Party Integrations (Untested)
- Stripe integration (no tests)
- Supabase authentication (no tests)
- Resend email service (no tests)
- React PDF rendering (no tests)

---

## Running Tests

### Current Commands
```bash
npm run dev       # Start development server
npm run build    # Build for production
npm run start    # Start production server
npm lint         # Run ESLint (no custom rules configured)
```

### Missing Test Commands
The following scripts should be added to `package.json`:
```json
{
  "test": "jest --watch",
  "test:ci": "jest --coverage",
  "test:e2e": "playwright test",
  "test:coverage": "jest --coverage"
}
```

### Manual Testing Currently Required
- **Browser testing**: Manual navigation through pages and interactions
- **Form validation**: Manual submission of contact and booking forms
- **Responsive design**: Manual testing across device sizes
- **PDF generation**: Manual PDF download and verification
- **API endpoints**: Manual testing with curl or Postman

---

## Gaps

### Critical Testing Gaps
1. **No unit tests** for any components or utilities
2. **No integration tests** for API routes
3. **No end-to-end tests** for user workflows
4. **No accessibility testing** (a11y)
5. **No performance testing** (Lighthouse, Web Vitals)
6. **No visual regression testing**

### Specific Missing Tests

#### Component Tests
- [ ] Header navigation rendering and interactions
- [ ] Mobile menu toggle functionality
- [ ] Submenu hover state management
- [ ] HeroCarousel auto-rotation and manual navigation
- [ ] Image lazy loading and optimization
- [ ] Responsive behavior (breakpoints)

#### Page Tests
- [ ] Home page layout and sections
- [ ] Product card rendering and links
- [ ] Testimonial display
- [ ] Form field rendering
- [ ] Content data injection

#### API Tests
- [ ] Contact form validation edge cases:
  - Missing fields
  - Invalid email formats
  - Special characters handling
  - SQL injection prevention
- [ ] Book form calculations:
  - Price lookups for different products
  - Spouse surcharge addition
  - State validation
- [ ] Error handling and status codes
- [ ] Response format consistency
- [ ] Logging verification

#### Utility Tests
- [ ] Schema generation for all schema types
- [ ] Breadcrumb path generation for various routes
- [ ] Date formatting for different input types
- [ ] Ordinal number generation (1st, 2nd, 3rd, etc.)

#### Integration Tests
- [ ] Form submission → API → Response → UI update
- [ ] PDF generation from booking data
- [ ] Email sending via Resend
- [ ] Payment processing via Stripe
- [ ] Authentication flow with Supabase

#### E2E Tests (User Workflows)
- [ ] User journey: Home → Browse Products → Book
- [ ] User journey: Contact Form → Submission → Confirmation
- [ ] User journey: Pricing page → Product selection → Booking
- [ ] Mobile user flow (responsive design)

### Infrastructure Gaps
- [ ] No test coverage reporting
- [ ] No continuous integration (CI) for tests
- [ ] No pre-commit hooks for running tests
- [ ] No test environment setup (fixtures, mocks, factories)
- [ ] No testing documentation for developers

### Mock/Stub Gaps
- [ ] No Stripe mock for payment testing
- [ ] No Supabase mock for auth testing
- [ ] No Next.js Image component mocking
- [ ] No API endpoint mocking

### Documentation Gaps
- [ ] No testing guide for contributors
- [ ] No test naming conventions documented
- [ ] No test data factories or fixtures documented
- [ ] No instructions for running tests locally vs CI

---

## Recommended Implementation Plan

### Phase 1: Setup (Priority: High)
1. Install testing framework: `jest` or `vitest`
2. Install testing libraries: `@testing-library/react`, `@testing-library/jest-dom`
3. Configure `jest.config.js` or `vitest.config.ts`
4. Set up `.prettierrc` for code formatting consistency
5. Add npm scripts for `test`, `test:ci`, `test:coverage`

### Phase 2: Critical Tests (Priority: High)
1. API route validation tests (contact, book endpoints)
2. Component snapshot tests
3. Form validation tests
4. Utility function tests (schema, date formatting)

### Phase 3: Coverage (Priority: Medium)
1. Component behavior tests (state, interactions)
2. Integration tests for common workflows
3. Accessibility tests using `jest-axe`
4. E2E tests for user journeys

### Phase 4: Quality (Priority: Low)
1. Visual regression testing (Percy, Chromatic)
2. Performance testing (LightHouse CI)
3. Mutation testing for test quality
4. Load testing for APIs

---

## Notes

### Current Strengths
- Clean, testable component structure
- Separation of concerns (components, utilities, data)
- Type safety via TypeScript reduces certain test needs
- Simple state management (no Redux/Zustand complexity)
- Well-organized file structure

### Risks Without Testing
- Breaking changes to components not caught
- API validation failures in production
- Responsive design regressions
- Content/data structure mismatches
- Third-party integration failures

### Testing Priority Based on Risk
1. **API routes** (direct user impact, financial transactions)
2. **Schema generation** (SEO impact)
3. **Form validation** (data quality)
4. **Component interactions** (user experience)
5. **Utility functions** (cascading effects)

