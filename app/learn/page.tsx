import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn About Estate Planning | Trusts, Wills & More",
  description: "Everything you need to know about estate planning. Expert guides, FAQs, and resources to help you protect your family and assets.",
};

const categories = [
  {
    name: "Estate Planning Basics",
    description: "Learn the fundamentals of protecting your family and assets",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
      </svg>
    ),
    articles: [
      "What is estate planning and why do I need it?",
      "5 essential documents everyone needs",
      "Estate planning for young families",
      "Common estate planning mistakes to avoid",
    ],
  },
  {
    name: "Living Trusts",
    description: "Understanding trusts, probate avoidance, and asset protection",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    articles: [
      "Living trust vs. will: Which is right for you?",
      "How to fund your living trust",
      "Revocable vs. irrevocable trusts explained",
      "Avoiding probate with a living trust",
    ],
  },
  {
    name: "Wills & Guardianship",
    description: "Protect your children and distribute your assets properly",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
    articles: [
      "Choosing guardians for your children",
      "What happens if you die without a will?",
      "How to update your will when life changes",
      "Naming an executor: What you need to know",
    ],
  },
  {
    name: "Powers of Attorney",
    description: "Healthcare and financial decision-making authority",
    icon: (
      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
    articles: [
      "Power of attorney explained",
      "Healthcare vs. financial POA",
      "When does a POA take effect?",
      "Living will vs. healthcare directive",
    ],
  },
];

const resources = [
  {
    title: "Estate Planning Checklist",
    description: "Step-by-step guide to organizing your estate planning documents",
    href: "/learn/guides",
    type: "Downloadable PDF",
  },
  {
    title: "Trust Funding Guide",
    description: "How to transfer assets into your living trust",
    href: "/learn/guides",
    type: "Guide",
  },
  {
    title: "State-by-State Requirements",
    description: "Estate planning laws and requirements for all 50 states",
    href: "/learn/guides",
    type: "Reference",
  },
];

export default function LearnPage() {
  return (
    <div className="bg-background">
      <section className="pt-32 pb-20 bg-gradient-to-br from-sage to-sky">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-foreground sm:text-6xl">Estate Planning Knowledge Center</h1>
          <p className="mt-6 text-xl text-foreground/80 max-w-2xl mx-auto">
            Everything you need to know about protecting your family and assets. Expert guides, FAQs, and resources.
          </p>
        </div>
      </section>

      <section className="py-24 bg-sand">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {categories.map((category) => (
              <div key={category.name} className="bg-white rounded-3xl p-8 shadow-premium hover:shadow-premium-hover hover:-translate-y-2 transition-all duration-300">
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/10 text-primary mb-6">
                  {category.icon}
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">{category.name}</h2>
                <p className="text-foreground/70 mb-6">{category.description}</p>
                <ul className="space-y-3">
                  {category.articles.map((article) => (
                    <li key={article} className="flex items-start gap-3">
                      <svg className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                      </svg>
                      <Link href="/learn/blog" className="text-foreground/80 hover:text-secondary transition-colors">
                        {article}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-sky">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground">Free Resources & Tools</h2>
            <p className="mt-4 text-lg text-foreground/70">Downloadable guides and checklists</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((resource) => (
              <Link
                key={resource.title}
                href={resource.href}
                className="group bg-white rounded-3xl p-8 shadow-premium hover:shadow-premium-hover hover:-translate-y-2 transition-all duration-300"
              >
                <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold mb-4">
                  {resource.type}
                </span>
                <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                  {resource.title}
                </h3>
                <p className="text-foreground/70 mb-4">{resource.description}</p>
                <span className="inline-flex items-center gap-2 text-secondary font-semibold">
                  Download Free
                  <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                  </svg>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-tan">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/learn/blog" className="group bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 text-white shadow-premium hover:shadow-premium-hover hover:-translate-y-2 transition-all duration-300">
              <svg className="h-12 w-12 mb-4 opacity-80" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 01-2.25 2.25M16.5 7.5V18a2.25 2.25 0 002.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 002.25 2.25h13.5M6 7.5h3v3H6v-3z" />
              </svg>
              <h3 className="text-2xl font-bold mb-2">Blog Articles</h3>
              <p className="text-white/80 mb-4">In-depth guides and expert insights on estate planning topics</p>
              <span className="inline-flex items-center gap-2 font-semibold group-hover:gap-3 transition-all">
                Read Articles
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>

            <Link href="/learn/faq" className="group bg-gradient-to-br from-secondary to-secondary/80 rounded-3xl p-8 text-white shadow-premium hover:shadow-premium-hover hover:-translate-y-2 transition-all duration-300">
              <svg className="h-12 w-12 mb-4 opacity-80" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
              <h3 className="text-2xl font-bold mb-2">FAQ</h3>
              <p className="text-white/80 mb-4">Quick answers to common estate planning questions</p>
              <span className="inline-flex items-center gap-2 font-semibold group-hover:gap-3 transition-all">
                Browse FAQs
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>

            <Link href="/learn/guides" className="group bg-gradient-to-br from-primary to-primary/80 rounded-3xl p-8 text-white shadow-premium hover:shadow-premium-hover hover:-translate-y-2 transition-all duration-300">
              <svg className="h-12 w-12 mb-4 opacity-80" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
              </svg>
              <h3 className="text-2xl font-bold mb-2">Guides & Checklists</h3>
              <p className="text-white/80 mb-4">Downloadable resources for your estate planning journey</p>
              <span className="inline-flex items-center gap-2 font-semibold group-hover:gap-3 transition-all">
                Get Guides
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Create Your Estate Plan?</h2>
          <p className="text-xl text-white/80 mb-10">
            Put your knowledge into action. Create your trust, will, or complete estate plan today.
          </p>
          <Link href="/products" className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white hover:bg-accent transition-all">
            View Products & Pricing
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
