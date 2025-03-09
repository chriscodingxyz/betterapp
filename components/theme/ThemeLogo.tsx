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
      className='cursor-pointer z-0'
      onClick={toggleTheme}
      src='/mercury.png'
      alt='logo'
      width={150}
      height={150}
      unoptimized
    />
  )
}
