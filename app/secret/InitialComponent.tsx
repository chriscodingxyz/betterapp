'use client'
import { Session, User } from 'better-auth'
import React from 'react'

export default function InitialComponent ({
  initialSessionData
}: {
  initialSessionData: { session: Session; user: User } | null
}) {
  return (
    <div className='border border-pink-500'>
      initial session Data
      {initialSessionData?.session ? <p>Authorized</p> : <p>Unauthorized</p>}
      {JSON.stringify(initialSessionData, null, 2)}
    </div>
  )
}
