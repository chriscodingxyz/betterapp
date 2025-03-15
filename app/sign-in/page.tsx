// import { auth } from '@/lib/auth'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import { redirect } from 'next/navigation'
// import React from 'react'
// import Link from 'next/link'
// import { GridBackground } from '@/components/GridBackground'
// import { Alert, AlertDescription } from '@/components/ui/alert' // Added for error display
// import { headers } from 'next/headers'

// // Added for form state management
// export type FormState = {
//   errors?: {
//     email?: string[]
//     password?: string[]
//     _form?: string[]
//   }
//   success?: boolean
// }

// export default async function SignInPage ({
//   searchParams
// }: {
//   searchParams: { message?: string; returnTo?: string }
// }) {
//   const params = await searchParams

//   // Then access the message property
//   const message = params?.message

//   // async function signInAction (formData: FormData): Promise<FormState> {
//   async function signInAction (formData: FormData) {
//     'use server'

//     const email = formData.get('email') as string
//     const password = formData.get('password') as string
//     const remember = formData.get('remember') === 'on'

//     const headersList = await headers()
//     const referer = headersList.get('referer') || ''
//     const url = new URL(referer)
//     const returnTo = url.searchParams.get('returnTo')

//     console.log('remember value====>>>', remember)

//     // Added empty initial state
//     const formState: FormState = {
//       errors: {
//         email: [],
//         password: [],
//         _form: []
//       },
//       success: false
//     }

//     try {
//       // Basic validation - can be replaced with Zod later
//       if (!email || !email.includes('@')) {
//         formState.errors!.email!.push('Please enter a valid email address')
//         return formState
//       }

//       if (!password || password.length < 6) {
//         formState.errors!.password!.push(
//           'Password must be at least 6 characters'
//         )
//         return formState
//       }

//       // Attempt to sign in
//       await auth.api.signInEmail({
//         body: {
//           email,
//           password
//         }
//       })

//       // If successful, mark success and redirect
//       formState.success = true
//       redirect(returnTo ? decodeURIComponent(returnTo) : '/dashboard')
//     } catch (error: unknown) {
//       // Ignore Next.js redirect
//       if (
//         error &&
//         typeof error === 'object' &&
//         'digest' in error &&
//         typeof error.digest === 'string' &&
//         error.digest.startsWith('NEXT_REDIRECT')
//       ) {
//         throw error
//       }

//       // Handle authentication errors
//       console.error('Sign-in error:', error)

//       // Add the error message to the form errors
//       formState.errors!._form!.push(
//         error instanceof Error
//           ? error.message
//           : 'Failed to sign in. Please check your credentials and try again.'
//       )

//       return formState
//     }
//   }

//   return (
//     <div className='h-[calc(100vh-40px)] flex-center'>
//       {/* Left side - Form */}
//       <div className=''>
//         <div className='px-4 sm:px-6 lg:px-8 py-12 bg-background'>
//           <GridBackground gridDensity='medium'>
//             <div className='mx-auto w-full max-w-sm space-y-6 p-4'>
//               <div className='flex flex-col space-y-2 text-center'>
//                 <h1 className='text-2xl font-semibold tracking-tight'>
//                   Sign In
//                 </h1>
//                 <p className='text-sm text-muted-foreground'>
//                   Enter your email below to login to your account
//                 </p>
//               </div>

//               <div className='grid gap-6'>
//                 {/* Added error message display for URL messages */}
//                 {message && (
//                   <Alert variant='destructive' className='mb-4'>
//                     <AlertDescription>{message}</AlertDescription>
//                   </Alert>
//                 )}

//                 {/* Using client form state pattern with error handling */}
//                 <form action={signInAction} className='space-y-4'>
//                   <div className='space-y-2'>
//                     <label
//                       htmlFor='email'
//                       className='text-sm font-medium leading-none'
//                     >
//                       Email
//                     </label>
//                     <Input
//                       id='email'
//                       type='email'
//                       name='email'
//                       required
//                       placeholder='m@example.com'
//                       className='h-10'
//                     />
//                     {/* Added error message display for email field */}
//                     <div id='email-error' aria-live='polite' aria-atomic='true'>
//                       <p className='text-sm text-red-500'></p>
//                     </div>
//                   </div>

//                   <div className='space-y-2'>
//                     <div className='flex items-center justify-between'>
//                       <label
//                         htmlFor='password'
//                         className='text-sm font-medium leading-none'
//                       >
//                         Password
//                       </label>
//                       <Link
//                         href='/forgot-password'
//                         className='text-sm text-primary hover:underline'
//                       >
//                         Forgot your password?
//                       </Link>
//                     </div>
//                     <Input
//                       id='password'
//                       type='password'
//                       name='password'
//                       required
//                       placeholder='password'
//                       className='h-10'
//                     />
//                     {/* Added error message display for password field */}
//                     <div
//                       id='password-error'
//                       aria-live='polite'
//                       aria-atomic='true'
//                     >
//                       <p className='text-sm text-red-500'></p>
//                     </div>
//                   </div>

