import Link from "next/link";
import type { Metadata } from "next";
import { PricingToggle } from "@/components/PricingToggle";

export const metadata: Metadata = {
  title: "Pricing | Affordable Estate Planning Starting at $199",
  description: "Simple, transparent pricing for estate planning. Will $199, Trust $599, Complete Plan $699. No hidden fees. Couples pricing available. Free updates included.",
};

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
          <PricingToggle />

          <div className="mt-16 text-center">
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
