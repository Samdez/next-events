import { eq } from 'drizzle-orm';
import { db } from './client';
import { usersOnEvents } from './schema';

export async function getFavorites(id: string) {
  const res = await db.query.usersOnEvents.findMany({
    where: eq(usersOnEvents.userId, id),
  });
  return res.map((el) => el.eventId);
}

export async function addFavorite(userId: string, eventId: string) {
  db.insert(usersOnEvents).values({
    eventId,
    userId,
  });
}
