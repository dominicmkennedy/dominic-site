<script lang="ts">
	import '../app.postcss';
	import type { PageData } from './$types';
	import { AppShell, AppBar } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import { storePopup } from '@skeletonlabs/skeleton';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	import Transition from './transition.svelte';

	export let data: PageData;

	inject({ mode: dev ? 'development' : 'production' });
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
</script>

<svelte:head>
	<title>Dominic Kennedy</title>
</svelte:head>

<AppShell>
	<svelte:fragment slot="header">
		<AppBar
			padding="p-3"
			gridColumns="grid-cols-3"
			slotDefault="place-self-center"
			slotTrail="place-content-end"
		>
			<svelte:fragment slot="lead"><div /></svelte:fragment>
			<div class="space-x-6 text-xl text-bold flex">
				<a class="hover:text-pink-400 hover:underline" href="/"> Home </a>
				<a class="hover:text-pink-400 hover:underline" href="/music"> Music </a>
				<a class="hover:text-pink-400 hover:underline" href="/blog"> Blog </a>
				<a class="hover:text-pink-400 hover:underline" href="/directory"> Directory </a>
			</div>
			<svelte:fragment slot="trail"><div /></svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<Transition url={data.url}>
		<slot />
	</Transition>
</AppShell>
