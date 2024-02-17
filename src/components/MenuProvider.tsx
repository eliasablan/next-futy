'use client'
import React, { createContext, useState } from 'react'

const MenuContext = createContext<any>(null)

function MenuProvider({ children }: { children: React.ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <MenuContext.Provider value={{ mobileMenuOpen, setMobileMenuOpen }}>
      <div className={mobileMenuOpen ? 'lg:pl-52' : ''}>{children}</div>
    </MenuContext.Provider>
  )
}

export { MenuContext, MenuProvider }
