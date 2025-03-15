'use client'

import React, { useEffect, useState } from 'react'
import { useSearchParams, useRouter, usePathname } from 'next/navigation'
import { toast, Toaster } from 'sonner'

export default function SonnerWrapper ({
  children
}: {
  children: React.ReactNode
}) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()
  const [lastToastId, setLastToastId] = useState<string | null>(null)

  useEffect(() => {
    const toastParam = searchParams.get('toast')

    // Only process if we have a toast parameter and it's not one we've seen before
    if (toastParam && toastParam !== lastToastId) {
      setLastToastId(toastParam)

      // Determine toast type based on prefix
      if (toastParam.startsWith('success:')) {
        toast.success(toastParam.substring(8).trim())
      } else if (toastParam.startsWith('error:')) {
        toast.error(toastParam.substring(6).trim())
      } else if (toastParam.startsWith('info:')) {
        toast.info(toastParam.substring(5).trim())
      } else {
        // Default to regular toast for messages without a prefix
        toast(toastParam)
      }

      // Create new URL without the toast parameter
      const newSearchParams = new URLSearchParams(searchParams)
      newSearchParams.delete('toast')

      // Build new URL with preserved parameters
      const newUrl = newSearchParams.toString()
        ? `${pathname}?${newSearchParams.toString()}`
        : pathname

      // Replace URL without toast parameter
      setTimeout(() => {
        router.replace(newUrl)
      }, 100)
    }
  }, [searchParams, router, pathname, lastToastId])

  return (
    <>
      {children}
      <Toaster richColors />
    </>
  )
}
