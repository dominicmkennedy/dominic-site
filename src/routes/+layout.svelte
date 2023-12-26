<script lang="ts">
	import '../app.postcss';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup, storeHighlightJs } from '@skeletonlabs/skeleton';
	import 'highlight.js/styles/github-dark.css';
	import hljs from 'highlight.js/lib/core';
	import javascript from 'highlight.js/lib/languages/javascript';
	import diff from 'highlight.js/lib/languages/javascript';
	import css from 'highlight.js/lib/languages/javascript';

	storeHighlightJs.set(hljs);
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	hljs.registerLanguage('javascript', javascript);
	hljs.registerLanguage('js', javascript);
	hljs.registerLanguage('diff', diff);
	hljs.registerLanguage('css', css);
</script>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar
			padding="p-3"
			gridColumns="grid-cols-3"
			slotDefault="place-self-center"
			slotTrail="place-content-end"
		>
			<svelte:fragment slot="lead"><div /></svelte:fragment>
			<div class="space-x-6 text-xl text-bold">
				<a class="hover:text-pink-400 hover:underline" href="/"> Home </a>
				<a class="hover:text-pink-400 hover:underline" href="/music"> Music </a>
        <!-- TODO -->
				<!-- About -->
				<!-- Contact -->
				<!-- Blog -->
				<!-- Projects -->
				<!-- Login -->
				<!-- Calender -->
				<!-- Photos -->
				<!-- Links -->
        <!-- RSS -->
			</div>
			<svelte:fragment slot="trail"><div /></svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<slot />
</AppShell>
