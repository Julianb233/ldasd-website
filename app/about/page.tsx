import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About LDASD Estate Planning | Making Estate Planning Accessible",
  description: "Our mission is to make estate planning simple, affordable, and accessible for everyone. Attorney-backed documents with a human touch.",
};

const values = [
  {
    title: "Affordable & Accessible",
    description: "Estate planning shouldn't be a luxury. We offer attorney-backed documents at prices everyone can afford.",
  },
  {
    title: "Simple & Easy",
    description: "No confusing legal jargon. Create your estate plan online in minutes with guided, easy-to-understand steps.",
  },
  {
    title: "Attorney-Backed",
    description: "Every document is reviewed by licensed attorneys in your state to ensure legal compliance and your protection.",
  },
  {
    title: "Always There for You",
    description: "Life changes. We provide free updates and support so your estate plan grows with your family.",
  },
];

const timeline = [
  { year: "2010", event: "Founded with a mission to democratize estate planning" },
  { year: "2015", event: "Helped 10,000 families create their first estate plans" },
  { year: "2018", event: "Expanded to all 50 states with state-specific documents" },
  { year: "2020", event: "Launched complete digital estate planning platform" },
  { year: "2023", event: "Reached 100,000 families protected nationwide" },
  { year: "2024", event: "Introduced lifetime updates for Complete Plan members" },
];

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 bg-tan overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-secondary/20 blur-[100px]" />
          <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <span className="inline-block text-secondary font-semibold tracking-wider text-sm uppercase mb-4">
            About Us
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-6xl mb-6">
            Making Estate Planning Simple
          </h1>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto">
            We believe everyone deserves access to quality estate planning, not just the wealthy.
            That&apos;s why we&apos;ve made it affordable, accessible, and easy to protect what matters most.
          </p>
        </div>
      </section>

      {/* Meet Sean */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-block text-secondary font-semibold tracking-wider text-sm uppercase mb-4">
                Meet Your Advisor
              </span>
              <h2 className="text-4xl font-bold tracking-tight text-foreground mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-foreground/70 mb-4">
                At LDASD Estate Planning, we believe protecting your family shouldn't require thousands
                of dollars in legal fees or weeks of complicated paperwork. That's why we created a platform
                that makes estate planning simple, affordable, and accessible to everyone.
              </p>
              <p className="text-lg text-foreground/70 mb-4">
                Our team combines legal expertise with modern technology to deliver attorney-backed estate
                planning documents at a fraction of traditional costs. Based in San Diego, California, we serve
                families in all 50 states with state-specific, legally compliant documents.
              </p>
              <p className="text-lg text-foreground/70 mb-6">
                Whether you need a simple will to name guardians for your children, a living trust to avoid
                probate, or a complete estate plan with healthcare directives, we're here to help you protect
                what matters most—affordably and easily.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                {["Attorney-Backed", "All 50 States", "San Diego Based", "100K+ Families"].map((badge) => (
                  <span key={badge} className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-secondary/20 transition-all duration-300">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.403 12.652a3 3 0 000-5.304 3 3 0 00-3.75-3.751 3 3 0 00-5.305 0 3 3 0 00-3.751 3.75 3 3 0 000 5.305 3 3 0 003.75 3.751 3 3 0 005.305 0 3 3 0 003.751-3.75zm-2.546-4.46a.75.75 0 00-1.214-.883l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                    </svg>
                    {badge}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-hover transition-all duration-400 transform hover:-translate-y-2">
                <div className="relative">
                  <Image
                    src="/images/san-diego/coronado-beach.jpg"
                    alt="Beautiful San Diego Coronado Beach - Home of LDASD Estate Planning"
                    width={600}
                    height={750}
                    className="w-full h-auto object-cover aspect-[4/5]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-40" />
                </div>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-premium p-6 max-w-[220px] hover:shadow-premium-hover hover:-translate-y-1 transition-all duration-400">
                <p className="text-primary font-bold text-lg">Based in San Diego</p>
                <p className="text-foreground/60 text-sm">Serving families in all 50 states</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-sky">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-secondary font-semibold tracking-wider text-sm uppercase mb-4">
              Our Philosophy
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-foreground">
              Guiding Principles
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-white rounded-2xl p-8 shadow-premium hover:shadow-premium-hover hover:-translate-y-2 hover:scale-105 transition-all duration-400 ring-1 ring-black/5">
                <h3 className="text-xl font-bold text-primary mb-3">{value.title}</h3>
                <p className="text-foreground/70">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 bg-sand">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-block text-secondary font-semibold tracking-wider text-sm uppercase mb-4">
              Our Journey
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-foreground">
              25+ Years of Excellence
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-secondary/30" />
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={item.year} className={`flex items-center gap-8 ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                    <span className="text-secondary font-bold text-xl">{item.year}</span>
                    <p className="text-foreground/70 mt-1">{item.event}</p>
                  </div>
                  <div className="w-4 h-4 rounded-full bg-secondary ring-4 ring-secondary/20 z-10 hover:scale-150 transition-all duration-300" />
                  <div className="flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-primary to-primary-dark" />
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-secondary/10 blur-[100px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-primary-light/20 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Protect Your Family?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join over 100,000 families who've created their estate plans with LDASD.
            Get started in minutes.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white hover:bg-secondary-light hover:scale-105 hover:gap-3 transition-all duration-400 shadow-premium hover:shadow-premium-hover"
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
