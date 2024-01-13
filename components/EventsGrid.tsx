'use client';

import { useQuery } from '@tanstack/react-query';
import EventCard from './EventCard';
import { Event } from '@/src/app/types/Event';

function EventsGrid({
  events,
  isActive,
  isCalendarPage,
  userId,
}: {
  events: Event[];
  isActive?: string;
  isCalendarPage: boolean;
  userId?: string | null;
}) {
  const { isLoading, data } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () =>
      fetch(`/api/favorites?userId=${userId}`, {
        next: { tags: ['favorites'] },
      }).then((res) => res.json()),
  });

  if (isLoading) return <div>Loading...</div>;
  const favoritesIds = !isLoading && data.data.map((fav: Event) => fav.id);

  return events.length ? (
    <div className='flex flex-wrap justify-around gap-8'>
      {events.map((event) => {
        return (
          <EventCard
            event={event}
            key={event.id}
            isFavorite={favoritesIds.includes(event.id) || false}
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
