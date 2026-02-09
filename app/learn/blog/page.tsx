import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estate Planning Blog | Expert Guides & Insights",
  description: "In-depth articles and expert insights on estate planning, trusts, wills, and protecting your family's future.",
};

const blogPosts = [
  {
    title: "What is Estate Planning and Why Do I Need It?",
    excerpt: "Estate planning isn't just for the wealthy. Learn why everyone needs a plan and how to get started.",
    category: "Basics",
    date: "December 15, 2024",
    readTime: "5 min read",
  },
  {
    title: "Living Trust vs. Will: Which is Right for You?",
    excerpt: "Understand the key differences between living trusts and wills, and discover which option best fits your family's needs.",
    category: "Trusts",
    date: "December 10, 2024",
    readTime: "7 min read",
  },
  {
    title: "Choosing Guardians for Your Children",
    excerpt: "The most important decision parents make. Here's how to choose the right guardians for your kids.",
    category: "Wills",
    date: "December 5, 2024",
    readTime: "6 min read",
  },
  {
    title: "How to Avoid Probate with a Living Trust",
    excerpt: "Save your family time and money by avoiding probate. Learn how living trusts keep your estate private and efficient.",
    category: "Trusts",
    date: "November 30, 2024",
    readTime: "8 min read",
  },
  {
    title: "Estate Planning for Young Families",
    excerpt: "You don't need millions to need estate planning. Protect your young family with these essential documents.",
    category: "Basics",
    date: "November 25, 2024",
    readTime: "5 min read",
  },
  {
    title: "Power of Attorney Explained",
    excerpt: "Understand the difference between healthcare and financial power of attorney and why you need both.",
    category: "POA",
    date: "November 20, 2024",
    readTime: "6 min read",
  },
];

export default function BlogPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-sage to-sky">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-foreground sm:text-6xl">Estate Planning Blog</h1>
          <p className="mt-6 text-xl text-foreground/80 max-w-2xl mx-auto">
            Expert insights, practical guides, and everything you need to know about protecting your family.
          </p>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="py-24 bg-sand">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article
                key={post.title}
                className="bg-white rounded-3xl p-8 shadow-premium hover:shadow-premium-hover hover:-translate-y-2 transition-all duration-300"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-4">
                  {post.category}
                </span>
                <h2 className="text-2xl font-bold text-foreground mb-3 hover:text-primary transition-colors">
                  {post.title}
                </h2>
                <p className="text-foreground/70 mb-6">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-foreground/50">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
                <Link
                  href="#"
                  className="mt-6 inline-flex items-center gap-2 text-secondary font-semibold hover:gap-3 transition-all"
                >
                  Read Article
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Create Your Estate Plan?</h2>
          <p className="text-xl text-white/80 mb-10">
            Stop reading, start protecting. Create your estate plan today.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white hover:bg-secondary/90 shadow-premium transition-all"
          >
            Get Started
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
