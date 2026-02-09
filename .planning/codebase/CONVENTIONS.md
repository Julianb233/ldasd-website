# Code Conventions

## TypeScript

### Type Strictness
- **Strict mode enabled** in `tsconfig.json` - all implicit `any` types are caught
- Strong typing is enforced throughout the codebase
- React component types use `React.ReactNode` for children props

### Type vs Interface
- **Prefer `type` keyword** over `interface` in modern patterns
- Metadata objects use `type` keyword: `type Metadata` from Next.js
- Component prop patterns use implicit types

### Type Patterns
- Functional components export as `default function ComponentName()`
- Props passed inline without explicit prop interfaces
- Generic types used for array operations and schema generation: `Record<string, number>`, `typeof services[0]`

### Module Resolution
- Path alias configured: `@/*` maps to project root
- All imports use absolute paths with `@/` prefix: `@/components/`, `@/lib/`
- No relative imports

---

## Components

### Structure
- **Location**: `/components/` directory (reusable, layout-wide components)
- **Page components**: `/app/` directory (page-specific route components)
- **File format**: `.tsx` for client components, `.tsx` for server components

### Client vs Server
- Explicit `"use client"` directive at top of client components
- Components in `/app/` are server components by default unless marked
- All interactive components (Header, Footer, HeroCarousel) use `"use client"`

### Component Patterns
1. **State Management**: React hooks only (`useState`, `useEffect`)
2. **No external state management** - single-component state suffices
3. **Simple, functional approach** - minimal dependencies
4. **Default exports** for components

### Props Pattern
- Props passed inline without prop interface definitions
- Destructuring in function parameters
- Navigation data passed as inline objects with typed structure

### Example Patterns
```typescript
// Client component with hooks
"use client";

import { useState, useEffect } from "react";

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (...);
}
```

---

## Styling

### Framework
- **Tailwind CSS** for all styling
- Configuration file: `/tailwind.config.ts` (TypeScript config)

### Color System
- **Custom theme colors** defined in Tailwind config:
  - `primary` (sage green): `#52796F` default, `#84A98C` light, `#3D5A50` dark
  - `secondary` (warm gold): `#D4A574` default, `#E8C49A` light, `#B8956A` dark
  - `accent`: Same as primary
  - Background: `#FEFCF8` (warmer cream)
  - Foreground: `#2D3748` (softer charcoal)
  - Section colors: `tan`, `sky`, `sage`, `sand`, `ivory`

### Typography
- Font family: `"DM Sans"` (system fallback: `sans-serif`)
- Applied globally to all text elements
- Semantic sizing: `text-sm`, `text-lg`, `text-xl`, etc.

### Utility Classes
- **Spacing**: `p-*`, `m-*`, `gap-*` for layout
- **Flexbox**: `flex`, `flex-col`, `gap-*` for layouts
- **Grid**: `grid`, `grid-cols-*` for responsive layouts
- **Responsive**: `sm:`, `md:`, `lg:` prefixes for breakpoints
- **Transitions**: `transition-all duration-300/400` for smooth effects
- **Shadows**: `shadow-premium`, `shadow-premium-hover`, `shadow-glass`
- **Glass effect**: `backdrop-blur-md` with `bg-white/80` for glassmorphism
- **Gradients**: `bg-gradient-to-*` for background gradients

### Animation
- **Custom animations** defined in Tailwind config:
  - `animate-fade-in`: Opacity fade over 1s
  - `animate-slide-up`: Vertical movement + opacity
  - `animate-float`: Vertical bounce animation
  - `animate-pulse`: Built-in Tailwind animation
  - `animate-ping`: Built-in Tailwind animation

### Class Organization
- Inline Tailwind classes without CSS modules
- Classes applied directly to JSX elements
- Mobile-first responsive design pattern
- No CSS-in-JS or external stylesheets

---

## Naming

