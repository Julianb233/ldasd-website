import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Planning Guides | Sean Gelt - LDASD Financial, San Diego",
  description: "Free educational guides on retirement planning, Social Security, Medicare, investment strategies, and more from LDASD Financial in San Diego.",
  keywords: "financial planning guides, retirement planning guide, Social Security guide, Medicare guide, investment education, LDASD Financial",
};

const guides = [
  {
    title: "The Complete Retirement Planning Checklist",
    description: "A comprehensive checklist covering everything you need to consider when planning for retirement.",
    category: "Retirement Planning",
    icon: "📋",
  },
  {
    title: "Social Security Claiming Strategies",
    description: "Understand your Social Security options and strategies to maximize your lifetime benefits.",
    category: "Social Security",
    icon: "📊",
  },
  {
    title: "Medicare Enrollment Guide",
    description: "Navigate Medicare enrollment with confidence using this step-by-step guide.",
    category: "Healthcare",
    icon: "🏥",
  },
  {
    title: "Understanding Required Minimum Distributions",
    description: "Learn the rules around RMDs and strategies to minimize their tax impact.",
    category: "Tax Planning",
    icon: "💰",
  },
  {
    title: "Tax-Efficient Withdrawal Strategies",
    description: "Optimize the order and timing of withdrawals to minimize lifetime taxes.",
    category: "Tax Planning",
    icon: "📈",
  },
  {
    title: "Estate Planning Essentials",
    description: "Key documents and strategies everyone needs for a complete estate plan.",
    category: "Estate Planning",
    icon: "🏛️",
  },
  {
    title: "Roth Conversion Decision Guide",
    description: "Evaluate whether a Roth conversion makes sense for your situation.",
    category: "Tax Planning",
    icon: "🔄",
  },
  {
    title: "Preparing for Healthcare Costs in Retirement",
    description: "Plan for Medicare, supplemental insurance, and long-term care expenses.",
    category: "Healthcare",
    icon: "❤️",
  },
  {
    title: "Investment Risk Assessment",
    description: "Understand your risk tolerance and how it should inform your investment strategy.",
    category: "Investments",
    icon: "⚖️",
  },
];

export default function GuidesPage() {
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
            Educational Guides
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
            Free Financial Guides
          </h1>
          <p className="text-xl text-white/80 max-w-3xl">
            Download our comprehensive guides to help you make informed financial decisions.
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <div key={guide.title} className="card-3d bg-white rounded-2xl p-8">
                <span className="text-4xl mb-4 block">{guide.icon}</span>
                <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                  {guide.category}
                </span>
                <h2 className="text-xl font-bold text-foreground mt-2 mb-3">{guide.title}</h2>
                <p className="text-foreground/70 text-sm mb-6">{guide.description}</p>
                <button className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all">
                  Download Guide
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Want Personalized Guidance?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Guides are helpful, but nothing beats personalized advice for your unique situation.
            Schedule a consultation to discuss your specific needs.
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
