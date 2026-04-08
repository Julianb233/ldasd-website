#!/bin/bash
# LDASD Estate Planning — Production Launch Checklist
# Run before deploying to production

set -e

echo "========================================="
echo "  LDASD Launch Readiness Checklist"
echo "========================================="
echo ""

PASS=0
WARN=0
FAIL=0

check() {
  local status="$1" desc="$2"
  if [ "$status" = "PASS" ]; then
    echo "  PASS: $desc"
    PASS=$((PASS + 1))
  elif [ "$status" = "WARN" ]; then
    echo "  WARN: $desc"
    WARN=$((WARN + 1))
  else
    echo "  FAIL: $desc"
    FAIL=$((FAIL + 1))
  fi
}

echo "Environment Variables"
echo "---"
[ -n "$NEXT_PUBLIC_SUPABASE_URL" ] && check "PASS" "NEXT_PUBLIC_SUPABASE_URL set" || check "FAIL" "NEXT_PUBLIC_SUPABASE_URL missing"
[ -n "$NEXT_PUBLIC_SUPABASE_ANON_KEY" ] && check "PASS" "NEXT_PUBLIC_SUPABASE_ANON_KEY set" || check "FAIL" "NEXT_PUBLIC_SUPABASE_ANON_KEY missing"
[ -n "$STRIPE_SECRET_KEY" ] && check "PASS" "STRIPE_SECRET_KEY set" || check "WARN" "STRIPE_SECRET_KEY not set (payments will fail)"
[ -n "$STRIPE_WEBHOOK_SECRET" ] && check "PASS" "STRIPE_WEBHOOK_SECRET set" || check "WARN" "STRIPE_WEBHOOK_SECRET not set (webhooks will fail)"
[ -n "$RESEND_API_KEY" ] && check "PASS" "RESEND_API_KEY set" || check "WARN" "RESEND_API_KEY not set (emails will fail)"
echo ""

echo "Critical Files"
echo "---"
[ -f "middleware.ts" ] && check "PASS" "Auth middleware exists" || check "FAIL" "Auth middleware missing"
[ -f "app/layout.tsx" ] && check "PASS" "Root layout exists" || check "FAIL" "Root layout missing"
[ -f "app/page.tsx" ] && check "PASS" "Homepage exists" || check "FAIL" "Homepage missing"
[ -f "app/(auth)/login/page.tsx" ] && check "PASS" "Login page exists" || check "FAIL" "Login page missing"
[ -f "app/(auth)/signup/page.tsx" ] && check "PASS" "Signup page exists" || check "FAIL" "Signup page missing"
[ -f "app/api/checkout/route.ts" ] && check "PASS" "Checkout API exists" || check "FAIL" "Checkout API missing"
[ -f "app/api/webhooks/stripe/route.ts" ] && check "PASS" "Stripe webhook exists" || check "FAIL" "Stripe webhook missing"
[ -f "app/privacy/page.tsx" ] && check "PASS" "Privacy policy page exists" || check "FAIL" "Privacy policy missing"
[ -f "app/terms/page.tsx" ] && check "PASS" "Terms of service page exists" || check "FAIL" "Terms page missing"
echo ""

echo "Testing"
echo "---"
[ -d "e2e" ] && check "PASS" "E2E test directory exists" || check "FAIL" "No E2E tests"
E2E_COUNT=$(find e2e -name "*.spec.ts" 2>/dev/null | wc -l)
[ "$E2E_COUNT" -gt 0 ] && check "PASS" "$E2E_COUNT E2E test files found" || check "WARN" "No E2E test files"
echo ""

echo "Security"
echo "---"
grep -q "X-Frame-Options" next.config.mjs 2>/dev/null && check "PASS" "X-Frame-Options header configured" || check "WARN" "X-Frame-Options header missing"
grep -q "X-Content-Type-Options" next.config.mjs 2>/dev/null && check "PASS" "X-Content-Type-Options header configured" || check "WARN" "X-Content-Type-Options missing"
grep -q "poweredByHeader.*false" next.config.mjs 2>/dev/null && check "PASS" "X-Powered-By header disabled" || check "WARN" "X-Powered-By header still enabled"
grep -q "getUser" middleware.ts 2>/dev/null && check "PASS" "Auth uses getUser() (not getSession)" || check "WARN" "Auth may use insecure getSession()"
echo ""

echo "Performance"
echo "---"
grep -q "compress.*true" next.config.mjs 2>/dev/null && check "PASS" "Response compression enabled" || check "WARN" "Compression not configured"
echo ""

echo "========================================="
echo "  Results: $PASS passed, $WARN warnings, $FAIL failed"
echo "========================================="

if [ "$FAIL" -gt 0 ]; then
  echo "  NOT ready for launch - fix failures first"
  exit 1
elif [ "$WARN" -gt 0 ]; then
  echo "  Ready with warnings - review before launch"
  exit 0
else
  echo "  All clear - ready for production!"
  exit 0
fi
