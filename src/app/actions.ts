'use server';

import { getEvents } from './queries';

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
