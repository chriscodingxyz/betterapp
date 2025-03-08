import { auth } from '@/lib/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import React from 'react'

export default async function SignUpSeverPage () {
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
    const name = formData.get('name') as string
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
    <form action={signUpAction}>
      <Input type='email' name='email' required placeholder='test@test.com' />
      <Input
        type='password'
        name='password'
        required
        placeholder='password1234'
      />
      <Input type='text' name='name' required placeholder='name' />
      <Input
        type='url'
        name='image'
        required
        placeholder='https://example.com/image.png'
      />
      <Button type='submit'>Sign Up Server</Button>
    </form>
  )
}
