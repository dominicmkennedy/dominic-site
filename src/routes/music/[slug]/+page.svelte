<script lang="ts">
	import type { PageData } from './$types';
	import AlbumCard from '../../AlbumCard.svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import Link from '$lib/renderers/Link.svelte';
	import List from '$lib/renderers/List.svelte';
	import Code from '$lib/renderers/Code.svelte';
	import CodeSpan from '$lib/renderers/CodeSpan.svelte';

	export let data: PageData;
</script>

<article
	class="p-4 mx-auto prose prose-lg dark:prose-invert prose-img:rounded-lg prose-thead:border-gray-200 prose-tr:border-gray-400"
>
	<div class="not-prose">
		{#await data.album then albumData}
			<AlbumCard {albumData} />
		{/await}
	</div>
	<SvelteMarkdown
		source={data.mdText}
		renderers={{ link: Link, code: Code, codespan: CodeSpan, list: List }}
	/>
</article>
