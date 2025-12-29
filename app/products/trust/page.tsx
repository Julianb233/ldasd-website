import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Living Trust | Avoid Probate & Protect Your Assets | $599",
  description: "Create your living trust online and avoid probate. Keep your estate private, protect your assets, and ensure your wishes are honored. Attorney-backed, starting at $599.",
};

export default function TrustPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-secondary/20 blur-[120px]" />
          <div className="absolute inset-0 bg-white/5" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-4 py-1 rounded-full bg-secondary text-white text-sm font-semibold mb-6 shadow-lg">
                Most Popular
              </span>
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
                Living Trust
              </h1>
              <p className="mt-6 text-xl text-white/90">
                Avoid probate, keep your estate private, and protect your assets with a comprehensive living trust.
              </p>
              <div className="mt-8 flex items-baseline gap-4">
                <span className="text-5xl font-bold text-secondary">$599</span>
                <span className="text-white/80">one-time fee</span>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link
                  href="/book"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Create Your Trust
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center justify-center rounded-full bg-white/10 px-8 py-4 text-lg font-semibold text-white ring-1 ring-white/20 hover:bg-white/20 transition-all duration-300"
                >
                  Compare Plans
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl bg-white/10 backdrop-blur-sm p-8 ring-1 ring-white/20 shadow-premium">
                <h3 className="text-xl font-bold text-white mb-6">What's Included:</h3>
                <ul className="space-y-3">
                  {[
                    "Revocable Living Trust",
                    "Pour-over Will included",
                    "Avoid probate completely",
                    "Keep estate details private",
                    "Incapacity protection",
                    "Asset protection strategies",
                    "Attorney consultation",
                    "State-specific legal compliance",
                    "Free updates for 3 years",
                    "Transfer deed assistance",
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

      {/* Benefits */}
      <section className="py-24 bg-tan">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
            <div>
              <h2 className="text-4xl font-bold text-foreground">Why Choose a Living Trust?</h2>
              <p className="mt-4 text-lg text-foreground/70">Key benefits that protect your family</p>
            </div>
            <div className="relative rounded-3xl overflow-hidden shadow-premium">
              <Image
                src="/images/families/grandparents.jpg"
                alt="Grandparents enjoying retirement with family"
                width={500}
                height={350}
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Avoid Probate",
                description: "Skip the lengthy, expensive court process. Your assets transfer immediately to your beneficiaries without court involvement or public disclosure.",
              },
              {
                title: "Privacy Protection",
                description: "Unlike wills, trusts are not public record. Keep your estate details, asset values, and beneficiaries completely private.",
              },
              {
                title: "Incapacity Planning",
                description: "If you become unable to manage your affairs, your successor trustee can step in immediately without court proceedings.",
              },
            ].map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-3xl p-8 shadow-premium hover:shadow-premium-hover hover:-translate-y-2 transition-all duration-300">
                <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-foreground/70">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-sage">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground text-center mb-12">Common Questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "What is a living trust?",
                a: "A living trust is a legal document that holds ownership of your assets during your lifetime and distributes them to your beneficiaries after your death, without going through probate court.",
              },
              {
                q: "Do I still need a will if I have a trust?",
                a: "Yes! We include a \"pour-over\" will that captures any assets not transferred to your trust and ensures they're still distributed according to your wishes.",
              },
              {
                q: "How long does it take to create a trust?",
                a: "Most people complete their trust documents in 30-60 minutes online. Once submitted, you'll receive your attorney-reviewed documents within 2-3 business days.",
              },
              {
                q: "Can I change my trust later?",
                a: "Absolutely. This is a \"revocable\" living trust, meaning you can modify or revoke it at any time. We provide free updates for 3 years.",
              },
            ].map((faq) => (
              <details key={faq.q} className="group bg-white rounded-2xl p-6 shadow-premium hover:shadow-premium-hover transition-all duration-300">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-foreground">
                  {faq.q}
                  <svg className="w-5 h-5 text-primary group-open:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-foreground/70">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-secondary/20 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Create Your Trust?</h2>
          <p className="text-xl text-white/90 mb-10">
            Protect your family and avoid probate with a professional living trust.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started Now
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
