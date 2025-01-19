CREATE TABLE "users" (
	"user_id" text PRIMARY KEY NOT NULL,
	"email" text,
	"first_name" text,
	"last_name" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now(),
	"is_active" boolean DEFAULT false,
	"subscription_type" text DEFAULT 'free',
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
