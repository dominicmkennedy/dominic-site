import type { RequestHandler } from './$types';
import { Feed } from 'feed';

export const GET: RequestHandler = async ({ fetch }) => {
  const posts: ({ slug: string, title: string, postDate: string, technical: boolean })[] = await (await fetch('/blog/posts')).json();

  const lastPostDate = posts
    .map((post) => (post.postDate ? new Date(post.postDate) : new Date(0)))
    .reduce(function(a, b) {
      return a > b ? a : b;
    });

  const feed = new Feed({
    title: "Dominic's Blog",
    description: "Dominic's Blog",
    id: 'https://www.dominicmkennedy.com/blog',
    link: 'https://www.dominicmkennedy.com/blog',
    language: 'en',
    favicon: 'https://www.dominicmkennedy.com/favicon.ico',
    copyright: 'All rights reserved 2024, Dominic Kennedy',
    updated: lastPostDate,
    author: {
      name: 'Dominic Kennedy',
      link: 'https://www.dominicmkennedy.com/'
    }
  });

  posts
    .filter((post) => post.postDate)
    .forEach((post) => {
      feed.addItem({
        title: post.title,
        id: `https://dominicmkennedy.com/blog/${post.slug}`,
        link: `https://dominicmkennedy.com/blog/${post.slug}`,
        description: post.title,
        date: new Date(post.postDate!)
      });
    });

  const headers = { 'Content-Type': 'application/xml' };
  return new Response(feed.rss2(), { headers });
};
