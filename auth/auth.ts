import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { db } from '@/db'
import * as schema from '@/db/schemas/auth-schema'
import { nextCookies } from 'better-auth/next-js'

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema
  }),
  emailAndPassword: {
    enabled: true
  },
  cookie: {
    name: 'better-auth-session',
    httpOnly: true,
    secure: false, // Allow cookies on http://localhost
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  plugins: [nextCookies()] // make sure this is the last plugin in the array
})
