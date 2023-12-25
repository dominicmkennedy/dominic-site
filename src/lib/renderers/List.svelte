<script lang="ts">
	export let ordered: boolean;
	export let start: number;

  const listClasses = "marker:text-pink-400 marker:font-semibold marker:text-lg"
</script>

{#if ordered}
	<ol class={listClasses} {start}><slot /></ol>
{:else}
	<ul class={listClasses} ><slot /></ul>
{/if}
