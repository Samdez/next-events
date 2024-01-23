'use client';

import { useQuery } from '@tanstack/react-query';
import EventCard from './EventCard';
import { Event } from '@/src/app/types/paylaod-types';
import EmptyEventsSection from './EmptyEventsSection';
import { useEffect, useMemo, useState } from 'react';
import { PacmanLoader } from 'react-spinners';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation';
import { getEvents } from '@/src/app/queries';
import { useCategory } from '@/src/hooks/useGenre';

function EventsGrid({
  initialEvents,
  activeTime,
  userId,
  startDate,
  endDate,
  hasNextPageInitial,
}: {
  initialEvents: Event[];
  activeTime?: string;
  userId?: string | null;
  startDate?: string;
  endDate?: string;
  hasNextPageInitial: boolean;
}) {
  const [_events, setEvents] = useState(initialEvents);
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(hasNextPageInitial);
  const [ref, inView] = useInView();
  const searchParams = useSearchParams();
  const category = useCategory();

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
    const { events: newEvents, hasNextPage } = await getEvents({
      page: next,
      startDate,
      endDate,
      category,
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

  const events = useMemo(() => {
    if (!_events.length) return [];
    return _events.filter(
      (e, i, arr) => i === arr.findIndex((ee) => ee.id === e.id)
    );
  }, [_events]);

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

  console.log('🚀 ~ events:', events, activeTime);
  return events.length ? (
    <>
      <div className='flex flex-wrap justify-around gap-8'>
        {events.map((event, i) => {
          return (
            <EventCard
              event={event}
              key={event.id}
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
    <EmptyEventsSection activeTime={activeTime} category={category} />
  );
}

export default EventsGrid;
