import FilterSection from '@/components/FilterSection';
import { z } from 'zod';
import { auth } from '@clerk/nextjs';
import EventsGrid from '@/components/EventsGrid';
import { fetchEvents } from './actions';
import { getCategories } from './queries';

const searchParamsSchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  isActive: z.enum(['day', 'week']).optional(),
});

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { userId } = auth();
  const {
    isActive,
    startDate = new Date().toISOString(),
    endDate,
  } = searchParamsSchema.parse(searchParams);

  const { events, hasNextPage } = await fetchEvents({
    startDate,
    endDate,
  });

  const categories = await getCategories();

  return (
    <>
      <FilterSection isActive={isActive} categories={categories} />
      <EventsGrid
        initialEvents={events}
        userId={userId}
        isActive={isActive}
        startDate={startDate}
        endDate={endDate}
        hasNextPageInitial={hasNextPage}
      />
    </>
  );
}
