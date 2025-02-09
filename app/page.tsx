// 'use client'
import AuthSignInCheck from '@/components/dev/AuthSignInCheck'
import SetupChecks from '@/components/dev/SetupChecks'
import { ThemeLogo } from '@/components/theme/ThemeLogo'
// import { ReadmeContent } from '@/components/dev/ReadmeContent'
import { ThemeToggle } from '@/components/theme/ThemeToggle'
// import { useState } from 'react'

export default function Home () {
  // const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-8 p-4'>
      <div className='flex flex-col items-center gap-4'>
        <div className='flex flex-col items-center gap-0 cursor-pointer'>
          {/* <Image src='/mercury.png' alt='logo' width={100} height={100} /> */}
          <ThemeLogo />
          <div className='flex flex-col items-center gap-4 border-primary'>
            <SetupChecks />
            {/* <AuthSignInCheck /> */}
            {/* <ReadmeContent /> */}
          </div>
        </div>

        {/* <ThemeToggle /> */}
      </div>
    </div>
  )
}
