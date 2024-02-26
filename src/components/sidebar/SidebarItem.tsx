'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useLocalStorage } from 'usehooks-ts'

import { cn } from '@/lib/utils'
import { Button } from '../ui/button'

import { getFollowingData } from '@/lib/actions'

interface ButtonData {
  link: string
  name: string
  emblem: string
}

export function SidebarItem({ type, id }: { type: string; id: string }) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const pathname = usePathname()
  const [buttonData, setButtonData] = useLocalStorage<ButtonData | null>(
    `button-${type}-${id}`,
    null
  )

  useEffect(() => {
    if (!buttonData) {
      getFollowingData(type, id)
        .then((data) => setButtonData(data?.data || null))
        .then(() => setIsLoading(false))
    } else {
      setIsLoading(false)
    }
  }, [id, type, buttonData, setButtonData])

  if (isLoading || !buttonData) {
    return null
  }

  return (
    <Button
      asChild
      variant="ghost"
      size="icon"
      className={cn(
        'h-auto min-h-12 w-full rounded-none px-4',
        pathname === buttonData.link && 'border bg-accent'
      )}
    >
      <Link href={buttonData.link} className="gap-x-3 px-6 antialiased">
        <Image
          src={buttonData.emblem}
          alt={buttonData.name}
          width={30}
          height={30}
          className="absolute left-4"
        />
        <p className="my-5 ml-8 w-full text-wrap text-sm font-medium leading-tight tracking-wider lg:my-4">
          {buttonData.name}
        </p>
      </Link>
    </Button>
  )
}
