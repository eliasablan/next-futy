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
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [followings, setFollowings] = useLocalStorage<Followings | null>(
    'followings',
    null
  )
  const [sidebarOpen, setSidebarOpen] = useLocalStorage(
    'mobile-menu-open',
    true,
    { initializeWithValue: false }
  )

  useEffect(() => {
    if (session) {
      if (!followings) {
        fetch(`/api/user/${session?.user?.email}`)
          .then((res) => res.json())
          .then((data) => setFollowings(data))
          .then(() => setIsLoading(false))
      } else {
        setIsLoading(false)
      }
    }
  }, [session, followings, setFollowings])

  return (
    <MenuContext.Provider
      value={{
        sidebarOpen,
        setSidebarOpen,
        followings,
        setFollowings,
        isLoading,
        setIsLoading,
      }}
    >
      <div className={sidebarOpen ? 'lg:pl-56' : ''}>{children}</div>
    </MenuContext.Provider>
  )
}

export { MenuContext, MenuProvider }
