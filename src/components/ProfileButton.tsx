import React from 'react'
import { PersonIcon } from '@radix-ui/react-icons'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'

export function ProfileButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-16 w-16 rounded-none"
        >
          <PersonIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Profile options</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="h-30 border-2">
        <Link href="/profile">
          <DropdownMenuItem className="px-6 py-4">
            Profile
          </DropdownMenuItem>
        </Link>
        <Link href="/profile">
          <DropdownMenuItem className="px-6 py-4">
            Profile
          </DropdownMenuItem>
        </Link>
        <Link href="/profile">
          <DropdownMenuItem className="px-6 py-4">
            Profile
          </DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
