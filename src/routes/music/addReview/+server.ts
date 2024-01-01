import type { RequestHandler } from './$types';
import { addReview } from '$lib/server/db/services';
import { json as svelteJson } from '@sveltejs/kit';
import type { ReviewParams } from '$lib/types';


export const POST: RequestHandler = async ({ request }) => {
  const body = await request.formData()
  const mdText = await (body.get("file") as File).text()
  const reviewParams: ReviewParams = JSON.parse(await (body.get("json") as File).text())

  await addReview(reviewParams, mdText)

  return svelteJson({})
};
