import React from 'react'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import InitialComponent from './InitialComponent'
import NormalComponent from './NormalComponent'
import { Session, User } from 'better-auth'

export default async function page () {
  const sessionData: { session: Session; user: User } | null =
    await auth.api.getSession({
      headers: await headers()
    })
  if (!sessionData) redirect('/sign-in')

  const { session, user } = sessionData

  console.log('🍇 secret page response =>>', sessionData)
  console.log('🍇 secret page session + user =>>', session, user)

  return (
    <>
      initial:
      <InitialComponent initialSessionData={sessionData} />
      normal:
      <NormalComponent />
    </>
  )
}
