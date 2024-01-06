<script lang="ts">
	import type { PageData } from './$types';
	import AlbumCard from '$lib/AlbumCard.svelte';

	export let data: PageData;
</script>

<div class="pt-4 space-y-4">
	{#each data.posts as albumData}
		<div class="max-w-xl mx-auto">
			<AlbumCard inList={true} {albumData} slug={albumData.slug} />
		</div>
	{/each}
</div>
