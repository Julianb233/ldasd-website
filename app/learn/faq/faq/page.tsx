import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Sean Gelt - LDASD Financial, San Diego",
  description: "Frequently asked questions about LDASD Financial's wealth management and financial planning services. Learn about fees, minimums, and our fiduciary approach.",
  keywords: "financial advisor FAQ, wealth management questions, fiduciary advisor, LDASD Financial, San Diego financial planning",
};

const faqs = [
  {
    category: "About Our Services",
    questions: [
      {
        q: "What is a fiduciary, and why does it matter?",
        a: "A fiduciary is legally and ethically obligated to act in your best interest at all times. Unlike advisors who may only need to recommend 'suitable' investments, fiduciaries must put your interests ahead of their own. This means no hidden commissions or conflicts of interest—just advice designed to help you achieve your goals.",
      },
      {
        q: "What services do you provide?",
        a: "We offer comprehensive financial planning and investment management services, including retirement planning, investment management, tax optimization strategies, estate planning coordination, and wealth preservation. Our goal is to address every aspect of your financial life.",
      },
      {
        q: "How do you differ from other financial advisors?",
        a: "We operate as fiduciaries, meaning we always put your interests first. We provide personalized, comprehensive planning rather than selling products. Our fee-only structure ensures our recommendations are unbiased, and we take the time to understand your unique situation and goals.",
      },
    ],
  },
  {
    category: "Getting Started",
    questions: [
      {
        q: "What is the minimum to work with you?",
        a: "For comprehensive wealth management, we typically work with clients who have $500,000 or more in investable assets. For standalone financial planning engagements, the minimum is $250,000. However, we're happy to discuss your situation during a complimentary consultation.",
      },
      {
        q: "What should I expect in the initial consultation?",
        a: "The initial consultation is a no-obligation conversation where we learn about your financial situation, goals, and concerns. We'll discuss our approach to financial planning and determine if we're a good fit. It's also an opportunity for you to ask questions and get a feel for how we work.",
      },
      {
        q: "How long does the onboarding process take?",
        a: "After deciding to work together, the onboarding process typically takes 2-4 weeks. This includes gathering your financial information, completing our discovery process, and developing your initial financial plan and investment strategy.",
      },
    ],
  },
  {
    category: "Fees & Costs",
    questions: [
      {
        q: "How are your fees structured?",
        a: "We charge a transparent fee based on assets under management (AUM). Our fees are clearly disclosed upfront, with no hidden costs or commissions. This aligns our interests with yours—we succeed when your portfolio grows.",
      },
      {
        q: "Are there any additional fees I should know about?",
        a: "Beyond our advisory fee, you may incur expenses such as fund expense ratios within your investments, custodial fees (typically minimal), and fees for specialized services like legal document preparation (handled by third parties). We always disclose all costs before you begin.",
      },
      {
        q: "Do you receive commissions on products you recommend?",
        a: "No. We are fee-only advisors and do not receive commissions or kickbacks from any products we recommend. This ensures our advice is always in your best interest.",
      },
    ],
  },
  {
    category: "Investment Approach",
    questions: [
      {
        q: "What is your investment philosophy?",
        a: "We follow an evidence-based investment approach grounded in academic research. We believe in diversification, keeping costs low, maintaining discipline during market volatility, and focusing on long-term wealth accumulation rather than trying to time the market.",
      },
      {
        q: "Where will my money be held?",
        a: "Your assets are held at a reputable third-party custodian (such as Charles Schwab or Fidelity). We never have direct access to your funds—we can only direct investments on your behalf. This provides an important layer of security and transparency.",
      },
      {
        q: "How often will my portfolio be rebalanced?",
        a: "We monitor portfolios continuously and rebalance as needed to maintain your target allocation. This typically occurs when allocations drift beyond acceptable ranges or when tax-efficient opportunities arise.",
      },
    ],
  },
  {
    category: "Working Together",
    questions: [
      {
        q: "How often will we meet?",
        a: "We typically schedule formal review meetings quarterly or semi-annually, depending on your preference. However, we're always available for questions or concerns that arise between scheduled meetings.",
      },
      {
        q: "Can I contact you with questions outside of scheduled meetings?",
        a: "Absolutely. We encourage you to reach out whenever you have questions or when life changes occur that might impact your financial plan. Responsive communication is a cornerstone of our service.",
      },
      {
        q: "Do you work with other professionals (CPAs, attorneys)?",
        a: "Yes, we regularly coordinate with our clients' CPAs, estate attorneys, and other professionals to ensure all aspects of your financial life work together seamlessly. This collaborative approach leads to better outcomes.",
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-br from-primary via-primary-dark to-primary overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/20 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <Link href="/resources" className="inline-flex items-center gap-2 text-accent hover:text-accent-light transition-colors mb-6">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Back to Resources
          </Link>
          <span className="inline-block text-accent font-semibold tracking-wider text-sm uppercase mb-4">
            FAQ
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-white/80 max-w-3xl">
            Find answers to common questions about our services, approach, and what
            it&apos;s like to work with LDASD Financial.
          </p>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          {faqs.map((section) => (
            <div key={section.category} className="mb-16">
              <h2 className="text-2xl font-bold text-foreground mb-8 pb-4 border-b border-foreground/10">
                {section.category}
              </h2>
              <div className="space-y-8">
                {section.questions.map((faq) => (
                  <div key={faq.q}>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{faq.q}</h3>
                    <p className="text-foreground/70">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Have More Questions?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Schedule a complimentary consultation to discuss your specific questions
            and learn how we can help.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 text-lg font-semibold text-primary hover:bg-accent-light transition-all"
          >
            Book Your Free Consultation
          </Link>
        </div>
      </section>
    </div>
  );
}
