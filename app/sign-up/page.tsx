import { auth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'
import Link from 'next/link'

export default async function SignUpPage () {
  const response = await auth.api.getSession({
    headers: await headers()
  })

  const session = response?.session
  const user = response?.user

  if (session || user) {
    redirect('/dashboard')
  }

  async function signUpAction (formData: FormData) {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    // const confirmPassword = formData.get('confirmPassword') as string

    // if (password !== confirmPassword) {
    //   // In a real app, you'd handle this error properly
    //   throw new Error('Passwords do not match')
    // }

    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const name = `${firstName} ${lastName}`.trim()
    const image =
      (formData.get('image') as string) || 'http://localhost:3000/avatar.png'

    await auth.api.signUpEmail({
      body: {
        email,
        password,
        name,
        image
      }
    })

    redirect('/dashboard?success=true')
  }

  return (
    <div className='h-[calc(100vh-40px)] flex-center'>
      {/* Right side - Form */}
      <div className='flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 py-12 bg-background order-first lg:order-last'>
        <div className='mx-auto w-full max-w-sm space-y-6'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-semibold tracking-tight'>Sign Up</h1>
            <p className='text-sm text-muted-foreground'>
              Enter your information to create an account
            </p>
          </div>

          <div className='grid gap-6'>
            <form action={signUpAction} className='space-y-4'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <label
                    htmlFor='firstName'
                    className='text-sm font-medium leading-none'
                  >
                    First name
                  </label>
                  <Input
                    id='firstName'
                    type='text'
                    name='firstName'
                    required
                    placeholder='Max'
                    className='h-10'
                  />
                </div>

                <div className='space-y-2'>
                  <label
                    htmlFor='lastName'
                    className='text-sm font-medium leading-none'
                  >
                    Last name
                  </label>
                  <Input
                    id='lastName'
                    type='text'
                    name='lastName'
                    required
                    placeholder='Robinson'
                    className='h-10'
                  />
                </div>
              </div>

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
                <label
                  htmlFor='password'
                  className='text-sm font-medium leading-none'
                >
                  Password
                </label>
                <Input
                  id='password'
                  type='password'
                  name='password'
                  required
                  placeholder='Password'
                  className='h-10'
                />
              </div>

              <div className='space-y-2'>
                <label
                  htmlFor='image'
                  className='text-sm font-medium leading-none'
                >
                  Profile Image (optional)
                </label>
                <Input
                  id='image'
                  type='url'
                  name='image'
                  placeholder='https://example.com/avatar.png'
                  className='h-10'
                />
              </div>

              <Button type='submit' className='w-full'>
                Create an account
              </Button>
            </form>
          </div>

          <div className='text-center text-sm mt-6'>
            Already have an account?{' '}
            <Link href='/sign-in' className='text-primary hover:underline'>
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
