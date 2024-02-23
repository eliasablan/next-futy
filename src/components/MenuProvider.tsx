'use client'
import React, { createContext } from 'react'
import { useLocalStorage } from 'usehooks-ts'

const MenuContext = createContext<boolean | any>(false)

function MenuProvider({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useLocalStorage(
    'mobile-menu-open',
    true,
    { initializeWithValue: false }
  )

  return (
    <MenuContext.Provider value={{ mobileMenuOpen, setMobileMenuOpen }}>
      <div className={mobileMenuOpen ? 'lg:pl-56' : ''}>{children}</div>
    </MenuContext.Provider>
  )
}

export { MenuContext, MenuProvider }
