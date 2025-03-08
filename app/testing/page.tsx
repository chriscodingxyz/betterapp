import { signInAction, signUpAction } from '@/actions/authStuff'
import { auth } from '@/lib/auth'
import SignOutButton from '@/components/SignOutButton'
import { headers } from 'next/headers'

export default async function Home () {
  const session = await auth.api.getSession({
    headers: await headers()
  })

  return (
    <main className='flex flex-col gap-3 items-center justify-center p-10'>
      <div className='flex gap-3'>
        {typeof window !== 'undefined'
          ? 'client Component'
          : 'server Component'}

        <button
          className='bg-neutral-700 text-white p-2 rounded-md'
          onClick={signInAction}
        >
          Sign In
        </button>
        <button
          className='bg-neutral-700 text-white p-2 rounded-md'
          onClick={signUpAction}
        >
          Sign Up
        </button>
      </div>
      <p>{!session ? 'Not authenticated' : session.user.name}</p>
      <SignOutButton />
    </main>
  )
}
