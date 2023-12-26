<script lang="ts">
	import Md from '$lib/renderers/Md.svelte';

	const source = `
# Hello!
My name is Dominic Kennedy, and this is my website.
This site is where I plan to be most active, so if you'd like to keep up with the goings on in my life, this is the place to be.
It is still very much under construction, which is why you should check back soon for more content \`;)\`.

The source code for this website is hosted [here](https://github.com/dominicmkennedy/dominic-site).
  `;
</script>

<Md {source}></Md>
