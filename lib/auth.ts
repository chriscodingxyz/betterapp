import 'server-only'

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
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24 * 1, // 1 day (every 1 day the session expiration is updated)
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60 // Cache duration in seconds
    }
  },
  advanced: {
    ipAddress: {
      ipAddressHeaders: ['x-client-ip', 'x-forwarded-for'],
      disableIpTracking: false
    }
  },
  // cookie: {
  //   name: 'better-auth-session',
  //   httpOnly: true,
  //   secure: false, // Allow cookies on http://localhost
  //   sameSite: 'lax',
  //   maxAge: 30 * 24 * 60 * 60 // 30 days
  // },
  plugins: [nextCookies()] // make sure this is the last plugin in the array
})
