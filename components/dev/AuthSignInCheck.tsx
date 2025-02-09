'use client'

import React from 'react'
import { Button } from '../ui/button'
import { authClient } from '@/auth/auth-client'

export default function AuthSignInCheck () {
  return (
    <div>
      <Button
        size='sm'
        onClick={() => {
          authClient.signUp.email({
            email: 'test@test.com',
            password: 'password1234',
            name: 'test',
            image: 'https://example.com/image.png'
          })
        }}
      >
        😎
      </Button>
    </div>
  )
}
