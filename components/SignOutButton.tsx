'use client'

import { authClient } from '@/lib/auth-client'
import { Button } from './ui/button'

export default function SignOutButton () {
  return (
    <Button
      className='w-full flex items-center cursor-pointer'
      onClick={async () => {
        await authClient.signOut() // Clear the session cookie
        // router.push or redirect will not work properly, displaying the correct UI after sign out
        window.location.href = '/sign-in' // Force full page reload (this ensures new session check)
      }}
    >
      Sign Out
    </Button>
  )
}
