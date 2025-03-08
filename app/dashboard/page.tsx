import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { headers } from 'next/headers'

export default async function Dashboard () {
  // Get the session on the server side
  const response = await auth.api.getSession({
    headers: await headers()
  })

  const session = response?.session
  const user = response?.user

  console.log('🍒 dashboard page response =>>', response)

  if (!session || !user) {
    redirect('/login')
  }

  return <div>authorized {user.name}</div>
}
