'use client'

import { signOut, useSession } from '@/auth/auth-client'
import { Button } from './ui/button'
import Link from 'next/link'
import Image from 'next/image'

export default function AuthPortal () {
  const response = useSession()
  const { data } = response
  const session = data?.session
  const user = data?.user

  if (!session || !user) {
    return <Link href='/sign-up'>Sign In</Link>
  }
  return (
    <>
      <div>{user.name}</div>
      <Image
        src={user.image || ''}
        alt={user.name}
        width={40}
        height={40}
        className='rounded-full'
      />
      <Button onClick={() => signOut()}>Sign Out</Button>
    </>
  )
}
