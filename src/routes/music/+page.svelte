<script lang="ts">
	import type { PageData } from './$types';
	import AlbumCard from '$lib/AlbumCard.svelte';
	import Rss from 'lucide-svelte/icons/rss';

	export let data: PageData;
</script>

<div class="pt-4 space-y-4 px-3 max-w-xl mx-auto">
	<div class="flex">
		<div class="prose prose-invert flex-grow">
			<h1>Weekly Album Reviews</h1>
		</div>
		<div class="flex-grow" />
		<div class="flex-1">
			<a href="music/rss.xml" target="_blank">
				<span class="chip bg-pink-400 text-slate-950">
					<Rss />
				</span>
			</a>
		</div>
	</div>
	<hr />

	{#each data.posts as albumData}
		<AlbumCard inList={true} {albumData} slug={albumData.slug} />
	{/each}
</div>
