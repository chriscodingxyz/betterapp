import { authClient } from '@/auth/auth-client'
import { redirect } from 'next/navigation'

export default async function Dashboard () {
  // Get the session on the server side
  const session = await authClient.getSession()

  console.log('session ====>', session)

  // Check if user is authenticated
  if (!session) {
    // Redirect to login if not authenticated
    redirect('/login')
  }

  return <div>authorized</div>
}
