import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { cn } from '@/lib/utils'

import { Analytics } from '@vercel/analytics/react'

import { ThemeProvider } from '@/components/theme-provider'
import { MenuProvider } from '@/components/MenuProvider'

import Header from '@/components/Header'

import { Sidebar } from '@/components/Sidebar'
import { fetchLeagues } from '@/lib/data/queries'
import { League } from '@/lib/types/league'

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
      <body className={cn('min-h-svh', inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <MenuProvider>
            <Sidebar leagues={leagues} />
            <Header />
            <div className="mx-auto max-w-7xl gap-6 p-6">{children}</div>
          </MenuProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
// 64 + 24
