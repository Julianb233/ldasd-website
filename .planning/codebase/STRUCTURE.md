# Directory Structure

## Overview

```
ldasd-website/
├── .git/                          # Git repository metadata
├── .gitignore                     # Git ignore rules
├── .planning/
│   └── codebase/                  # Architecture & structure documentation
│       ├── ARCHITECTURE.md        # System design and patterns
│       └── STRUCTURE.md           # This file
├── app/                           # Next.js App Router pages & API routes
│   ├── api/                       # API route handlers
│   │   ├── contact/
│   │   │   └── route.ts          # POST /api/contact (form validation)
│   │   └── book/
│   │       └── route.ts          # POST /api/book (pricing calculation)
│   ├── (pages)/                   # Main site pages
│   ├── layout.tsx                # Root layout with Header/Footer
│   ├── page.tsx                  # Homepage
│   ├── globals.css               # Global styles
│   ├── about/
│   │   └── page.tsx              # About page
│   ├── book/
│   │   └── page.tsx              # Booking form (interactive)
│   ├── contact/
│   │   └── page.tsx              # Contact page
│   ├── pricing/
│   │   └── page.tsx              # Pricing page
│   ├── privacy/
│   │   └── page.tsx              # Privacy policy
│   ├── products/
│   │   ├── page.tsx              # Products overview
│   │   ├── trust/
│   │   │   └── page.tsx          # Living Trust details
│   │   ├── will/
│   │   │   └── page.tsx          # Will details
│   │   ├── guardianship/
│   │   │   └── page.tsx          # Guardianship details
│   │   └── estate-plan/
│   │       └── page.tsx          # Complete Estate Plan details
│   ├── terms/
│   │   └── page.tsx              # Terms of service
│   ├── who-we-serve/
│   │   └── page.tsx              # Target audience
│   └── learn/
│       ├── page.tsx              # Learning center hub
│       ├── blog/
│       │   ├── page.tsx          # Blog index
│       │   └── blog/
│       │       └── page.tsx      # Blog article (template)
│       ├── faq/
│       │   ├── page.tsx          # FAQ index
│       │   └── faq/
│       │       └── page.tsx      # FAQ article (template)
│       └── guides/
│           ├── page.tsx          # Guides index
│           └── guides/
│               └── page.tsx      # Guide article (template)
│
├── components/                    # Reusable React components
│   ├── Header.tsx                # Navigation header (client)
│   ├── Footer.tsx                # Site footer
│   ├── HeroCarousel.tsx           # Image carousel for hero section
│   ├── WhoWeServeCarousel.tsx     # Audience carousel
│   └── SchemaMarkup.tsx           # SEO JSON-LD generator
│
├── lib/                           # Utility functions & data
│   ├── content-data.ts           # Centralized content (services, testimonials, FAQs)
│   ├── schema.ts                 # SEO schema.org generators
│   └── templates/
│       ├── will.tsx              # React PDF will template
│       ├── trust.tsx             # React PDF trust template
│       ├── guardianship.tsx       # React PDF guardianship template
│       └── styles.ts             # PDF styling utilities
│
├── public/                        # Static assets (images)
│   └── images/
│       ├── logo/
│       │   └── logo.png          # Company logo
│       ├── hero/
│       │   ├── family-beach.jpg
│       │   ├── family-sunset.jpg
│       │   ├── hero-family-beach.png
│       │   ├── hero-couple-balboa.png
│       │   ├── hero-family-home.png
│       │   └── hero-retirees-lajolla.png
│       ├── families/
│       │   ├── young-parents.jpg
│       │   ├── grandparents.jpg
│       │   ├── happy-couple.jpg
│       │   └── multi-gen.jpg
│       ├── about/
│       │   ├── team-professional.jpg
│       │   └── office-modern.jpg
│       ├── who-we-serve/
│       │   ├── couples.png
│       │   ├── homeowners.png
│       │   ├── pet-owners.png
│       │   ├── retirees.png
│       │   ├── single-parents.png
│       │   └── young-families.png
│       └── san-diego/
│           ├── coronado-beach.jpg
│           └── skyline.jpg
│
├── out/                           # Static export output (Cloudflare Pages)
│
├── .next/                         # Next.js build cache
├── node_modules/                  # NPM dependencies
│
├── package.json                   # Project metadata & dependencies
├── package-lock.json              # Locked dependency versions
├── tsconfig.json                  # TypeScript configuration
├── tailwind.config.ts            # Tailwind CSS configuration
├── next.config.mjs               # Next.js configuration
├── postcss.config.mjs            # PostCSS configuration
├── wrangler.jsonc                # Cloudflare Pages deployment config
│
├── README.md                      # Project documentation
└── [other files]

```

## Key Directories

| Directory | Purpose | File Types |
|-----------|---------|-----------|
| `app/` | Next.js App Router - all pages and API routes | `.tsx`, `.ts`, `.css` |
| `app/api/` | API endpoint handlers | `.ts` (POST handlers) |
| `components/` | Reusable React components | `.tsx` |
| `lib/` | Shared utility functions and data | `.ts`, `.tsx` |
| `lib/templates/` | React PDF templates for legal documents | `.tsx`, `.ts` |
| `public/` | Static assets served as-is | `.png`, `.jpg`, `.svg` |
| `public/images/` | Product and lifestyle photography | `.jpg`, `.png` |
| `.planning/codebase/` | Architecture & code documentation | `.md` |
| `.next/` | Next.js build output and cache | (auto-generated) |
| `out/` | Static site export for Cloudflare Pages | (auto-generated) |

## Key Files

