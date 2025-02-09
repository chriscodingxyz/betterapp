import { boolean, pgTable, text } from 'drizzle-orm/pg-core'

export const todosTable = pgTable('todos', {
  id: text('todo_id').primaryKey(),
  title: text('title'),
  completed: boolean('completed').default(false)
})

export type InsertTodo = typeof todosTable.$inferInsert
export type SelectTodo = typeof todosTable.$inferSelect
