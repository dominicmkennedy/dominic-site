<script lang="ts">
	import type { PageData } from './$types';
	import Md from '$lib/renderers/Md.svelte';
	import AlbumCard from '../AlbumCard.svelte';

	export let data: PageData;
	const source = `
# Album Review Project

## About
This is my album review project. I will review one album per week for every week of 2023.
In order to review an album I must listen to it at least three times in one sitting over the course of that week.
I will provide a few diffrent review metrics, a rating out of 5 stars, a full text review, and relitive rankings for each track in the album.

---

## Goals
In no particular order these are some things that would be nice to achive.
* Become a better writer
* Build the start of my new website
* Expand my musical horizens
* Let my other friends see what I'm listening to

---

## To Come
* Ranking albums against each other
* Upcomming album preview
* Reader input

---
  `;
</script>

<Md {source}></Md>
<div class="pt-4 space-y-4">
	{#await data.albums then albums}
		{#each albums as albumData}
			<div class="max-w-xl mx-auto">
				<AlbumCard inList={true} {albumData} />
			</div>
		{/each}
	{/await}
</div>
