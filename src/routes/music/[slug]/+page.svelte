<script lang="ts">
	import type { PageData } from './$types';
	// import AlbumCard from '../../AlbumCard.svelte';
	import SvelteMarkdown from 'svelte-markdown';
	import Link from '$lib/renderers/Link.svelte';
	import List from '$lib/renderers/List.svelte';
	import Code from '$lib/renderers/Code.svelte';
	import CodeSpan from '$lib/renderers/CodeSpan.svelte';

	import 'highlight.js/styles/github-dark.css';
	import hljs from 'highlight.js/lib/core';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	import javascript from 'highlight.js/lib/languages/javascript';
	import diff from 'highlight.js/lib/languages/javascript';
	import css from 'highlight.js/lib/languages/javascript';

	export let data: PageData;

	storeHighlightJs.set(hljs);
	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('js', javascript);
	hljs.registerLanguage('diff', diff);
	hljs.registerLanguage('css', css);
</script>

<div class="">
	<article
		class="p-4 mx-auto prose dark:prose-invert prose-img:rounded-lg prose-thead:border-gray-200 prose-tr:border-gray-400"
	>
		<SvelteMarkdown
			source={data.mdText}
			renderers={{ link: Link, code: Code, codespan: CodeSpan, list: List }}
		/>
	</article>
</div>

<!-- {#await data.album then albumData} -->
<!-- 	<AlbumCard {albumData} /> -->
<!-- {/await} -->
