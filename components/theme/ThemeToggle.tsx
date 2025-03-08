'use client'

import * as React from 'react'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Lightning } from '@phosphor-icons/react'

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
        // <Scale strokeWidth={2} className='h-[1.2rem] w-[1.2rem]' />
        <Lightning size={32} />
      ) : resolvedTheme === 'dark' ? (
        <Moon strokeWidth={2} className='h-[1.2rem] w-[1.2rem]' />
      ) : (
        <Sun strokeWidth={2} className='h-[1.2rem] w-[1.2rem]' />
      )}
      <span className='sr-only'>Toggle theme</span>
    </Button>
  )
}
