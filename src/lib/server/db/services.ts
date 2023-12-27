import { PrismaClient } from '@prisma/client'
import { getAlbumData } from '$lib/server/musicBrainz/services';

const prisma = new PrismaClient()

export const addAlbum = async (mbid: string) => {
  const { album, tracks } = await getAlbumData(mbid)

  await prisma.$transaction([
    prisma.album.create({ data: album }),
    ...tracks.map(data => prisma.track.create({ data }))
  ])
}

export const getAlbums = () => {
  return prisma.album.findMany({ include: { tracks: { orderBy: { trackNumber: "asc" } } } })
}

export const getAlbum = (mbid: string) => {
  return prisma.album.findUniqueOrThrow({
    where: { mbid },
    include: { tracks: { orderBy: { trackNumber: "asc" } } }
  })
}
