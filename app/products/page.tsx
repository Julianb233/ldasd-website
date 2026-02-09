import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Estate Planning Products | Trusts, Wills & Complete Plans",
  description: "Choose the right estate planning solution for your family. Living trusts, wills, guardianship designations, and complete estate plans starting at $199.",
};

const products = [
  {
    name: "Will",
    price: "$199",
    popular: false,
    description: "Perfect for naming guardians and distributing assets",
    features: [
      "Last Will & Testament",
      "Guardianship designation for minor children",
      "Asset distribution instructions",
      "Executor appointment",
      "Digital asset instructions",
      "Attorney review included",
      "Free updates for 1 year",
      "State-specific legal compliance",
    ],
    cta: "Create Your Will",
    href: "/products/will",
  },
  {
    name: "Living Trust",
    price: "$599",
    popular: true,
    description: "Avoid probate and keep your estate private",
    features: [
      "Revocable Living Trust",
      "Pour-over Will included",
      "Avoid probate completely",
      "Keep estate details private",
      "Incapacity protection",
      "Asset protection strategies",
      "Attorney consultation",
      "State-specific legal compliance",
      "Free updates for 3 years",
      "Transfer deed assistance",
    ],
    cta: "Create Your Trust",
    href: "/products/trust",
  },
  {
    name: "Complete Estate Plan",
    price: "$699",
    popular: false,
    description: "Everything you need for comprehensive protection",
    features: [
      "Living Trust & Pour-over Will",
      "Durable Power of Attorney",
      "Healthcare Power of Attorney",
      "Living Will / Healthcare Directive",
      "HIPAA Authorization",
      "Guardianship designation",
      "Digital asset management",
      "Trust funding guidance",
      "Attorney consultation",
      "Priority support",
      "Free unlimited updates for life",
    ],
    cta: "Get Complete Plan",
    href: "/products/estate-plan",
  },
];

const comparison = [
  {
    feature: "Last Will & Testament",
    will: true,
    trust: true,
    complete: true,
  },
  {
    feature: "Avoid Probate",
    will: false,
    trust: true,
    complete: true,
  },
  {
    feature: "Guardianship Designation",
    will: true,
    trust: true,
    complete: true,
  },
  {
    feature: "Living Trust",
    will: false,
    trust: true,
    complete: true,
  },
  {
    feature: "Power of Attorney",
    will: false,
    trust: false,
    complete: true,
  },
  {
    feature: "Healthcare Directive",
    will: false,
    trust: false,
    complete: true,
  },
  {
    feature: "Privacy Protection",
    will: false,
    trust: true,
    complete: true,
  },
  {
    feature: "Attorney Review",
    will: true,
    trust: true,
    complete: true,
  },
];

export default function ProductsPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-secondary/20 blur-[120px]" />
          <div className="absolute inset-0 bg-white/5" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
              Choose Your Estate Plan
            </h1>
            <p className="mt-6 text-xl leading-8 text-white/90">
              From basic wills to comprehensive estate plans, we have the right solution for every family.
              All products are attorney-backed and state-specific.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="relative py-24 bg-sand">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            {products.map((product) => (
              <div
                key={product.name}
                className={`relative rounded-3xl p-8 transition-all duration-300 ${
                  product.popular
                    ? "bg-white shadow-premium hover:shadow-premium-hover hover:-translate-y-2 ring-2 ring-secondary scale-105"
                    : "bg-white shadow-premium hover:shadow-premium-hover hover:-translate-y-2"
                }`}
              >
                {product.popular && (
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center rounded-full bg-secondary px-4 py-1 text-sm font-semibold text-white shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-foreground">
                    {product.name}
                  </h3>
                  <p className="mt-2 text-sm text-foreground/70">
                    {product.description}
                  </p>
                  <div className="mt-6 flex items-baseline gap-x-2">
                    <span className="text-5xl font-bold tracking-tight text-secondary">
                      {product.price}
                    </span>
                    <span className="text-sm font-semibold text-foreground/60">
                      one-time
                    </span>
                  </div>
                </div>

                <Link
                  href={product.href}
                  className={`block w-full rounded-full py-3 px-6 text-center text-sm font-semibold transition-all duration-300 ${
                    product.popular
                      ? "bg-secondary text-white hover:bg-accent shadow-md hover:shadow-lg"
                      : "bg-secondary text-white hover:bg-accent shadow-md hover:shadow-lg"
                  }`}
                >
                  {product.cta}
                </Link>

                <ul role="list" className="mt-8 space-y-3">
                  {product.features.map((feature) => (
                    <li key={feature} className="flex gap-x-3">
                      <svg
                        className="h-6 w-5 flex-none text-primary"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm text-foreground/80">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <p className="text-foreground/60">
              Add your spouse or partner for an additional $100 to any plan
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="relative py-24 bg-sky">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold tracking-tight text-foreground">
              Compare Products
            </h2>
            <p className="mt-4 text-lg text-foreground/70">
              See which features are included in each plan
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl bg-white shadow-premium">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-primary to-primary-light">
                <tr>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-white">Feature</th>
                  <th className="py-4 px-6 text-center text-sm font-semibold text-white">Will</th>
                  <th className="py-4 px-6 text-center text-sm font-semibold text-white bg-secondary/20">Trust</th>
                  <th className="py-4 px-6 text-center text-sm font-semibold text-white">Complete</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-foreground/10">
                {comparison.map((row, index) => (
                  <tr key={row.feature} className={index % 2 === 0 ? "bg-background/50" : ""}>
                    <td className="py-4 px-6 text-sm text-foreground">{row.feature}</td>
                    <td className="py-4 px-6 text-center">
                      {row.will ? (
                        <svg className="h-5 w-5 text-primary inline" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-foreground/30">—</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center bg-secondary/5">
                      {row.trust ? (
                        <svg className="h-5 w-5 text-primary inline" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-foreground/30">—</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center">
                      {row.complete ? (
                        <svg className="h-5 w-5 text-primary inline" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <span className="text-foreground/30">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-secondary/20 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Not Sure Which Plan is Right for You?
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Our team can help you choose the best estate planning solution for your unique situation.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Free Consultation
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
