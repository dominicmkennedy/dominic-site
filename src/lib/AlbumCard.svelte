<script lang="ts">
	import type { Album, Track } from '@prisma/client';
	import { goto } from '$app/navigation';
	import Stars from '$lib/Stars.svelte';
	export let albumData: Album & { tracks: Track[] };
	export let inList: boolean;
	const reviewDate = new Date();
</script>

<button
	on:click={() => {
		goto(`/music/${albumData.mbid}`);
	}}
	class="card variant-ghost rounded-lg block p-4"
	class:card-hover={inList}
	disabled={!inList}
>
	<div class="grid grid-cols-5 gap-4">
		<div class="col-span-3 space-y-2 flex flex-col">
			<div class="flex-1">
				<p class="text-xl font-bold">{albumData.name}</p>
				<p class="text-sm font-normal">{albumData.credits}</p>
				<p class="text-sm font-light">
					Released: {albumData.releaseDate.toLocaleDateString('en-us', {
						year: 'numeric',
						month: 'short',
						day: 'numeric'
					})}
				</p>
				<div class="items-center space-x-4">
					<span class="text-sm font-light">
						{albumData.tracks.length} Tracks
					</span>
					<span class="text-sm font-light">
						{Math.floor(albumData.duration / 60000)} minutes
					</span>
				</div>
			</div>
			<div class="flex-grow" />
			<div class="flex-1">
				<div class="space-y-1">
					<hr />
					{#if albumData.reviewDate && albumData.dominicScore}
						<p class="text-sm font-normal">
							Reviewed: {reviewDate.toLocaleDateString('en-us', {
								year: 'numeric',
								month: 'short',
								day: 'numeric'
							})}
						</p>
						<Stars value={albumData.dominicScore / 2} />
					{:else}
						<p class="text-sm font-normal">Coming next week</p>
					{/if}
				</div>
			</div>
		</div>
		<div class="col-span-2 justify-self-end">
			<img src={albumData.coverArtUrl} alt="" class="rounded-lg max-h-52" />
		</div>
	</div>

	<div class="table-container pt-2 rounded-xl" class:hidden={inList}>
		<table class="table table-compact rounded-xl">
			<tbody>
				{#each albumData.tracks as track}
					<tr>
						<td>{track.name}</td>
						<td>
							{new Date(track.duration).getMinutes()} min
							{new Date(track.duration).getSeconds()} sec
						</td>
						{#if track.relAlbumScore}
							<td>{track.relAlbumScore}</td>
						{/if}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</button>