### Files
- **Component files**: PascalCase (e.g., `Header.tsx`, `HeroCarousel.tsx`)
- **Library files**: camelCase (e.g., `schema.ts`, `content-data.ts`)
- **API routes**: kebab-case (e.g., `/api/contact/route.ts`, `/api/book/route.ts`)
- **Page routes**: kebab-case (e.g., `/products/page.tsx`, `/who-we-serve/page.tsx`)

### Functions
- **Component names**: PascalCase (React convention)
- **Helper functions**: camelCase (e.g., `formatDate()`, `getOrdinal()`)
- **Schema generators**: Prefix with `generate*` (e.g., `generateOrganizationSchema()`)
- **Exported constant data**: camelCase (e.g., `contactInfo`, `services`, `products`)

### Variables & Constants
- **Descriptive names**: `currentIndex`, `activeSubmenu`, `mobileMenuOpen`
- **Boolean prefixes**: `is*`, `has*` (e.g., `mobileMenuOpen`)
- **Array/collection suffixes**: plural (e.g., `carouselImages`, `navigation`, `products`)
- **Static data objects**: camelCase (e.g., `productPrices`, `productPrices`)
- **Color values**: Named in context (e.g., `primary`, `secondary`, `accent`)

### Constants
- **All-caps for truly immutable**: e.g., `PRODUCT_PRICES` in API
- **Regular case for data structures**: `navigation`, `stats`, `products`

---

## Imports

### Organization
1. **Next.js imports** first: `import Link from "next/link"`
2. **React imports** second: `import { useState } from "react"`
3. **Third-party libraries** third: `import Image from "next/image"`
4. **Local imports** last: `import Header from "@/components/Header"`
5. **Type imports** at top with `type` keyword: `import type { Metadata } from "next"`

### Path Aliases
- **Always use `@/` prefix**: `@/components/`, `@/lib/`, `@/app/`
- Never use relative paths (no `../` or `./`)
- Improves maintainability and refactoring

### Style
- Named imports vs default imports
  - Default exports used for components
  - Named exports used for utilities and helpers
  - Mixed imports allowed (both default and named from same module)

### Example
```typescript
import type { Metadata } from "next";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import HeroCarousel from "@/components/HeroCarousel";
import { generateOrganizationSchema } from "@/lib/schema";
```

---

## Error Handling

### API Routes
- **Try-catch blocks** wrapping request handling logic
- **Explicit status codes**: 400 for validation errors, 500 for server errors
- **NextResponse.json()** for all responses
- Error logging to console for Vercel logs visibility

### Validation Pattern
```typescript
// Field validation with early returns
if (!firstName || !lastName || !email || !subject || !message) {
  return NextResponse.json(
    { error: 'Missing required fields' },
    { status: 400 }
  );
}

// Email regex validation
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test(email)) {
  return NextResponse.json(
    { error: 'Invalid email format' },
    { status: 400 }
  );
}
```

### Response Format
- Success: `{ success: true, message: "...", data?: {...} }`
- Error: `{ error: 'Description' }`
- Consistent structure across all endpoints

### Client-Side
- No explicit error handling in components currently
- Forms submit via API endpoints that return structured responses
- Toast notifications used for user feedback (dependency: `react-hot-toast`)

### Logging
- `console.log()` for info logging (visible in Vercel)
- `console.error()` for error logging
- No structured logging framework currently in place
- TODO comments mark integration points: `// TODO: Integration point for Go High Level`

---

## Code Quality Standards

### General Principles
- **Explicit over implicit**: Type annotations, clear function names
- **Data-driven**: Content and metadata separated into data files
- **Modular**: Components are small, focused, and reusable
- **Progressive enhancement**: Client-side interactivity optional

### Dependencies
- **Minimal**: React, Next.js, Tailwind CSS for UI
- **Specialized**: `@react-pdf/renderer` for PDF generation
- **Email/CRM**: `resend`, `stripe` for backend services
- **Auth**: `@supabase/supabase-js` for authentication
- **Toasts**: `react-hot-toast` for notifications

### Patterns to Avoid
- Prop drilling over multiple levels (keep components simple)
- Complex state management (hooks sufficient for current scope)
- CSS modules or inline styles (Tailwind only)
- Magic numbers (use named constants)

