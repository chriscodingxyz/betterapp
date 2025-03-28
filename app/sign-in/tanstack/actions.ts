'use server'

import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

export async function signInAction (formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  // Attempt first
  try {
    console.log('Attempting to sign in with email:', email)
    const result = await auth.api.signInEmail({ body: { email, password } })
    console.log('Sign-in result:', result)

    // Add a small delay to ensure cookie is set properly
    await new Promise(resolve => setTimeout(resolve, 200))

    console.log('Redirecting to dashboard...')
  } catch (error: unknown) {
    console.error('Sign-in error:', error)
    console.log('Wwhy error???')
    redirect(
      `/sign-in/server?toast=error:${encodeURIComponent(
        (error as Error).message || 'Unknown error'
      )}!`
    )
  }

  // If all good...then finalize
  redirect('/dashboard?toast=success:Signed in successfully!!')
}
