// action.ts
'use server'

// Notice the import path is different from the client
import {
  ServerValidateError,
  createServerValidate
} from '@tanstack/react-form/nextjs'
import { formOpts } from './shared-code'

// Create the server action that will infer the types of the form from `formOpts`
const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate: ({ value }) => {
    console.log('value', value)
    if (value.age < 12) {
      return 'Server validation: You must be at least 12 to sign up'
    }
    if (value.firstName === '') {
      return 'Server validation: First name is required'
    }
  }
})

export default async function someAction (prev: unknown, formData: FormData) {
  try {
    const validatedData = await serverValidate(formData)

    await new Promise(resolve => setTimeout(resolve, 3000))

    console.log('validatedData', validatedData)
    // Persist the form data to the database
    // await sql`
    //   INSERT INTO users (name, email, password)
    //   VALUES (${validatedData.name}, ${validatedData.email}, ${validatedData.password})
    // `
  } catch (e) {
    if (e instanceof ServerValidateError) {
      return e.formState
    }

    // Some other error occurred while validating your form
    throw e
  }

  console.log('form was successful? via action')
  // Your form has successfully validated!
}
