import type { Metadata } from 'next'
import {
  Geist,
  Geist_Mono,
  Inter,
  Fira_Code,
  Silkscreen,
  JetBrains_Mono
} from 'next/font/google'
import './globals.css'
import ViewportIndicator from '@/components/ViewportIndicator'
import { ThemeProvider } from '@/components/theme/ThemeProvider'

import { Toaster } from '@/components/ui/sonner'
import Header from '@/components/layout/Header'

const silkscreen = Silkscreen({
  variable: '--font-silkscreen',
  subsets: ['latin'],
  weight: '400'
})

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-mono',
  subsets: ['latin']
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin']
})

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin']
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono'
})

export const metadata: Metadata = {
  title: 'BetterApp',
  description: 'BetterApp is a simple app to help you get started with Next.js.'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${firaCode.variable} ${silkscreen.variable} ${jetbrainsMono.variable} antialiased font-mono`}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          {process.env.NODE_ENV === 'development' && <ViewportIndicator />}
          <Toaster richColors />
        </ThemeProvider>
      </body>
    </html>
  )
}
