import { fetchLeagues } from '@/lib/data/queries'
import { League } from '@/lib/types/league'

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import TeamsCard from '@/components/TeamsCard'
import { SearchParams } from '@/lib/types/searchParams'

export default async function Home({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const leagues: League[] = await fetchLeagues()

  return (
    <div className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2 2xl:grid-cols-3">
      <section className="col-span-1">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Leages</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea>
              <div className="mt-2 text-center">
                {leagues &&
                  leagues.map((league) => (
                    <Button
                      key={league.id}
                      asChild
                      variant="ghost"
                      size="icon"
                      className={cn('h-14 w-14')}
                    >
                      <Link href={`/leagues/${league.code}`}>
                        <Image
                          src={league.emblem}
                          alt={league.name}
                          width={40}
                          height={40}
                        />
                      </Link>
                    </Button>
                  ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </section>
      <TeamsCard searchParams={searchParams} />
    </div>
  )
}
