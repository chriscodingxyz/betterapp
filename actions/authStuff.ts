'use server'

import { auth } from '@/auth/auth'
import { redirect } from 'next/navigation'

export const signInAction = async () => {
  await auth.api.signInEmail({
    body: {
      email: 'test2@test.com',
      password: 'password123'
    }
  })

  redirect('/dashboard')
}

export const signUpAction = async () => {
  await auth.api.signUpEmail({
    body: {
      email: 'test2@test.com',
      password: 'password123',
      name: 'dizzy'
    }
  })

  redirect('/dashboard?success=true')
}
