import { fetchEvents } from '@/src/app/actions';
import EventsGrid from './EventsGrid';
import { auth } from '@clerk/nextjs';

async function RSCEventsGrid({
  startDate,
  endDate,
  activeTime,
}: {
  startDate: string;
  endDate?: string;
  activeTime?: string;
}) {
  const { userId } = auth();
  const { events, hasNextPage } = await fetchEvents({
    startDate,
    endDate,
  });

  return (
    <EventsGrid
      initialEvents={events}
      userId={userId}
      activeTime={activeTime}
      startDate={startDate}
      endDate={endDate}
      hasNextPageInitial={hasNextPage}
    />
  );
}

export default RSCEventsGrid;
