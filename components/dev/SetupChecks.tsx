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
// import { cn } from '@/lib/utils'

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

type CheckStepProps = {
  title: string
  icon: React.ReactNode
  isLoading: boolean
  isCurrentStep: boolean
  isCompleted: boolean
  isSuccess: boolean
  isDisabled: boolean
  message: string | null
  onCheck: () => void
}

function CheckStep ({
  title,
  icon,
  isLoading,
  isCurrentStep,
  isCompleted,
  isSuccess,
  isDisabled,
  message,
  onCheck
}: CheckStepProps) {
  return (
    <div className='flex flex-col items-center gap-1'>
      <div className='flex items-center'>
        <Button
          size='sm'
          onClick={onCheck}
          disabled={isDisabled}
          variant={isCurrentStep ? 'outline' : 'ghost'}
          className='w-40 text-xs'
        >
          {isLoading && isCurrentStep ? (
            'Checking...'
          ) : (
            <>
              {title} {icon}
            </>
          )}
        </Button>
        <div className='w-8 flex justify-center'>
          {isCompleted &&
            (isSuccess ? (
              <CheckCircle2 className='w-4 h-4 text-green-500' />
            ) : (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <XCircle className='w-4 h-4 text-red-500' />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{message || 'Check failed'}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
        </div>
      </div>
    </div>
  )
}

const SETUP_STEPS = [
  {
    id: 'supabase',
    title: 'Supabase',
    icon: <IconSupabase className='size-3' />,
    requiresPrevious: false
  },
  {
    id: 'drizzle',
    title: 'Drizzle',
    icon: <IconDrizzle className='size-3 bg-black' />,
    requiresPrevious: 'supabase'
  },
  {
    id: 'table',
    title: 'Table',
    icon: <Table className='size-3' />,
    requiresPrevious: 'drizzle'
  }
] as const

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

  const handlers = {
    supabase: handleSupabaseCheck,
    drizzle: handleDrizzleCheck,
    table: handleTableCheck
  }

  return (
    <div className='flex flex-col items-center gap-0'>
      {SETUP_STEPS.map((step, index) => (
        <CheckStep
          key={step.id}
          title={step.title}
          icon={step.icon}
          isLoading={loading}
          isCurrentStep={currentStep === index}
          isCompleted={checks[step.id].completed}
          isSuccess={checks[step.id].success}
          isDisabled={
            loading ||
            (step.requiresPrevious && !checks[step.requiresPrevious].success) ||
            checks[step.id].completed
          }
          message={checks[step.id].message}
          onCheck={handlers[step.id]}
        />
      ))}
    </div>
  )
}
