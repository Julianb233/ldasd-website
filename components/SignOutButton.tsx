'use client'

import { signOut } from '@/lib/actions/auth'

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
    >
      Sign Out
    </button>
  )
}
