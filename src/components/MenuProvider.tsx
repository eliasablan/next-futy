'use client'
import React, { useState, useEffect, createContext } from 'react'
import { useSession } from 'next-auth/react'
import { useLocalStorage } from 'usehooks-ts'

const MenuContext = createContext<boolean | any>(false)

interface Followings {
  teams: string[]
  leagues: string[]
  players: string[]
}

function MenuProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const [sidebarLoading, setSidebarLoading] = useState<boolean>(true)
  const [sidebarFollowings, setSidebarFollowings] =
    useLocalStorage<Followings | null>('followings', null)
  const [sidebarOpen, setSidebarOpen] = useLocalStorage(
    'mobile-menu-open',
    true,
    { initializeWithValue: false }
  )

  useEffect(() => {
    if (session) {
      if (!sidebarFollowings) {
        fetch(`/api/user/${session?.user?.email}`)
          .then((res) => res.json())
          .then((data) => setSidebarFollowings(data))
          .then(() => setSidebarLoading(false))
      } else {
        setSidebarLoading(false)
      }
    }
  }, [session, sidebarFollowings, setSidebarFollowings])

  return (
    <MenuContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        sidebarFollowings,
        setSidebarFollowings,
        sidebarLoading,
        setSidebarLoading,
      }}
    >
      <div className={sidebarOpen ? 'lg:pl-56' : ''}>{children}</div>
    </MenuContext.Provider>
  )
}

export { MenuContext, MenuProvider }
