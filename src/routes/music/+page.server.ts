import type { PageServerLoad } from './$types';
import { getAlbums } from '$lib/server/db/services';

export const load: PageServerLoad = async () => {
  return { albums: getAlbums() }
};
