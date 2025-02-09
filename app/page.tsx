import AuthSignInCheck from '@/components/dev/AuthSignInCheck'
import SetupChecks from '@/components/dev/SetupChecks'
// import { ReadmeContent } from '@/components/dev/ReadmeContent'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

export default function Home () {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-8 p-4'>
      <div className='flex flex-col items-center gap-4'>
        <ThemeToggle />
        {/* <h1 className='text-md font-bold'>Setup Checks</h1> */}
      </div>
      <SetupChecks />
      <AuthSignInCheck />
      {/* <ReadmeContent /> */}
    </div>
  )
}
