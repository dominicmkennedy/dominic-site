<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Collapsible from '$lib/components/ui/collapsible';
	import { ChevronsUpDown } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';
	import { Button } from '$lib/components/ui/button';

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

<Card.Root>
	<Card.Header>
		<Card.Title>{data.title}</Card.Title>
		<Card.Description>
			<div>
				<div class="space-y-1 pt-1">
					<p class="text-sm text-muted-foreground">
						{data.artists}
					</p>
				</div>
				<Separator class="my-1" />
				<div class="flex h-5 items-center space-x-4 text-sm">
					<p class="text-sm text-muted-foreground">
						Released: {data.releaseDate.toLocaleDateString('en-us', {
							year: 'numeric',
							month: 'short',
							day: 'numeric'
						})}
					</p>
					<Separator orientation="vertical" />
					<p class="text-sm text-muted-foreground">
						{data.trackList.length} Tracks
					</p>
					<Separator orientation="vertical" />
					<p class="text-sm text-muted-foreground">
						{Math.floor(data.totalDuration / 60000)} minutes
					</p>
				</div>
			</div>
		</Card.Description>
	</Card.Header>
	<Card.Content>
		<div class="flex justify-center">
			<img src={data.coverArt} alt="" />
		</div>
	</Card.Content>
	<Card.Footer>
		<Collapsible.Root class="w-full space-y-2">
			<div class="flex items-center justify-between space-x-4 px-4">
				<h4 class="text-sm font-semibold">Tracks</h4>
				<Collapsible.Trigger asChild let:builder>
					<Button builders={[builder]} variant="ghost" size="sm" class="w-9 p-0">
						<ChevronsUpDown class="h-4 w-4" />
						<span class="sr-only">Toggle</span>
					</Button>
				</Collapsible.Trigger>
			</div>
			<Collapsible.Content class="space-y-2">
				{#each data.trackList as track}
					<div class="rounded-md border px-4 py-3">
						<div class="flex h-5 items-center space-x-4 text-sm">
							<p class="text-sm text-muted-foreground">
								{track.title}
							</p>
							<Separator orientation="vertical" />
							<p class="text-sm text-muted-foreground">
								{new Date(track.duration).getMinutes()} min
								{new Date(track.duration).getSeconds()} sec
							</p>
						</div>
						<Separator class="my-1" />
						<div class="space-y-1 pt-1">
							<p class="text-sm text-muted-foreground">
								{track.artists}
							</p>
						</div>
					</div>
				{/each}
			</Collapsible.Content>
		</Collapsible.Root>
	</Card.Footer>
</Card.Root>
