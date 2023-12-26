<script lang="ts">
	import type { PageData } from './$types';
	import AlbumCard from '../../AlbumCard.svelte';
	import Md from '$lib/renderers/Md.svelte';

	export let data: PageData;
</script>

{#await data.album then albumData}
	<AlbumCard {albumData} />
{/await}
<Md source={data.mdText}></Md>
