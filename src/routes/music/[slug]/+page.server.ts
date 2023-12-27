import type { PageServerLoad } from './$types';
import { PrismaClient } from '@prisma/client'

const mdText = `
# Yesterday's Tomorrow: Phony Ppl

## About the artist
As of 2023 the album comes in number 5 out of 7 in Phony Ppls line up.
But it is by far the groups most sucsessful release. Maybe due to members leaving?? Also they sv

Every G in the track names is capitolized

## About the album
The instramentation is...
The album is 54 minutes long but composed of 15 tracks, giving each track an avg length of 3.6 minutes

## My relation to the album


## Tracks

1. Special One.
2. End of The niGht.
3. Baby Meet My Lover.
4. Smoke To Get Sober.
5. HelGa.
  From what I can tell all of the orchestral instraments were recorded live in studio, huge props for this
  I'm a sucker for trombone, and I'm glad it had such a prominent role
  Song has a breakdown mid way thru for some sick syncopated drums
  The track closes out with a replaying of the melody under extreme compression. Too kitchy for my tastes
6. Someday.
  A melencoly track that show's a great amount of restraint. Also pretty short which is for the best.
7. aGe of You.
8. RExER.
9. Why iii Love The Moon.
10. Take A Chance.
11. Statue Of Liberty.
12. Syecial One. - Interlude
13. So Much Better.
14. Compromise.
15. Somehow.

## Closing thoughts
Overall I give this album a 2 out of 5 stars.
`

export const load: PageServerLoad = async ({ params }) => {
  const prisma = new PrismaClient()

  const album = prisma.album.findUniqueOrThrow({
    where: { mbid: params.slug },
    include: { tracks: { orderBy: { trackNumber: "asc" } } }
  })

  return { album, mdText }
};
