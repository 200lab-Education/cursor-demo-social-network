import { z } from 'zod';

export const pagingSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export type PagingDTO = z.infer<typeof pagingSchema>;

export type PagingResponseDTO<T> = {
  data: T[];
  total: number;
  page: number;
  limit: number;
};