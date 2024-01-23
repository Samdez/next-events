import { z } from 'zod';

export const searchParamsSchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  activeTime: z.enum(['day', 'week']).optional(),
});
