<script lang="ts" context="module">
	import a from './a.svelte';
	import ol from './ol.svelte';
	import ul from './ul.svelte';
	import code from './code.svelte';

	export { a, ol, ul, code };
</script>

<article
	class="px-3 py-8 mx-auto prose prose-lg dark:prose-invert prose-img:rounded-lg prose-thead:border-gray-200 prose-tr:border-gray-400"
>
	<slot />
</article>
