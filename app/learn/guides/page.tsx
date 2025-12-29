import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estate Planning Guides & Checklists | Free Downloads",
  description: "Download free estate planning guides, checklists, and resources. Everything you need to organize and protect your family's future.",
};

const guides = [
  {
    title: "Estate Planning Checklist",
    description: "A comprehensive step-by-step checklist to organize all your estate planning documents and information.",
    type: "PDF Checklist",
    pages: "3 pages",
    icon: (
      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    title: "Trust Funding Guide",
    description: "Detailed instructions on how to transfer assets into your living trust, including real estate, bank accounts, and investments.",
    type: "PDF Guide",
    pages: "8 pages",
    icon: (
      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
      </svg>
    ),
  },
  {
    title: "Guardian Selection Worksheet",
    description: "Important questions to consider when choosing guardians for your children, plus a comparison worksheet.",
    type: "PDF Worksheet",
    pages: "5 pages",
    icon: (
      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
      </svg>
    ),
  },
  {
    title: "Asset Inventory Template",
    description: "Organize all your assets, accounts, and important documents in one place. Essential for estate planning.",
    type: "Excel Template",
    pages: "Spreadsheet",
    icon: (
      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
      </svg>
    ),
  },
  {
    title: "State-by-State Requirements",
    description: "Estate planning laws and requirements for all 50 states, including witness requirements and specific regulations.",
    type: "Reference Guide",
    pages: "25 pages",
    icon: (
      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
      </svg>
    ),
  },
  {
    title: "Digital Assets Guide",
    description: "How to include digital assets in your estate plan: cryptocurrency, social media, cloud storage, and online accounts.",
    type: "PDF Guide",
    pages: "6 pages",
    icon: (
      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25m18 0A2.25 2.25 0 0018.75 3H5.25A2.25 2.25 0 003 5.25m18 0V12a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 12V5.25" />
      </svg>
    ),
  },
];

export default function GuidesPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-sage to-sky">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-foreground sm:text-6xl">Free Guides & Resources</h1>
          <p className="mt-6 text-xl text-foreground/80 max-w-2xl mx-auto">
            Download our comprehensive guides, checklists, and templates to help you organize your estate planning journey.
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="py-24 bg-sky">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {guides.map((guide) => (
              <div
                key={guide.title}
                className="bg-white rounded-3xl p-8 shadow-premium hover:shadow-premium-hover hover:-translate-y-2 transition-all duration-300"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 text-primary mb-6">
                  {guide.icon}
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-block px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-semibold">
                    {guide.type}
                  </span>
                  <span className="text-sm text-foreground/50">{guide.pages}</span>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-3">{guide.title}</h2>
                <p className="text-foreground/70 mb-6">{guide.description}</p>
                <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-secondary text-white font-semibold hover:bg-secondary/90 shadow-premium transition-all">
                  Download Free
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resource */}
      <section className="py-24 bg-tan">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-12 shadow-premium text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Complete Estate Planning Toolkit
            </h2>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              Get all our guides, checklists, and templates in one comprehensive download. Everything you need to organize your estate planning from start to finish.
            </p>
            <button className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-secondary text-white text-lg font-semibold hover:bg-secondary/90 shadow-premium hover:shadow-premium-hover transition-all">
              Download Complete Toolkit
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary">
        <div className="mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">Ready to Create Your Estate Plan?</h2>
          <p className="text-xl text-white/80 mb-10">
            You've got the knowledge. Now take action and protect your family.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white hover:bg-secondary/90 shadow-premium transition-all"
          >
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
