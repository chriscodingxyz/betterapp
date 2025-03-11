'use client'

import { useEffect } from 'react'

export default function Error ({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to console for development debugging
    console.error('Error occurred:', error)
  }, [error])

  return (
    <div className='min-h-screen flex items-center justify-center p-4'>
      <div className='max-w-2xl w-full bg-background border rounded-lg p-6 space-y-4'>
        <div className='space-y-2'>
          <h1 className='text-2xl font-bold text-destructive'>
            Something went wrong!
          </h1>
          <p className='text-muted-foreground'>
            An error occurred while processing your request.
          </p>
        </div>

        <div className='space-y-2 p-4 bg-muted/50 rounded-md'>
          <p className='font-mono text-sm break-all'>
            <span className='font-semibold'>Error:</span> {error.message}
          </p>
          {error.digest && (
            <p className='font-mono text-sm break-all'>
              <span className='font-semibold'>Digest:</span> {error.digest}
            </p>
          )}
          {error.stack && (
            <details className='mt-2'>
              <summary className='cursor-pointer text-sm font-medium'>
                Stack trace
              </summary>
              <pre className='mt-2 whitespace-pre-wrap text-xs overflow-x-auto p-2 bg-muted rounded'>
                {error.stack}
              </pre>
            </details>
          )}
        </div>

        <div className='flex gap-4'>
          <button
            onClick={reset}
            className='px-4 py-2 text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 rounded-md transition-colors'
          >
            Try again
          </button>
          <button
            onClick={() => (window.location.href = '/')}
            className='px-4 py-2 text-sm font-medium bg-secondary text-secondary-foreground hover:bg-secondary/90 rounded-md transition-colors'
          >
            Go home
          </button>
        </div>
      </div>
    </div>
  )
}
