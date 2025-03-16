'use server'

import { db } from '@/db'
import { todosTable } from '@/db/schemas/todos-schema'
import { sql } from 'drizzle-orm'
import { revalidateTag } from 'next/cache'
// import { auth } from '@/lib/auth'
// import { redirect } from 'next/navigation'
// import { zSignInSchema } from '@/lib/zschemas'
// import { NextResponse } from 'next/server'
// import { ActionResponse } from '@/lib/types'

// testing checks
export async function testSupabaseConnection () {
  // Check if env variables exist
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { success: false, message: 'Missing Supabase credentials in .env' }
  }

  try {
    // Test connection by making a simple request
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/`, {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY
      }
    })

    if (!response.ok) {
      throw new Error('Failed to connect to Supabase')
    }

    return { success: true, message: 'Successfully connected to Supabase! 🎉' }
  } catch (error) {
    return {
      success: false,
      message:
        'Failed to connect to Supabase. Check your credentials and try again.',
      error: error
    }
  }
}

export async function testDatabaseConnection () {
  try {
    await db.execute(sql`SELECT NOW()`)
    return { success: true, message: 'Drizzle connection successful!' }
  } catch (error) {
    console.error('Drizzle connection failed:', error)
    return { success: false, message: 'Drizzle connection failed' }
  }
}

export async function checkTableAction () {
  try {
    await db.select().from(todosTable)
    return { success: true, message: 'Todos table exists!' }
  } catch (error) {
    console.error('Todos table does not exist:', error)
    return { success: false, message: 'Todos table does not exist' }
  }
}

// revalidate
export async function refreshFactAction (timeout = 5000) {
  'use server'
  // adding 5 second delay to see pending text
  await new Promise(resolve => setTimeout(resolve, timeout))
  revalidateTag('numberFact')
}

// export async function signInAction (formData: unknown) {
//   if (!(formData instanceof FormData)) {
//     return { success: false, message: 'Invalid form data' }
//   }

//   const result = zSignInSchema.safeParse({
//     email: formData.get('email') as string,
//     password: formData.get('password') as string
//   })

//   if (!result.success) {
//     const firstError = (result.error as z.ZodError).issues[0].message
//     redirect(`/sign-in?toast=error:${encodeURIComponent(firstError)}!`)
//   }

//   try {
//     await auth.api.signInEmail({ body: result.data })
//     redirect('/dashboard?toast=success:Signed in successfully!')
//   } catch (error: unknown) {
//     // Type assertion or check for Error type
//     const errorMessage =
//       error instanceof Error ? error.message : 'Sign-in failed'
//     redirect(`/sign-in?toast=error:${encodeURIComponent(errorMessage)}!`)
//   }
// }

// export async function signInAction (
//   formData: unknown
// ): Promise<ActionResponse | void> {
//   // Verify that the input is a FormData object
//   if (!(formData instanceof FormData)) {
//     return { success: false, message: 'Invalid request: FormData required' }
//   }
//   console.log('testing')

//   // Extract values (Zod will handle validation)
//   const result = zSignInSchema.safeParse({
//     email: formData.get('email'),
//     password: formData.get('password')
//   })

//   if (!result.success) {
//     const firstError = (result.error as z.ZodError).issues[0].message
//     return { success: false, message: firstError }
//   }

//   console.log(result.data)

//   try {
//     await auth.api.signInEmail({ body: result.data })
//     redirect('/dashboard?toast=success:Signed in successfully!')
//   } catch (error: unknown) {
//     const errorMessage =
//       error instanceof Error ? error.message : 'Sign-in failed'
//     return { success: false, message: errorMessage }
//   }
// }

// export async function signInAction (
//   formData: unknown
// ): Promise<ActionResponse | void> {
//   if (!(formData instanceof FormData)) {
//     return { success: false, message: 'Invalid request: FormData required' }
//   }

//   const result = zSignInSchema.safeParse({
//     email: formData.get('email'),
//     password: formData.get('password')
//   })

//   if (!result.success) {
//     const firstError =
//       result.error.flatten().fieldErrors.email?.[0] ||
//       result.error.flatten().fieldErrors.password?.[0] ||
//       'Validation failed'
//     return { success: false, message: firstError }
//   }

//   try {
//     await auth.api.signInEmail({ body: result.data })
//     redirect('/dashboard?toast=success:Signed in successfully!')
//   } catch (error: unknown) {
//     let errorMessage = 'Sign-in failed'
//     if (error instanceof Error) {
//       errorMessage = error.message
//       if (error.message.includes('Invalid credentials')) {
//         errorMessage = 'Invalid email or password'
//       }
//     }
//     return { success: false, message: errorMessage }
//   }
// }

// export async function signInAction (formData: unknown): Promise<ActionResponse> {
//   console.log('testing signinaction')
//   if (!(formData instanceof FormData)) {
//     return { success: false, message: 'Invalid request: FormData required' }
//   }

//   const result = zSignInSchema.safeParse({
//     email: formData.get('email'),
//     password: formData.get('password')
//   })

//   if (!result.success) {
//     const firstError =
//       result.error.flatten().fieldErrors.email?.[0] ||
//       result.error.flatten().fieldErrors.password?.[0] ||
//       'Validation failed'
//     return { success: false, message: firstError }
//   }

//   try {
//     await auth.api.signInEmail({ body: result.data })
//     // Instead of redirect, return a success response
//     return { success: true, message: 'Signed in successfully!' }
//   } catch (error: unknown) {
//     let errorMessage = 'Sign-in failed'
//     if (error instanceof Error) {
//       errorMessage = error.message
//       if (error.message.includes('Invalid credentials')) {
//         errorMessage = 'Invalid email or password'
//       }
//     }
//     return { success: false, message: errorMessage }
//   }
// }

// Define the server action with prevState and formData
