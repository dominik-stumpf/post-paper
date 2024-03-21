import * as z from 'zod';

export const topics = [
  'Web development',
  'Game Development',
  'Linux',
  'Graphics Programming',
] as const;

export const articleMetadataSchema = z.object({
  title: z
    .string()
    .min(1, 'Article title is a required field')
    .min(8, 'Article title must be at least 8 characters long')
    .max(128, 'Article title must be at most 128 characters long'),
  lead: z
    .string()
    .min(8, 'Lead paragraph must be at least 8 characters long')
    .max(256, 'Lead paragraph must be at most 256 characters long'),
  splashImage: z.string().url('Splash image must be a valid URL').optional(),
  // topic: z.enum(topics).optional(),
  // thumbnailImage: z.string().url().optional(),
  // tags: z.string().min(1).max(8).array().optional(),
});

export const articleContentSchema = z
  .string()
  .min(256, 'Article content must exceed 256 characters')
  .max(65536, 'Article content msut not exceed 65536 characters');

export const publishPayloadSchema = z.object({
  articleContent: articleContentSchema,
  articleId: z.string().optional(),
});
