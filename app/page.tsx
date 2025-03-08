// import SetupChecks from '@/components/dev/SetupChecks'
import { ThemeLogo } from '@/components/theme/ThemeLogo'
// import RandomFact from '@/components/RandomFact'
import { ShadowButton } from '@/components/ShadowButton'
import { MetallicText } from '@/components/MetallicText'

export default async function Home () {
  // revalidate every 7 minutes
  // const response = await fetch('http://numbersapi.com/random', {
  //   next: {
  //     revalidate: 420,
  //     tags: ['numberFact']
  //   }
  // })
  // const rawText = await response.text()

  return (
    <div className='flex flex-col items-center justify-center gap-8 p-4 h-[calc(100vh-40px)]'>
      <div className='flex flex-col items-center gap-4'>
        <div className='flex flex-col items-center gap-0'>
          <div className='flex flex-col items-center gap-2 mb-10'>
            <div className='text-6xl font-bold text-balance tracking-tighter leading-none text-center max-w-3xl'>
              Roll your own <MetallicText>SaaS</MetallicText> in minutes!
            </div>
            <div className='text-xl text-muted-foreground'>
              Launch faster with confidence
            </div>
          </div>
          <ThemeLogo />
          <div className='flex flex-col items-center gap-8 border-primary z-10 -mt-2'>
            {/* <SetupChecks />
            <RandomFact fact={rawText} /> */}
            <ShadowButton size='xs'>Initiate Checklist</ShadowButton>
          </div>
        </div>
      </div>
    </div>
  )
}
