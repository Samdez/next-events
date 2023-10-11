import EventCard from './EventCard';
import { Event } from '@/kontent/content-types';

function EventsGrid({
  events,
  isActive,
}: {
  events: Event[];
  isActive?: string;
}) {
  return events.length ? (
    <div className='flex flex-wrap justify-around gap-8'>
      {events.map((event) => {
        return <EventCard event={event} key={event.system.id} />;
      })}
    </div>
  ) : (
    <div className='flex h-96 flex-col items-center justify-center'>
      <p className='p-8 text-xl text-secondary'>
        Rien de prévu {isActive === 'day' ? 'ce soir' : 'cette semaine'}, une
        tisane et au lit! <br />
      </p>
      <p className='text-4xl'>😴</p>
    </div>
  );
}

export default EventsGrid;
