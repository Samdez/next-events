import { db } from '@/src/db/client';
import { usersOnEvents } from '@/src/db/schema';
import { getFavorites } from '@/src/db/utils';
import { and, eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { z } from 'zod';

const userIdSchema = z.object({
  userId: z.string(),
});

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');

  const p = userIdSchema.parse({ userId });
  try {
    const data = await getFavorites(p.userId);

    return Response.json({ data });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function POST(request: NextRequest) {
  const req = await request.json();
  const schema = z.object({
    eventCodename: z.string(),
    userId: z.string(),
  });
  const data = schema.parse({
    eventCodename: req.eventCodename,
    userId: req.userId,
  });

  try {
    await db.insert(usersOnEvents).values({
      eventCodename: data.eventCodename,
      userId: data.userId,
    });

    return Response.json({ data });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function DELETE(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');
  const eventCodename = request.nextUrl.searchParams.get('eventCodename');
  const schema = z.object({
    eventCodename: z.string(),
    userId: z.string(),
  });
  const data = schema.parse({
    eventCodename,
    userId,
  });

  try {
    await db
      .delete(usersOnEvents)
      .where(
        and(
          eq(usersOnEvents.eventCodename, data.eventCodename),
          eq(usersOnEvents.userId, data.userId)
        )
      );

    return Response.json({ data });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}
