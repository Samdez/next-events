import FilterSection from '@/components/FilterSection';
import { z } from 'zod';
import { auth } from '@clerk/nextjs';
import EventsGrid from '@/components/EventsGrid';
import { fetchEvents } from './actions';
import { getCategories } from './queries';

const searchParamsSchema = z.object({
  startDate: z.string().datetime().optional(),
  endDate: z.string().datetime().optional(),
  activeTime: z.enum(['day', 'week']).optional(),
  activeCategory: z.string().optional(),
});

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { userId } = auth();
  const {
    activeTime,
    startDate = new Date().toISOString(),
    endDate,
    activeCategory,
  } = searchParamsSchema.parse(searchParams);

  const { events, hasNextPage } = await fetchEvents({
    startDate,
    endDate,
    activeCategory,
  });

  const categories = await getCategories();

  return (
    <>
      <FilterSection
        activeTime={activeTime}
        categories={categories}
        activeCategory={activeCategory}
      />
      <EventsGrid
        initialEvents={events}
        userId={userId}
        activeTime={activeTime}
        startDate={startDate}
        endDate={endDate}
        hasNextPageInitial={hasNextPage}
      />
    </>
  );
}
