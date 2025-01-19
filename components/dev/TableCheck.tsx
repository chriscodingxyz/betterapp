'use client'

import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { checkTableAction } from '@/actions/actions'

export default function TableCheck () {
  const [exists, setExists] = useState<boolean | null>(null)
  const [checking, setChecking] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const handleCheck = async () => {
    setChecking(true)
    try {
      const result = await checkTableAction()
      setExists(result.success)
      setMessage(result.message)
    } catch (error) {
      setExists(false)
      console.error('Error checking table:', error)
      setMessage('Error checking table')
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className='flex flex-col items-center gap-2'>
      <Button onClick={handleCheck} disabled={checking} variant='outline'>
        {checking ? 'Checking...' : 'Check Todos Table'}
      </Button>
      {exists !== null && message && (
        <p className={`text-sm ${exists ? 'text-green-500' : 'text-red-500'}`}>
          {message}
        </p>
      )}
    </div>
  )
}
