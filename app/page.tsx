import SetupChecks from '@/components/dev/SetupChecks'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

export default function Home () {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen gap-8 p-4'>
      <div className='flex flex-col items-center gap-4'>
        <h1 className='text-2xl font-bold'>Setup Checks</h1>
        <ThemeToggle />
      </div>
      <SetupChecks />
    </div>
  )
}
