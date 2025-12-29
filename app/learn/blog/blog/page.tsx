import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Insights Blog | Sean Gelt - LDASD Financial, San Diego",
  description: "Expert insights on retirement planning, investment strategies, tax optimization, and wealth management from Sean Gelt at LDASD Financial in San Diego.",
  keywords: "financial blog, retirement planning insights, investment strategies, wealth management tips, LDASD Financial, San Diego financial advisor",
};

const blogPosts = [
  {
    title: "5 Retirement Income Mistakes to Avoid",
    excerpt: "Learn about common retirement income planning errors that can jeopardize your financial security and how to avoid them.",
    category: "Retirement Planning",
    date: "December 2024",
  },
  {
    title: "Understanding Social Security Claiming Strategies",
    excerpt: "Maximize your lifetime Social Security benefits with strategic claiming decisions based on your unique circumstances.",
    category: "Social Security",
    date: "December 2024",
  },
  {
    title: "Tax-Loss Harvesting: A Year-End Strategy",
    excerpt: "Discover how tax-loss harvesting can help reduce your tax burden while maintaining your investment strategy.",
    category: "Tax Strategies",
    date: "November 2024",
  },
  {
    title: "The Importance of Beneficiary Designations",
    excerpt: "Why regularly reviewing your beneficiary designations is crucial for your estate plan.",
    category: "Estate Planning",
    date: "November 2024",
  },
  {
    title: "Market Volatility: Staying Disciplined",
    excerpt: "How to maintain investment discipline during periods of market uncertainty and volatility.",
    category: "Investment Management",
    date: "October 2024",
  },
  {
    title: "Roth Conversions: Is Now the Right Time?",
    excerpt: "Evaluating whether a Roth conversion makes sense for your tax and retirement planning situation.",
    category: "Tax Strategies",
    date: "October 2024",
  },
];

export default function BlogPage() {
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
            Blog & Insights
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl mb-6">
            Financial Insights
          </h1>
          <p className="text-xl text-white/80 max-w-3xl">
            Stay informed with our latest thoughts on financial planning, market trends,
            and strategies for building and preserving wealth.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article key={post.title} className="card-3d bg-white rounded-2xl overflow-hidden">
                <div className="aspect-[16/9] bg-gradient-to-br from-primary/10 to-accent/5" />
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-3">
                    <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-xs text-foreground/50">{post.date}</span>
                  </div>
                  <h2 className="text-xl font-bold text-foreground mb-2">{post.title}</h2>
                  <p className="text-foreground/70 text-sm mb-4">{post.excerpt}</p>
                  <span className="inline-flex items-center gap-2 text-accent font-semibold text-sm">
                    Read More
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-primary/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Subscribe to Our Newsletter
          </h2>
          <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
            Get our latest insights delivered directly to your inbox.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-full border border-foreground/20 focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <button
              type="submit"
              className="px-8 py-3 rounded-full bg-accent text-primary font-semibold hover:bg-accent-light transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
