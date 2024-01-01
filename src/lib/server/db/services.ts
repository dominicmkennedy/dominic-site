import { PrismaClient } from '@prisma/client'
import { getAlbumData } from '$lib/server/musicBrainz/services';
import type { ReviewParams } from '$lib/types';

const prisma = new PrismaClient()

export const addAlbum = async (mbid: string) => {
  const { album, tracks } = await getAlbumData(mbid)

  await prisma.$transaction([
    prisma.album.create({ data: album }),
    ...tracks.map(data => prisma.track.create({ data }))
  ])
}

export const getAlbums = () => {
  return prisma.album.findMany({
    include: { tracks: { orderBy: { trackNumber: "asc" } } },
    orderBy: { reviewDate: "desc" }
  })
}

export const getAlbum = (mbid: string) => {
  return prisma.album.findUniqueOrThrow({
    where: { mbid },
    include: { tracks: { orderBy: { trackNumber: "asc" } } }
  })
}

export const addReview = (params: ReviewParams, reviewTextMd: string) => {
  const trackUpdates = Object
    .entries(params.tracks)
    .map(([mbid, { trackScore, trackRank }]) => ({ where: { mbid }, data: { trackRank, trackScore } }))

  return prisma.album.update({
    where: { mbid: params.mbid },
    data: {
      reviewDate: new Date(params.reviewDate).toISOString(),
      dominicScore: params.score,
      reviewTextMd,
      tracks: { update: trackUpdates }
    }
  })
}
