'use client'

import { useFormStatus } from 'react-dom'
import { useActionState, useEffect, startTransition } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { zSignInSchema, zSignInSchemaType } from '@/lib/zschemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { signInAction } from './actions'
import { ActionResponse } from '@/lib/types'

function SubmitButton () {
  const { pending } = useFormStatus()
  return (
    <Button type='submit' className='w-full' disabled={pending}>
      {pending ? 'Signing in...' : 'Sign In'}
    </Button>
  )
}

export default function SignInForm () {
  const router = useRouter()

  const [state, formAction] = useActionState<ActionResponse, FormData>(
    signInAction,
    { success: false, message: '' }
  )

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<zSignInSchemaType>({
    resolver: zodResolver(zSignInSchema),
    mode: 'onSubmit',
    defaultValues: { email: '', password: '' }
  })

  const onSubmit = handleSubmit(async (data: zSignInSchemaType) => {
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)

    startTransition(() => {
      formAction(formData)
    })
  })
  // this might ensure that the redirect is not cached and get newest session everywhere
  // window.location.href instead of router.push
  useEffect(() => {
    if (state.success) {
      window.location.href =
        '/dashboard?toast=success:Signed in successfully buddy'
    }
  }, [state.success, router])

  return (
    <div className='space-y-6 max-w-md mx-auto p-4'>
      <form onSubmit={onSubmit} className='space-y-4'>
        <div>
          <label htmlFor='email' className='text-sm font-medium leading-none'>
            Email
          </label>
          <Input
            id='email'
            type='email'
            placeholder='m@example.com'
            {...register('email')}
          />
          {errors.email && (
            <p className='text-red-500 text-[10px] mt-1'>
              {errors.email.message}
            </p>
          )}
        </div>
        <div>
          <label
            htmlFor='password'
            className='text-sm font-medium leading-none'
          >
            Password
          </label>
          <Input
            id='password'
            type='password'
            placeholder='password'
            {...register('password')}
          />
          {errors.password && (
            <p className='text-red-500 text-[10px] mt-1'>
              {errors.password.message}
            </p>
          )}
        </div>
        <SubmitButton />
        {state.message && !state.success && (
          <p className='text-red-500 text-[10px] font-semibold text-center'>
            {state.message}
          </p>
        )}
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
        className='w-full flex items-center justify-center gap-2'
        disabled
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
  )
}
