import type { PageServerLoad } from './$types';
import { PrismaClient } from '@prisma/client'

export const load: PageServerLoad = async ({ params }) => {
  const prisma = new PrismaClient()

  const album = prisma.album.findUniqueOrThrow({
    where: { mbid: params.slug },
    include: { tracks: { orderBy: { trackNumber: "asc" } } }
  })

  return { album }
};
