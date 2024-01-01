import type { RequestHandler } from './$types';
import { addReview } from '$lib/server/db/services';
import { json as svelteJson } from '@sveltejs/kit';

type trackRecord = Record<string, { name: string, score: number }>
type ReviewParams = { mbid: string, reviewDate: string, tracks: trackRecord, score: number }

// const getNormalized = (vs: trackRecord, l: number, r: number) => {
//   const nums = Object.values(vs).map(x => x.score)
//   const min = Math.min(...nums)
//   const max = Math.max(...nums)
//   const factor = (r - l) / (max - min);
//   return Object.entries(vs).map(([mbid, v]) => ({ mbid, relAlbumScore: (v.score - min) * factor + l }));
// }

export const POST: RequestHandler = async ({ request }) => {
  const body = await request.formData()
  const mdText = await (body.get("file") as File).text()
  const reviewParams: ReviewParams = JSON.parse(await (body.get("json") as File).text())

  // const trackScores = getNormalized(reviewParams.tracks, 0, 10)
  await addReview(reviewParams.mbid, reviewParams.score, new Date(reviewParams.reviewDate).toISOString(), mdText)

  return svelteJson({})
};
