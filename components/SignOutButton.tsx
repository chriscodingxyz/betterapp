'use client'

import React from 'react'
import { Button } from './ui/button'
import { signOut, useSession } from '@/auth/auth-client'
import { redirect } from 'next/navigation'

export default function SignOutButton () {
  const response = useSession()
  const { data } = response
  const session = data?.session
  const user = data?.user

  console.log('🍒 data signoutbutton', data)
  console.log('🍒signoutButton session, user', data, session, user)

  return (
    <Button
      onClick={() => {
        signOut()
        redirect('/')
      }}
    >
      SignOutButton
    </Button>
  )
}
