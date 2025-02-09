import SetupChecks from '@/components/dev/SetupChecks'
import { ThemeLogo } from '@/components/theme/ThemeLogo'
import RandomFact from '@/components/RandomFact'

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
    <div className='flex flex-col items-center justify-center min-h-screen gap-8 p-4'>
      <div className='flex flex-col items-center gap-4'>
        <div className='flex flex-col items-center gap-0 cursor-pointer -space-y-1'>
          <ThemeLogo />
          <div className='flex flex-col items-center gap-8 border-primary z-10'>
            <SetupChecks />
            <RandomFact fact={rawText} />
          </div>
        </div>
      </div>
    </div>
  )
}
