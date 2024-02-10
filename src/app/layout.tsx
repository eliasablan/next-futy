import React from 'react'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'

import { MobileHeader } from '@/components/MobileHeader'
import { Sidebar } from '@/components/Sidebar'

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
      <body
        className={cn('relative min-h-screen lg:flex', inter.className)}
      >
        <MobileHeader />
        <div className="fixed inset-0 z-20 hidden bg-black opacity-30 transition-opacity lg:hidden"></div>
        <Sidebar leagues={leagues} />
        <div className="flex-1 space-y-6 overflow-y-auto bg-gray-100 pb-12 md:space-y-8 lg:h-screen">
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
