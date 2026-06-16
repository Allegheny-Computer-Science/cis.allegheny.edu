import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const updates = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/updates' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    category: z.enum(['event', 'announcement', 'other']),
    image: z.string().optional(),
    description: z.string(),
  }),
});

export const collections = { updates };
