import EventCard from './EventCard';
import { Event } from '@/kontent/content-types';

function EventsGrid({
  events,
  isActive,
  isCalendarPage,
  favorites,
  userId,
}: {
  events: Event[];
  isActive?: string;
  isCalendarPage: boolean;
  favorites: string[];
  userId?: string | null;
}) {
  return events.length ? (
    <div className='flex flex-wrap justify-around gap-8'>
      {events.map((event) => {
        return (
          <EventCard
            event={event}
            key={event.system.id}
            isFavorite={favorites?.includes(event.system.codename) || false}
            userId={userId}
          />
        );
      })}
    </div>
  ) : (
    <div className='flex h-96 flex-col items-center justify-center'>
      <p className='p-8 text-xl text-secondary'>
        Rien de prévu{' '}
        {isCalendarPage
          ? 'sur cette période'
          : isActive === 'day'
          ? 'ce soir'
          : 'cette semaine'}
        , une tisane et au lit! <br />
      </p>
      <p className='text-4xl'>😴</p>
    </div>
  );
}

export default EventsGrid;
