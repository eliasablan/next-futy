import React from 'react'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

import { MobileHeader } from '@/components/MobileHeader'
import { Sidebar } from '@/components/Sidebar'
import { MenuProvider } from '@/components/MenuProvider'
import { ThemeProvider } from '@/components/theme-provider'

import { fetchLeagues } from '@/lib/data/queries'
import { League } from '@/lib/types/league'
import Header from '@/components/Header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Futy App',
  description: 'Most popular football competitions scores and standings.',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const leagues: League[] = await fetchLeagues()

  return (
    <html lang="en">
      <body className={cn('min-h-svh lg:pl-72', inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MenuProvider>
            <Sidebar leagues={leagues} />
            <MobileHeader />
            <Header />
          </MenuProvider>
          <div className="mx-auto max-w-7xl gap-6 p-6 lg:pt-[88px]">
            {children}
          </div>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
// 64 + 24
