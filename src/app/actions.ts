'use server';

import { revalidatePath } from 'next/cache';
import { db } from '../db/client';
import { penas } from '../db/schema';
import { getEvents } from './queries';
import { eq } from 'drizzle-orm';

export async function fetchEvents({
  page = 1,
  startDate,
  endDate,
  category,
}: {
  page?: number;
  startDate?: string;
  endDate?: string;
  category?: string;
}) {
  const { events, hasNextPage } = await getEvents({
    page,
    startDate,
    endDate,
    category,
  });

  return { events, hasNextPage };
}

export async function createPena(userId: number, eventId: number) {
  await db.insert(penas).values({
    createdAt: new Date(),
    updatedAt: new Date(),
    memberOneId: userId,
    eventId,
  });
  revalidatePath(`/lagunak/${eventId}`);
}

export async function addUserToPena(
  penaId: number,
  userId: number,
  eventId: string
) {
  const [currentPena] = await db
    .select()
    .from(penas)
    .where(eq(penas.id, penaId));

  let updateData = {};
  if (!currentPena.memberTwoId) {
    updateData = { memberTwoId: userId };
  } else if (!currentPena.memberThreeId) {
    updateData = { memberThreeId: userId };
  } else if (!currentPena.memberFourId) {
    updateData = { memberFourId: userId };
  } else {
    throw new Error('Pena is already full');
  }

  await db
    .update(penas)
    .set({
      ...updateData,
      updatedAt: new Date(),
    })
    .where(eq(penas.id, penaId));
  revalidatePath(`/lagunak/${eventId}`);
}
