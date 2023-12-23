import type { PageServerLoad } from './$types';
import { PrismaClient } from '@prisma/client'
// import { getAlbumData } from '$lib/server/musicBrainz/services';


export const load: PageServerLoad = async () => {
  const prisma = new PrismaClient()
  // const mbid = "f6f862f0-eae6-4ba1-a27a-352e82f0a6a5"
  // const mbid = "09f8b11c-dfaa-4259-842e-0f10c25155fe"
  // const mbid = "f5ffc4db-fdef-4d0d-bf5e-f9f1bc5fef3b"
  // const { album, tracks } = await getAlbumData(mbid)

  // const a = await prisma.album.create({ data: album })
  // const b = await Promise.all(tracks.map(data => prisma.track.create({ data })))

  // return { a, b }
  return { albums: prisma.album.findMany({ include: { tracks: {orderBy: {trackNumber: "asc"}} } }) }
};
