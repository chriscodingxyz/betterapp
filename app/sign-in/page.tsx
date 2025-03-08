import { auth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import Link from 'next/link'

export default async function SignInPage () {
  const response = await auth.api.getSession({
    headers: await headers()
  })

  const session = response?.session
  const user = response?.user

  if (session || user) {
    redirect('/dashboard')
  }

  async function signInAction (formData: FormData) {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const remember = formData.get('remember') === 'on'

    await auth.api.signInEmail({
      body: {
        email,
        password
      }
    })

    redirect('/dashboard')
  }

  return (
    <div className='h-[calc(100vh-40px)] flex-center'>
      {/* Left side - Form */}
      <div className=' px-4 sm:px-6 lg:px-8 py-12 bg-background'>
        <div className='mx-auto w-full max-w-sm space-y-6'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Sign In</h1>
            <p className='text-sm text-muted-foreground'>
              Enter your email below to login to your account
            </p>
          </div>

          <div className='grid gap-6'>
            <form action={signInAction} className='space-y-4'>
              <div className='space-y-2'>
                <label
                  htmlFor='email'
                  className='text-sm font-medium leading-none'
                >
                  Email
                </label>
                <Input
                  id='email'
                  type='email'
                  name='email'
                  required
                  placeholder='m@example.com'
                  className='h-10'
                />
              </div>

              <div className='space-y-2'>
                <div className='flex items-center justify-between'>
                  <label
                    htmlFor='password'
                    className='text-sm font-medium leading-none'
                  >
                    Password
                  </label>
                  <Link
                    href='#'
                    className='text-sm text-primary hover:underline'
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id='password'
                  type='password'
                  name='password'
                  required
                  placeholder='password'
                  className='h-10'
                />
              </div>

              <div className='flex items-center space-x-2'>
                <input
                  type='checkbox'
                  id='remember'
                  name='remember'
                  className='h-4 w-4 rounded border-gray-300'
                />
                <label htmlFor='remember' className='text-sm'>
                  Remember me
                </label>
              </div>

              <Button type='submit' className='w-full'>
                Login
              </Button>
            </form>

            <div className='relative'>
              <div className='absolute inset-0 flex items-center'>
                <span className='w-full border-t' />
              </div>
              <div className='relative flex justify-center text-xs uppercase'>
                <span className='bg-background px-2 text-muted-foreground'>
                  Or continue with
                </span>
              </div>
            </div>

            <Button
              variant='outline'
              type='button'
              className='flex items-center justify-center gap-2'
            >
              <svg width='16' height='16' viewBox='0 0 24 24'>
                <path
                  d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
                  fill='#4285F4'
                />
                <path
                  d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
                  fill='#34A853'
                />
                <path
                  d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
                  fill='#FBBC05'
                />
                <path
                  d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
                  fill='#EA4335'
                />
              </svg>
              Sign in with Google
            </Button>
          </div>

          <div className='text-center text-sm mt-6'>
            {"Don't have an account?"}
            <Link href='/sign-up' className='text-primary hover:underline'>
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
