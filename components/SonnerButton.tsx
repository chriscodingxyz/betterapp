'use client'

import React from 'react'
import { toast } from 'sonner'
import { Button } from './ui/button'

export default function SonnerButton () {
  return (
    <Button
      onClick={() => {
        toast('Hello')
      }}
    >
      SonnerButton
    </Button>
  )
}
