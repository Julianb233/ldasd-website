import Link from 'next/link';

type Variant = 'banner' | 'inline' | 'compact';

interface LegalDisclaimerProps {
  variant?: Variant;
  className?: string;
}

/**
 * UPL compliance disclaimer component.
 * COMP-01: UPL disclaimer on all document flows
 * COMP-02: "Not legal advice" banner throughout
 *
 * Variants:
 * - banner: Full-width colored banner with icon (for top of product/flow pages)
 * - inline: Card-style with border (for within forms/content)
 * - compact: Single-line text (for tight spaces)
 */
export default function LegalDisclaimer({ variant = 'banner', className = '' }: LegalDisclaimerProps) {
  if (variant === 'compact') {
    return (
      <p className={`text-xs text-foreground/50 ${className}`}>
        LDASD provides document preparation services only. We are not a law firm and cannot provide legal advice.
        See our <Link href="/terms" className="underline hover:text-primary">Terms of Service</Link>.
      </p>
    );
  }

  if (variant === 'inline') {
    return (
      <div className={`rounded-xl border border-amber-200 bg-amber-50/50 p-4 ${className}`}>
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <div className="text-sm text-foreground/70">
            <p className="font-semibold text-foreground/80 mb-1">Not Legal Advice</p>
            <p>
              LDASD Estate Planning provides legal document preparation services. We are not a law firm
              and do not provide legal advice. Our documents are prepared based on the information you
              provide. For personalized legal guidance, consult a licensed attorney in your state.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Banner variant (default)
  return (
    <div className={`bg-primary-dark/5 border-b border-primary/10 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-3">
        <div className="flex items-center justify-center gap-3 text-sm text-foreground/70">
          <svg className="w-4 h-4 text-primary flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
          </svg>
          <p>
            <span className="font-semibold text-foreground/80">Legal Information Only</span> — LDASD
            provides document preparation, not legal advice. We are not a law firm.{' '}
            <Link href="/terms" className="underline font-medium text-primary hover:text-primary-dark">
              Learn more
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
