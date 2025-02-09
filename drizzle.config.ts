import { config } from 'dotenv'
import { defineConfig } from 'drizzle-kit'

// config({ path: '.env' })
config({ path: '.env.local' })

export default defineConfig({
  schema: './db/schemas',
  out: './db/supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!
  }
})
