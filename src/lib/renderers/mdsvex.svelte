<script lang="ts" context="module">
	import a from './a.svelte';
	import ol from './ol.svelte';
	import ul from './ul.svelte';
	// import List from './List.svelte';
	import code from './code.svelte';
	// import CodeSpan from './CodeSpan.svelte';

	export { a, ol, ul, code };
</script>

<article
	class="p-8 mx-auto prose prose-lg dark:prose-invert prose-img:rounded-lg prose-thead:border-gray-200 prose-tr:border-gray-400"
>
	<slot />
</article>
