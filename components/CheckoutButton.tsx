'use client'

import { useState } from 'react'
import type { ProductType, PricingTier } from '@/lib/stripe/products'

type Props = {
  productType: ProductType
  tier?: PricingTier
  children: React.ReactNode
  className?: string
}

export default function CheckoutButton({ productType, tier = 'individual', children, className }: Props) {
  const [loading, setLoading] = useState(false)

  async function handleCheckout() {
    setLoading(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productType, tier }),
      })

      const data = await res.json()

      if (!res.ok) {
        if (res.status === 401) {
          window.location.href = '/login?redirect=/pricing'
          return
        }
        throw new Error(data.error || 'Checkout failed')
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error('Checkout error:', err)
      alert('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleCheckout}
      disabled={loading}
      className={className}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Processing...
        </span>
      ) : (
        children
      )}
    </button>
  )
}
