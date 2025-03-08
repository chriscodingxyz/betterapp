// import { authClient } from '@/auth/auth-client'
// import { Button } from '@/components/ui/button'
// import { Input } from '@/components/ui/input'
// import React from 'react'

// // Add server action
// async function signIn (formData: FormData) {
//   'use server'

//   const { data: session } = await authClient.signIn.email({
//     email: formData.get('email') as string,
//     password: formData.get('password') as string
//   })

//   if (!session) {
//     throw new Error('Failed to sign in')
//   }
// }

// export default function SignUpServerPage () {
//   return (
//     <form action={signIn}>
//       <Input type='email' name='email' required placeholder='test@test.com' />
//       <Input
//         type='password'
//         name='password'
//         required
//         placeholder='password1234'
//       />

//       <Button type='submit'>Sign In Server</Button>
//     </form>
//   )
// }
