'use server';

import { eq } from 'drizzle-orm';
import { db } from '../db/client';
import { Category, Event, Location } from './types/payload-types';
import qs from 'qs';
import { users, usersOnEvents } from '../db/schema';
import { env } from '@/env';

function extendEndDateToEndOfDay(date: string) {
  return new Date(new Date(date).setUTCHours(24, 0, 0, 0));
}

function extendEndDateToEndOfPreviousDay(date: string) {
  const yesterday = new Date(date);
  yesterday.setDate(new Date(date).getDate() - 1);

  return new Date(new Date(yesterday).setUTCHours(24, 0, 0, 0));
}

export async function getEvents({
  startDate,
  endDate,
  page,
  category,
  locationId,
}: {
  startDate?: string;
  endDate?: string;
  page?: number;
  category?: string;
  locationId?: string;
}): Promise<{ events: Event[]; hasNextPage: boolean }> {
  const extendedStartDate =
    startDate && extendEndDateToEndOfPreviousDay(startDate);
  const extendedEndDate = endDate && extendEndDateToEndOfDay(endDate);
  const query = {
    and: [
      { date: { greater_than_equal: extendedStartDate } },
      {
        date: { less_than_equal: extendedEndDate },
      },
      { 'category.slug': { equals: category } },
      { location: { equals: locationId } },
    ],
  };
  const stringifiedQuery = qs.stringify(
    {
      where: query,
    },
    { addQueryPrefix: true }
  );

  const res = await fetch(
    `${env.NEXT_PUBLIC_PAYLOAD_URL}/api/events${stringifiedQuery}&sort=date&page=${page}`
    // { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const parsed = await res.json();

  return {
    events: parsed.docs,
    hasNextPage: parsed.hasNextPage,
  };
}

export async function getEvent(id: string): Promise<Event> {
  const res = await fetch(`${env.NEXT_PUBLIC_PAYLOAD_URL}/api/events/${id}`);
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

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(
    `${env.NEXT_PUBLIC_PAYLOAD_URL}/api/categories?sort=name&limit=100`
    // {
    //   cache: 'no-store',
    // }
  );

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const parsed = await res.json();

  return parsed.docs;
}

export async function getLocations(cityName?: string): Promise<Location[]> {
  let url: string;
  if (cityName) {
    const query = {
      and: [{ city: { equals: cityName } }],
    };
    const stringifiedQuery = qs.stringify(
      {
        where: query,
      },
      { addQueryPrefix: true }
    );
    url = `${env.NEXT_PUBLIC_PAYLOAD_URL}/api/locations${stringifiedQuery}&sort=name&limit=100`;
  } else {
    url = `${env.NEXT_PUBLIC_PAYLOAD_URL}/api/locations?sort=name&limit=100`;
  }

  const res = await fetch(
    url
    // { cache: 'no-store' }
  );

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const parsed = await res.json();

  return parsed.docs;
}

export async function getLocation(slug: string): Promise<Location> {
  const query = {
    slug: { equals: slug },
  };
  const stringifiedQuery = qs.stringify(
    {
      where: query,
    },
    { addQueryPrefix: true }
  );

  const res = await fetch(
    `${env.NEXT_PUBLIC_PAYLOAD_URL}/api/locations${stringifiedQuery}&sort=date&limit=100`
    // { cache: 'no-store' }
  );

  const parsed = await res.json();
  return parsed.docs[0];
}

export async function getLocationsByCity(
  cityName: string
): Promise<Location[]> {
  const query = {
    and: [{ city: { equals: cityName } }],
  };
  const stringifiedQuery = qs.stringify(
    {
      where: query,
    },
    { addQueryPrefix: true }
  );

  const res = await fetch(
    `${env.NEXT_PUBLIC_PAYLOAD_URL}/api/locations${stringifiedQuery}`
  );

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }

  const parsed = await res.json();

  return parsed.docs;
}
