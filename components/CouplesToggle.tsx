'use client'

import { useState } from 'react'
import Link from 'next/link'

interface CouplesToggleProps {
  productId: string
  productName: string
  individualPrice: number
  couplesPrice: number
  ctaText?: string
  ctaHref?: string
}

/**
 * COUP-01 / PRICE-05: Individual/Couples pricing toggle for product pages
 * Allows users to switch between individual and couples pricing
 * and links to the booking page with the couples param pre-set
 */
export default function CouplesToggle({
  productId,
  productName,
  individualPrice,
  couplesPrice,
  ctaText = 'Get Started',
  ctaHref,
}: CouplesToggleProps) {
  const [isCouples, setIsCouples] = useState(false)
  const currentPrice = isCouples ? couplesPrice : individualPrice

  const bookingHref = ctaHref || `/book?product=${productId}${isCouples ? '&couples=true' : ''}`

  return (
    <div className="space-y-6">
      {/* Toggle Switch */}
      <div className="flex items-center justify-center gap-4">
        <span
          className={`text-sm font-medium transition-colors ${
            !isCouples ? 'text-white' : 'text-white/60'
          }`}
        >
          Individual
        </span>
        <button
          type="button"
          role="switch"
          aria-checked={isCouples}
          onClick={() => setIsCouples(!isCouples)}
          className={`relative inline-flex h-7 w-14 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 ${
            isCouples ? 'bg-secondary' : 'bg-white/30'
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-6 w-6 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              isCouples ? 'translate-x-7' : 'translate-x-0'
            }`}
          />
        </button>
        <span
          className={`text-sm font-medium transition-colors ${
            isCouples ? 'text-white' : 'text-white/60'
          }`}
        >
          Couples
        </span>
      </div>

      {/* Price Display */}
      <div className="flex items-baseline gap-4 justify-center">
        <span className="text-5xl font-bold text-secondary">${currentPrice}</span>
        <span className="text-white/80">one-time fee</span>
      </div>

      {/* Couples savings callout */}
      {isCouples && (
        <div className="text-center">
          <span className="inline-block px-4 py-1 rounded-full bg-secondary/20 text-secondary text-sm font-medium">
            Save vs. two individual plans &mdash; includes both partner document sets
          </span>
        </div>
      )}

      {/* CTA Button */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link
          href={bookingHref}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-8 py-4 text-lg font-semibold text-white hover:bg-accent transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          {ctaText} {isCouples ? `for Both` : ''}
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>

      {/* Couples features list */}
      {isCouples && (
        <div className="mt-4 rounded-2xl bg-white/10 backdrop-blur-sm p-6 ring-1 ring-white/20">
          <h4 className="text-sm font-semibold text-white mb-3">Couples plan includes:</h4>
          <ul className="space-y-2">
            {[
              `Two complete ${productName} document sets`,
              'Mirror documents for both partners',
              'Shared account access',
              'Invite partner to view & manage documents',
            ].map((feature) => (
              <li key={feature} className="flex items-start gap-2">
                <svg className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm text-white/90">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
