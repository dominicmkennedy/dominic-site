import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex'
import { createHighlighter } from 'shiki';

const theme = 'rose-pine-moon';
const highlighter = await createHighlighter({
  themes: [theme],
  langs: ['javascript', 'typescript', 'python']
});
const colorReplacements = {
  '#232136': '#ffffff00'
}

/** @type {import('mdsvex').MdsvexOptions} */
const mdsvexOptions = {
  extensions: ['.md'],
  smartypants: { quotes: true, ellipses: true, dashes: true },
  layout: "./src/lib/renderers/mdsvex.svelte",
  highlight: {
    highlighter: async (code, lang = 'text') => {
      const html = highlighter.codeToHtml(code, { lang, theme, colorReplacements });
      return `{@html \`<div class="card variant-ghost-secondary">${html}</div>\` }`
    }
  }
}

/** @type {import('@sveltejs/kit').Config} */
const config = {
  extensions: ['.svelte', '.md'],
  preprocess: [vitePreprocess(), mdsvex(mdsvexOptions)],
  vitePlugin: { inspector: true },
  kit: { adapter: adapter() },
  vite: {
    server: {
      fs: { strict: false }
    }
  }
};

export default config;
