<script lang="ts">
	export let depth: number;
	export let raw: string;
	export let text: string;

	const id = text;
</script>

{#if depth === 1}
	<h1 class="text-6xl" {id}><slot /></h1>
{:else if depth === 2}
	<h2 class="text-5xl" {id}><slot /></h2>
{:else if depth === 3}
	<h3 class="text-4xl" {id}><slot /></h3>
{:else if depth === 4}
	<h4 class="text-3xl" {id}><slot /></h4>
{:else if depth === 5}
	<h5 class="text-2xl" {id}><slot /></h5>
{:else if depth === 6}
	<h6 class="text-xl" {id}><slot /></h6>
{:else}
	{raw}
{/if}
