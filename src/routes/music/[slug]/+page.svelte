<script lang="ts">
	import type { PageData } from './$types';
	import AlbumCard from '../../AlbumCard.svelte';

	export let data: PageData;
</script>

{#await data.album then albumData}
	<AlbumCard {albumData} />
{/await}
