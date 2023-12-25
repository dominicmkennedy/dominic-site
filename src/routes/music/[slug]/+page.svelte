<script lang="ts">
	import type { PageData } from './$types';
	// import AlbumCard from '../../AlbumCard.svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import Link from '$lib/renderers/Link.svelte';

	export let data: PageData;
</script>

<div class="">
	<article
		class="p-4 mx-auto prose dark:prose-invert prose-img:rounded-lg prose-thead:border-gray-200 prose-tr:border-gray-400"
	>
		<SvelteMarkdown source={data.mdText} renderers={{ link: Link }} />
	</article>
</div>
<table>
	<th> </th>
</table>

<!-- {#await data.album then albumData} -->
<!-- 	<AlbumCard {albumData} /> -->
<!-- {/await} -->
