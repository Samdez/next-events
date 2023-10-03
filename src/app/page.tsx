import EventCard from '@/components/EventCard';
import { getEvents } from '../kontent/utils';
import FilterSection from '@/components/FilterSection';
import { z } from 'zod';

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
  const { isActive, startDate, endDate } =
    searchParamsSchema.parse(searchParams);

  const { items: events } = await getEvents(startDate, endDate);

  return (
    <>
      <FilterSection isActive={isActive} />
      {events.length ? (
        <div className='flex flex-wrap justify-around gap-8'>
          {events.map((event) => {
            return <EventCard event={event} key={event.system.id} />;
          })}
        </div>
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
