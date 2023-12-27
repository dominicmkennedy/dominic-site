<script lang="ts">
	import type { PageData } from './$types';
	import AlbumCard from '../../AlbumCard.svelte';
	import Md from '$lib/renderers/Md.svelte';
	import { TableOfContents, tocCrawler } from '@skeletonlabs/skeleton';
	import { AppShell } from '@skeletonlabs/skeleton';

	export let data: PageData;
</script>

<AppShell>
	<!-- (header) -->
	<svelte:fragment slot="sidebarLeft">
		{#await data.album then albumData}
			<div class="p-4 w-96 hidden lg:block">
				<AlbumCard inList={false} {albumData} />
			</div>
		{/await}
	</svelte:fragment>
	<svelte:fragment slot="sidebarRight">
		<div class="p-4 w-96 hidden lg:block">
			<TableOfContents />
		</div>
	</svelte:fragment>
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<div use:tocCrawler={{ mode: 'generate' }}>
		<Md source={data.mdText}></Md>
	</div>
	<!-- (pageFooter) -->
	<!-- (footer) -->
</AppShell>
