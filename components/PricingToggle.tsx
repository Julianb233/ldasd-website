'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type PlanType = 'individual' | 'couples'

interface PriceTier {
  name: string
  individualPrice: number
  couplesPrice: number
  description: string
  features: string[]
  cta: string
  href: string
  highlighted: boolean
}

const tiers: PriceTier[] = [
  {
    name: 'Will',
    individualPrice: 199,
    couplesPrice: 299,
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
    individualPrice: 599,
    couplesPrice: 699,
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
    individualPrice: 699,
    couplesPrice: 799,
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

export function PricingToggle() {
  const [planType, setPlanType] = useState<PlanType>('individual')

  return (
    <>
      {/* Toggle */}
      <div className="flex justify-center mb-12">
        <div className="inline-flex items-center rounded-full bg-white p-1 shadow-premium">
          <button
            onClick={() => setPlanType('individual')}
            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
              planType === 'individual'
                ? 'bg-primary text-white shadow-md'
                : 'text-foreground/60 hover:text-foreground'
            }`}
          >
            Individual
          </button>
          <button
            onClick={() => setPlanType('couples')}
            className={`rounded-full px-6 py-2.5 text-sm font-semibold transition-all duration-300 ${
              planType === 'couples'
                ? 'bg-primary text-white shadow-md'
                : 'text-foreground/60 hover:text-foreground'
            }`}
          >
            Couples
            <span className="ml-1.5 inline-flex items-center rounded-full bg-secondary/20 px-2 py-0.5 text-xs font-medium text-secondary-dark">
              Save up to $100
            </span>
          </button>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="grid md:grid-cols-3 gap-8 lg:gap-12">
        {tiers.map((tier) => {
          const price = planType === 'individual' ? tier.individualPrice : tier.couplesPrice
          const savings = (tier.individualPrice * 2) - tier.couplesPrice

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
                  <span className="text-5xl font-bold tracking-tight text-foreground">
                    ${price}
                  </span>
                  <span className="text-sm text-foreground/60">one-time</span>
                </div>
                {planType === 'couples' && (
                  <p className="mt-2 text-sm text-secondary font-medium">
                    Save ${savings} vs. two individual plans
                  </p>
                )}
                {planType === 'couples' && (
                  <p className="mt-1 text-xs text-foreground/50">
                    Includes documents for both partners
                  </p>
                )}
              </div>

              <AddToCartButton
                tier={tier}
                planType={planType}
                price={price}
              />

              <ul role="list" className="space-y-3 mt-8">
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
          )
        })}
      </div>

      {/* Cart Summary (shows when items added) */}
      <CartSummary />
    </>
  )
}

function AddToCartButton({
  tier,
  planType,
  price,
}: {
  tier: PriceTier
  planType: PlanType
  price: number
}) {
  const [added, setAdded] = useState(false)

  function handleAdd() {
    // Store in localStorage for cart persistence
    const cart = JSON.parse(localStorage.getItem('ldasd-cart') || '[]') as CartItem[]
    const existing = cart.findIndex((item) => item.productName === tier.name)

    if (existing >= 0) {
      cart[existing] = {
        productName: tier.name,
        planType,
        price,
        href: tier.href,
      }
    } else {
      cart.push({
        productName: tier.name,
        planType,
        price,
        href: tier.href,
      })
    }

    localStorage.setItem('ldasd-cart', JSON.stringify(cart))
    window.dispatchEvent(new Event('cart-updated'))
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="flex gap-2">
      <Link
        href={tier.href}
        className={`flex-1 block rounded-full py-3 px-6 text-center text-sm font-semibold transition-all duration-300 ${
          tier.highlighted
            ? 'bg-secondary text-white hover:bg-secondary/90 shadow-premium'
            : 'bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg'
        }`}
      >
        {tier.cta}
      </Link>
      <button
        onClick={handleAdd}
        className={`rounded-full p-3 transition-all duration-300 ${
          added
            ? 'bg-green-100 text-green-700'
            : 'bg-gray-100 text-foreground/60 hover:bg-gray-200 hover:text-foreground'
        }`}
        title={added ? 'Added to cart' : 'Add to cart'}
      >
        {added ? (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        ) : (
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-5.98.286h5.98zm0 0h6m-6 0a3 3 0 01-5.98.286M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM15.75 14.25a3 3 0 00-5.98.286h5.98zm0 0h.803c.813 0 1.497-.564 1.671-1.363l1.654-7.577A.75.75 0 0019.136 4.5H6.906" />
          </svg>
        )}
      </button>
    </div>
  )
}

interface CartItem {
  productName: string
  planType: PlanType
  price: number
  href: string
}

function CartSummary() {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    function loadCart() {
      const cart = JSON.parse(localStorage.getItem('ldasd-cart') || '[]') as CartItem[]
      setItems(cart)
      if (cart.length > 0) setIsOpen(true)
    }

    loadCart()
    window.addEventListener('cart-updated', loadCart)
    window.addEventListener('storage', loadCart)
    return () => {
      window.removeEventListener('cart-updated', loadCart)
      window.removeEventListener('storage', loadCart)
    }
  }, [])

  function removeItem(productName: string) {
    const cart = items.filter((item) => item.productName !== productName)
    localStorage.setItem('ldasd-cart', JSON.stringify(cart))
    setItems(cart)
    if (cart.length === 0) setIsOpen(false)
  }

  function clearCart() {
    localStorage.removeItem('ldasd-cart')
    setItems([])
    setIsOpen(false)
  }

  if (items.length === 0) return null

  const total = items.reduce((sum, item) => sum + item.price, 0)

  return (
    <div className={`fixed bottom-6 right-6 z-50 transition-all duration-300 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="bg-white rounded-2xl shadow-premium-hover border border-gray-100 p-6 w-80">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-5.98.286h5.98zm0 0h6m-6 0a3 3 0 01-5.98.286M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM15.75 14.25a3 3 0 00-5.98.286h5.98zm0 0h.803c.813 0 1.497-.564 1.671-1.363l1.654-7.577A.75.75 0 0019.136 4.5H6.906" />
            </svg>
            Your Cart ({items.length})
          </h4>
          <button
            onClick={() => setIsOpen(false)}
            className="text-foreground/40 hover:text-foreground/60"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-3 mb-4">
          {items.map((item) => (
            <div key={item.productName} className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">{item.productName}</p>
                <p className="text-xs text-foreground/50 capitalize">{item.planType}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-semibold text-foreground">${item.price}</span>
                <button
                  onClick={() => removeItem(item.productName)}
                  className="text-foreground/30 hover:text-red-500 transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-100 pt-3 mb-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-foreground">Total</span>
            <span className="text-lg font-bold text-foreground">${total}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={clearCart}
            className="flex-shrink-0 rounded-full px-4 py-2.5 text-sm text-foreground/60 hover:text-foreground hover:bg-gray-100 transition-colors"
          >
            Clear
          </button>
          <Link
            href="/book"
            className="flex-1 block rounded-full py-2.5 px-6 text-center text-sm font-semibold bg-secondary text-white hover:bg-secondary/90 transition-all shadow-md"
          >
            Checkout — ${total}
          </Link>
        </div>
      </div>
    </div>
  )
}
