import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ShadowButtonProps extends React.ComponentProps<typeof Button> {
  shadowColor?: string
  shadowOffset?: number
  borderWidth?: number
}

export const ShadowButton = React.forwardRef<
  HTMLButtonElement,
  ShadowButtonProps
>(
  (
    {
      className,
      children,
      shadowColor = 'black',
      shadowOffset = 4,
      borderWidth = 2,
      ...props
    },
    ref
  ) => {
    return (
      <div className='relative group'>
        {/* Shadow element (stays fixed) */}
        <div
          className='absolute w-full h-full z-0 group-hover:opacity-0 transition-opacity duration-200'
          style={{
            backgroundColor: shadowColor,
            top: `${shadowOffset}px`,
            left: `${shadowOffset}px`
          }}
        />

        {/* Button element (moves on hover) */}
        <Button
          className={cn(
            'relative bg-white hover:bg-white text-black rounded-none z-10',
            'transition-all duration-200 ease-in-out',
            'group-hover:translate-y-1 group-hover:translate-x-1',
            className
          )}
          style={{
            borderColor: 'black',
            borderWidth: `${borderWidth}px`,
            borderStyle: 'solid'
          }}
          ref={ref}
          {...props}
        >
          {children}
        </Button>
      </div>
    )
  }
)

ShadowButton.displayName = 'ShadowButton'
