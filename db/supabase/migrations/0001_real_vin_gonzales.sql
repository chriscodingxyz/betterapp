ALTER TABLE "user" ADD COLUMN "membership_type" text DEFAULT 'basic' NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "membership_start_date" timestamp;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "membership_end_date" timestamp;