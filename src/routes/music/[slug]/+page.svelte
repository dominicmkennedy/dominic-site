<script lang="ts">
	import type { PageData } from './$types';
	import AlbumCard from '$lib/AlbumCard.svelte';
	import Md from '$lib/renderers/Md.svelte';

	export let data: PageData;
</script>

<div class="lg:flex">
	<div class="h-full sticky top-0 p-8 w-1/3 hidden lg:block">
		{#await data.album then albumData}
			<AlbumCard inList={false} {albumData} />
		{/await}
	</div>

	<div>
		<Md source={data.mdText}></Md>
	</div>
	<div class="block lg:hidden">
		{#await data.album then albumData}
			<AlbumCard inList={false} {albumData} />
		{/await}
	</div>
</div>
