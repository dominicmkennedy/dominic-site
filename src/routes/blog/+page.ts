import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const posts: ({
    slug: string,
    title: string,
    postDate: string,
    technical: boolean,
  })[] = await (await fetch('/blog/posts')).json()
  return { posts }
}

