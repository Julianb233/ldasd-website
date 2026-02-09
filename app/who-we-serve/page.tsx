import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import WhoWeServeCarousel from "@/components/WhoWeServeCarousel";

export const metadata: Metadata = {
  title: "Who We Serve | Estate Planning for Every Family",
  description: "LDASD serves families, couples, parents, retirees, and anyone who wants to protect what matters most. Affordable estate planning for everyone.",
};

const clientTypes = [
  {
    title: "Young Families with Children",
    description: "Parents with minor children who need to name guardians, ensure their children are protected, and distribute assets responsibly.",
    needs: [
      "Guardianship designation for children",
      "Asset distribution planning",
      "Life insurance coordination",
      "Creating a financial safety net",
      "Affordable, accessible documents",
    ],
    image: "/images/who-we-serve/young-families.png",
  },
  {
    title: "Couples & Married Partners",
    description: "Married or unmarried couples who want to protect each other, avoid probate, and ensure their assets pass smoothly to their partner.",
    needs: [
      "Joint estate planning documents",
      "Spousal protection strategies",
      "Avoiding probate together",
      "Healthcare decision authority",
      "Asset transfer planning",
    ],
    image: "/images/who-we-serve/couples.png",
  },
  {
    title: "Homeowners & Property Owners",
    description: "Anyone who owns real estate and wants to avoid the costly, time-consuming probate process while keeping their estate private.",
    needs: [
      "Living trust to avoid probate",
      "Property transfer planning",
      "Privacy protection",
      "Multi-property management",
      "Real estate asset distribution",
    ],
    image: "/images/who-we-serve/homeowners.png",
  },
  {
    title: "Retirees & Pre-Retirees",
    description: "Individuals in or approaching retirement who need comprehensive planning for healthcare decisions, asset distribution, and legacy protection.",
    needs: [
      "Healthcare directives",
      "Power of attorney documents",
      "Legacy planning",
      "Incapacity protection",
      "Multi-generational planning",
    ],
    image: "/images/who-we-serve/retirees.png",
  },
  {
    title: "Single Parents",
    description: "Single parents who need to ensure their children are protected and cared for if something happens, with clear guardianship and financial provisions.",
    needs: [
      "Critical guardianship designation",
      "Financial protection for children",
      "Affordable estate planning",
      "Life insurance integration",
      "Simplified asset distribution",
    ],
    image: "/images/who-we-serve/single-parents.png",
  },
  {
    title: "Pet Owners",
    description: "Pet parents who want to ensure their beloved companions are cared for, with designated caregivers and financial provisions.",
    needs: [
      "Pet guardianship designation",
      "Financial provisions for pet care",
      "Caregiver instructions",
      "Veterinary care planning",
      "Peace of mind for pet parents",
    ],
    image: "/images/who-we-serve/pet-owners.png",
  },
];

export default function WhoWeServePage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative py-24 sm:py-32 bg-gradient-to-br from-sky to-tan overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-secondary/20 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <span className="inline-block text-secondary font-semibold tracking-wider text-sm uppercase mb-4">
                Who We Serve
              </span>
              <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-6xl mb-6">
                Estate Planning for Everyone
              </h1>
              <p className="text-xl text-foreground/80">
                From young families to retirees, homeowners to pet parents—if you have loved ones
                or assets to protect, we&apos;re here for you.
              </p>
            </div>
            <div className="relative mx-auto lg:mx-0">
              <WhoWeServeCarousel />
            </div>
          </div>
        </div>
      </section>

      {/* Client Types */}
      <section className="py-24 bg-sage">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
            {clientTypes.map((client) => (
              <div key={client.title} className="bg-white rounded-3xl overflow-hidden shadow-premium hover:shadow-premium-hover hover:-translate-y-2 hover:scale-[1.02] transition-all duration-300">
                <div className="relative h-48 w-full">
                  <Image
                    src={client.image}
                    alt={`${client.title} in San Diego`}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 text-center">
                  <h2 className="text-2xl font-bold text-foreground mb-4">{client.title}</h2>
                  <p className="text-foreground/70 mb-6">{client.description}</p>
                  <h3 className="font-semibold text-foreground mb-4 text-sm uppercase tracking-wider">Common Needs:</h3>
                  <ul className="space-y-3">
                    {client.needs.map((need) => (
                      <li key={need} className="flex items-center justify-center gap-3">
                        <svg className="w-5 h-5 text-secondary flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm text-foreground/80">{need}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Everyone Benefits */}
      <section className="py-24 bg-sky">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Why Everyone Needs Estate Planning
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Estate planning isn't just for the wealthy. Here's why everyone benefits:
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: "Have Children?",
                description: "You MUST name guardians. Without a will, the court decides who raises your kids.",
              },
              {
                title: "Own Property?",
                description: "Avoid probate with a living trust. Save your family months of hassle and thousands in legal fees.",
              },
              {
                title: "Want Privacy?",
                description: "Wills become public record. Trusts keep your estate details completely private.",
              },
              {
                title: "Love Someone?",
                description: "Ensure the people and causes you care about are protected and provided for.",
              },
            ].map((reason) => (
              <div key={reason.title} className="bg-white rounded-2xl p-6 shadow-premium hover:shadow-premium-hover hover:-translate-y-2 transition-all duration-300 text-center">
                <h3 className="text-xl font-bold text-primary mb-3">{reason.title}</h3>
                <p className="text-foreground/70 text-sm">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* No Minimums */}
      <section className="py-24 bg-tan">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">
            No Minimum Net Worth Required
          </h2>
          <p className="text-xl text-foreground/70 mb-8">
            Unlike traditional estate planning attorneys who may require $500K+ in assets,
            we believe everyone deserves quality estate planning. Our products start at just $199.
          </p>
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-premium">
            <p className="text-2xl font-bold text-secondary mb-4">
              "Estate planning for everyone, not just the wealthy."
            </p>
            <p className="text-foreground/70">
              Whether you have $10,000 or $10,000,000, protecting your family is what matters most.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Protect What Matters Most?
          </h2>
          <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Join over 100,000 families who've created their estate plans with LDASD.
            Starting at just $199.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white hover:bg-accent transition-all"
            >
              View Products & Pricing
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
            <Link
              href="/learn"
              className="inline-flex items-center gap-2 rounded-full bg-white/10 px-8 py-4 text-lg font-semibold text-white ring-1 ring-white/20 hover:bg-white/20 transition-all"
            >
              Learn More
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
