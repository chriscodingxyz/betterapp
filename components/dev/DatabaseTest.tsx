'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { testDatabaseConnection } from '@/actions/actions'
import { toast } from 'sonner'
import IconDrizzle from '@/components/icons/svg/IconDrizzle'

export default function DatabaseTest () {
  const [loading, setLoading] = useState(false)

  const handleTest = async () => {
    setLoading(true)
    try {
      const { success, message } = await testDatabaseConnection()
      if (success) {
        toast.success(message)
      }
      if (!success) {
        toast.error(message)
      }
    } catch (error) {
      toast.error('Error testing database connection')
      console.error('Error testing database connection', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button onClick={handleTest} disabled={loading}>
      {loading ? (
        'Testing...'
      ) : (
        <>
          Test <IconDrizzle className='size-4' /> Connection
        </>
      )}
    </Button>
  )
}
