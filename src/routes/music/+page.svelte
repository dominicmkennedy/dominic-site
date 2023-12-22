<script lang="ts">
	import type { PageData } from './$types';
	import AlbumCard from '../AlbumCard.svelte';

	export let data: PageData;
</script>

<div class="p-8">
	<p class="h1">About</p>
	<p>desc. the music review proc</p>

	<div class="space-y-6">
		{#await data.albums then albums}
			{#each albums as albumData}
				<AlbumCard {albumData} />
			{/each}
		{/await}
	</div>
</div>
