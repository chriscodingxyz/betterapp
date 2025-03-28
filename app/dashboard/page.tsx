import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'
import { cn } from '@/lib/utils'

export default async function Dashboard () {
  const sessionData = await auth.api.getSession({ headers: await headers() }) // No await for headers()
  if (!sessionData) redirect('/sign-in')

  const { session, user } = sessionData
  console.log('session =>>', session)
  console.log('user =>>', user)

  return (
    <div
      className={cn(
        user.membershipType === 'premium' && 'border border-black text-5xl'
      )}
    >
      Authorized, {user.name}
    </div>
  )
}
