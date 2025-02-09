'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'

import Image from 'next/image'

export function ThemeLogo () {
  const { resolvedTheme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Image
      className='cursor-pointer'
      onClick={toggleTheme}
      src='/mercury.png'
      alt='logo'
      width={100}
      height={100}
    />
  )
}
