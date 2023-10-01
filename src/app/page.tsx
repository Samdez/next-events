import EventCard from '@/components/EventCard';
import { getEvents } from '../kontent/utils';

export default async function Home() {
  const { items: events } = await getEvents();

  return (
    <div className='flex flex-wrap justify-around gap-8'>
      {events.map((event) => {
        return <EventCard event={event} key={event.system.id} />;
      })}
    </div>
  );
}
