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
  const { isActive, startDate, endDate } =
    searchParamsSchema.parse(searchParams);

  const events = await getEvents(startDate, endDate);

  return (
    <>
      <FilterSection isActive={isActive} />
      {events.length ? (
        <EventsGrid events={events} isCalendarPage={false} userId={userId} />
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
