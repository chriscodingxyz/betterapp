import React from 'react'
import Link from 'next/link'
// import { headers } from 'next/headers'
// import { redirect } from 'next/navigation'
// import { auth } from '@/lib/auth'

// import { GridBackground } from '@/components/GridBackground'

// import SignInForm from './SignInForm'

// export default function SignInPage () {
//   return (
//     <div className='h-[calc(100vh-40px)] flex-center'>
//       <div className='px-4 sm:px-6 lg:px-8 py-12 bg-background'>
//         <GridBackground gridDensity='medium'>
//           <div className='mx-auto w-full max-w-sm space-y-6 p-4'>
//             <div className='flex flex-col space-y-2 text-center'>
//               <h1 className='text-2xl font-semibold tracking-tight'>Sign In</h1>
//               <p className='text-sm text-muted-foreground'>
//                 Enter your email below to login to your account
//               </p>
//             </div>
//             <SignInForm />
//             <div className='text-center text-sm mt-6'>
//               {"Don't have an account? "}
//               <Link href='/sign-up' className='text-primary hover:underline'>
//                 Sign up
//               </Link>
//             </div>
//           </div>
//         </GridBackground>
//       </div>
//     </div>
//   )
// }

export default async function page () {
  return (
    <div className=' flex-center-col'>
      <Link href='/sign-in/react-hook-form'>
        Client React Hook Form with zod
      </Link>
      <Link href='/sign-in/normal'>Client Normal Form with zod</Link>
      <Link href='/sign-in/server'>Server Normal Form with zod</Link>
    </div>
  )
}
