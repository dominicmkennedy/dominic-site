<script lang="ts">
	import type { PageData } from './$types';
	// import AlbumCard from '../../AlbumCard.svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import Table from '$lib/renderers/Table.svelte';
	import List from '$lib/renderers/List.svelte';
	import ListItem from '$lib/renderers/ListItem.svelte';
  import Heading from '$lib/renderers/Heading.svelte'

	export let data: PageData;
</script>

<div class="w-1/2 mx-auto p-8">
	<SvelteMarkdown
		source={data.mdText}
		renderers={{ table: Table, list: List, listitem: ListItem, heading: Heading }}
	/>
</div>
<!-- {#await data.album then albumData} -->
<!-- 	<AlbumCard {albumData} /> -->
<!-- {/await} -->
