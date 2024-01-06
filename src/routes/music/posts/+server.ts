import { json } from '@sveltejs/kit'
import type { Album } from '$lib/types'

export const GET = async () => {
  const paths = import.meta.glob('/src/albumPosts/*.md', { eager: true })

  const posts = (Object
    .entries(paths)
    .map(([path, file]) => {
      const slug = path.split('/').at(-1)?.replace('.md', '')
      if (
        file &&
        typeof file === 'object' &&
        'metadata' in file &&
        typeof file.metadata === 'object' &&
        slug) {
        return { ...file.metadata, slug }
      }
    })
    .filter(x => x) as (Album & { slug: string })[])
    .sort((a, b) => {
      const aTime = (a.reviewDate ? new Date(a.reviewDate).getTime() : 0)
      const bTime = (b.reviewDate ? new Date(b.reviewDate).getTime() : 0)
      return aTime - bTime
    })

  return json(posts)
}
