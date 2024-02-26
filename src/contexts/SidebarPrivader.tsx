'use client'

import React, {
  useState,
  useEffect,
  createContext,
  useContext,
} from 'react'
import { useSession } from 'next-auth/react'
import { useLocalStorage } from 'usehooks-ts'

type SidebarContextType = {
  sidebarOpen: boolean
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>
  sidebarFollowings: Followings | null
  setSidebarFollowings: React.Dispatch<
    React.SetStateAction<Followings | null>
  >
  sidebarLoading: boolean
  setSidebarLoading: React.Dispatch<React.SetStateAction<boolean>>
}

type Followings = {
  teams: string[]
  leagues: string[]
  players: string[]
}

const SidebarContext = createContext<SidebarContextType | null>(null)

function SidebarProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()

  const [sidebarLoading, setSidebarLoading] = useState<boolean>(true)

  const [sidebarFollowings, setSidebarFollowings] =
    useLocalStorage<Followings | null>('followings', null)

  const [sidebarOpen, setSidebarOpen] = useLocalStorage<boolean>(
    'mobile-menu-open',
    true
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
    <SidebarContext.Provider
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
    </SidebarContext.Provider>
  )
}

function useSidebarContext() {
  const context = useContext(SidebarContext)
  if (!context) {
    throw new Error(
      'useSidebarContext must be used within a SidebarContext'
    )
  }
  return context
}

export { SidebarProvider, useSidebarContext }
