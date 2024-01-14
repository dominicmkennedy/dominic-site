import { json } from '@sveltejs/kit';
import type { Album } from '$lib/types';
import { range, zip, isObject, all } from 'underscore';

export const GET = async () => {
	const paths = import.meta.glob('/src/albumPosts/*.md', { eager: true });

	const posts = (
		Object.entries(paths)
			.map(([path, file]) => {
				const slug = path.split('/').at(-1)!.replace('.md', '');
				if (isObject(file) && 'metadata' in file && isObject(file.metadata)) {
					return { ...file.metadata, slug };
				}
			})
			.filter((x) => x) as (Album & { slug: string })[]
	)
		.filter((x) => rankInvariants(x))
		.sort((a, b) => {
			const aTime = a.reviewDate ? new Date(a.reviewDate).getTime() : new Date().getTime();
			const bTime = b.reviewDate ? new Date(b.reviewDate).getTime() : new Date().getTime();
			return bTime - aTime;
		});

	return json(posts);
};

const rankInvariants = (a: Album): boolean => {
	const trackData = (
		a.tracks
			.map((x) => ({ rank: x.trackRank, score: x.trackScore }))
			.filter((x) => x.rank && x.score) as { rank: number; score: number }[]
	).sort((a, b) => a.rank - b.rank);

	const rankRange = range(1, 1 + a.tracks.length);
	if (JSON.stringify(trackData.map((x) => x.rank)) !== JSON.stringify(rankRange)) {
		console.warn(`Ranking invariant 1 broken by ${a.title}.`);
		return false;
	}

	const invarTwo = all(
		zip(trackData.slice(0, -1), trackData.slice(1)).map(([a, b]) => a.score >= b.score)
	);
	if (!invarTwo) {
		console.warn(`Ranking invariant 2 broken by ${a.title}.`);
		return false;
	}
	return true;
};
