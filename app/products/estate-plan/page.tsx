import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Complete Estate Plan | Trust, Will, POA & Healthcare Directive | $699",
  description: "Everything you need for complete protection. Living trust, will, power of attorney, healthcare directive, and more. Best value at $699.",
};

export default function EstatePlanPage() {
  return (
    <div className="bg-background">
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-secondary/20 blur-[120px]" />
          <div className="absolute inset-0 bg-white/5" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-secondary text-white text-sm font-semibold mb-6 shadow-lg">
                Best Value
              </span>
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">Complete Estate Plan</h1>
              <p className="mt-6 text-xl text-white/90">
                Everything you need for comprehensive protection. Trust, will, powers of attorney, healthcare directives, and lifetime updates.
              </p>
              <div className="mt-8 flex items-baseline gap-4">
                <span className="text-5xl font-bold text-secondary">$699</span>
                <span className="text-white/80">one-time fee</span>
              </div>
              <p className="mt-4 text-secondary font-semibold bg-white/10 backdrop-blur-sm px-4 py-1 rounded-full inline-block">Save $200+ vs. individual products</p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/book" className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl">
                  Get Complete Plan
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl bg-white/10 backdrop-blur-sm p-8 ring-1 ring-white/20 shadow-premium">
                <h3 className="text-xl font-bold text-white mb-6">Everything Included:</h3>
                <ul className="space-y-3">
                  {[
                    "Living Trust & Pour-over Will",
                    "Durable Power of Attorney",
                    "Healthcare Power of Attorney",
                    "Living Will / Healthcare Directive",
                    "HIPAA Authorization",
                    "Guardianship designation",
                    "Digital asset management",
                    "Trust funding guidance",
                    "Attorney consultation",
                    "Priority support",
                    "Free unlimited updates for life",
                  ].map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <svg className="w-6 h-6 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                      </svg>
                      <span className="text-white/90">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-sky">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground">Complete Protection for Your Family</h2>
            <p className="mt-4 text-lg text-foreground/70">Six essential documents in one comprehensive package</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Living Trust", description: "Avoid probate, maintain privacy, and protect your assets from court proceedings." },
              { title: "Last Will & Testament", description: "Pour-over will ensures any assets not in your trust are still distributed properly." },
              { title: "Durable Power of Attorney", description: "Name someone to manage your finances if you become incapacitated." },
              { title: "Healthcare Power of Attorney", description: "Designate who makes medical decisions on your behalf if you cannot." },
              { title: "Living Will", description: "Document your end-of-life care wishes and relieve your family of difficult decisions." },
              { title: "HIPAA Authorization", description: "Ensure your designated agents can access your medical information." },
            ].map((doc) => (
              <div key={doc.title} className="bg-white rounded-3xl p-8 shadow-premium hover:shadow-premium-hover hover:-translate-y-2 transition-all duration-300">
                <h3 className="text-xl font-bold text-foreground mb-3">{doc.title}</h3>
                <p className="text-foreground/70">{doc.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-sand">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-foreground">Why Choose the Complete Plan?</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl p-8 shadow-premium hover:shadow-premium-hover hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-xl font-bold text-primary mb-4">Best Value</h3>
              <p className="text-foreground/70 mb-4">Save over $200 compared to purchasing documents individually. One comprehensive package at one great price.</p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-premium hover:shadow-premium-hover hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-xl font-bold text-primary mb-4">Lifetime Updates</h3>
              <p className="text-foreground/70 mb-4">Life changes. Update your documents anytime, free forever. Marriage, divorce, new children, moves - we've got you covered.</p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-premium hover:shadow-premium-hover hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-xl font-bold text-primary mb-4">Complete Protection</h3>
              <p className="text-foreground/70 mb-4">Cover every scenario: death, incapacity, medical decisions, and asset distribution. Nothing left to chance.</p>
            </div>
            <div className="bg-white rounded-3xl p-8 shadow-premium hover:shadow-premium-hover hover:-translate-y-2 transition-all duration-300">
              <h3 className="text-xl font-bold text-primary mb-4">Priority Support</h3>
              <p className="text-foreground/70 mb-4">Get faster response times and direct access to our estate planning specialists whenever you need help.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-secondary/20 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Complete Peace of Mind, One Simple Price</h2>
          <p className="text-xl text-white/90 mb-10">
            Get every document you need to protect your family and assets. Free lifetime updates included.
          </p>
          <Link href="/book" className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl">
            Get Started for $699
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
