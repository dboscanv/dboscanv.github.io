import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../config';

export async function GET(context: { site?: URL }) {
  const posts = (await getCollection('blog')).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site || SITE.url,
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/${post.id}/`,
    })),
    customData: `<language>es-uy</language>`,
  });
}