//                   <div className='flex items-center space-x-2'>
//                     <input
//                       type='checkbox'
//                       id='remember'
//                       name='remember'
//                       className='h-4 w-4 rounded border-gray-300'
//                     />
//                     <label htmlFor='remember' className='text-sm'>
//                       Remember me
//                     </label>
//                   </div>

//                   {/* Added general form error display */}
//                   <div id='form-error' aria-live='polite' aria-atomic='true'>
//                     <p className='text-sm text-red-500'></p>
//                   </div>

//                   <Button type='submit' className='w-full'>
//                     Login
//                   </Button>
//                 </form>

//                 {/* <div className='relative'>
//                   <div className='absolute inset-0 flex items-center'>
//                     <span className='w-full border-t' />
//                   </div>
//                   <div className='relative flex justify-center text-xs uppercase'>
//                     <span className='bg-background px-2 text-muted-foreground'>
//                       Or continue with
//                     </span>
//                   </div>
//                 </div> */}

//                 {/* Added error handling for social sign-in */}
//                 {/* <Button
//                   variant='outline'
//                   type='button'
//                   className='flex items-center justify-center gap-2'
//                   onClick={async () => {
//                     try {
//                       await auth.api.signInOAuth({
//                         body: {
//                           provider: 'google'
//                         }
//                       })
//                     } catch (error) {
//                       console.error('Google sign-in error:', error)
//                       // Handle Google sign-in errors here
//                       document
//                         .getElementById('form-error')!
//                         .querySelector('p')!.textContent =
//                         'Failed to sign in with Google. Please try again.'
//                     }
//                   }}
//                 >
//                   <svg width='16' height='16' viewBox='0 0 24 24'>
//                     <path
//                       d='M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z'
//                       fill='#4285F4'
//                     />
//                     <path
//                       d='M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z'
//                       fill='#34A853'
//                     />
//                     <path
//                       d='M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z'
//                       fill='#FBBC05'
//                     />
//                     <path
//                       d='M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z'
//                       fill='#EA4335'
//                     />
//                   </svg>
//                   Sign in with Google
//                 </Button> */}
//               </div>

//               <div className='text-center text-sm mt-6'>
//                 {"Don't have an account? "}
//                 <Link href='/sign-up' className='text-primary hover:underline'>
//                   Sign up
//                 </Link>
//               </div>
//             </div>
//           </GridBackground>
//         </div>
//       </div>
//     </div>
//   )
// }

import { auth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { redirect } from 'next/navigation'
import React from 'react'
import Link from 'next/link'
import { GridBackground } from '@/components/GridBackground'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { headers } from 'next/headers'

export default async function SignInPage ({
  searchParams
}: {
  searchParams: { message?: string; returnTo?: string }
}) {
  const params = await searchParams
  const message = params?.message

  async function signInAction (formData: FormData) {
    'use server'

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    // const remember = formData.get('remember') === 'on'

    const headersList = await headers()
    const referer = headersList.get('referer') || ''
    const url = new URL(referer)
    const returnTo = url.searchParams.get('returnTo') || '/dashboard'

    // Basic validation
    if (!email || !email.includes('@')) {
      redirect(`/sign-in?toast=error:Please enter a valid email address`)
    }
    if (!password || password.length < 6) {
      redirect(`/sign-in?toast=error:Password must be at least 6 characters`)
    }

    try {
      // Attempt to sign in
      await auth.api.signInEmail({
        body: {
          email,
          password
        }
      })

      // On success, redirect
      redirect(returnTo)
    } catch (error: unknown) {
      // Ignore Next.js redirect
      if (
        error &&
        typeof error === 'object' &&
        'digest' in error &&
        typeof error.digest === 'string' &&
        error.digest.startsWith('NEXT_REDIRECT')
      ) {
        throw error
      }

      // Handle authentication errors
      console.error('Sign-in error:', error)
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Failed to sign in. Please check your credentials and try again.'
      redirect(`/sign-in?toast=error:${encodeURIComponent(errorMessage)}`)
    }
  }

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

            <div className='grid gap-6'>
              {message && (
                <Alert variant='destructive' className='mb-4'>
                  <AlertDescription>
                    {decodeURIComponent(message)}
                  </AlertDescription>
                </Alert>
              )}

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
                      href='/forgot-password'
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

              <div className='text-center text-sm mt-6'>
                {"Don't have an account? "}
                <Link href='/sign-up' className='text-primary hover:underline'>
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </GridBackground>
      </div>
    </div>
  )
}
