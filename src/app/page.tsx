import FilterSection from '@/components/FilterSection';
import { z } from 'zod';
import { auth } from '@clerk/nextjs';
import EventsGrid from '@/components/EventsGrid';
import { getEvents } from './queries';

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

  const events = await getEvents(startDate, endDate);

  return (
    <>
      <FilterSection isActive={isActive} />
      <EventsGrid
        events={events}
        isCalendarPage={false}
        userId={userId}
        isActive={isActive}
      />
    </>
  );
}
