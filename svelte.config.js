import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex'

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
	extensions: ['.md'],
  smartypants: {quotes: true, ellipses: true, dashes: true},
  layout: "./src/lib/renderers/mdsvex.svelte"
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
  vitePlugin: { inspector: true },
  kit: { adapter: adapter() }
};

export default config;
