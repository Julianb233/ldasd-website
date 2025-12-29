import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Last Will & Testament | Name Guardians & Distribute Assets | $199",
  description: "Create your legally binding will online. Name guardians for your children, distribute your assets, and protect your family. Starting at just $199.",
};

export default function WillPage() {
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
              <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">Last Will & Testament</h1>
              <p className="mt-6 text-xl text-white/90">
                Protect your children and distribute your assets with a legally binding will. The essential first step in estate planning.
              </p>
              <div className="mt-8 flex items-baseline gap-4">
                <span className="text-5xl font-bold text-secondary">$199</span>
                <span className="text-white/80">one-time fee</span>
              </div>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/book" className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl">
                  Create Your Will
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="rounded-3xl bg-white/10 backdrop-blur-sm p-8 ring-1 ring-white/20 shadow-premium">
                <h3 className="text-xl font-bold text-white mb-6">What's Included:</h3>
                <ul className="space-y-3">
                  {["Last Will & Testament", "Guardianship designation for minor children", "Asset distribution instructions", "Executor appointment", "Digital asset instructions", "Attorney review included", "Free updates for 1 year", "State-specific legal compliance"].map((feature) => (
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
            <h2 className="text-4xl font-bold text-foreground">Why You Need a Will</h2>
            <p className="mt-4 text-lg text-foreground/70">Essential protection for your family</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Name Guardians", description: "Designate who will care for your minor children if something happens to you. Without a will, the court decides." },
              { title: "Control Asset Distribution", description: "Specify exactly who gets what. Prevent family disputes and ensure your wishes are honored." },
              { title: "Appoint Your Executor", description: "Choose someone you trust to manage your estate and ensure your final wishes are carried out properly." },
            ].map((benefit) => (
              <div key={benefit.title} className="bg-white rounded-3xl p-8 shadow-premium hover:shadow-premium-hover hover:-translate-y-2 transition-all duration-300">
                <h3 className="text-xl font-bold text-foreground mb-3">{benefit.title}</h3>
                <p className="text-foreground/70">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-sand">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground text-center mb-12">Common Questions</h2>
          <div className="space-y-6">
            {[
              { q: "Do I need a will if I don't have much?", a: "Yes! If you have minor children, a will is essential for naming guardians. Even modest estates benefit from clear distribution instructions." },
              { q: "What happens if I die without a will?", a: "The state decides who gets your assets and who cares for your children based on intestacy laws. This rarely matches what you would have wanted." },
              { q: "Can I update my will later?", a: "Absolutely. Life changes, and your will should too. We provide free updates for 1 year, and you can always revise it as needed." },
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

      <section className="relative py-24 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-secondary/20 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Create Your Will Today</h2>
          <p className="text-xl text-white/90 mb-10">Protect your children and ensure your wishes are honored.</p>
          <Link href="/book" className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl">
            Get Started for $199
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
