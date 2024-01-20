'use server';

import { getEvents } from './queries';

export async function fetchEvents({
  page = 1,
  startDate,
  endDate,
  activeCategory,
}: {
  page?: number;
  startDate?: string;
  endDate?: string;
  activeCategory?: string;
}) {
  const { events, hasNextPage } = await getEvents({
    page,
    startDate,
    endDate,
    category: activeCategory,
  });

  return { events, hasNextPage };
}
