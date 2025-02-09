import { authClient } from '@/auth/auth-client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'

// Add server action
async function signUp (formData: FormData) {
  'use server'

  await authClient.signUp.email({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    name: formData.get('name') as string,
    image: formData.get('image') as string
  })
}

export default function SignUpServerPage () {
  return (
    <form action={signUp}>
      <Input type='email' name='email' required />
      <Input type='password' name='password' required />
      <Input type='text' name='name' required />
      <Input type='url' name='image' required />
      <Button type='submit'>Sign Up Server</Button>
    </form>
  )
}
