import { cn } from '@/lib/utils'
import * as React from 'react'
import type { SVGProps } from 'react'

type IconDrizzleProps = SVGProps<SVGSVGElement> & {
  className?: string
}

export default function IconDrizzle ({ className, ...props }: IconDrizzleProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 160 160'
      className={cn('size-5 inline-block', className)}
      {...props}
    >
      <rect
        width={9.631}
        height={40.852}
        fill='#C5F74F'
        rx={4.816}
        transform='matrix(.87303 .48767 -.49721 .86763 43.48 67.304)'
      />
      <rect
        width={9.631}
        height={40.852}
        fill='#C5F74F'
        rx={4.816}
        transform='matrix(.87303 .48767 -.49721 .86763 76.94 46.534)'
      />
      <rect
        width={9.631}
        height={40.852}
        fill='#C5F74F'
        rx={4.816}
        transform='matrix(.87303 .48767 -.49721 .86763 128.424 46.535)'
      />
      <rect
        width={9.631}
        height={40.852}
        fill='#C5F74F'
        rx={4.816}
        transform='matrix(.87303 .48767 -.49721 .86763 94.957 67.304)'
      />
    </svg>
  )
}
