'use server'

import { db } from '@/db'
import { sql } from 'drizzle-orm'

export async function testSupabaseConnection () {
  // Check if env variables exist
  if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { success: false, message: 'Missing Supabase credentials in .env' }
  }

  try {
    // Test connection by making a simple request
    const response = await fetch(`${process.env.SUPABASE_URL}/rest/v1/`, {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_ROLE_KEY
      }
    })

    if (!response.ok) {
      throw new Error('Failed to connect to Supabase')
    }

    return { success: true, message: 'Successfully connected to Supabase! 🎉' }
  } catch (error) {
    return {
      success: false,
      message:
        'Failed to connect to Supabase. Check your credentials and try again.',
      error: error
    }
  }
}

export async function testDatabaseConnection () {
  try {
    await db.execute(sql`SELECT NOW()`)
    return { success: true, message: 'Drizzle connection successful!' }
  } catch (error) {
    console.error('Drizzle connection failed:', error)
    return { success: false, message: 'Drizzle connection failed' }
  }
}
