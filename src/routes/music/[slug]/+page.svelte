<script lang="ts">
	import type { PageData } from './$types';
	import AlbumCard from '$lib/AlbumCard.svelte';
	import Md from '$lib/renderers/Md.svelte';

	export let data: PageData;
</script>

{#await data.album then albumData}
	<div class="lg:flex">
		<div class="h-full sticky top-0 p-8 w-1/3 hidden lg:block">
			<AlbumCard inList={false} {albumData} />
		</div>

		<div>
			<Md source={albumData.reviewTextMd}></Md>
		</div>
		<div class="block lg:hidden">
			<AlbumCard inList={false} {albumData} />
		</div>
	</div>
{/await}
