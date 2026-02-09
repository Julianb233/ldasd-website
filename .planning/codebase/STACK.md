# Technology Stack

## Core Framework
- **Next.js 14.2.35** - React framework with App Router for server and client components
  - Static export enabled for Cloudflare Pages deployment
  - Image optimization disabled for static deployment
  - TypeScript strict mode enabled

## Languages
- **TypeScript 5.9.3** - Strict type-checking for all source code
  - Strict mode enabled in tsconfig.json
  - JSX preserved for Next.js compilation
  - Module resolution: bundler

## Styling
- **Tailwind CSS 3.4.0** - Utility-first CSS framework
  - Premium warm color palette (sage green, gold, warm tones)
  - Custom animations (fade-in, slide-up, float)
  - DM Sans font family
  - Responsive design utilities

- **PostCSS 8.5.6** - CSS processing
  - Autoprefixer 10.4.23 for browser compatibility
  - Tailwind CSS integration

## Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| react | 18.3.1 | UI library and component rendering |
| react-dom | 18.3.1 | React DOM manipulation |
| next | 14.2.35 | Full-stack React framework |
| typescript | 5.9.3 | Type-safe development |
| tailwindcss | 3.4.0 | Styling and responsive design |
| postcss | 8.5.6 | CSS transformation pipeline |
| autoprefixer | 10.4.23 | Vendor prefixes for CSS |
| @stripe/stripe-js | 8.6.0 | Stripe payment integration (currently unused) |
| stripe | 20.1.0 | Stripe server-side SDK (currently unused) |
| @react-pdf/renderer | 4.3.1 | PDF generation for documents |
| resend | 6.6.0 | Email delivery service (currently unused) |
| @supabase/supabase-js | 2.89.0 | Supabase database client (currently unused) |
| @supabase/auth-helpers-nextjs | 0.15.0 | Supabase auth for Next.js (currently unused) |
| @supabase/ssr | 0.8.0 | Supabase SSR utilities (currently unused) |
| react-hot-toast | 2.6.0 | Toast notification library |

## Dev Dependencies
- **TypeScript** - Type checking during development
- **ESLint** - Code quality linting (via Next.js configuration)
- **Next.js** - Includes built-in linting and build tools

## Configuration Files

### next.config.mjs
- Disables Next.js image optimization for static export compatibility
- ESM module format configuration

### tailwind.config.ts
- Extended color palette with custom premium colors
- Custom animations and keyframes
- Shadow definitions (premium, glass effects)
- Content paths for auto-purging unused CSS

### tsconfig.json
- Strict type checking enabled
- Path alias: `@/*` maps to project root
- JSX preserved mode (Next.js compatible)
- Incremental compilation enabled

### postcss.config.mjs
- Tailwind CSS plugin integration
- Autoprefixer for cross-browser compatibility

### package.json
- Project name: ldasd-website
- Scripts: dev, build, start, lint
- Node/npm compatible

## Build & Deployment
- **Build Tool**: Next.js build system (npm run build)
- **Output Format**: Static HTML export to `out/` directory
- **Deployment Target**: Cloudflare Pages
- **Node.js Requirement**: 18.x or higher
- **npm Requirement**: 9.x or higher

## API Integration Points
- **Next.js API Routes** at `/app/api/*`
  - POST `/api/book` - Booking consultation form
  - POST `/api/contact` - Contact form submission
