"use client";

import { useState } from "react";
import Link from "next/link";
import {
  bundles,
  comparisonFeatures,
  getBundleRetailTotal,
  getBundleSavings,
  getBundleSavingsPercent,
} from "@/lib/data/bundles";

const CheckIcon = ({ className }: { className?: string }) => (
  <svg className={className || "h-5 w-5 text-primary"} viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
  </svg>
);

type ViewMode = "cards" | "compare";

export default function BundlesPage() {
  const [viewMode, setViewMode] = useState<ViewMode>("cards");

  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full bg-secondary/20 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <span className="inline-flex items-center rounded-full bg-secondary/20 px-4 py-1.5 text-sm font-semibold text-white mb-6">
            Save Up to 18% with Bundles
          </span>
          <h1 className="text-5xl font-bold tracking-tight text-white sm:text-6xl">
            Estate Plan Bundles
          </h1>
          <p className="mt-6 text-xl leading-8 text-white/90 max-w-2xl mx-auto">
            Protect your family together and save. Our bundles include complete estate plans for both partners at a discounted price.
          </p>
        </div>
      </section>

      {/* View Toggle */}
      <div className="sticky top-20 z-40 bg-white/90 backdrop-blur-sm border-b border-foreground/5">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/pricing" className="text-sm text-foreground/60 hover:text-foreground transition-colors">
                Individual Plans
              </Link>
              <span className="text-foreground/30">/</span>
              <span className="text-sm font-semibold text-foreground">Bundles</span>
            </div>
            <div className="flex items-center gap-1 bg-foreground/5 rounded-full p-1">
              <button
                onClick={() => setViewMode("cards")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  viewMode === "cards"
                    ? "bg-white text-foreground shadow-sm"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                Cards
              </button>
              <button
                onClick={() => setViewMode("compare")}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  viewMode === "compare"
                    ? "bg-white text-foreground shadow-sm"
                    : "text-foreground/60 hover:text-foreground"
                }`}
              >
                Compare
              </button>
            </div>
          </div>
        </div>
      </div>

      {viewMode === "cards" ? (
        /* Bundle Cards View */
        <section className="py-24 bg-sand">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
              {bundles.map((bundle) => {
                const retail = getBundleRetailTotal(bundle);
                const savings = getBundleSavings(bundle);
                const savingsPercent = getBundleSavingsPercent(bundle);
                return (
                  <div
                    key={bundle.id}
                    className={`relative rounded-3xl p-8 transition-all duration-300 ${
                      bundle.highlighted
                        ? "bg-white shadow-premium hover:shadow-premium-hover hover:-translate-y-2 ring-2 ring-secondary"
                        : "bg-white shadow-premium hover:shadow-premium-hover hover:-translate-y-2"
                    }`}
                  >
                    {bundle.highlighted && (
                      <div className="absolute -top-5 left-1/2 -translate-x-1/2">
                        <span className="inline-flex items-center rounded-full bg-secondary px-4 py-1 text-sm font-semibold text-white shadow-lg">
                          Best Value
                        </span>
                      </div>
                    )}

                    {/* Header */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-bold text-foreground">{bundle.name}</h3>
                      <p className="mt-1 text-sm text-foreground/70">{bundle.tagline}</p>
                    </div>

                    {/* Pricing */}
                    <div className="mb-6 p-4 rounded-2xl bg-sage/50">
                      <div className="flex items-baseline gap-3">
                        <span className="text-4xl font-bold tracking-tight text-secondary">
                          ${bundle.bundlePrice.toLocaleString()}
                        </span>
                        <span className="text-lg text-foreground/40 line-through">
                          ${retail.toLocaleString()}
                        </span>
                      </div>
                      <div className="mt-2 flex items-center gap-2">
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-0.5 text-sm font-semibold text-primary">
                          Save ${savings}
                        </span>
                        <span className="text-sm text-foreground/50">
                          {savingsPercent}% off
                        </span>
                      </div>
                    </div>

                    {/* What's included */}
                    <div className="mb-6">
                      <p className="text-sm font-semibold text-foreground/50 uppercase tracking-wider mb-3">
                        Includes
                      </p>
                      <div className="space-y-1.5">
                        {bundle.products.map((p) => (
                          <div key={p.name} className="flex items-center gap-2 text-sm text-foreground/80">
                            <span className="text-secondary font-semibold">{p.quantity}x</span>
                            <span>{p.name}</span>
                            <span className="text-foreground/40">(${p.individualPrice} each)</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-foreground/70 mb-6">{bundle.description}</p>

                    {/* CTA */}
                    <Link
                      href={bundle.href}
                      className={`block w-full rounded-full py-3 px-6 text-center text-sm font-semibold transition-all duration-300 mb-6 ${
                        bundle.highlighted
                          ? "bg-secondary text-white hover:bg-accent shadow-md hover:shadow-lg"
                          : "bg-secondary text-white hover:bg-accent shadow-md hover:shadow-lg"
                      }`}
                    >
                      Get {bundle.name} — ${bundle.bundlePrice.toLocaleString()}
                    </Link>

                    {/* Features */}
                    <ul className="space-y-2.5">
                      {bundle.features.map((feature) => (
                        <li key={feature} className="flex gap-x-3">
                          <CheckIcon className="h-5 w-5 flex-none text-primary mt-0.5" />
                          <span className="text-sm text-foreground/80">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Best for */}
                    <div className="mt-6 p-3 rounded-xl bg-primary/5">
                      <p className="text-xs text-foreground/60">
                        <span className="font-semibold text-foreground/80">Best for:</span> {bundle.bestFor}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      ) : (
        /* Comparison Table View */
        <section className="py-24 bg-sand">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground">Compare All Bundles</h2>
              <p className="mt-3 text-foreground/70">See exactly what&apos;s included in each bundle</p>
            </div>

            <div className="overflow-x-auto -mx-6 px-6">
              <div className="min-w-[700px]">
                <div className="overflow-hidden rounded-3xl bg-white shadow-premium">
                  {/* Header Row */}
                  <div className="bg-gradient-to-r from-primary to-primary-light">
                    <div className="grid grid-cols-5">
                      <div className="py-5 px-6">
                        <span className="text-sm font-semibold text-white">Feature</span>
                      </div>
                      {bundles.map((bundle) => {
                        const savings = getBundleSavings(bundle);
                        return (
                          <div
                            key={bundle.id}
                            className={`py-5 px-4 text-center ${
                              bundle.highlighted ? "bg-secondary/20" : ""
                            }`}
                          >
                            <p className="text-sm font-bold text-white">{bundle.name}</p>
                            <p className="text-xs text-white/70 mt-1">
                              ${bundle.bundlePrice.toLocaleString()}
                            </p>
                            <p className="text-xs text-secondary-light font-semibold mt-0.5">
                              Save ${savings}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Feature Rows */}
                  <div className="divide-y divide-foreground/5">
                    {comparisonFeatures.map((row, index) => (
                      <div
                        key={row.feature}
                        className={`grid grid-cols-5 ${index % 2 === 0 ? "bg-background/50" : ""}`}
                      >
                        <div className="py-4 px-6 text-sm text-foreground font-medium">
                          {row.feature}
                        </div>
                        {(["essentialCouple", "trustCouple", "completeFamily", "ultimateFamily"] as const).map((key, i) => {
                          const value = row[key];
                          return (
                            <div
                              key={key}
                              className={`py-4 px-4 text-center ${
                                bundles[i]?.highlighted ? "bg-secondary/5" : ""
                              }`}
                            >
                              {value === true ? (
                                <CheckIcon className="h-5 w-5 text-primary inline" />
                              ) : value === false ? (
                                <span className="text-foreground/25">—</span>
                              ) : (
                                <span className="text-sm font-medium text-primary">{value}</span>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ))}
                  </div>

                  {/* CTA Row */}
                  <div className="grid grid-cols-5 border-t border-foreground/10 bg-sand/50">
                    <div className="py-6 px-6" />
                    {bundles.map((bundle) => (
                      <div key={bundle.id} className="py-6 px-4 text-center">
                        <Link
                          href={bundle.href}
                          className="inline-flex rounded-full bg-secondary px-5 py-2.5 text-xs font-semibold text-white hover:bg-accent transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          Get Started
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Individual Plans Callout */}
      <section className="py-16 bg-sky">
        <div className="mx-auto max-w-4xl px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            Planning for Just Yourself?
          </h2>
          <p className="text-foreground/70 mb-8 max-w-2xl mx-auto">
            Our individual plans start at $199. View our standard pricing for single estate plans.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/pricing"
              className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white hover:bg-primary-dark transition-all duration-300 shadow-md"
            >
              View Individual Plans
            </Link>
            <Link
              href="/find-your-plan"
              className="rounded-full border-2 border-primary/30 px-8 py-3 text-sm font-semibold text-primary hover:bg-primary/5 transition-all duration-300"
            >
              Find Your Plan Quiz
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 bg-tan">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-foreground text-center mb-12">
            Bundle FAQs
          </h2>
          <div className="space-y-6">
            {[
              {
                q: "How do bundle discounts work?",
                a: "Bundles include estate plans for both partners at a reduced price. Instead of purchasing two individual plans, you save by buying them together. The discount is applied automatically — no coupon needed.",
              },
              {
                q: "Are both plans customized individually?",
                a: "Yes! Each partner gets fully customized, state-specific documents. While purchased together, each estate plan is tailored to the individual's wishes and circumstances.",
              },
              {
                q: "Can we have different plans for each partner?",
                a: "Our bundles include the same plan type for each partner. If you need different plan types, you can purchase them individually — or contact us for a custom quote.",
              },
              {
                q: "Do bundles include the spouse add-on fee?",
                a: "Bundles replace the spouse add-on. Instead of adding your spouse to a single plan for $100, you each get a complete, independent plan at the bundle discount.",
              },
              {
                q: "Can I upgrade my bundle later?",
                a: "Yes! You can upgrade from any bundle to a higher tier. We'll credit what you've already paid toward the upgrade price.",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group bg-white rounded-2xl p-6 shadow-premium hover:shadow-premium-hover transition-all duration-300"
              >
                <summary className="flex justify-between items-center cursor-pointer font-semibold text-foreground">
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
                <p className="mt-4 text-foreground/70">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-24 bg-gradient-to-br from-primary to-primary-light overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full bg-secondary/20 blur-[120px]" />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Protect Your Family Together
          </h2>
          <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
            Bundle your estate plans and save. Every bundle includes attorney review and state-specific documents.
          </p>
          <Link
            href="/book"
            className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Get Started Today
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
