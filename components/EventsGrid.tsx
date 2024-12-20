'use client';

import { useQuery } from '@tanstack/react-query';
import { Event } from '@/src/app/types/payload-types';
import EmptyEventsSection from './EmptyEventsSection';
import { useEffect, useMemo, useState } from 'react';
import { PacmanLoader } from 'react-spinners';
import { useInView } from 'react-intersection-observer';
import { useSearchParams } from 'next/navigation';
import { getEvents } from '@/src/app/queries';
import { useCategory } from '@/src/hooks/useGenre';
import EventThumbnail from './EventThumbnail';

function EventsGrid({
  initialEvents,
  activeTime,
  userId,
  startDate,
  endDate,
  hasNextPageInitial,
  placeholderImageUrl,
}: {
  initialEvents: Event[];
  activeTime?: string;
  userId?: string | null;
  startDate?: string;
  endDate?: string;
  hasNextPageInitial: boolean;
  placeholderImageUrl: string;
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

  return events.length ? (
    <>
      <div className='flex flex-wrap justify-around gap-24 px-12 pb-32'>
        {events.map((event, i) => {
          return (
            <EventThumbnail
              event={event}
              key={event.id}
              placeholderImageUrl={placeholderImageUrl}
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
