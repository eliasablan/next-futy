'use client'
import React, { createContext } from 'react'
import { useLocalStorage } from 'usehooks-ts'

const MenuContext = createContext<boolean | any>(false)

function MenuProvider({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useLocalStorage(
    'mobile-menu-open',
    true,
    { initializeWithValue: false }
  )

  return (
    <MenuContext.Provider value={{ sidebarOpen, setSidebarOpen }}>
      <div className={sidebarOpen ? 'lg:pl-56' : ''}>{children}</div>
    </MenuContext.Provider>
  )
}

export { MenuContext, MenuProvider }
