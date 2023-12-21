<script lang="ts">

	const data = [
		{ date: 'week 1, 2023', title: 'djesse vol 2', artist: 'jacob collier', rating: 4.5 },
		{ date: 'week 2, 2023', title: 'octavarium', artist: 'dream theater', rating: 4 }
	];
</script>

<div class="w-96">
	<p class="h1">About</p>
	<p>desc. the music review proc</p>

	<div class="table-container">
		<table class="table table-hover">
			<thead>
				<tr>
					<th>Date</th>
					<th>Album title</th>
					<th>Artist</th>
					<th>Rating</th>
				</tr>
			</thead>
			<tbody>
				{#each data as row}
					<tr>
						<td>{row.date}</td>
						<td>{row.title}</td>
						<td>{row.artist}</td>
						<td>{row.rating}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
