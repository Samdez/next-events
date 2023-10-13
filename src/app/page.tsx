import EventCard from '@/components/EventCard';
import FilterSection from '@/components/FilterSection';
import { getEvents } from '@/kontent/utils';
import { z } from 'zod';
import { getFavorites } from '../db/utils';
import { auth } from '@clerk/nextjs';
import EventsGrid from '@/components/EventsGrid';

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
  const { isActive, startDate, endDate } =
    searchParamsSchema.parse(searchParams);

  const { items: events } = await getEvents(startDate, endDate);
  const favorites = userId && (await getFavorites(userId));

  return (
    <>
      <FilterSection isActive={isActive} />
      {events.length ? (
        <EventsGrid
          events={events}
          isCalendarPage={false}
          favorites={favorites || []}
          userId={userId}
        />
      ) : (
        <div className='flex h-96 flex-col items-center justify-center'>
          <p className='p-8 text-xl text-secondary'>
            Rien de prévu {isActive === 'day' ? 'ce soir' : 'cette semaine'},
            une tisane et au lit! <br />
          </p>
          <p className='text-4xl'>😴</p>
        </div>
      )}
    </>
  );
}
