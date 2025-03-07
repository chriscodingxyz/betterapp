// 'use client'

// import React, { useActionState } from 'react'
// import { Input } from '@/components/ui/input'
// import { Button } from '@/components/ui/button'
// import { exampleOneAction } from './actions'

// const initialState = {
//   name: '',
//   email: '',
//   message: ''
// }

// export default function page () {
//   const [state, action, isLoading] = useActionState(
//     exampleOneAction,
//     initialState
//   )

//   return (
//     <div className='min-h-[100dvh] flex-center-col'>
//       <form action={action}>
//         <Input type='text' name='name' defaultValue={state.name} />
//         <Input type='email' name='email' defaultValue={state.email} />
//         <Input type='text' name='message' defaultValue={state.message} />
//         <Button>{isLoading ? '...' : 'Submit'}</Button>
//       </form>
//     </div>
//   )
// }
