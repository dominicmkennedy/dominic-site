import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Album } from '$lib/types';
import type { ComponentType } from 'svelte';

export const load: PageLoad = async ({ params }) => {
  try {
    const post: {
      default: ComponentType,
      metadata: Album
    } = await import(`../../../albumPosts/${params.slug}.md`)

    return { content: post.default, metadata: post.metadata }
  } catch (e) {
    throw error(404, `No post "${params.slug}".`)
  }
}
