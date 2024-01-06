<script lang="ts">
	export let href: string = '';
	export let title: string | undefined = undefined;
	export let rel: string | undefined = undefined;
</script>

<a {href} {title} {rel} class="anchor">
	<span class="font-medium text-pink-400 underline decoration-pink-400">
		<slot />
	</span>
</a>
