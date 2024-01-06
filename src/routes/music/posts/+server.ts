import { json } from '@sveltejs/kit'
import type { Album } from '$lib/types'

export const GET = async () => {
  const posts: Album[] = []

  const paths = import.meta.glob('/src/albumPosts/*.md', { eager: true })
  Object.values(paths).forEach((file) => {
    if (file && typeof file === 'object' && 'metadata' in file) {
      const metadata = file.metadata as Album
      posts.push(metadata)
    }
  })

  // posts = posts.sort((a, b) =>
  //   new Date(b.reviewDate).getTime() - new Date(a.reviewDate).getTime()
  // )

  return json(posts)
}
