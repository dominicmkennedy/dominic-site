import type { PageServerLoad } from './$types';
import { getAlbum } from '$lib/server/db/services';

export const load: PageServerLoad = async ({ params }) => {
  return { album: getAlbum(params.slug) }
};
