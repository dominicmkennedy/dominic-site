<script lang="ts">
	import Md from '$lib/renderers/Md.svelte';

	const source = `
# Hello!
My name is Dominic Kennedy, and this is my website.
This is where I plan to be most active, so if you'd like to keep up with the goings on in my life, you're in the right place.
The site is still very much under construction, which is why you should check back soon for more content \`;)\`.

[Source code](https://github.com/dominicmkennedy/dominic-site) for this site.
  `;
</script>

<Md {source}></Md>
