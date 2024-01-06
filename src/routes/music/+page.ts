import type { Album } from '$lib/types'
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const posts: (Album & { slug: string })[] = await (await fetch('/music/posts')).json()
  return { posts }
}

