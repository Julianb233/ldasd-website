'use client'

import { useState } from 'react'

export default function SubscriptionActions({
  planKey,
  mode,
}: {
  planKey?: string
  mode: 'subscribe' | 'cancel'
}) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubscribe(interval: 'month' | 'year') {
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ planType: planKey, interval }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Failed to start checkout')
        return
      }

      if (data.url) {
        window.location.href = data.url
      }
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  async function handleCancel() {
    if (!confirm('Are you sure you want to cancel? You can still use your subscription until the end of the current period.')) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/stripe/subscription', {
        method: 'DELETE',
      })

      if (!res.ok) {
        const data = await res.json()
        setError(data.error || 'Failed to cancel subscription')
        return
      }

      window.location.reload()
    } catch {
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (mode === 'cancel') {
    return (
      <div>
        <button
          onClick={handleCancel}
          disabled={loading}
          className="text-sm text-red-600 hover:text-red-700 font-medium disabled:opacity-50"
        >
          {loading ? 'Canceling...' : 'Cancel Subscription'}
        </button>
        {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
      </div>
    )
  }

  return (
    <div className="mt-4 space-y-2">
      <button
        onClick={() => handleSubscribe('year')}
        disabled={loading}
        className="w-full px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Start Free Trial (Annual)'}
      </button>
      <button
        onClick={() => handleSubscribe('month')}
        disabled={loading}
        className="w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors disabled:opacity-50"
      >
        {loading ? 'Loading...' : 'Start Free Trial (Monthly)'}
      </button>
      {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
    </div>
  )
}
