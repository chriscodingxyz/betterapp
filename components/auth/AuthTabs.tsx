"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function AuthTabs() {
  const pathname = usePathname()
  
  return (
    <div className="flex w-full overflow-hidden rounded-lg border mb-6">
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
  )
}
