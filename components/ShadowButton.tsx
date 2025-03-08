import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ShadowButtonProps extends React.ComponentProps<typeof Button> {
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
          className='absolute w-full h-full z-0 bg-primary group-hover:opacity-0 transition-opacity duration-200'
          style={{
            top: `${shadowOffset}px`,
            left: `${shadowOffset}px`
          }}
        />

        {/* Button element (moves on hover) */}
        <Button

          style={{
            borderWidth: `${borderWidth}px`,
            borderStyle: 'solid'
          }}
          className={cn(
            'relative bg-background hover:bg-background text-primary rounded-none z-10 border-primary',
            'transition-all duration-200 ease-in-out',
            'group-hover:translate-y-1 group-hover:translate-x-1',
            className
          )}
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
