'use client'

import * as React from 'react'
import { useTheme } from 'next-themes'
import logoImg from '@/public/mercury.png'
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
      src={logoImg}
      alt='logo'
      width={150}
    />
  )
}
