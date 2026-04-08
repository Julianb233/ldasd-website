'use client'

import { useState } from 'react'
import CheckoutButton from './CheckoutButton'
import type { ProductType } from '@/lib/stripe/products'

type Tier = {
  name: string
  productType: ProductType
  individualPrice: string
  couplesPrice: string
  description: string
  features: string[]
  cta: string
  highlighted: boolean
}

const tiers: Tier[] = [
  {
    name: 'Will',
    productType: 'will',
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
    highlighted: false,
  },
  {
    name: 'Living Trust',
    productType: 'trust',
    individualPrice: '$499',
    couplesPrice: '$599',
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
    highlighted: true,
  },
  {
    name: 'Complete Plan',
    productType: 'estate-plan',
    individualPrice: '$699',
    couplesPrice: '$899',
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
    highlighted: false,
  },
]

export default function PricingCards() {
  const [isCouples, setIsCouples] = useState(false)

  return (
    <div>
      {/* Individual / Couples Toggle */}
      <div className="flex items-center justify-center gap-4 mb-12">
        <span className={`text-sm font-medium ${!isCouples ? 'text-foreground' : 'text-foreground/50'}`}>
          Individual
        </span>
        <button
          onClick={() => setIsCouples(!isCouples)}
          className={`relative inline-flex h-7 w-14 items-center rounded-full transition-colors ${
            isCouples ? 'bg-secondary' : 'bg-gray-300'
          }`}
          aria-label="Toggle couples pricing"
        >
          <span
            className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${
              isCouples ? 'translate-x-8' : 'translate-x-1'
            }`}
          />
        </button>
        <span className={`text-sm font-medium ${isCouples ? 'text-foreground' : 'text-foreground/50'}`}>
          Couples
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        {tiers.map((tier) => (
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
                <span className="text-5xl font-bold tracking-tight text-foreground">
                  {isCouples ? tier.couplesPrice : tier.individualPrice}
                </span>
                <span className="text-sm text-foreground/60">one-time</span>
              </div>
              {isCouples && (
                <p className="mt-2 text-xs text-secondary font-medium">
                  For you and your partner
                </p>
              )}
            </div>

            <CheckoutButton
              productType={tier.productType}
              tier={isCouples ? 'couples' : 'individual'}
              className={`block w-full rounded-full py-3 px-6 text-center text-sm font-semibold mb-8 transition-all duration-300 ${
                tier.highlighted
                  ? 'bg-secondary text-white hover:bg-secondary/90 shadow-premium'
                  : 'bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg'
              }`}
            >
              {tier.cta}
            </CheckoutButton>

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
            </ul>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center">
        <p className="text-sm text-foreground/50">
          60-day money-back guarantee &bull; Free updates included &bull; State-specific documents
        </p>
      </div>
    </div>
  )
}
