// app/actions/upload-avatar.ts
'use server'

import { supabase } from '@/db/supabase/client'
// import { auth } from '@/lib/auth'
// import { headers } from 'next/headers'

// Define the return type for useActionState
export type UploadAvatarState = {
  error?: string
  success?: boolean
  avatarUrl?: string
}

// ok so lets make this to upload for the first time, and maybe we make another one that a signed in user can upload or change etc

export async function uploadAvatar (
  previousState: UploadAvatarState, // First arg: previous state
  formData: FormData // Second arg: form data
): Promise<UploadAvatarState> {
  // Check session with Better Auth
  // const session = await auth.api.getSession({ headers: await headers() })
  // if (!session) {
  //   return { ...previousState, error: 'Unauthorized' }
  // }
  // i actually cant get user session yet as im now just making the user.
  // ..

  // const userId = session.user.id // Adjust based on your session structure
  const file = formData.get('avatar')

  if (!file || !(file instanceof File)) {
    return { ...previousState, error: 'No valid file provided' }
  }

  const userId = '123'

  try {
    // Generate a unique file name
    const fileExt = file.name.split('.').pop()
    const fileName = `${userId}-${Date.now()}.${fileExt}`
    const filePath = `avatars/${fileName}`

    // Convert file to buffer for server-side upload
    const buffer = Buffer.from(await file.arrayBuffer())

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from('users')
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: true
      })

    if (uploadError) throw uploadError

    // Get the public URL
    const { data } = supabase.storage.from('users').getPublicUrl(filePath)
    const avatarUrl = data.publicUrl

    // // Update profile with Drizzle
    // await db
    //   .update(profiles)
    //   .set({ avatarUrl })
    //   .where(eq(profiles.id, userId));

    return { success: true, avatarUrl, error: undefined }
  } catch (error) {
    console.error(
      'Upload error:',
      error instanceof Error ? error.message : 'Unknown error'
    )
    return { ...previousState, error: 'Failed to upload avatar' }
  }
}
