import FilterSection from '@/components/FilterSection';
import { z } from 'zod';
import { auth } from '@clerk/nextjs';
import EventsGrid from '@/components/EventsGrid';
import { fetchEvents } from './actions';
import { getCategories } from './queries';
import { searchParamsSchema } from '../schemas/searchParams';

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
  } = searchParamsSchema.parse(searchParams);

  const { events, hasNextPage } = await fetchEvents({
    startDate,
    endDate,
  });

  const categories = await getCategories();

  return (
    <>
      <FilterSection activeTime={activeTime} categories={categories} />
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
