<script lang="ts">
	import type { PageData } from './$types';
	import AlbumCard from '$lib/AlbumCard.svelte';
	import Rss from 'lucide-svelte/icons/rss';

	export let data: PageData;
</script>

<div class="pt-4 space-y-4 px-3 max-w-xl mx-auto">
	<div class="flex">
		<div class="flex-grow">
			<h1>
				<span
					class="h2 bg-gradient-to-br from-secondary-600 to-tertiary-200 bg-clip-text text-transparent box-decoration-clone"
				>
					Weekly Album Reviews
				</span>
			</h1>
		</div>
		<div class="flex-none">
			<a href="music/rss.xml" target="_blank">
				<span class="chip variant-ghost">
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
