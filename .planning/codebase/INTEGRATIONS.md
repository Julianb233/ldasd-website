# External Integrations

## APIs

### Internal API Routes
1. **POST /api/book** - Booking consultation request
   - Accepts: firstName, lastName, email, phone, state, product, addSpouse
   - Validates required fields and email format
   - Calculates pricing based on selected product (will: $199, trust: $599, estate-plan: $699) + $100 for spouse
   - Returns estimated price and success message
   - Currently logs to console (visible in Vercel logs)

2. **POST /api/contact** - General contact form
   - Accepts: firstName, lastName, email, phone, subject, message
   - Validates required fields and email format
   - Currently logs to console (visible in Vercel logs)
   - Returns success message

### Frontend API Calls
- Both `/app/book/page.tsx` and `/app/contact/page.tsx` use `fetch()` API
- POST requests to internal `/api/*` endpoints
- JSON request/response format with `Content-Type: application/json`

## Services

### Payment Integration (Configured but Unused)
- **Stripe.js** (@stripe/stripe-js 8.6.0)
- **Stripe Server SDK** (stripe 20.1.0)
- Status: Installed, not yet integrated
- Use case: Payment processing for estate planning products

### Email Service (Configured but Unused)
- **Resend** (resend 6.6.0)
- Status: Installed, not yet integrated
- Use case: Email delivery for notifications and transactional emails

### Database & Authentication (Configured but Unused)
- **Supabase** (@supabase/supabase-js 2.89.0)
- **Supabase Auth Helpers** (@supabase/auth-helpers-nextjs 0.15.0)
- **Supabase SSR** (@supabase/ssr 0.8.0)
- Status: Installed, not yet integrated
- Use case: Database storage and user authentication

### CRM Integration (Planned)
- **Go High Level** - Planned integration
- Status: TODO in code comments
- Endpoints marked in `/api/book/route.ts` and `/api/contact/route.ts`
- Purpose: Lead management and follow-up automation

### UI Notifications
- **react-hot-toast** (2.6.0)
- Status: Actively used in contact and booking forms
- Purpose: User feedback (success/error messages)

### PDF Generation (Configured but Unused)
- **@react-pdf/renderer** (4.3.1)
- Status: Installed, not yet integrated
- Use case: PDF document generation for estate planning documents

## Environment Variables

### Currently Expected (None)
The application currently requires no environment variables for basic operation.

### Future Environment Variables (Placeholder Locations)
Based on installed packages, these would be needed when integrations are implemented:

**Payment Processing:**
- `STRIPE_PUBLIC_KEY` - Public key for Stripe client-side operations
- `STRIPE_SECRET_KEY` - Secret key for Stripe server-side operations
- `NEXT_PUBLIC_STRIPE_PUBLIC_KEY` - Public key (if exposed to client)

**Email Service:**
- `RESEND_API_KEY` - API key for Resend email service

**Database & Auth:**
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Service role key for server operations

**CRM Integration:**
- `GO_HIGH_LEVEL_API_KEY` - API key for Go High Level
- `GO_HIGH_LEVEL_ACCOUNT_ID` - Account ID for Go High Level

### Environment File Locations
- Production: Configured in Cloudflare Pages dashboard
- Development: `.env.local` (ignored by Git via .gitignore)

## Data Flow

### Current Data Flow (Form Submission)

```
User Form Input
    ↓
Client Component (useFormData state)
    ↓
handleSubmit() validation
    ↓
fetch() POST to /api/route
    ↓
API Route Handler
    ├─ Validate fields & email
    ├─ Calculate pricing
    ├─ Log to console
    ├─ Return success response
    └─ (TODO: Go High Level integration)
    ↓
Client receives response
    ↓
react-hot-toast notification
    ↓
Form reset / Success state
```

### Booking Form Specific Flow
```
User selects estate planning product (will/trust/estate-plan)
    ↓
Form calculates total price (base + spouse option if selected)
    ↓
User submits form with personal details (name, email, phone, state)
    ↓
POST /api/book with FormData
    ↓
Server validates and calculates final pricing
    ↓
Response with estimated price confirmation
```

### Contact Form Specific Flow
```
User enters contact details and message
    ↓
POST /api/contact with FormData
    ↓
Server validates required fields
    ↓
Response with confirmation message
```

## Future Integration Points

### Planned Integrations
1. **Go High Level CRM** - Lead capture and automation
   - Marked as TODO in `/api/book/route.ts` (line 34)
   - Marked as TODO in `/api/contact/route.ts` (line 25)
   - Should receive form data and customer details

2. **Email Notifications** - Using Resend
   - Confirmation emails to customers
   - Internal notifications to business
   - Order/booking confirmations with pricing

3. **Payment Processing** - Using Stripe
   - Integrate with booking flow
   - Process payment for selected products
   - Webhook handling for payment status updates

4. **PDF Generation** - Using @react-pdf/renderer
   - Generate estate planning documents
   - Create invoice/receipt PDFs
   - Send PDF documents via email

5. **Database Storage** - Using Supabase
   - Store booking/contact submissions
   - Manage customer data
   - Track form submissions

## Deployment Considerations

### Cloudflare Pages Configuration
- Build command: `npm run build`
- Build output directory: `out` (static files)
- Compatibility date: 2025-12-24
- Static deployment (no server-side code at edge)

### Environment Variable Management
- Production secrets configured in Cloudflare Pages dashboard
- Local development uses `.env.local` file
- `.gitignore` prevents committing sensitive files
