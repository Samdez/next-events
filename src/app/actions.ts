'use server';

import { getEvents } from './queries';

export async function fetchEvents({
  page = 1,
  startDate,
  endDate,
}: {
  page?: number;
  startDate?: string;
  endDate?: string;
}) {
  const { events, hasNextPage } = await getEvents({ page, startDate, endDate });
  return { events, hasNextPage };
}
