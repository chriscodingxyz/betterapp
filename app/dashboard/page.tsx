import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function Dashboard () {
  const sessionData = await auth.api.getSession({ headers: await headers() }) // No await for headers()
  if (!sessionData) redirect('/sign-in')

  const { session, user } = sessionData

  return (
    <>
      Authorized, {user.name}! ip address: {session.ipAddress}
    </>
  )
}
