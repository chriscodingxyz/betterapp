'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { testSupabaseConnection } from '@/actions/actions'
import { toast } from 'sonner'
import IconSupabase from '@/components/icons/svg/IconSupabase'

export default function SupabaseTest () {
  const [loading, setLoading] = useState(false)

  const handleTest = async () => {
    setLoading(true)
    try {
      const { success, message } = await testSupabaseConnection()
      if (success) {
        toast.success(message)
      }
      if (!success) {
        toast.error(message)
      }
    } catch (error) {
      toast.error('Error testing Supabase connection')
      console.error('Error testing Supabase connection', error)
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
          Test <IconSupabase className='size-4' /> Connection
        </>
      )}
    </Button>
  )
}
