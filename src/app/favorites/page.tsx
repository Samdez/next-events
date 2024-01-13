'use client';

import EventsGrid from '@/components/EventsGrid';
import { useAuth } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

function Favorites() {
  const { userId } = useAuth();
  if (!userId) return;

  const { data: favorites, isLoading } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () =>
      fetch(`/api/favorites?userId=${userId}`, {
        next: { tags: ['favorites'] },
      }).then((res) => res.json()),
  });

  return (
    <>
      {!isLoading && (
        <EventsGrid
          events={favorites.data}
          isCalendarPage={false}
          userId={userId}
        />
      )}
    </>
  );
}

export default Favorites;
