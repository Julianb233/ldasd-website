import Link from "next/link";
import type { Metadata } from "next";
import CouplesPricingToggle from "@/components/CouplesPricingToggle";

export const metadata: Metadata = {
  title: "Pricing | Affordable Estate Planning Starting at $199",
  description: "Simple, transparent pricing for estate planning. Will $199, Trust $599, Complete Plan $699. Couples plans available. No hidden fees. Free updates included.",
};

const faqs = [
  {
    q: "Are there any hidden fees?",
    a: "No hidden fees ever. The price you see is the complete price. Updates during your free period are included at no charge.",
  },
  {
    q: "Can I add my spouse?",
    a: "Yes! Toggle to \"Couples\" pricing above to see couples rates. For an additional $100 on any plan, both you and your partner get complete, customized document sets with shared account access.",
  },
  {
    q: "What's included in the couples plan?",
    a: "Couples plans include two complete document sets (one for each partner), mirror documents that reference each other properly, shared account access so both partners can view and manage documents, and the ability to invite your partner to their own account.",
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
  {
    q: "What is the Attorney Consultation add-on?",
    a: "For $299, you get a 60-minute 1-on-1 consultation with a licensed estate planning attorney in your state. They'll review your documents, answer questions, and provide personalized recommendations. You can add it to any plan during checkout.",
  },
];

export default function PricingPage() {
  return (
    <div className="bg-background">
      <section className="pt-32 pb-20 bg-gradient-to-br from-sage to-sky">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-foreground sm:text-6xl">Simple, Transparent Pricing</h1>
          <p className="mt-6 text-xl text-foreground/80 max-w-2xl mx-auto">
            One-time fee. No subscriptions. No hidden costs. Choose the plan that&apos;s right for your family.
          </p>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <CouplesPricingToggle />
        </div>
      </section>

      <section className="py-24 bg-sky">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-semibold text-secondary-dark mb-4">
              Recommended Add-On
            </span>
            <h2 className="text-4xl font-bold text-foreground">
              Attorney Consultation
            </h2>
            <p className="mt-4 text-lg text-foreground/70">
              Add personalized legal guidance to any plan
            </p>
          </div>
          <div className="rounded-3xl bg-white p-8 shadow-premium ring-1 ring-secondary/20">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl font-bold text-secondary">$299</span>
                  <span className="text-sm text-foreground/60">one-time add-on</span>
                </div>
                <p className="text-foreground/70 mb-6">
                  Get a 60-minute 1-on-1 consultation with a licensed estate planning attorney
                  in your state. Perfect for reviewing your documents, discussing complex situations,
                  or getting personalized tax and asset protection advice.
                </p>
                <div className="flex gap-3">
                  <Link
                    href="/products/attorney-consultation"
                    className="rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white hover:bg-accent transition-all duration-300 shadow-md"
                  >
                    Learn More
                  </Link>
                  <Link
                    href="/book?addon=attorney-consultation"
                    className="rounded-full border-2 border-secondary/30 px-6 py-3 text-sm font-semibold text-secondary hover:bg-secondary/5 transition-all duration-300"
                  >
                    Add to Your Plan
                  </Link>
                </div>
              </div>
              <ul className="space-y-3">
                {[
                  "60-minute video or phone consultation",
                  "Attorney licensed in your state",
                  "Document review & recommendations",
                  "Written summary of advice",
                  "Follow-up email support",
                  "Tax planning considerations",
                ].map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <svg
                      className="h-6 w-5 flex-none text-secondary"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-foreground/80">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
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
