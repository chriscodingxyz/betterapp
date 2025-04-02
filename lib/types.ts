import { User } from 'better-auth'

export type ActionResponse = { success: boolean; message: string }

// basically im using the User from better-auth but extending it out to have membership info
// I might undo this after I add Stripe integration
export type BetterAuthUser = User & {
  membershipType: string
  membershipStartDate: Date | null
  membershipEndDate: Date | null
}
