import Link from 'next/link'

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-premium ring-1 ring-black/5 text-center">
          <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg
              className="w-8 h-8 text-secondary"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
              />
            </svg>
          </div>

          <h1 className="text-2xl font-bold text-foreground mb-4">Check Your Email</h1>

          <p className="text-foreground/70 mb-6">
            We&apos;ve sent a verification link to your email address. Please click the link to
            verify your account and complete your registration.
          </p>

          <div className="p-4 bg-secondary/5 rounded-xl mb-6">
            <p className="text-sm text-foreground/70">
              <strong className="text-foreground">Tip:</strong> If you don&apos;t see the email,
              check your spam folder. The email may take a few minutes to arrive.
            </p>
          </div>

          <div className="space-y-4">
            <Link
              href="/login"
              className="block w-full rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white hover:bg-secondary-light hover:scale-105 transition-all duration-400 shadow-md hover:shadow-lg text-center"
            >
              Back to Sign In
            </Link>

            <p className="text-sm text-foreground/60">
              Need help?{' '}
              <Link href="/contact" className="text-secondary hover:underline">
                Contact support
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
