'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  testSupabaseConnection,
  testDatabaseConnection,
  checkTableAction
} from '@/actions/actions'
import { toast } from 'sonner'
import IconSupabase from '@/components/icons/svg/IconSupabase'
import IconDrizzle from '@/components/icons/svg/IconDrizzle'
import { CheckCircle2, XCircle, Table } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui/tooltip'

type CheckStatus = {
  completed: boolean
  success: boolean
  message: string | null
}

type Checks = {
  supabase: CheckStatus
  drizzle: CheckStatus
  table: CheckStatus
}

export default function SetupChecks () {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [checks, setChecks] = useState<Checks>({
    supabase: { completed: false, success: false, message: null },
    drizzle: { completed: false, success: false, message: null },
    table: { completed: false, success: false, message: null }
  })

  const handleSupabaseCheck = async () => {
    setLoading(true)
    try {
      const { success, message } = await testSupabaseConnection()
      setChecks(prev => ({
        ...prev,
        supabase: { completed: true, success, message }
      }))
      if (success) {
        toast.success(message)
        setCurrentStep(1)
      } else {
        toast.error(message)
      }
    } catch (error) {
      toast.error('Error testing Supabase connection')
      console.error(error)
      setChecks(prev => ({
        ...prev,
        supabase: {
          completed: true,
          success: false,
          message: 'Connection failed'
        }
      }))
    } finally {
      setLoading(false)
    }
  }

  const handleDrizzleCheck = async () => {
    setLoading(true)
    try {
      const { success, message } = await testDatabaseConnection()
      setChecks(prev => ({
        ...prev,
        drizzle: { completed: true, success, message }
      }))
      if (success) {
        toast.success(message)
        setCurrentStep(2)
      } else {
        toast.error(message)
      }
    } catch (error) {
      toast.error('Error testing database connection')
      console.error(error)
      setChecks(prev => ({
        ...prev,
        drizzle: {
          completed: true,
          success: false,
          message: 'Connection failed'
        }
      }))
    } finally {
      setLoading(false)
    }
  }

  const handleTableCheck = async () => {
    setLoading(true)
    try {
      const { success, message } = await checkTableAction()
      setChecks(prev => ({
        ...prev,
        table: { completed: true, success, message }
      }))
      if (success) {
        toast.success(message)
      } else {
        toast.error(message)
      }
    } catch (error) {
      toast.error('Error checking table')
      console.error(error)
      setChecks(prev => ({
        ...prev,
        table: { completed: true, success: false, message: 'Check failed' }
      }))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col items-center gap-3'>
      <div className='flex flex-col items-center gap-1'>
        <div
          className={`flex items-center ${
            loading || (currentStep !== 0 && checks.supabase.completed)
              ? 'cursor-not-allowed'
              : ''
          }`}
        >
          <Button
            size='sm'
            onClick={handleSupabaseCheck}
            disabled={
              loading || (currentStep !== 0 && checks.supabase.completed)
            }
            variant={currentStep === 0 ? 'default' : 'outline'}
            className='w-40 text-xs'
          >
            {loading && currentStep === 0 ? (
              'Checking...'
            ) : (
              <>
                Supabase <IconSupabase className='size-3' />
              </>
            )}
          </Button>
          <div className='w-8 flex justify-center'>
            {checks.supabase.completed &&
              (checks.supabase.success ? (
                <CheckCircle2 className='w-4 h-4 text-green-500' />
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <XCircle className='w-4 h-4 text-red-500' />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{checks.supabase.message || 'Connection failed'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center gap-1'>
        <div
          className={`flex items-center ${
            loading || currentStep !== 1 || !checks.supabase.success
              ? 'cursor-not-allowed'
              : ''
          }`}
        >
          <Button
            size='sm'
            onClick={handleDrizzleCheck}
            disabled={loading || currentStep !== 1 || !checks.supabase.success}
            variant={currentStep === 1 ? 'default' : 'outline'}
            className='w-40 text-xs'
          >
            {loading && currentStep === 1 ? (
              'Checking...'
            ) : (
              <>
                Drizzle <IconDrizzle className='size-3 bg-black' />
              </>
            )}
          </Button>
          <div className='w-8 flex justify-center'>
            {checks.drizzle.completed &&
              (checks.drizzle.success ? (
                <CheckCircle2 className='w-4 h-4 text-green-500' />
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <XCircle className='w-4 h-4 text-red-500' />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{checks.drizzle.message || 'Connection failed'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
          </div>
        </div>
      </div>

      <div className='flex flex-col items-center gap-1'>
        <div
          className={`flex items-center ${
            loading || currentStep !== 2 || !checks.drizzle.success
              ? 'cursor-not-allowed'
              : ''
          }`}
        >
          <Button
            size='sm'
            onClick={handleTableCheck}
            disabled={loading || currentStep !== 2 || !checks.drizzle.success}
            variant={currentStep === 2 ? 'default' : 'outline'}
            className='w-40 text-xs'
          >
            {loading && currentStep === 2 ? (
              'Checking...'
            ) : (
              <>
                Table <Table className='size-3' />
              </>
            )}
          </Button>
          <div className='w-8 flex justify-center'>
            {checks.table.completed &&
              (checks.table.success ? (
                <CheckCircle2 className='w-4 h-4 text-green-500' />
              ) : (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <XCircle className='w-4 h-4 text-red-500' />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{checks.table.message || 'Check failed'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
