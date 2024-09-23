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
	// TODO consider using a modal for alerts

	const imports = {
		env: {
			//log: (x: number) => console.log(x),
			log: (x: number) => (bfOutput += String.fromCharCode(x)),
			read: () => {
				while (programInput.length == 0) {
					const p = prompt('BF asking for input');
					if (p !== null) programInput += p;
				}

				const x = programInput[0];
				programInput = programInput.slice(1);
				return x.charCodeAt(0);
			}
		}
	};

	onMount(async () => {
		await init();
		ready = true;
	});

	const calcTime = (start: number, end: number): string => {
		return ((end - start) / 1000).toLocaleString(undefined, {
			minimumFractionDigits: 3,
			maximumFractionDigits: 3
		});
	};

	const runProgram = async () => {
		runTime = undefined;
		compilationTime = undefined;
		bfOutput = '';

		const startCompTime = performance.now();
		const compiledProgram = compile(bfProgram);
		const endCompTime = performance.now();
		compilationTime = calcTime(startCompTime, endCompTime);

		const compiledBf = await WebAssembly.instantiate(compiledProgram, imports);

		const startRunTime = performance.now();
		compiledBf.instance.exports.main();
		const endRunTime = performance.now();
		runTime = calcTime(startRunTime, endRunTime);
	};
</script>

<div>
	<div class="p-4 space-y-2 mx-auto md:max-w-5xl">
		<div class="flex justify-center items-center">
			<div>
				<h1 class="h1">
					<span
						class="bg-gradient-to-br from-pink-600 to-fuchsia-400 bg-clip-text text-transparent box-decoration-clone"
					>
						Optimizing BF Compiler
					</span>
				</h1>
			</div>
		</div>

		<div class="space-y-3">
			<h2>
				<span
					class="h2 bg-gradient-to-br from-secondary-600 to-tertiary-200 bg-clip-text text-transparent box-decoration-clone"
				>
					Program
				</span>
			</h2>
			<textarea
				rows="7"
				class="textarea font-mono text-xs whitespace-pre"
				bind:value={bfProgram}
				contenteditable
			/>
			<div class="space-x-2 space-y-3">
				<button disabled={!ready} class="btn btn-md variant-filled-primary" on:click={runProgram}>
					Run
				</button>

				{#if compilationTime !== undefined}
					<span class="badge btn-md variant-ghost-tertiary">
						Compilation: {compilationTime}s
					</span>
				{/if}
				{#if runTime !== undefined}
					<span class="badge btn-md variant-ghost-tertiary">Run time: {runTime}s</span>
				{/if}
			</div>

			{#if bfOutput !== ''}
				<h2>
					<span
						class="h2 bg-gradient-to-br from-secondary-600 to-tertiary-200 bg-clip-text text-transparent box-decoration-clone"
					>
						Output
					</span>
				</h2>

				<div class="card variant-ghost-primary overflow-x-scroll">
					<p class="font-mono text-xs whitespace-pre p-4">{bfOutput}</p>
				</div>
			{/if}
		</div>
	</div>
</div>
