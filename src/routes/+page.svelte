<script lang="ts">
	import SvelteMarkdown from 'svelte-markdown';
	import Link from '$lib/renderers/Link.svelte';
	import List from '$lib/renderers/List.svelte';
	import Code from '$lib/renderers/Code.svelte';
	import CodeSpan from '$lib/renderers/CodeSpan.svelte';

	const text = `
# Hello!
My name is Dominic Kennedy, and this is my website.
This site is where I plan to be most active, so if you'd like to keep up with the goings on in my life, this is the place to be.
It is still very much under construction, which is why you should check back soon for more content \`;)\`.

The source code for this website is hosted [here](https://github.com/dominicmkennedy/dominic-site).
  `;
</script>

<article
	class="p-4 mx-auto prose prose-lg dark:prose-invert prose-img:rounded-lg prose-thead:border-gray-200 prose-tr:border-gray-400"
>
	<div class="not-prose"></div>
	<SvelteMarkdown
		source={text}
		renderers={{ link: Link, code: Code, codespan: CodeSpan, list: List }}
	/>
</article>
