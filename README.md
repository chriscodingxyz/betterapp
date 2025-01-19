# Next.js Template Setup

## Important Notes

- Do not confuse the Supabase URL with the Database URL - they are different!
- Never commit your `.env` or `.env.local` file (they should be in the .gitignore file)
- The service_role key has full database access - keep it secure

## Environment Setup

1. Find `env.local.txt` in the root folder containing:

```bash
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=
DATABASE_URL=
```

2. Rename `env.local.txt` to `.env.local` or `.env`

## Supabase Configuration

1. Create a new project at [Supabase](https://database.new)
2. **Important**: Save your database password - you'll need it for the DATABASE_URL
3. In project settings > API:

   - Copy the Supabase URL
   - Copy the service_role key
   - Add both to your .env file

4. Get your DATABASE_URL:
   - Click 'Connect' at the top
   - Go to 'ORMs' tab
   - Switch to 'Drizzle'
   - Copy the DATABASE_URL
   - Replace `[YOUR-PASSWORD]` with your password from step 2

## Database Migrations

```bash
# Generate migration
bunx drizzle-kit generate

# Push to Supabase
bunx drizzle-kit migrate
```

## Steps alraedy taken

#### (These steps were already taken to get the Repo to its current state)

```bash
bunx create-next-app@latest
bunx --bun shadcn@latest init -d
bunx --bun shadcn@latest add button

bun add @supabase/supabase-js drizzle-orm postgres
bun add -d drizzle-kit
```
