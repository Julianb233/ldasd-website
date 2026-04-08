import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import type { Order, Document, Subscription } from '@/lib/supabase/types'
import SuccessToast from '@/components/SuccessToast'

// Icon components
function DocumentIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  )
}

function ShieldIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
    </svg>
  )
}

function UserIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
    </svg>
  )
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
    </svg>
  )
}

// Helper components
function EmptyState({
  icon: Icon,
  title,
  description
}: {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
}) {
  return (
    <div className="text-center py-8">
      <Icon className="h-12 w-12 text-gray-300 mx-auto mb-3" />
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-sm text-gray-400 mt-1">{description}</p>
    </div>
  )
}

function QuickActionCard({
  href,
  icon: Icon,
  title,
  description,
  color,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  color: 'blue' | 'green' | 'purple' | 'red'
}) {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600 group-hover:bg-blue-100',
    green: 'bg-green-50 text-green-600 group-hover:bg-green-100',
    purple: 'bg-purple-50 text-purple-600 group-hover:bg-purple-100',
    red: 'bg-red-50 text-red-600 group-hover:bg-red-100',
  }

  return (
    <Link
      href={href}
      className="group bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md hover:border-gray-300 transition-all"
    >
      <div className={`inline-flex p-3 rounded-lg ${colorClasses[color]} transition-colors`}>
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="mt-4 text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="mt-1 text-sm text-gray-500">{description}</p>
    </Link>
  )
}

function getStatusBadgeClasses(status: Order['status']) {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'refunded':
      return 'bg-gray-100 text-gray-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function formatProductType(type: Order['product_type']) {
  const labels: Record<Order['product_type'], string> = {
    will: 'Last Will & Testament',
    trust: 'Living Trust',
    poa: 'Power of Attorney',
    'healthcare-directive': 'Healthcare Directive',
    'estate-plan': 'Complete Estate Plan',
  }
  return labels[type] || type
}

function formatDocumentType(type: Document['document_type']) {
  const labels: Record<Document['document_type'], string> = {
    will: 'Last Will & Testament',
    trust: 'Living Trust',
    poa: 'Power of Attorney',
    'healthcare-directive': 'Healthcare Directive',
  }
  return labels[type] || type
}

function CreditCardIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
    </svg>
  )
}

