// import Link from 'next/link'
// import AuthPortal from '../AuthPortal'
// // import { ShadowButton } from '../ShadowButton'
// import { Button } from '../ui/button'
// import { MetallicText } from '../MetallicText'
// import { auth } from '@/lib/auth'
// import { headers } from 'next/headers'

// export default async function Header () {
//   const session = await auth.api.getSession({
//     headers: await headers()
//   })

//   return (
//     <header className='top-0 left-0 sticky z-50 w-full  backdrop-blur-xl'>
//       <div className='flex h-10 items-center justify-between container max-w-5xl'>
//         <div className='flex items-center gap-4'>
//           <Link href='/' className='text-lg font-bold tracking-tight '>
//             <MetallicText>FLUID</MetallicText>
//           </Link>
//           <nav className='hidden sm:flex items-center space-x-4 text-sm font-medium'>
//             <a
//               href='https://github.com/chriscodingxyz/betterapp'
//               target='_blank'
//               rel='noopener noreferrer'
//             >
//               {/* <ShadowButton size='xs'> ⭐ on GitHub</ShadowButton> */}
//               <Button variant='outline' size='xs'>
//                 {' '}
//                 ⭐ on GitHub
//               </Button>
//             </a>
//           </nav>
//         </div>
//         <div className='flex items-center'>
//           <AuthPortal serverSession={session} />
//         </div>
//       </div>
//     </header>
//   )
// }
import Link from 'next/link'
import AuthPortal from '../AuthPortal'
import { Button } from '../ui/button'
import { MetallicText } from '../MetallicText'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { Session, User } from 'better-auth'

export default async function Header () {
  const session: { session: Session; user: User } | null =
    await auth.api.getSession({
      headers: await headers()
    })

  return (
    <header className='top-0 left-0 sticky z-50 w-full backdrop-blur-xl'>
      <div className='flex h-10 items-center justify-between container max-w-5xl'>
        <div className='flex items-center gap-4'>
          <Link href='/' className='text-lg font-bold tracking-tight'>
            <MetallicText>FLUID</MetallicText>
          </Link>
          <nav className='hidden sm:flex items-center space-x-4 text-sm font-medium'>
            <a
              href='https://github.com/chriscodingxyz/betterapp'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Button variant='outline' size='xs'>
                ⭐ on GitHub
              </Button>
            </a>
          </nav>
        </div>
        <div className='flex items-center'>
          <AuthPortal serverSession={session} />
        </div>
      </div>
    </header>
  )
}
