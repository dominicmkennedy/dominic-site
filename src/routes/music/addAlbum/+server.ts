import type { RequestHandler } from './$types';
import { addAlbum } from '$lib/server/db/services';
import { json } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ url }) => {
  await addAlbum(url.searchParams.get('mbid')!)
  return json({})
};
