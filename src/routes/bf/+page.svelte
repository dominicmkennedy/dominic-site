<script lang="ts">
	import init, { compile } from 'bf-wasm-compiler';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	let bfProgram = data.mandelbrot;
	let bfOutput = '';
	let ready = false;
	let runTime: string | undefined = undefined;
	let compilationTime: string | undefined = undefined;
	let programInput = '';

	// TODO fix input
	// TODO add compilation time
	// TODO consider using a modal for alerts
	// TODO allow multiple input at once, then buffer inputs

	const imports = {
		env: {
			//log: (x: number) => console.log(x),
			log: (x: number) => (bfOutput += String.fromCharCode(x)),
			read: () => prompt('BF asking for input').charCodeAt(0)
			// read: () => {
			// 	let ret: undefined | string = undefined;

			// 	if (programInput.length > 0) {
			// 		ret = programInput[0];
			// 		programInput = programInput.slice(1);
			// 	} else {
			//     throw "No input right now"
			//   }

			// 	return ret.charCodeAt(0);
			// }
		}
	};

	onMount(async () => {
		await init();
		ready = true;
	});

	const runProgram = async () => {
		runTime = undefined;
		compilationTime = undefined;
		bfOutput = '';

		const startCompTime = performance.now();
		const compiledProgram = compile(bfProgram);
		const endCompTime = performance.now();
		compilationTime = ((endCompTime - startCompTime) / 1000).toLocaleString(undefined, {
			minimumFractionDigits: 4,
			maximumFractionDigits: 4
		});

		const compiledBf = await WebAssembly.instantiate(compiledProgram, imports);

		const startTime = performance.now();
		compiledBf.instance.exports.main();
		const endTime = performance.now();
		runTime = ((endTime - startTime) / 1000).toLocaleString(undefined, {
			minimumFractionDigits: 4,
			maximumFractionDigits: 4
		});
	};
</script>

<div class="pt-4 space-y-2 px-3 mx-auto h-full">
	<div class="flex">
		<div class="flex-grow">
			<h1 class="h1">
				<span
					class="bg-gradient-to-br from-pink-600 to-fuchsia-400 bg-clip-text text-transparent box-decoration-clone"
				>
					Optimizing BF Compiler
				</span>
			</h1>
		</div>
	</div>

	<div class="grid grid-cols-3 gap-4 h-full">
		<div class="space-y-3">
			<h2>
				<span
					class="h2 bg-gradient-to-br from-secondary-600 to-tertiary-200 bg-clip-text text-transparent box-decoration-clone"
				>
					Program
				</span>
			</h2>
			<textarea
				rows="5"
				class="textarea font-mono text-xs"
				bind:value={bfProgram}
				contenteditable
			/>
			<button disabled={!ready} class="btn btn-md bg-secondary-500" on:click={runProgram}>
				Run
			</button>
		</div>
		<div class="col-span-2 space-y-3">
			<h2>
				<span
					class="h2 bg-gradient-to-br from-secondary-600 to-tertiary-200 bg-clip-text text-transparent box-decoration-clone"
				>
					Output
				</span>
			</h2>
			<div class="card variant-ghost-primary">
				<p class="font-mono text-xs whitespace-pre p-4">{bfOutput}</p>
			</div>

			{#if compilationTime !== undefined}
				<p>
					Compilation took {compilationTime} seconds.
				</p>
			{/if}
			{#if runTime !== undefined}
				<p>
					Run took {runTime} seconds.
				</p>
			{/if}
		</div>
	</div>
</div>
