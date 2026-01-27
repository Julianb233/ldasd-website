# Architecture

## Pattern

**Component-Based Server-Side Rendered Web Application** using Next.js 14 App Router with a hybrid rendering approach:
- Server-side rendering for pages (default)
- Client-side interactivity for forms and UI state
- Static site export for edge deployment
- Content-driven with centralized data management

This is a marketing/service website following a **Presentation Layer Architecture** with minimal backend integration (API routes are simple form handlers).

## Layer Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                        │
│  (Pages, Components, UI State - Client/Server Hybrid)        │
├─────────────────────────────────────────────────────────────┤
│  Header.tsx (client)  │  Footer.tsx  │  HeroCarousel.tsx     │
│  WhoWeServeCarousel   │  SchemaMarkup (SSR)                  │
├─────────────────────────────────────────────────────────────┤
│                    PAGE LAYER (App Router)                   │
│  20 Pages (.tsx)  │  Layout Hierarchy  │  Metadata API       │
├─────────────────────────────────────────────────────────────┤
│                   UTILITY / DATA LAYER                        │
│  lib/content-data.ts (centralized content)                   │
│  lib/schema.ts (SEO/structured data)                         │
│  lib/templates/ (PDF templates: will, trust, guardianship)   │
├─────────────────────────────────────────────────────────────┤
│                    API LAYER (Edge Handlers)                 │
│  /api/contact  │  /api/book  (Form processing, validation)   │
├─────────────────────────────────────────────────────────────┤
│              STATIC ASSETS & CONFIGURATION                   │
│  /public/images  │  tailwind.config.ts  │  next.config.mjs   │
└─────────────────────────────────────────────────────────────┘
```

## Key Components

### Page Components (20 total)

**Core Pages:**
- `app/page.tsx` - Homepage with hero section, products showcase, testimonials, CTA
- `app/layout.tsx` - Root layout with Header, Footer, SchemaMarkup wrapper

**Product Pages:**
- `app/products/page.tsx` - Products overview with pricing table
- `app/products/trust/page.tsx` - Living Trust details
- `app/products/will/page.tsx` - Will/Testament details
- `app/products/guardianship/page.tsx` - Guardianship designation details
- `app/products/estate-plan/page.tsx` - Complete estate plan details

**Service Pages:**
- `app/about/page.tsx` - Company information and team
- `app/contact/page.tsx` - Contact form page
- `app/book/page.tsx` - Consultation booking form (client-side, interactive)
- `app/who-we-serve/page.tsx` - Target audience information
- `app/pricing/page.tsx` - Detailed pricing page

**Educational Pages:**
- `app/learn/page.tsx` - Learning center hub
- `app/learn/blog/page.tsx` - Blog index
- `app/learn/blog/blog/page.tsx` - Blog article template
- `app/learn/faq/page.tsx` - FAQ index
- `app/learn/faq/faq/page.tsx` - FAQ details
- `app/learn/guides/page.tsx` - Guides index
- `app/learn/guides/guides/page.tsx` - Guide details

**Legal Pages:**
- `app/privacy/page.tsx` - Privacy policy
- `app/terms/page.tsx` - Terms of service

### UI Components (5 total)

**Layout Components:**
- `components/Header.tsx` (client) - Sticky navigation with dropdown Products menu, mobile menu, Get Started CTA
- `components/Footer.tsx` - Footer with product links, company links, legal links, contact info

**Feature Components:**
- `components/HeroCarousel.tsx` - Image carousel for hero section with multiple family scenarios
- `components/WhoWeServeCarousel.tsx` - Carousel for audience segments (couples, retirees, single parents, etc.)
- `components/SchemaMarkup.tsx` - SEO structured data (JSON-LD) generation for rich snippets

### Utility & Data Layer

**Content Management:**
- `lib/content-data.ts` - Centralized content data: contact info, services array, testimonials, FAQs, statistics (single source of truth for content)

**SEO & Schema:**
- `lib/schema.ts` - Schema.org JSON-LD generators for organization, services, products, FAQs (improves search visibility)

**PDF Templates** (not yet integrated):
- `lib/templates/will.tsx` - React PDF component for will generation
- `lib/templates/trust.tsx` - React PDF component for trust generation
- `lib/templates/guardianship.tsx` - React PDF component for guardianship generation
- `lib/templates/styles.ts` - Shared PDF styling utilities

### API Routes (2 total)

**Form Handlers:**
- `app/api/contact/route.ts` - Contact form POST handler (validates fields, TODO: Go High Level integration)
- `app/api/book/route.ts` - Booking form POST handler (calculates pricing, validates state selection, TODO: Go High Level integration)

## Data Flow

```
USER INTERACTION
        ↓
Form Submit (client)
    ↓        ↓
  /book    /contact
   API     API
    ↓        ↓
Validation & Calculation
    ↓        ↓
