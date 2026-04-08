import { createClient } from '@/lib/supabase/server'
import { SUBSCRIPTION_PLANS } from '@/lib/stripe'
import type { Subscription } from '@/lib/supabase/types'
import SubscriptionActions from '@/components/dashboard/SubscriptionActions'
import SuccessToast from '@/components/SuccessToast'

function StatusBadge({ status, cancelAtPeriodEnd }: { status: Subscription['status']; cancelAtPeriodEnd: boolean }) {
  const config: Record<string, { label: string; classes: string }> = {
    trialing: { label: 'Trial', classes: 'bg-blue-100 text-blue-800' },
    active: { label: cancelAtPeriodEnd ? 'Canceling' : 'Active', classes: cancelAtPeriodEnd ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800' },
    past_due: { label: 'Past Due', classes: 'bg-red-100 text-red-800' },
    canceled: { label: 'Canceled', classes: 'bg-gray-100 text-gray-800' },
    unpaid: { label: 'Unpaid', classes: 'bg-red-100 text-red-800' },
    incomplete: { label: 'Incomplete', classes: 'bg-yellow-100 text-yellow-800' },
  }
  const { label, classes } = config[status] || config.canceled

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${classes}`}>
      {label}
    </span>
  )
}

function formatDate(dateStr: string | null) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function PlanCard({
  planKey,
  plan,
  isCurrentPlan,
}: {
  planKey: string
  plan: (typeof SUBSCRIPTION_PLANS)[keyof typeof SUBSCRIPTION_PLANS]
  isCurrentPlan: boolean
}) {
  return (
    <div className={`rounded-xl border-2 p-6 ${isCurrentPlan ? 'border-primary bg-primary/5' : 'border-gray-200 bg-white'}`}>
      {isCurrentPlan && (
        <span className="text-xs font-semibold text-primary uppercase tracking-wide">Current Plan</span>
      )}
      <h3 className="text-lg font-bold text-gray-900 mt-1">{plan.name}</h3>
      <p className="text-sm text-gray-500 mt-1">{plan.description}</p>
      <div className="mt-4 space-y-1">
        <p className="text-2xl font-bold text-gray-900">{plan.prices.year.label}</p>
        <p className="text-sm text-gray-500">or {plan.prices.month.label}</p>
      </div>
      <ul className="mt-4 space-y-2 text-sm text-gray-600">
        <li className="flex items-center gap-2">
          <svg className="h-4 w-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          {plan.trialDays}-day free trial
        </li>
        <li className="flex items-center gap-2">
          <svg className="h-4 w-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          {plan.documentUpdates} document updates per period
        </li>
        <li className="flex items-center gap-2">
          <svg className="h-4 w-4 text-green-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
          Attorney-reviewed documents
        </li>
      </ul>
      {!isCurrentPlan && (
        <SubscriptionActions planKey={planKey} mode="subscribe" />
      )}
    </div>
  )
}

export default async function SubscriptionPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; canceled?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch active subscription
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  const isActive = subscription && ['trialing', 'active'].includes(subscription.status)
  const successMessage = params.success === 'true'
    ? 'Subscription activated successfully!'
    : params.canceled === 'true'
      ? 'Checkout was canceled. You can try again anytime.'
      : null

  return (
    <div className="max-w-4xl mx-auto">
      {successMessage && <SuccessToast message={successMessage} />}

      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Subscription & Membership</h1>
        <p className="text-gray-500 mt-1">Manage your estate planning subscription</p>
      </div>

      {/* Current Subscription Status */}
      {subscription && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Current Membership</h2>
            <StatusBadge status={subscription.status} cancelAtPeriodEnd={subscription.cancel_at_period_end} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Plan</p>
              <p className="font-medium text-gray-900 capitalize">{subscription.plan_type}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Billing</p>
              <p className="font-medium text-gray-900">
                ${(subscription.amount_cents / 100).toFixed(2)}/{subscription.interval === 'month' ? 'mo' : 'yr'}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Document Updates Left</p>
              <p className="font-medium text-gray-900">{subscription.document_updates_remaining}</p>
            </div>
          </div>

          {subscription.status === 'trialing' && subscription.trial_end && (
            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <span className="font-medium">Trial period:</span>{' '}
                Your free trial ends on {formatDate(subscription.trial_end)}.
                You won&apos;t be charged until then.
              </p>
            </div>
          )}

          {subscription.cancel_at_period_end && (
            <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
              <p className="text-sm text-yellow-800">
                <span className="font-medium">Cancellation scheduled:</span>{' '}
                Your subscription will end on {formatDate(subscription.current_period_end)}.
                You can continue using all features until then.
              </p>
            </div>
          )}

          {subscription.status === 'past_due' && (
            <div className="mt-4 p-3 bg-red-50 rounded-lg">
              <p className="text-sm text-red-800">
                <span className="font-medium">Payment failed:</span>{' '}
                Please update your payment method to continue using your subscription.
              </p>
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2 text-sm text-gray-500">
            <span>Current period: {formatDate(subscription.current_period_start)} — {formatDate(subscription.current_period_end)}</span>
          </div>

          {isActive && !subscription.cancel_at_period_end && (
            <div className="mt-4">
              <SubscriptionActions mode="cancel" />
            </div>
          )}
        </div>
      )}

      {/* Available Plans */}
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900">
          {isActive ? 'Your Plan' : 'Choose a Plan'}
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          {isActive
            ? 'Your current plan details'
            : 'Start with a free trial — no credit card required during the trial period'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(Object.entries(SUBSCRIPTION_PLANS) as [string, (typeof SUBSCRIPTION_PLANS)[keyof typeof SUBSCRIPTION_PLANS]][]).map(
          ([key, plan]) => (
            <PlanCard
              key={key}
              planKey={key}
              plan={plan}
              isCurrentPlan={subscription?.plan_type === key && isActive}
            />
          )
        )}
      </div>
    </div>
  )
}
