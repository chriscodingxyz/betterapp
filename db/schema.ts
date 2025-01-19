// import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'

// export const users = pgTable('users', {
//   id: uuid('id').primaryKey().defaultRandom(),
//   email: text('email').unique().notNull(),
//   createdAt: timestamp('created_at').defaultNow().notNull()
// })

// // Add more tables as needed

import { boolean, pgTable, text, timestamp } from 'drizzle-orm/pg-core'

export const usersTable = pgTable('users', {
  id: text('user_id').primaryKey(),
  email: text('email').unique(),
  firstName: text('first_name'),
  lastName: text('last_name'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  isActive: boolean('is_active').default(false),
  subscriptionType: text('subscription_type').default('free')
})

// Type definitions using the newer syntax
export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect
