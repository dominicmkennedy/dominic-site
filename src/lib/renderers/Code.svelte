<script lang="ts">
	import { CodeBlock } from '@skeletonlabs/skeleton';

	export let lang: string;
	export let text: string;
</script>

<div class="not-prose pt-1 pb-1">
	<CodeBlock
		rounded="rounded-lg"
		button="hidden"
		background="bg-slate-900 opacity-75"
		language={lang}
		code={text}
	></CodeBlock>
</div>
