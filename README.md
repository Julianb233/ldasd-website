# LDASD Estate Planning

![Next.js](https://img.shields.io/badge/Next.js-14-black?style=flat-square&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8?style=flat-square&logo=tailwindcss)
![Cloudflare Pages](https://img.shields.io/badge/Deployed%20on-Cloudflare%20Pages-F38020?style=flat-square&logo=cloudflare)

A modern, accessible estate planning website providing affordable trusts, wills, and guardianship documents. Built with Next.js 14, TypeScript, and Tailwind CSS, deployed on Cloudflare Pages.

## Overview

LDASD Estate Planning helps families protect what matters most through simple, affordable online estate planning services. Our platform offers attorney-backed legal documents including living trusts, wills, and guardianship designations starting at just $199.

**Key Stats:**
- 100K+ families protected
- Available in all 50 states
- 4.9/5 customer satisfaction
- Starting price: $199

## Features

- **Living Trusts** - Avoid probate and protect assets with comprehensive living trust creation
- **Last Will & Testament** - Name guardians and distribute assets with legally binding wills
- **Guardianship Designations** - Protect minor children by designating caregivers
- **Complete Estate Plans** - Comprehensive packages combining multiple estate planning documents
- **Educational Resources** - Blog, guides, and FAQ section for estate planning education
- **Responsive Design** - Fully mobile-optimized experience
- **SEO Optimized** - Built with Next.js metadata API for optimal search visibility

## Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) - React framework with App Router
- **Language:** [TypeScript 5.9](https://www.typescriptlang.org/) - Type-safe development
- **Styling:** [Tailwind CSS 3.4](https://tailwindcss.com/) - Utility-first CSS framework
- **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/) - Global edge deployment
- **Package Manager:** npm

## Project Structure

```
ldasd-website/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── book/              # Consultation booking
│   ├── learn/             # Educational content
│   │   ├── blog/         # Blog articles
│   │   ├── faq/          # Frequently asked questions
│   │   └── guides/       # Estate planning guides
│   ├── privacy/           # Privacy policy
│   ├── terms/             # Terms of service
│   ├── who-we-serve/      # Target audience pages
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable React components
├── public/                # Static assets
├── out/                   # Static export output (for Cloudflare)
├── next.config.mjs        # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── wrangler.jsonc         # Cloudflare Pages configuration
```

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd ldasd-website
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

### Available Scripts

- `npm run dev` - Start development server on port 3000
- `npm run build` - Build production-ready static export
- `npm start` - Start production server (requires build)
- `npm run lint` - Run ESLint for code quality checks

## Build & Deployment

### Static Export

This project uses Next.js static export for deployment on Cloudflare Pages:

```bash
npm run build
```

This generates a static site in the `out/` directory.

### Cloudflare Pages Deployment

The site is configured for automatic deployment on Cloudflare Pages via `wrangler.jsonc`:

**Build Configuration:**
- Build command: `npm run build`
- Build output directory: `out`
- Compatibility date: `2025-12-24`

**Manual Deployment:**
```bash
npx wrangler pages deploy out
```

**Automatic Deployment:**
Connect your repository to Cloudflare Pages for automatic deployments on every push to main branch.

## Environment Variables

Currently, no environment variables are required for basic operation. If adding features that require API keys or secrets:

1. Create `.env.local`:
```bash
# Example environment variables
# NEXT_PUBLIC_API_URL=https://api.example.com
```

2. Add to `.gitignore` (already configured)
3. Configure in Cloudflare Pages dashboard for production

## Development Guidelines

### Code Style

- TypeScript strict mode enabled
- ESLint configuration included
- Follow React/Next.js best practices
- Use Tailwind CSS for styling (avoid custom CSS when possible)

### Adding New Pages

1. Create new route in `app/` directory
2. Export metadata for SEO:
```tsx
export const metadata: Metadata = {
  title: "Page Title | LDASD Estate Planning",
  description: "Page description for SEO",
  keywords: "relevant, keywords, here"
};
```

3. Test locally with `npm run dev`
4. Build and verify with `npm run build`

## SEO & Metadata

Each page includes optimized metadata:
- Structured page titles
- Descriptive meta descriptions
- Relevant keywords
- Open Graph tags (via layout)

## Performance

- Static site generation for optimal performance
- Tailwind CSS for minimal CSS bundle size
- Next.js automatic code splitting
- Cloudflare Pages CDN for global edge delivery

## License

Copyright 2025 LDASD Estate Planning. All rights reserved.

## Support

For questions or support:
- Visit our website
- Email: support@ldasd.com
- Schedule a consultation through the /book page

---

**Built with care by the LDASD team**
