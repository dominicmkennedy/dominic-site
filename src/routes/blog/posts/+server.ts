import { json } from '@sveltejs/kit';
import { isObject } from 'underscore';

export const GET = async () => {
  const paths = import.meta.glob('/src/blogPosts/*.md', { eager: true });

  const posts = (
    Object.entries(paths)
      .map(([path, file]) => {
        const slug = path.split('/').at(-1)!.replace('.md', '');
        if (isObject(file) && 'metadata' in file && isObject(file.metadata)) {
          return { ...file.metadata, slug };
        }
      })
      .filter((x) => x) as {
        slug: string,
        postDate: string,
        title: string,
        technical: boolean,
      }[]
  )
    .sort((a, b) => {
      const aTime = a.postDate ? new Date(a.postDate).getTime() : new Date().getTime();
      const bTime = b.postDate ? new Date(b.postDate).getTime() : new Date().getTime();
      return bTime - aTime;
    });

  return json(posts);
};
