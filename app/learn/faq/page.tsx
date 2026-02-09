import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estate Planning FAQ | Common Questions Answered",
  description: "Get answers to the most common estate planning questions. Learn about trusts, wills, probate, and protecting your family.",
};

const faqs = [
  {
    category: "Getting Started",
    questions: [
      {
        q: "What is estate planning?",
        a: "Estate planning is the process of arranging for the management and distribution of your assets after you pass away or become incapacitated. It includes creating documents like wills, trusts, powers of attorney, and healthcare directives to protect your family and ensure your wishes are followed.",
      },
      {
        q: "When should I start estate planning?",
        a: "The best time to start is now. If you have assets, loved ones, or minor children, you need estate planning. Major life events like marriage, having children, buying a home, or starting a business are ideal times to create or update your plan.",
      },
      {
        q: "How much does estate planning cost?",
        a: "Our products start at just $199 for a will, $599 for a living trust, and $699 for a complete estate plan. Traditional attorneys often charge $2,000-$5,000 or more for similar documents.",
      },
    ],
  },
  {
    category: "Wills",
    questions: [
      {
        q: "What happens if I die without a will?",
        a: "If you die without a will (called dying 'intestate'), the state decides how your assets are distributed and who raises your children. This process is expensive, time-consuming, and may not align with your wishes. The court will appoint guardians for minor children and distribute assets according to state law.",
      },
      {
        q: "Can I name guardians for my children in a will?",
        a: "Yes! Naming guardians for minor children is one of the most important reasons to have a will. Without a will, the court decides who raises your kids. A will lets you choose the people you trust most to care for your children.",
      },
      {
        q: "How often should I update my will?",
        a: "Review your will every 3-5 years and update it after major life changes like marriage, divorce, births, deaths, significant asset changes, or moving to a new state.",
      },
    ],
  },
  {
    category: "Living Trusts",
    questions: [
      {
        q: "What is a living trust?",
        a: "A living trust (also called a revocable living trust) is a legal document that holds your assets during your lifetime and distributes them after you die—without going through probate. You maintain complete control and can change or revoke the trust at any time.",
      },
      {
        q: "Why do I need a living trust?",
        a: "Living trusts avoid probate (saving time and money), keep your estate private (wills become public record), protect assets if you become incapacitated, and make it easier for your family to manage your affairs. If you own real estate or want privacy, a trust is essential.",
      },
      {
        q: "How do I fund my living trust?",
        a: "Funding a trust means transferring ownership of your assets into the trust. This includes changing titles on real estate, bank accounts, investment accounts, and other assets to the name of your trust. We provide detailed instructions on how to fund your trust.",
      },
    ],
  },
  {
    category: "Powers of Attorney",
    questions: [
      {
        q: "What is a power of attorney?",
        a: "A power of attorney (POA) is a legal document that appoints someone to make decisions on your behalf if you become incapacitated. There are two types: financial POA (manages your finances) and healthcare POA (makes medical decisions).",
      },
      {
        q: "When does a power of attorney take effect?",
        a: "Most POAs are 'durable' and take effect immediately when signed, but only come into play when needed. Some are 'springing' POAs that only activate when you become incapacitated. We recommend durable POAs for most situations.",
      },
    ],
  },
  {
    category: "Probate",
    questions: [
      {
        q: "What is probate?",
        a: "Probate is the court-supervised process of distributing a deceased person's assets. It involves validating the will, paying debts and taxes, and distributing remaining assets. Probate is public, expensive (often 3-7% of estate value), and can take 9-24 months.",
      },
      {
        q: "How do I avoid probate?",
        a: "The best way to avoid probate is with a living trust. You can also use beneficiary designations, joint ownership, payable-on-death accounts, and transfer-on-death deeds. A living trust is the most comprehensive solution.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-sage to-sky">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-foreground sm:text-6xl">Frequently Asked Questions</h1>
          <p className="mt-6 text-xl text-foreground/80 max-w-2xl mx-auto">
            Quick answers to common estate planning questions. Still have questions? Contact us anytime.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-24 bg-sage">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="space-y-16">
            {faqs.map((section) => (
              <div key={section.category}>
                <h2 className="text-3xl font-bold text-foreground mb-8">{section.category}</h2>
                <div className="space-y-6">
                  {section.questions.map((faq) => (
                    <details
                      key={faq.q}
                      className="group bg-white rounded-2xl p-6 shadow-premium hover:shadow-premium-hover transition-all duration-300"
                    >
                      <summary className="flex justify-between items-center cursor-pointer font-semibold text-foreground text-lg">
                        {faq.q}
                        <svg
                          className="w-5 h-5 text-secondary group-open:rotate-180 transition-transform duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                      </summary>
                      <p className="mt-4 text-foreground/70 leading-relaxed">{faq.a}</p>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Still Have Questions?</h2>
          <p className="text-xl text-white/80 mb-10">
            Schedule a free consultation or start creating your estate plan today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white hover:bg-secondary/90 shadow-premium transition-all"
            >
              Get Started
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-8 py-4 text-lg font-semibold text-white ring-1 ring-white/20 hover:bg-white/20 transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
