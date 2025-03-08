'use client'

import { useSession } from '@/lib/auth-client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import SignOutButton from './SignOutButton'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from './ui/dropdown-menu'
import { Button } from './ui/button'
// import { LogIn } from 'lucide-react'
import { ThemeToggle } from './theme/ThemeToggle'
import { ShadowButton } from './ShadowButton'

export default function AuthPortal () {
  // Keep the original logic intact
  const response = useSession()
  const { data } = response
  const session = data?.session
  const user = data?.user
  const [mounted, setMounted] = useState(false)

  // This ensures the component properly updates on client side
  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything until after client-side hydration
  if (!mounted) {
    return null
  }

  if (!session || !user) {
    return (
      <div className='flex items-center gap-2'>
        <ThemeToggle />
        <Link href='/sign-in'>
          <ShadowButton size='xs'>
            {/* <LogIn strokeWidth={2} className='h-[1.2rem] w-[1.2rem]' /> */}
            Login
          </ShadowButton>
        </Link>
      </div>
    )
  }

  return (
    <div className='flex items-center'>
      <DropdownMenu>
        <DropdownMenuTrigger className='flex items-center gap-1 outline-none'>
          <span className='hidden md:inline-block text-sm font-medium'>
            {user.name}
          </span>
          <Avatar className='h-6 w-6'>
            <AvatarImage
              src={user.image || ''}
              alt={user.name}
              width={20}
              height={20}
            />
            <AvatarFallback>{user.name?.charAt(0) || 'U'}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuItem asChild>
            <Link href='/dashboard' className='w-full cursor-pointer'>
              Dashboard
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <SignOutButton />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
