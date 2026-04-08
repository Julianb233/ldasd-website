'use client'

import { useState } from 'react'
import Link from 'next/link'

interface PricingTier {
  name: string
  individualPrice: string
  couplesPrice: string
  description: string
  features: string[]
  cta: string
  href: string
  highlighted: boolean
}

const tiers: PricingTier[] = [
  {
    name: 'Will',
    individualPrice: '$199',
    couplesPrice: '$299',
    description: 'Essential protection for families',
    features: [
      'Last Will & Testament',
      'Guardianship designation',
      'Executor appointment',
      'Asset distribution',
      'Digital assets',
      'Attorney review',
      '1 year free updates',
      'Email support',
    ],
    cta: 'Create Your Will',
    href: '/products/will',
    highlighted: false,
  },
  {
    name: 'Living Trust',
    individualPrice: '$599',
    couplesPrice: '$699',
    description: 'Avoid probate & maintain privacy',
    features: [
      'Everything in Will, plus:',
      'Revocable Living Trust',
      'Pour-over Will',
      'Avoid probate',
      'Privacy protection',
      'Incapacity planning',
      'Trust funding guidance',
      '3 years free updates',
      'Priority email support',
    ],
    cta: 'Create Your Trust',
    href: '/products/trust',
    highlighted: true,
  },
  {
    name: 'Complete Plan',
    individualPrice: '$699',
    couplesPrice: '$799',
    description: 'Comprehensive protection',
    features: [
      'Everything in Trust, plus:',
      'Power of Attorney',
      'Healthcare POA',
      'Living Will',
      'HIPAA Authorization',
      'Digital asset management',
      'Attorney consultation',
      'Lifetime free updates',
      'Priority phone support',
    ],
    cta: 'Get Complete Plan',
    href: '/products/estate-plan',
    highlighted: false,
  },
]

/**
 * PRICE-05: Interactive pricing toggle for the pricing page
 * Switches all pricing cards between individual and couples pricing
 */
export default function CouplesPricingToggle() {
  const [isCouples, setIsCouples] = useState(false)

  return (
    <div>
      {/* Toggle */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <span
          className={`text-sm font-semibold transition-colors ${
            !isCouples ? 'text-foreground' : 'text-foreground/40'
          }`}
        >
          Individual
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={isCouples}
          aria-label="Toggle couples pricing"
          onClick={() => setIsCouples(!isCouples)}
          className={`relative inline-flex h-8 w-16 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 ${
            isCouples ? 'bg-secondary' : 'bg-foreground/20'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-7 w-7 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              isCouples ? 'translate-x-8' : 'translate-x-0'
            }`}
          />
        </button>
        <span
          className={`text-sm font-semibold transition-colors ${
            isCouples ? 'text-foreground' : 'text-foreground/40'
          }`}
        >
          Couples
        </span>
        {isCouples && (
          <span className="inline-flex items-center rounded-full bg-secondary/10 px-3 py-1 text-xs font-semibold text-secondary">
            +$100 &mdash; 2 document sets
          </span>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        {tiers.map((tier) => {
          const price = isCouples ? tier.couplesPrice : tier.individualPrice
          const href = isCouples ? `${tier.href}?couples=true` : tier.href

          return (
            <div
              key={tier.name}
              className={`relative rounded-3xl p-8 transition-all duration-300 ${
                tier.highlighted
                  ? 'bg-white shadow-premium hover:shadow-premium-hover ring-2 ring-secondary scale-105 z-10 hover:-translate-y-2'
                  : 'bg-white shadow-premium hover:shadow-premium-hover hover:-translate-y-2'
              }`}
            >
              {tier.highlighted && (
                <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center rounded-full bg-secondary px-6 py-2 text-sm font-semibold text-white shadow-premium">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-foreground">{tier.name}</h3>
                <p className="mt-2 text-sm text-foreground/60">{tier.description}</p>
                <div className="mt-6 flex items-baseline gap-x-2">
                  <span className="text-5xl font-bold tracking-tight text-foreground">{price}</span>
                  <span className="text-sm text-foreground/60">one-time</span>
                </div>
                {isCouples && (
                  <p className="mt-2 text-xs text-secondary font-medium">
                    For both partners &bull; 2 document sets included
                  </p>
                )}
              </div>

              <Link
                href={href}
                className={`block w-full rounded-full py-3 px-6 text-center text-sm font-semibold mb-8 transition-all duration-300 ${
                  tier.highlighted
                    ? 'bg-secondary text-white hover:bg-secondary/90 shadow-premium'
                    : 'bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg'
                }`}
              >
                {tier.cta}
              </Link>

              <ul role="list" className="space-y-3">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <svg
                      className={`h-6 w-5 flex-none ${tier.highlighted ? 'text-secondary' : 'text-primary'}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-foreground/70">{feature}</span>
                  </li>
                ))}
                {isCouples && (
                  <>
                    <li className="flex gap-x-3">
                      <svg className="h-6 w-5 flex-none text-secondary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-secondary font-medium">Two complete document sets</span>
                    </li>
                    <li className="flex gap-x-3">
                      <svg className="h-6 w-5 flex-none text-secondary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-secondary font-medium">Mirror documents for partner</span>
                    </li>
                    <li className="flex gap-x-3">
                      <svg className="h-6 w-5 flex-none text-secondary" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      <span className="text-sm text-secondary font-medium">Shared account access</span>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )
        })}
      </div>

      {/* Note */}
      <div className="mt-16 text-center">
        {isCouples ? (
          <p className="text-lg text-foreground/70 mb-4">
            Couples plans include two complete, customized document sets with shared account access
          </p>
        ) : (
          <p className="text-lg text-foreground/70 mb-4">
            Add your spouse or partner to any plan for +$100
          </p>
        )}
        <p className="text-sm text-foreground/50">
          60-day money-back guarantee &bull; Free updates included &bull; State-specific documents
        </p>
      </div>
    </div>
  )
}
