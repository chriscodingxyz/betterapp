import SupabaseTest from '@/components/dev/SupabaseTest'
import DatabaseTest from '@/components/dev/DatabaseTest'
import TableCheck from '@/components/dev/TableCheck'
import { ThemeToggle } from '@/components/theme/ThemeToggle'

export default function Home () {
  return (
    <div className='flex flex-col items-center justify-center h-screen gap-4'>
      <h1 className='font-bold'>Hello World</h1>
      <ThemeToggle />
      <div className='flex gap-2'>
        <SupabaseTest />
        <DatabaseTest />
        <TableCheck />
      </div>
    </div>
  )
}
