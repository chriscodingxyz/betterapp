import Link from 'next/link'
import AuthPortal from '../AuthPortal'

export default function Header () {
  return (
    <header className='top-0 left-0 sticky z-50 w-full bg-background'>
      <div className='flex h-10 items-center justify-between container'>
        <div className='flex items-center gap-4 '>
          <Link
            href='/'
            className='text-lg font-bold tracking-tight hover:opacity-80 transition-opacity '
          >
            FLUID
          </Link>
          <nav className='hidden md:flex items-center space-x-4 text-sm font-medium'>
            {/* <Link
              href='/'
              className='transition-colors hover:text-foreground/80'
            >
              Home
            </Link> */}
          </nav>
        </div>
        <div className='flex items-center'>
          <AuthPortal />
        </div>
      </div>
    </header>
  )
}
