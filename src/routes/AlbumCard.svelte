<script lang="ts">
	export let data: {
		title: string;
		artists: string;
		releaseDate: Date;
		trackList: {
			title: string;
			duration: number;
			artists: string;
		}[];
		totalDuration: number;
		coverArt: string;
		mbid: string;
	};
</script>

<div class="flex h-screen items-center justify-center">
	<div class="card w-96">
		<header class="card-header">
			<p class="text-2xl font-semibold">{data.title}</p>
			<div>
				<div>
					<div class="space-y-1 pt-2">
						<p class="text-xs font-light">
							{data.artists}
						</p>
					</div>
					<div class="flex h-5 items-center space-x-4">
						<p class="text-xs font-light">
							Released: {data.releaseDate.toLocaleDateString('en-us', {
								year: 'numeric',
								month: 'short',
								day: 'numeric'
							})}
						</p>
						<p class="text-xs font-light">
							{data.trackList.length} Tracks
						</p>
						<p class="text-xs font-light">
							{Math.floor(data.totalDuration / 60000)} minutes
						</p>
					</div>
				</div>
			</div>
		</header>
		<section class="p-4">
			<div class="flex justify-center">
				<img src={data.coverArt} alt="" />
			</div>
		</section>
		<footer class="card-footer">
			<!-- <ul class="list"> -->
			<!-- 	{#each data.trackList as track} -->
			<!-- 		<li> -->
			<!-- 			<span>{track.title}</span> -->
			<!-- 			<span> -->
			<!-- 				{new Date(track.duration).getMinutes()} min -->
			<!-- 				{new Date(track.duration).getSeconds()} sec -->
			<!-- 			</span> -->
			<!-- 			<span>{track.artists}</span> -->
			<!-- 		</li> -->
			<!-- 	{/each} -->
			<!-- </ul> -->
		</footer>
	</div>
</div>
