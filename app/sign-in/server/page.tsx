import React from 'react'
import Link from 'next/link'
import { GridBackground } from '@/components/GridBackground'
import { Button } from '@/components/ui/button'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { Input } from '@/components/ui/input'

async function signInAction (formData: FormData) {
  'use server'

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

export default function ServerSignInPage () {
  return (
    <div className='h-[calc(100vh-40px)] flex-center'>
      <div className='px-4 sm:px-6 lg:px-8 py-12 bg-background'>
        <GridBackground gridDensity='medium'>
          <div className='mx-auto w-full max-w-sm space-y-6 p-4'>
            <div className='flex flex-col space-y-2 text-center'>
              <h1 className='text-2xl font-semibold tracking-tight'>Sign In</h1>
              <p className='text-sm text-muted-foreground'>
                Enter your email below to login to your account
              </p>
            </div>
            <form action={signInAction}>
              <Input
                type='email'
                name='email'
                placeholder='m@example.com'
                required
              />
              <Input
                type='password'
                name='password'
                placeholder='password'
                required
              />
              <Button type='submit'>Submit</Button>
            </form>
            <div className='text-center text-sm mt-6'>
              {"Don't have an account? "}
              <Link href='/sign-up' className='text-primary hover:underline'>
                Sign up
              </Link>
            </div>
          </div>
        </GridBackground>
      </div>
    </div>
  )
}
