<script lang="ts">
	import type { Album, Track } from '@prisma/client';
	import { goto } from '$app/navigation';
	import Stars from '$lib/Stars.svelte';

	export let albumData: Album & { tracks: Track[] };
	export let inList: boolean;

	const getTimeStr = (x: number) => {
		const d = new Date(x);
		const mins = d.getMinutes();
		const secs = String(d.getSeconds()).padStart(2, '0');

		return `${mins}:${secs}`;
	};

	const getDateStr = (d: Date) => {
		return d.toLocaleDateString('en-us', {
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	};

	const getRankStr = (r: number) => {
		let prefix = 'th';
		if (r === 1) prefix = 'st';
		if (r === 2) prefix = 'nd';
		if (r === 3) prefix = 'rd';

		return `${r}${prefix}`;
	};
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
				<p class="text-xl font-bold pb-1">{albumData.name}</p>
				<p class="text-md font-medium">{albumData.credits}</p>
				<p class="text-sm font-normal">Released: {getDateStr(albumData.releaseDate)}</p>
				<div class="items-center space-x-4">
					<span class="text-sm font-normal">
						{albumData.tracks.length} Tracks
					</span>
					<span class="text-sm font-normal">
						{Math.floor(albumData.duration / 60000)} minutes
					</span>
				</div>
			</div>
			<div class="flex-grow" />
			<div class="flex-1">
				<div class="space-y-1">
					<hr />
					{#if albumData.reviewDate && albumData.dominicScore}
						<div class="pt-1">
							<Stars
								value={albumData.dominicScore / 2}
								spacing="space-x-2"
								height={20}
								width={22}
							/>
						</div>
						<p class="text-sm font-normal">Reviewed: {getDateStr(albumData.reviewDate)}</p>
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

	<div class="pt-2" class:hidden={inList}>
		<hr />
		<table class="table-auto border-separate border-spacing-y-1 border-spacing-x-2 w-full">
			<thead>
				<tr>
					<td align="left" class="text-md font-bold">Title</td>
					{#if albumData.tracks[0].trackRank !== null && albumData.tracks[0].trackScore !== null}
						<td />
						<td align="center" class="text-md font-bold">Score</td>
					{/if}
					<td />
				</tr>
			</thead>
			<tbody>
				{#each albumData.tracks as track}
					<tr>
						<td align="left" class="text-sm 2xl:text-lg font-normal">{track.name}</td>
						{#if track.trackRank !== null && track.trackScore !== null}
							<td align="center" class="text-sm xl:text-md 2xl:text-lg font-normal">
								{getRankStr(track.trackRank)}
							</td>
							<td>
								<Stars value={track.trackScore / 2} spacing="space-x-0" height={10} width={12} />
							</td>
						{/if}
						<td align="right" class="text-sm xl:text-md 2xl:text-lg font-normal font-mono">
							{getTimeStr(track.duration)}
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</button>
