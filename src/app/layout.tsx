import React from 'react'
import type { Metadata } from 'next'
import './globals.css'

import { Analytics } from '@vercel/analytics/react'
import { cn } from '@/lib/utils'
import { Inter } from 'next/font/google'

import { ThemeProvider } from '@/components/theme-provider'
import { MenuProvider } from '@/components/MenuProvider'

import Header from '@/components/Header'
import Sidebar from '@/components/Sidebar'

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
            <Sidebar />
            <Header />
            <div className="mx-auto max-w-7xl gap-6 p-6">{children}</div>
          </MenuProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
