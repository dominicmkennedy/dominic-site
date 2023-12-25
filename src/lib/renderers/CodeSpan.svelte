<script lang="ts">
	export let text: string;
</script>

<span class="not-prose">
	<code class="code">{text.replace(/`/g, '')}</code>
</span>
