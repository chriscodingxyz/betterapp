'use client'

import { refreshFactAction } from '@/actions/actions'
import { cn } from '@/lib/utils'
import { useTransition } from 'react'
import { Button } from './ui/button'

interface RandomFactProps {
  fact: string
}

export default function RandomFact ({ fact }: RandomFactProps) {
  const [isPending, startTransition] = useTransition()

  return (
    <div className='flex flex-col items-center gap-2'>
      <div
        className={cn(
          'text-[8px] mx-auto max-w-sm text-center',
          isPending && 'text-gray-500 animate-pulse'
        )}
      >
        {fact}
      </div>
      <Button
        size='xs'
        variant='outline'
        onClick={() => startTransition(() => refreshFactAction())}
        disabled={isPending}
      >
        {isPending ? 'Revalidating...' : 'Revalidate'}
      </Button>
    </div>
  )
}