| File | Purpose | Type |
|------|---------|------|
| `app/layout.tsx` | Root layout wrapper with Header, Footer, SchemaMarkup | Component |
| `app/page.tsx` | Homepage with hero, products, testimonials | Page |
| `app/book/page.tsx` | Interactive booking form with price calculation | Page (Client) |
| `app/contact/page.tsx` | Contact form page | Page |
| `components/Header.tsx` | Navigation with dropdown Products menu, mobile menu | Component (Client) |
| `components/Footer.tsx` | Footer with links and contact info | Component |
| `components/HeroCarousel.tsx` | Image carousel for family scenarios | Component |
| `components/SchemaMarkup.tsx` | SEO JSON-LD markup generator | Component |
| `lib/content-data.ts` | Centralized content: services, testimonials, FAQs, stats | Data |
| `lib/schema.ts` | Schema.org JSON-LD generators | Utility |
| `lib/templates/will.tsx` | React PDF will document | Component |
| `lib/templates/trust.tsx` | React PDF trust document | Component |
| `lib/templates/guardianship.tsx` | React PDF guardianship document | Component |
| `lib/templates/styles.ts` | PDF shared styles | Utility |
| `package.json` | Dependencies: next, react, tailwind, stripe, supabase, resend, react-pdf | Config |
| `tailwind.config.ts` | Custom color palette, shadows, animations | Config |
| `next.config.mjs` | Image optimization settings (unoptimized for static export) | Config |
| `tsconfig.json` | TypeScript compiler options and path aliases | Config |
| `wrangler.jsonc` | Cloudflare Pages deployment configuration | Config |
| `.gitignore` | Git ignore patterns (node_modules, .env, .next, out) | Config |
| `README.md` | Project overview, setup, deployment instructions | Documentation |

## Naming Conventions

### Pages
- **File structure follows routes**: `app/products/trust/page.tsx` → `/products/trust`
- **Single `page.tsx` per route**: No need for index files
- **Descriptive folder names**: `trust`, `will`, `guardianship` (plural for collections: `products`, `learn`)

### Components
- **PascalCase file names**: `Header.tsx`, `HeroCarousel.tsx`, `SchemaMarkup.tsx`
- **Default export**: `export default function ComponentName()`
- **Client components marked**: `"use client"` directive at top of file

### Utilities & Data
- **kebab-case files**: `content-data.ts`, `schema.ts`
- **Named exports**: `export function generateOrganizationSchema()`, `export const contactInfo`
- **Subdirectories for related files**: `lib/templates/` for PDF-related files

### API Routes
- **Folder structure matches route**: `app/api/contact/route.ts` → `POST /api/contact`
- **Export handler function**: `export async function POST(request: NextRequest)`
- **Naming reflects action**: `contact`, `book` (what they do, not REST resources)

### Images
- **Organized by category**: `hero/`, `families/`, `about/`, `who-we-serve/`, `san-diego/`
- **Descriptive names**: `family-beach.jpg`, `hero-couple-balboa.png`
- **Use lowercase with hyphens**: `multi-gen.jpg`, `team-professional.jpg`

### Configuration Files
- **Standard Next.js names**: `next.config.mjs`, `tailwind.config.ts`, `tsconfig.json`
- **PostCSS config**: `postcss.config.mjs`
- **Cloudflare config**: `wrangler.jsonc`

### CSS & Styling
- **Global styles**: `app/globals.css`
- **Utility-first via Tailwind**: No component-scoped CSS files
- **Inline styles via className prop**: Tailwind classes in JSX
- **CSS-in-JS for PDFs**: `lib/templates/styles.ts`

## Asset Organization

### Images
```
/public/images/
├── logo/                  # Company branding
├── hero/                  # Homepage hero section carousel images
├── families/              # Family/lifestyle photos for testimonials and sections
├── about/                 # About page photos (team, office)
├── who-we-serve/          # Audience segment icons/images (6 personas)
└── san-diego/            # Local San Diego landmark photos
```

### Static Exports
```
/out/                      # Generated by `npm run build`
├── index.html            # Homepage
├── products/
│   ├── index.html        # /products
│   ├── trust/
│   ├── will/
│   ├── guardianship/
│   └── estate-plan/
├── learn/
├── api/                  # API routes (as JSON responses)
├── _next/                # Next.js assets
└── images/               # Copied from public/
```

## File Size Overview

```
Codebase Summary:
- Pages: 20 .tsx files (23 KB total)
- Components: 5 .tsx files (8 KB total)
- Utilities: 3 files (10 KB total)
- Templates: 4 files (53 KB total)
- Configuration: 6 files
- Static images: ~40 files (500+ KB)
- Dependencies: 12 packages (node_modules)
```

## Data Flow Through Directories

```
Public Assets (/public)
    ↓
Referenced in Pages (/app) via <Image> component
    ↓
Rendered in Browser

Content Data (lib/content-data.ts)
    ↓
Imported by Pages and SchemaMarkup (/app, /components)
    ↓
Rendered on page + Schema markup

API Routes (/app/api)
    ↓
Called from Client Components (/app/book, /components/Header)
    ↓
Validate input, calculate price, TODO: CRM integration
    ↓
Return JSON response
```

## Build Output Structure

After `npm run build`:

```
out/                      # Static site ready for Cloudflare
├── index.html           # All pages pre-rendered as HTML
├── [slug]/
│   └── index.html
├── api/
│   ├── contact/
│   │   └── index.json   # API response as static JSON
│   └── book/
│       └── index.json
├── _next/               # JavaScript bundles and assets
│   ├── static/
│   │   ├── chunks/     # Code split bundles
│   │   └── css/        # Compiled Tailwind CSS
│   └── data/           # Next.js runtime
└── images/             # Copied from public/
```
