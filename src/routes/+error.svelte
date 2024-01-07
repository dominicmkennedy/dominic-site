<script lang="ts">
	import { page } from '$app/stores';
</script>

<div class="h-full flex justify-center items-center">
	<div class="space-y-4">
		<h1 class="h1">Error: {$page.status}</h1>
		<h2 class="h2">{$page.error?.message}</h2>
	</div>
</div>
