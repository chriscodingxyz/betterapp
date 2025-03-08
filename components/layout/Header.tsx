import Link from 'next/link'
import AuthPortal from '../AuthPortal'
import { ShadowButton } from '../ShadowButton'

export default function Header () {
  return (
    <header className='top-0 left-0 sticky z-50 w-full bg-background'>
      <div className='flex h-10 items-center justify-between container'>
        <div className='flex items-center gap-4 '>
          <Link
            href='/'
            className='text-lg font-bold tracking-tight  underline underline-offset-4 hover:no-underline '
          >
            FLUID
          </Link>
          <nav className='hidden sm:flex items-center space-x-4 text-sm font-medium'>
            <a
              href='https://github.com/chriscodingxyz/betterapp'
              target='_blank'
              rel='noopener noreferrer'
            >
              <ShadowButton size='xs'> ⭐ on GitHub</ShadowButton>
            </a>
          </nav>
        </div>
        <div className='flex items-center'>
          <AuthPortal />
        </div>
      </div>
    </header>
  )
}
