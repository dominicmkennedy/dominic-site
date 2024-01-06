<script lang="ts">
	import type { PageData } from './$types';
	import AlbumCard from '$lib/AlbumCard.svelte';

	export let data: PageData;
</script>

<svelte:head>
	<title>{data.metadata.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.metadata.title} />
</svelte:head>

<div class="lg:flex">
	<div class="h-full sticky top-0 px-3 py-8 w-1/3 hidden lg:block">
		<AlbumCard inList={false} albumData={data.metadata} />
	</div>

	<div>
		<svelte:component this={data.content} />
	</div>
	<div class="block lg:hidden flex justify-center px-3 pb-6">
		<AlbumCard inList={false} albumData={data.metadata} />
	</div>
</div>
