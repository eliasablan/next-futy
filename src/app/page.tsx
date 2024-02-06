// import { Menu } from '@/components/menu'
import { Sidebar } from '@/components/sidebar'
import { AlbumArtwork } from '@/components/album-artwork'
import { PodcastEmptyPlaceholder } from '@/components/podcast-empty-placeholder'

import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import { PlusCircledIcon } from '@radix-ui/react-icons'

import { listenNowAlbums, madeForYouAlbums } from '@/lib/data/albums'

type teamType = {
  id: number
  name: string
}

const fetchTeams = async (seasonId: number) => {
  const teams_url = process.env.SPORTMONKS_URL
    ? process.env.SPORTMONKS_URL + 'teams/seasons/' + seasonId.toString()
    : ''
  const auth_token = process.env.SPORTMONKS_API || ''

  const res = await fetch(teams_url, {
    headers: {
      Authorization: auth_token,
    },
  })
  const data = await res.json()
  return data.data
}

export default async function Home() {
  const ligaId = 21694
  const ligaTeams = await fetchTeams(ligaId)
  let mappedTeams: teamType[] = []
  ligaTeams?.map((team: teamType) => {
    mappedTeams.push({
      id: team.id,
      name: team.name,
    })
  })

  return (
    <>
      {/* <Menu /> */}
      <main className="grow border-t bg-background">
        <div className="grid  lg:grid-cols-5">
          <Sidebar className="hidden lg:block" />
          <div className="col-span-3 lg:col-span-4 lg:border-l">
            <div className="h-full px-4 py-6 lg:px-8">
              <Tabs defaultValue="music" className="h-full space-y-6">
                <div className="space-between flex items-center">
                  <TabsList>
                    <TabsTrigger value="music" className="relative">
                      Music
                    </TabsTrigger>
                    <TabsTrigger value="podcasts">Podcasts</TabsTrigger>
                    <TabsTrigger value="live">Live</TabsTrigger>
                  </TabsList>
                  <div className="ml-auto mr-4">
                    <Button>
                      <PlusCircledIcon className="mr-2 h-4 w-4" />
                      Add music
                    </Button>
                  </div>
                </div>
                <TabsContent
                  value="music"
                  className="border-none p-0 outline-none"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        Listen Now
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Top picks for you. Updated daily.
                      </p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <div className="relative">
                    <ScrollArea>
                      <div className="flex space-x-4 pb-4">
                        {listenNowAlbums.map((album) => (
                          <AlbumArtwork
                            key={album.name}
                            album={album}
                            className="w-[250px]"
                            aspectRatio="portrait"
                            width={250}
                            height={330}
                          />
                        ))}
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                  <div className="mt-6 space-y-1">
                    <h2 className="text-2xl font-semibold tracking-tight">
                      Made for You
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Your personal playlists. Updated daily.
                    </p>
                  </div>
                  <Separator className="my-4" />
                  <div className="relative">
                    <ScrollArea>
                      <div className="flex space-x-4 pb-4">
                        {madeForYouAlbums.map((album) => (
                          <AlbumArtwork
                            key={album.name}
                            album={album}
                            className="w-[150px]"
                            aspectRatio="square"
                            width={150}
                            height={150}
                          />
                        ))}
                      </div>
                      <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                  </div>
                </TabsContent>
                <TabsContent
                  value="podcasts"
                  className="h-full flex-col border-none p-0 data-[state=active]:flex"
                >
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h2 className="text-2xl font-semibold tracking-tight">
                        New Episodes
                      </h2>
                      <p className="text-sm text-muted-foreground">
                        Your favorite podcasts. Updated daily.
                      </p>
                    </div>
                  </div>
                  <Separator className="my-4" />
                  <PodcastEmptyPlaceholder />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
