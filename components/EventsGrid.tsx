'use client';

import { useQuery } from '@tanstack/react-query';
import EventCard from './EventCard';
import { Event } from '@/src/app/types/paylaod-types';
import EmptyEventsSection from './EmptyEventsSection';
import { useEffect, useState } from 'react';
import { PacmanLoader } from 'react-spinners';
import { useInView } from 'react-intersection-observer';
import { fetchEvents } from '@/src/app/actions';
import { useSearchParams } from 'next/navigation';

function EventsGrid({
  initialEvents,
  isActive,
  userId,
  startDate,
  endDate,
  hasNextPageInitial,
}: {
  initialEvents: Event[];
  isActive?: string;
  userId?: string | null;
  startDate?: string;
  endDate?: string;
  hasNextPageInitial: boolean;
}) {
  const [events, setEvents] = useState(initialEvents);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(hasNextPageInitial);
  const [ref, inView] = useInView();
  const searchParams = useSearchParams();

  const { isLoading, data } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () =>
      fetch(`/api/favorites?userId=${userId}`, {
        next: { tags: ['favorites'] },
      }).then((res) => res.json()),
    enabled: !!userId,
  });

  async function loadMoreEvents() {
    const next = page + 1;
    const { events: newEvents, hasNextPage } = await fetchEvents({
      page: next,
      startDate,
      endDate,
    });

    if (newEvents.length) {
      setPage(next);
      setEvents((prev) => [...prev, ...newEvents]);
      setHasNextPage(hasNextPage);
    }
  }

  useEffect(() => {
    setEvents(initialEvents);
    setHasNextPage(hasNextPageInitial);
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    inView && loadMoreEvents();
  }, [inView]);

  if (isLoading)
    return (
      <div className='mx-auto mt-[14vh] flex min-h-screen w-full justify-center'>
        <PacmanLoader />
      </div>
    );
  const favoritesIds = !isLoading && data?.data.map((fav: Event) => fav?.id);

  return events && events.length ? (
    <>
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
      {hasNextPage && (
        <div className='flex h-32 w-full items-center justify-center' ref={ref}>
          <PacmanLoader />
        </div>
      )}
    </>
  ) : (
    <EmptyEventsSection isActive={isActive} />
  );
}

export default EventsGrid;
