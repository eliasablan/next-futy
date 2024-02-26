import React from 'react'
import type { Metadata } from 'next'
import './globals.css'

import { Inter } from 'next/font/google'
import { getServerSession } from 'next-auth'
import { Analytics } from '@vercel/analytics/react'

import { ThemeProvider } from '@/contexts/ThemeProvider'
import { SessionProvider } from '@/contexts/SessionProvider'
import { SidebarProvider } from '@/contexts/SidebarPrivader'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'

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
  const session = await getServerSession()

  return (
    <html lang="en">
      <body className={cn('min-h-svh', inter.className)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SessionProvider session={session}>
            <SidebarProvider>
              <Sidebar />
              <Header />
              <div className="mx-auto max-w-7xl gap-6 p-6">{children}</div>
            </SidebarProvider>
          </SessionProvider>
        </ThemeProvider>
        <Analytics />
        <Toaster />
      </body>
    </html>
  )
}
