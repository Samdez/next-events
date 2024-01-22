import { db } from '@/src/db/client';
import { usersOnEvents } from '@/src/db/schema';
import { and, eq } from 'drizzle-orm';
import { NextRequest } from 'next/server';
import { z } from 'zod';
import { getEvent, getFavorites } from '../../queries';

const userIdSchema = z.object({
  userId: z.string(),
});

export async function GET(request: NextRequest) {
  const userId = request.nextUrl.searchParams.get('userId');

  const p = userIdSchema.parse({ userId });
  try {
    const favorites = await getFavorites(p.userId);
    const events = await Promise.all(favorites.map((fav) => getEvent(fav)));

    return Response.json({ data: events });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
}

export async function POST(request: NextRequest) {
  const req = await request.json();
  const schema = z.object({
    eventId: z.string(),
    userId: z.string(),
  });
  const data = schema.parse({
    eventId: req.eventId,
    userId: req.userId,
  });

  try {
    await db.insert(usersOnEvents).values({
      eventId: data.eventId,
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
  const eventId = request.nextUrl.searchParams.get('eventId');
  const schema = z.object({
    eventId: z.string(),
    userId: z.string(),
  });
  const data = schema.parse({
    eventId,
    userId,
  });

  try {
    await db
      .delete(usersOnEvents)
      .where(
        and(
          eq(usersOnEvents.eventId, data.eventId),
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
