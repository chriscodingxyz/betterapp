'use client'

import React from 'react'
import { signOut, useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

export default function SignOutButton () {
  const router = useRouter()
  const response = useSession()
  const { data } = response
  // const session = data?.session
  // const user = data?.user

  return (
    <div
      className='w-full flex items-center cursor-pointer'
      onClick={() => {
        signOut()
        router.push('/sign-up')
      }}
    >
      Sign Out
    </div>
  )
}
