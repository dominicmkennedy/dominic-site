import type { Album } from '$lib/types';
import type { RequestHandler } from './$types';
import { Feed } from 'feed';

export const GET: RequestHandler = async ({ fetch }) => {
	const posts: (Album & { slug: string })[] = await (await fetch('/music/posts')).json();

	const lastPostDate = posts
		.map((post) => (post.reviewDate ? new Date(post.reviewDate) : new Date(0)))
		.reduce(function (a, b) {
			return a > b ? a : b;
		});

	const feed = new Feed({
		title: 'What I listen to when I listen to music',
		description: "Dominic's Album reviews. Posted Every Monday.",
		id: 'https://www.dominicmkennedy.com/music',
		link: 'https://www.dominicmkennedy.com/music',
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
		.filter((post) => post.reviewDate)
		.forEach((post) => {
			feed.addItem({
				title: post.title,
				id: `https://dominicmkennedy.com/music/${post.slug}`,
				link: `https://dominicmkennedy.com/music/${post.slug}`,
				description: `Review of ${post.title} by ${post.credits}`,
				date: new Date(post.reviewDate!)
			});
		});

	const headers = { 'Content-Type': 'application/xml' };
	return new Response(feed.rss2(), { headers });
};
