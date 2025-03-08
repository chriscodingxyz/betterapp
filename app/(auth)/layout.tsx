"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface AuthLayoutProps {
  children: React.ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  const pathname = usePathname()
  
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex w-full overflow-hidden rounded-t-lg border">
          <Link 
            href="/sign-in" 
            className={`flex-1 py-3 text-center font-medium transition-all ${
              pathname === "/sign-in" 
                ? "bg-background text-foreground" 
                : "bg-muted/50 text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Sign In
          </Link>
          <Link 
            href="/sign-up" 
            className={`flex-1 py-3 text-center font-medium transition-all ${
              pathname === "/sign-up" 
                ? "bg-background text-foreground" 
                : "bg-muted/50 text-muted-foreground hover:bg-muted/80"
            }`}
          >
            Sign Up
          </Link>
        </div>
        <div className="rounded-b-lg border border-t-0 p-6">
          {children}
        </div>
        
        <p className="px-8 text-center text-sm text-muted-foreground">
          Powered by{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            better-auth
          </a>
        </p>
      </div>
    </div>
  )
}
