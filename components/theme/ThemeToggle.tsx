'use client'

import * as React from 'react'
import { Moon, Scale, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'

export function ThemeToggle () {
  const { resolvedTheme, setTheme } = useTheme()
  const [hasToggled, setHasToggled] = React.useState(false)

  const toggleTheme = () => {
    setHasToggled(true)
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')
  }

  return (
    <Button variant='ghost' size='xs' onClick={toggleTheme}>
      {!hasToggled ? (
        <Scale strokeWidth={2} className='h-[1.2rem] w-[1.2rem]' />
      ) : resolvedTheme === 'dark' ? (
        <Moon strokeWidth={2} className='h-[1.2rem] w-[1.2rem]' />
      ) : (
        <Sun strokeWidth={2} className='h-[1.2rem] w-[1.2rem]' />
      )}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
