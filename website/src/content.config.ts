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

const faculty = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/faculty' }),
  schema: z.object({
    name: z.string(),
    title: z.string(),
    degrees: z.array(z.string()),
    email: z.string(),
    phone: z.string().optional(),
    office: z.string().optional(),
    website: z.string().optional(),
    image: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = { updates, faculty };
