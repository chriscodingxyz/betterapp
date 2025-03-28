// app/components/AvatarUploadForm.tsx
'use client'

import { useActionState } from 'react'
import { uploadAvatar, UploadAvatarState } from '@/actions/upload-action'
import Image from 'next/image'

export default function AvatarUploadForm () {
  const initialState: UploadAvatarState = {
    error: undefined,
    success: false,
    avatarUrl: undefined
  }
  const [state, formAction, isPending] = useActionState(
    uploadAvatar,
    initialState
  )

  return (
    <form action={formAction}>
      <input type='file' name='avatar' accept='image/*' />
      <button type='submit' disabled={isPending}>
        {isPending ? 'Uploading...' : 'Upload Avatar'}
      </button>
      {state.error && <p style={{ color: 'red' }}>{state.error}</p>}
      {state.success && (
        <>
          <p style={{ color: 'green' }}>Avatar uploaded successfully!</p>
          <Image
            src={state.avatarUrl ?? ''}
            alt='Avatar'
            width={100}
            height={100}
          />
        </>
      )}
    </form>
  )
}