Response (JSON)
    ↓        ↓
Toast Notification
    ↓        ↓
FUTURE: Go High Level CRM
```

**Content Flow:**
```
lib/content-data.ts (single source of truth)
        ↓
Exported by multiple pages
        ↓
Rendered in UI (products cards, testimonials, FAQs, etc.)
        ↓
Also consumed by lib/schema.ts
        ↓
JSON-LD markup injected into page
```

**Image Flow:**
```
/public/images/ (static assets)
        ↓
Next.js <Image> component
        ↓
Optimized delivery with unoptimized: true for static export
        ↓
Responsive sizing for hero, testimonials, family scenarios
```

## Rendering Strategy

**Server-Side Rendering (SSR) - Default for all pages:**
- All pages are server components by default in Next.js 14 App Router
- Metadata is generated server-side via `export const metadata`
- SchemaMarkup component renders during server render for SEO

**Client-Side Interactivity:**
- Forms use `"use client"` directive (book/page.tsx, Header.tsx)
- State management via React.useState for form input, mobile menu toggle, dropdown menus
- Toast notifications via react-hot-toast library
- Interactive price calculation in booking form

**Static Export:**
- Build produces static HTML files in `/out` directory
- Deployed to Cloudflare Pages for edge caching
- No runtime server needed (serverless edge functions for API routes)

## Routing Structure

```
/                          → Homepage (hero, products, testimonials)
/products                  → Product overview + pricing comparison
/products/trust            → Living Trust details page
/products/will             → Will details page
/products/guardianship     → Guardianship details page
/products/estate-plan      → Complete Estate Plan details page
/pricing                   → Detailed pricing + comparison
/about                     → About company and team
/who-we-serve              → Target audience information
/book                      → Booking form (interactive client component)
/contact                   → Contact form page
/learn                     → Learning center hub
/learn/faq                 → FAQ index
/learn/faq/faq             → FAQ article (template)
/learn/blog                → Blog index
/learn/blog/blog           → Blog article (template)
/learn/guides              → Guides index
/learn/guides/guides       → Guide article (template)
/privacy                   → Privacy policy
/terms                     → Terms of service
/api/contact               → Contact form POST endpoint
/api/book                  → Booking form POST endpoint
```

## Key Technologies

- **Next.js 14** - App Router, metadata API, static export
- **React 18** - Component library, hooks for state management
- **TypeScript 5.9** - Type safety for all components and utilities
- **Tailwind CSS 3.4** - Utility-first styling with custom color palette (sage green, gold, warm tones)
- **react-hot-toast** - Toast notifications for form feedback
- **@react-pdf/renderer** - PDF generation for legal documents (not yet integrated in forms)
- **Stripe.js & Resend** - Future payment and email integrations (dependencies present but not wired)

## Styling Approach

- **Utility-first CSS** via Tailwind with custom color palette
- **Custom colors defined in tailwind.config.ts**: Primary (sage green), Secondary (warm gold), neutrals (sand, tan, sky, sage backgrounds)
- **Custom animations**: fade-in, slide-up, float (subtle micro-interactions)
- **Premium shadows** for depth and hierarchy
- **Responsive design** with mobile-first approach using Tailwind breakpoints

## State Management

**No global state manager** - Application is stateless with minimal client-side state:
- Form input state via React.useState (book/page.tsx, Header.tsx)
- Mobile menu toggle state in Header.tsx
- Dropdown menu active state in Header.tsx
- Toast notifications managed by react-hot-toast library

## SEO Implementation

- **Metadata API** - Each page exports `metadata` object for title, description, keywords
- **Schema.org markup** - lib/schema.ts generates JSON-LD for organization, services, products, FAQs
- **SchemaMarkup.tsx** - Renders JSON-LD tags in page head during SSR
- **Semantic HTML** - Proper heading hierarchy, nav landmarks, alt text for images
- **Open Graph** - Layout provides foundation for OG tags (expandable per page)

## Performance Optimizations

- **Static export** - Pre-built HTML files for instant delivery
- **Cloudflare edge caching** - Global CDN distribution
- **Next.js image optimization** - Responsive image serving (with unoptimized: true for static export)
- **Code splitting** - Automatic per-route bundling
- **Minimal dependencies** - Lightweight libraries (react-hot-toast, @stripe/stripe-js as optional)
- **CSS-in-JS via Tailwind** - Single CSS bundle

## Future Integration Points

1. **Go High Level CRM** - Contact and Booking API handlers have TODO comments for this integration
2. **Stripe Payment Processing** - dependencies installed, needs implementation in /book form
3. **Resend Email Service** - dependency installed, needs implementation for order confirmations
4. **PDF Generation** - React PDF templates exist but not yet wired to form submissions
5. **Supabase Authentication** - Dependencies installed (@supabase/auth-helpers-nextjs) but not integrated
