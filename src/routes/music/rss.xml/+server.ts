import type { Album } from '$lib/types'
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ fetch }) => {
  const posts: (Album & { slug: string })[] = await (await fetch('/music/posts')).json()

  const xml = `
		<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>Dominic's Album Reviews</title>
				<description>Weekly album reviews by Dominic Kennedy. Posted weekly on Mondays.</description>
				<link>https://dominicmkennedy.com/music</link>
				<atom:link href="https://dominicmkennedy.com/music/rss.xml" rel="self" type="application/rss+xml"/>
				${posts
      .filter(post => post.reviewDate)
      .map(
        (post) => `
						<item>
							<title>${post.title}</title>
							<description>Dominic's review of ${post.title} by ${post.credits}</description>
							<link>https://dominicmkennedy.com/music/${post.slug}</link>
							<guid isPermaLink="true">https://dominicmkennedy.com/music/${post.slug}</guid>
							<pubDate>${new Date(post.reviewDate!).toUTCString()}</pubDate>
						</item>
					`
      )
      .join('')}
			</channel>
		</rss>
	`.trim()

  const headers = { 'Content-Type': 'application/xml' }
  return new Response(xml, { headers })
}
