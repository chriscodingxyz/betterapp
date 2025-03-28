// Types for the result object with discriminated union
// Main wrapper function
export async function tryCatch<T, E = Error> (
  promise: Promise<T>
): Promise<[T | null, E | null]> {
  try {
    const data = await promise
    return [data, null]
  } catch (error) {
    return [null, error as E]
  }
}
