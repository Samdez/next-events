import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { Event } from './types/Event';
import qs from 'qs';
import { users, usersOnEvents } from '../db/schema';

function extendEndDateToEndOfDay(date: string) {
  return new Date(new Date(date).setUTCHours(24, 0, 0, 0));
}

function extendEndDateToEndOfPreviousDay(date: string) {
  const yesterday = new Date(date);
  yesterday.setDate(new Date(date).getDate() - 1);

  return new Date(new Date(yesterday).setUTCHours(24, 0, 0, 0));
}

export async function getEvents(
  startDate?: string,
  endDate?: string
): Promise<Event[]> {
  const extendedStartDate =
    startDate && extendEndDateToEndOfPreviousDay(startDate);
  const extendedEndDate = endDate && extendEndDateToEndOfDay(endDate);
  const query = {
    and: [
      { date: { greater_than_equal: extendedStartDate } },
      {
        date: { less_than_equal: extendedEndDate },
      },
    ],
  };
  const stringifiedQuery = qs.stringify(
    {
      where: query,
    },
    { addQueryPrefix: true }
  );
  const res = await fetch(
    `http://localhost:3000/api/events${stringifiedQuery}&sort=date`
  );

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  const parsed = await res.json();
  return parsed.docs;
}

export async function getEvent(id: string): Promise<Event> {
  const res = await fetch(`http://localhost:3000/api/events/${id}`);
  return res.json();
}

export async function getFavorites(id: string) {
  const res = await db.query.usersOnEvents.findMany({
    where: eq(usersOnEvents.userId, id),
  });
  return res.map((el) => el.eventId);
}

export async function getUserFavorites(userId: string) {
  const res = await db.query.users.findFirst({
    with: {
      userEvents: { with: { event: true } },
    },
    where: eq(users.id, userId),
  });
  return res?.userEvents.map((userEvent) => userEvent.event);
}
