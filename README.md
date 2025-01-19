# Next.js Template Setup

### Steps taken

```bash
bunx create-next-app@latest
bunx --bun shadcn@latest init -d
bunx --bun shadcn@latest add button

bun add @supabase/supabase-js drizzle-orm postgres
bun add -d drizzle-kit
```

### Database Migrations

```bash
# Generate migration
bunx drizzle-kit generate

# Push to Supabase
bunx drizzle-kit migrate
```
