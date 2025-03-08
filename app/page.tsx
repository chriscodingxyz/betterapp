import SetupChecks from '@/components/dev/SetupChecks'
import { ThemeLogo } from '@/components/theme/ThemeLogo'
import RandomFact from '@/components/RandomFact'
import { ShadowButton } from '@/components/ShadowButton'

export default async function Home () {
  // revalidate every 7 minutes
  const response = await fetch('http://numbersapi.com/random', {
    next: {
      revalidate: 420,
      tags: ['numberFact']
    }
  })
  const rawText = await response.text()

  return (
    <div className='flex flex-col items-center justify-center gap-8 p-4 h-[calc(100vh-40px)]'>
      <div className='flex flex-col items-center gap-4'>
        <div className='flex flex-col items-center gap-0 cursor-pointer'>
          <ThemeLogo />
          <div className='flex flex-col items-center gap-8 border-primary z-10'>
            <SetupChecks />
            <RandomFact fact={rawText} />
            <ShadowButton>stuff</ShadowButton>
          </div>
        </div>
      </div>
    </div>
  )
}
