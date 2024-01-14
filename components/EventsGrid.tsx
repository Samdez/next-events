'use client';

import { useQuery } from '@tanstack/react-query';
import EventCard from './EventCard';
import { Event } from '@/src/app/types/Event';
import EmptyEventsSection from './EmptyEventsSection';

function EventsGrid({
  events,
  isActive,
  userId,
}: {
  events: Event[];
  isActive?: string;
  userId?: string | null;
}) {
  const { isLoading, data } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () =>
      fetch(`/api/favorites?userId=${userId}`, {
        next: { tags: ['favorites'] },
      }).then((res) => res.json()),
    enabled: !!userId,
  });

  if (isLoading) return <div>Loading...</div>;
  const favoritesIds = !isLoading && data?.data.map((fav: Event) => fav?.id);

  return events.length ? (
    <div className='flex flex-wrap justify-around gap-8'>
      {events.map((event, i) => {
        return (
          <EventCard
            event={event}
            key={event?.id}
            isFavorite={favoritesIds?.includes(event?.id) || false}
            userId={userId}
            isEven={i % 2 === 0}
          />
        );
      })}
    </div>
  ) : (
    <EmptyEventsSection isActive={isActive} />
  );
}

export default EventsGrid;
