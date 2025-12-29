import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Pricing | Affordable Estate Planning Starting at $199",
  description: "Simple, transparent pricing for estate planning. Will $199, Trust $599, Complete Plan $699. No hidden fees. Free updates included.",
};

const tiers = [
  {
    name: "Will",
    price: "$199",
    description: "Essential protection for families",
    features: [
      "Last Will & Testament",
      "Guardianship designation",
      "Executor appointment",
      "Asset distribution",
      "Digital assets",
      "Attorney review",
      "1 year free updates",
      "Email support",
    ],
    cta: "Create Your Will",
    href: "/products/will",
    highlighted: false,
  },
  {
    name: "Living Trust",
    price: "$599",
    description: "Avoid probate & maintain privacy",
    features: [
      "Everything in Will, plus:",
      "Revocable Living Trust",
      "Pour-over Will",
      "Avoid probate",
      "Privacy protection",
      "Incapacity planning",
      "Trust funding guidance",
      "3 years free updates",
      "Priority email support",
    ],
    cta: "Create Your Trust",
    href: "/products/trust",
    highlighted: true,
  },
  {
    name: "Complete Plan",
    price: "$699",
    description: "Comprehensive protection",
    features: [
      "Everything in Trust, plus:",
      "Power of Attorney",
      "Healthcare POA",
      "Living Will",
      "HIPAA Authorization",
      "Digital asset management",
      "Attorney consultation",
      "Lifetime free updates",
      "Priority phone support",
    ],
    cta: "Get Complete Plan",
    href: "/products/estate-plan",
    highlighted: false,
  },
];

const faqs = [
  {
    q: "Are there any hidden fees?",
    a: "No hidden fees ever. The price you see is the complete price. Updates during your free period are included at no charge.",
  },
  {
    q: "Can I add my spouse?",
    a: "Yes! Add your spouse or partner to any plan for an additional $100. You'll each get complete, customized documents.",
  },
  {
    q: "What if I need to make changes?",
    a: "Will includes 1 year of free updates, Trust includes 3 years, and Complete Plan includes lifetime free updates. After that, updates are $49.",
  },
  {
    q: "Is this legally binding in my state?",
    a: "Yes! All documents are customized for your state's specific laws and reviewed by attorneys licensed in your state.",
  },
  {
    q: "Do you offer refunds?",
    a: "Yes! We offer a 60-day money-back guarantee. If you're not satisfied for any reason, we'll refund you in full.",
  },
];

export default function PricingPage() {
  return (
    <div className="bg-background">
      <section className="pt-32 pb-20 bg-gradient-to-br from-sage to-sky">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-foreground sm:text-6xl">Simple, Transparent Pricing</h1>
          <p className="mt-6 text-xl text-foreground/80 max-w-2xl mx-auto">
            One-time fee. No subscriptions. No hidden costs. Choose the plan that's right for your family.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
            {tiers.map((tier) => (
              <div
                key={tier.name}
                className={`relative rounded-3xl p-8 transition-all duration-300 ${
                  tier.highlighted
                    ? "bg-white shadow-premium hover:shadow-premium-hover ring-2 ring-secondary scale-105 z-10 hover:-translate-y-2"
                    : "bg-white shadow-premium hover:shadow-premium-hover hover:-translate-y-2"
                }`}
              >
                {tier.highlighted && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-secondary px-6 py-2 text-sm font-semibold text-white shadow-premium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-foreground">
                    {tier.name}
                  </h3>
                  <p className="mt-2 text-sm text-foreground/60">
                    {tier.description}
                  </p>
                  <div className="mt-6 flex items-baseline gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-foreground">
                      {tier.price}
                    </span>
                    <span className="text-sm text-foreground/60">
                      one-time
                    </span>
                  </div>
                </div>

                <Link
                  href={tier.href}
                  className={`block w-full rounded-full py-3 px-6 text-center text-sm font-semibold mb-8 transition-all duration-300 ${
                    tier.highlighted
                      ? "bg-secondary text-white hover:bg-secondary/90 shadow-premium"
                      : "bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg"
                  }`}
                >
                  {tier.cta}
                </Link>

                <ul role="list" className="space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <svg
                        className={`h-6 w-5 flex-none ${tier.highlighted ? "text-secondary" : "text-primary"}`}
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-foreground/70">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-lg text-foreground/70 mb-4">
              Add your spouse or partner to any plan for +$100
            </p>
            <p className="text-sm text-foreground/50">
              60-day money-back guarantee • Free updates included • State-specific documents
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 bg-tan">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-foreground text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <details key={faq.q} className="group bg-white rounded-2xl p-6 shadow-premium hover:shadow-premium-hover transition-all duration-300">
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-foreground">
                  {faq.q}
                  <svg className="w-5 h-5 text-secondary group-open:rotate-180 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <p className="mt-4 text-foreground/70">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Get Started?</h2>
          <p className="text-xl text-white/80 mb-10">
            Choose your plan and protect your family today. No appointments necessary.
          </p>
          <Link href="/book" className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white hover:bg-accent transition-all">
            Create Your Estate Plan
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
