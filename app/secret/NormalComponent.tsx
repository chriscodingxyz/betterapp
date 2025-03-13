'use client'
import { useSession } from '@/lib/auth-client'
import { Session, User } from 'better-auth'
import { BetterFetchError } from 'better-auth/react'
import React from 'react'

export default function NormalComponent () {
  const {
    data,
    isPending,
    error,
    refetch
  }: {
    data: { session: Session; user: User } | null
    isPending: boolean
    error: BetterFetchError | null
    refetch: () => void
  } = useSession()

  return (
    <div className='border border-blue-500'>
      {isPending ? <p>Loading...</p> : <p>Ready</p>}
      initial session Data
      {data?.session ? <p>Authorized</p> : <p>Unauthorized</p>}
      {JSON.stringify(data, null, 2)}
      {error ? <p>{error.message}</p> : 'no error'}
      <button className='border border-black' onClick={refetch}>
        Refetch
      </button>
    </div>
  )
}
