'use client'
import React, { useContext } from 'react'
import Link from 'next/link'
import { MenuContext } from '@/components/MenuProvider'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'

export function MobileHeader() {
  const { mobileMenuOpen, setMobileMenuOpen } = useContext(MenuContext)
  return (
    <>
      <header className="lg:hidden">
        <div className="flex h-28 items-center justify-between border-b p-6">
          <Link href="/" className="focus:ring">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-12 w-12"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
              ></path>
            </svg>
          </Link>
          <Button
            className="z-10 h-11 w-11 rounded-lg p-2 focus:ring"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={cn('block h-12 w-12', mobileMenuOpen && 'hidden')}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={cn('hidden h-12 w-12', mobileMenuOpen && 'block')}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </Button>
        </div>
      </header>
      <div
        className={cn(
          'no-scrollbar fixed inset-0 z-10 bg-background opacity-70 lg:hidden',
          mobileMenuOpen ? 'block' : 'hidden'
        )}
        onClick={() => setMobileMenuOpen(false)}
      />
    </>
  )
}
