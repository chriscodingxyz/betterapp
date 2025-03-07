'use server'

type ActionState = {
  message: string | null
  error: string | null
}

const initialState: ActionState = {
  message: null,
  error: null
}

export async function exampleOneAction (prevState: string, formData: FormData) {
  await new Promise(resolve => setTimeout(resolve, 2000))

  const name = formData.get('name')
  const email = formData.get('email')
  const message = formData.get('message')

  console.log(
    'START',

    '🤖🤖🤖👾👾👾👽👽👽',
    '⏰',
    new Date().getHours(),
    new Date().getMinutes(),
    '⏰',
    '🤖🤖🤖👾👾👾👽👽👽',

    name,
    email,
    message
  )

  return { name, email, message }
}
