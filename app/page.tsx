import { ThemeToggle } from '@/components/theme/ThemeToggle'

export default function Home () {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <h1 className='font-bold'>Hello World</h1>
      <ThemeToggle />
    </div>
  )
}
