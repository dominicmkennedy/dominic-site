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
	<div class="h-full sticky top-0 p-8 w-1/3 hidden lg:block">
		<AlbumCard inList={false} albumData={data.metadata} />
	</div>

	<div>
		<article
			class="p-8 mx-auto prose prose-lg dark:prose-invert prose-img:rounded-lg prose-thead:border-gray-200 prose-tr:border-gray-400"
		>
			<svelte:component this={data.content} />
		</article>
	</div>
	<div class="block lg:hidden flex justify-center">
		<AlbumCard inList={false} albumData={data.metadata} />
	</div>
</div>
