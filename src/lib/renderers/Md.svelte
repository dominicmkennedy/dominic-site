<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import Link from './Link.svelte';
	import List from './List.svelte';
	import Code from './Code.svelte';
	import CodeSpan from './CodeSpan.svelte';

	export let source: string;
</script>

<article
	class="p-8 mx-auto prose prose-lg dark:prose-invert prose-img:rounded-lg prose-thead:border-gray-200 prose-tr:border-gray-400"
>
	<SvelteMarkdown {source} renderers={{ link: Link, code: Code, codespan: CodeSpan, list: List }} />
</article>
