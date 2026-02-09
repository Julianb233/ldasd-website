import Link from 'next/link'
import Image from 'next/image'
import type { User } from '@supabase/supabase-js'
import type { Profile } from '@/lib/supabase/types'
import SignOutButton from '@/components/SignOutButton'

interface HeaderProps {
  user: User
  profile: Profile | null
}

export default function Header({ user, profile }: HeaderProps) {
  const displayName = profile?.full_name || user.email || 'User'

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center">
          <Image
            src="/images/logo/logo.png"
            alt="LDASD Estate Planning"
            width={120}
            height={44}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Right side - Welcome message and Sign Out */}
        <div className="flex items-center gap-6">
          <span className="text-sm text-gray-700">
            Welcome, <span className="font-medium">{displayName}</span>
          </span>
          <SignOutButton />
        </div>
      </div>
    </header>
  )
}
