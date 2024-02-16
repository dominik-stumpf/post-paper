import * as z from 'zod';

export const topics = [
  'Web development',
  'Game Development',
  'Linux',
  'Graphics Programming',
] as const;

export const articleSchema = z.object({
  title: z.string().min(8).max(128),
  lead: z.string().min(8).max(256),
  topic: z.enum(topics).optional(),
  thumbnailImage: z.string().url().optional(),
  splashImage: z.string().url().optional(),
  // tags: z.string().min(1).max(8).array().optional(),
  // content: z.string().min(256).max(65536),
});