function MembershipCard({ subscription }: { subscription: Subscription | null }) {
  if (!subscription) {
    return (
      <section className="mb-8">
        <div className="bg-gradient-to-r from-primary/5 to-blue-50 rounded-xl border border-primary/20 p-6">
          <div className="flex items-center gap-3 mb-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              <CreditCardIcon className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">No Active Subscription</h2>
              <p className="text-sm text-gray-500">Subscribe to unlock document updates and management features</p>
            </div>
          </div>
          <Link
            href="/dashboard/subscription"
            className="inline-flex items-center px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
          >
            View Plans &amp; Start Free Trial
          </Link>
        </div>
      </section>
    )
  }

  const statusColors: Record<string, string> = {
    trialing: 'bg-blue-100 text-blue-800',
    active: 'bg-green-100 text-green-800',
    past_due: 'bg-red-100 text-red-800',
  }

  const statusLabels: Record<string, string> = {
    trialing: 'Trial',
    active: subscription.cancel_at_period_end ? 'Canceling' : 'Active',
    past_due: 'Past Due',
  }

  const daysUntilEnd = subscription.current_period_end
    ? Math.max(0, Math.ceil((new Date(subscription.current_period_end).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : null

  return (
    <section className="mb-8">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="bg-green-50 p-2 rounded-lg">
              <CreditCardIcon className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900 capitalize">{subscription.plan_type} Membership</h2>
              <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${statusColors[subscription.status] || 'bg-gray-100 text-gray-800'}`}>
                {statusLabels[subscription.status] || subscription.status}
              </span>
            </div>
          </div>
          <Link
            href="/dashboard/subscription"
            className="text-sm text-primary hover:text-primary/80 font-medium"
          >
            Manage
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-500">Billing</p>
            <p className="font-medium text-gray-900">${(subscription.amount_cents / 100).toFixed(2)}/{subscription.interval === 'month' ? 'mo' : 'yr'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Doc Updates Left</p>
            <p className="font-medium text-gray-900">{subscription.document_updates_remaining}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">{subscription.status === 'trialing' ? 'Trial Ends' : 'Renews'}</p>
            <p className="font-medium text-gray-900">{daysUntilEnd !== null ? `${daysUntilEnd} days` : '—'}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ verified?: string; password_reset?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  // Fetch user
  const { data: { user } } = await supabase.auth.getUser()

  // Fetch user's orders
  const { data: orders } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', user!.id)
    .order('created_at', { ascending: false })
    .limit(5)

  // Fetch active subscription
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('*')
    .eq('user_id', user!.id)
    .in('status', ['trialing', 'active', 'past_due'])
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  // Fetch user's documents
  const { data: documents } = await supabase
    .from('documents')
    .select('*, orders!inner(user_id)')
    .eq('orders.user_id', user!.id)
    .order('generated_at', { ascending: false })
    .limit(5)

  // Determine success message
  let successMessage: string | null = null
  if (params.verified === 'true') {
    successMessage = 'Your email has been verified successfully!'
  } else if (params.password_reset === 'true') {
    successMessage = 'Your password has been reset successfully!'
  }

  return (
    <div className="max-w-6xl mx-auto">
      {successMessage && <SuccessToast message={successMessage} />}

      {/* Membership Status */}
      <MembershipCard subscription={subscription as Subscription | null} />

      {/* Quick Actions */}
      <section className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <QuickActionCard
            href="/products/will"
            icon={DocumentIcon}
            title="Will"
            description="Create your Last Will & Testament"
            color="blue"
          />
          <QuickActionCard
            href="/products/trust"
            icon={ShieldIcon}
            title="Trust"
            description="Set up a Living Trust"
            color="green"
          />
          <QuickActionCard
            href="/products/guardianship"
            icon={UserIcon}
            title="Power of Attorney"
            description="Designate decision makers"
            color="purple"
          />
          <QuickActionCard
            href="/products/estate-plan"
            icon={HeartIcon}
            title="Healthcare Directive"
            description="Document your medical wishes"
            color="red"
          />
        </div>
      </section>

      {/* Recent Documents */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Documents</h2>
          {documents && documents.length > 0 && (
            <Link
              href="/dashboard/documents"
              className="text-sm text-primary hover:text-primary/80 font-medium"
            >
              View All
            </Link>
          )}
        </div>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {documents && documents.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {documents.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="bg-gray-100 p-2 rounded-lg">
                      <DocumentIcon className="h-5 w-5 text-gray-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {formatDocumentType(doc.document_type)}
                      </p>
                      <p className="text-xs text-gray-500">
                        Version {doc.version} - {new Date(doc.generated_at).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <Link
                    href={`/dashboard/documents/${doc.id}`}
                    className="text-sm text-primary hover:text-primary/80 font-medium"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={DocumentIcon}
              title="No documents yet"
              description="Your documents will appear here after purchase"
            />
          )}
        </div>
      </section>

      {/* Recent Orders */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold text-gray-900">Recent Orders</h2>
          {orders && orders.length > 0 && (
            <Link
              href="/dashboard/orders"
              className="text-sm text-primary hover:text-primary/80 font-medium"
            >
              View All
            </Link>
          )}
        </div>
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {orders && orders.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {orders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 hover:bg-gray-50">
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {formatProductType(order.product_type)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.created_at).toLocaleDateString()} - ${(order.amount_cents / 100).toFixed(2)}
                    </p>
                  </div>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize ${getStatusBadgeClasses(order.status)}`}
                  >
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              icon={DocumentIcon}
              title="No orders yet"
              description="Start protecting your family with estate planning"
            />
          )}
        </div>
      </section>
    </div>
  )
}
