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
      <div className='flex flex-wrap justify-around gap-8'>
        {events.map((event) => {
          return <EventCard event={event} key={event.system.id} />;
        })}
      </div>
    </>
  );
}
