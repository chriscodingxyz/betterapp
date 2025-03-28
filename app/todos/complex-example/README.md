# 🚀 Complex Form Handling Example

This directory contains an example of using our reusable form handling patterns for more complex forms.

## Key Features Added

1. **Better Type Safety**: Generic `ActionState<T>` type that includes data in responses
2. **Form Reset**: Using form refs to reset forms without controlling inputs
3. **Reusable Form Action Creator**: Generic function to create server actions with consistent patterns
4. **Reusable Client Hook**: Custom hook that handles form state, validation, and notifications

## Implementation Notes

This example is incomplete and meant as a reference for using the patterns. To make it fully functional:

1. Make sure your database schema includes the fields needed for complex todos
2. Create or import a Textarea component if you want to use one
3. Fix any imports or type errors

## How to Use These Patterns

### 1. Server Actions (For Form Submissions)

Use the `createFormAction` function from `app/todos/actions.ts` to create server actions with consistent validation, authentication, and error handling:

```typescript
import { createFormAction } from '@/app/todos/actions'
import { mySchema } from './my-schema'

export const myAction = createFormAction(
  mySchema,
  async (validData) => {
    // Process the validated data
    // Return success/error
    return { success: 'Success message' }
  }
)
```

### 2. Client-Side Forms

Use the `useFormAction` hook from `lib/hooks/form-action.ts` for form handling:

```tsx
import { useFormAction } from '@/lib/hooks/form-action'
import { myAction } from './my-actions'
import { mySchema } from './my-schema'

function MyForm() {
  const { 
    state, 
    isPending, 
    formRef, 
    validateAndSubmit 
  } = useFormAction(myAction, mySchema)

  return (
    <form ref={formRef} action={validateAndSubmit}>
      {/* Form fields */}
      <button disabled={isPending}>Submit</button>
    </form>
  )
}
```

This approach provides:
- Automatic form reset on success
- Toast notifications for success/errors
- Client-side validation with the schema
- Server-side validation as a fallback
- Loading state handling 