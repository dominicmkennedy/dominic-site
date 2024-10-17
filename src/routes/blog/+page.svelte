<script lang="ts">
	import { goto } from '$app/navigation';
	import type { PageData } from './$types';
	import Rss from 'lucide-svelte/icons/rss';

	export let data: PageData;

	const getDateStr = (d: string) => {
		return new Date(d).toLocaleDateString('en-us', {
			timeZone: 'UTC',
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};
</script>

<div class="pt-4 space-y-4 px-3 max-w-xl mx-auto">
	<div class="flex">
		<div class="flex-grow">
			<h1>
				<span
					class="h2 bg-gradient-to-br from-secondary-600 to-tertiary-200 bg-clip-text text-transparent box-decoration-clone"
				>
					Dominic's Blog
				</span>
			</h1>
		</div>
		<div class="flex-none">
			<a href="blog/rss.xml" target="_blank">
				<span class="chip variant-ghost">
					<Rss />
				</span>
			</a>
		</div>
	</div>
	<hr />

	{#each data.posts as postData}
		<button
			on:click={() => {
				goto(`/blog/${postData.slug}`);
			}}
			class="card variant-ghost rounded-lg block p-4 w-full"
			class:card-hover={true}
		>
			<div class="w-full">
				<p class="text-xl font-bold pb-1">{postData.title}</p>
				<p class="text-sm font-normal">Posted: {getDateStr(postData.postDate)}</p>
			</div>
		</button>
	{/each}
</div>
