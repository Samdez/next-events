import { getEvents } from '@/kontent/utils';
import { NextRequest } from 'next/server';
import { z } from 'zod';

const searchParamsSchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  isActive: z.enum(['day', 'week']).optional(),
});

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  let startDate = searchParams.get('startDate');
  let endDate = searchParams.get('endDate');

  if (startDate && endDate) {
    startDate = new Date(startDate).toISOString();
    endDate = new Date(endDate).toISOString();
  }

  const p = searchParamsSchema.parse({ startDate, endDate });
  try {
    const data = await getEvents(p.startDate, p.endDate);
    return Response.json({ data });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
