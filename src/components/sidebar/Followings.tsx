import React, { Suspense } from 'react'

import Skeleton from '@/components/sidebar/Skeleton'
import List from './List'

export default async function Followings() {
  return (
    <Suspense fallback={<Skeleton />}>
      <List />
    </Suspense>
  )
}
