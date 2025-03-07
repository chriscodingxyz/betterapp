'use client'

import React from 'react'
import { useSession } from '@/auth/auth-client'

export default function Header () {
  const { data: session } = useSession()
  console.log('session header ====>', session)
  return <div>Header - {Boolean(session)}</div>
}
