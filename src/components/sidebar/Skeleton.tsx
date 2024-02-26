import React from 'react'

export default function Skeleton() {
  return (
    <>
      <div className="w-full animate-pulse bg-secondary-foreground/50 py-2 text-center text-sm text-secondary">
        Competitions
      </div>
      <div className="w-full animate-pulse bg-secondary-foreground/50 py-2 text-center text-sm text-secondary">
        Teams
      </div>
      <div className="w-full animate-pulse bg-secondary-foreground/50 py-2 text-center text-sm text-secondary">
        Players
      </div>
    </>
  )
}
