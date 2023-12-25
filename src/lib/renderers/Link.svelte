<script lang="ts">
	export let href: string = '';
	export let title: string | undefined = undefined;
</script>

<a {href} {title} class="text-blue-400 underline">
	<span class="font-medium">
		<slot />
	</span>
</a>
