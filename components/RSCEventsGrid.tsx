import { fetchEvents } from '@/src/app/actions';
import EventsGrid from './EventsGrid';

async function RSCEventsGrid({
  startDate,
  endDate,
  activeTime,
}: {
  startDate: string;
  endDate?: string;
  activeTime?: string;
}) {
  const { events, hasNextPage } = await fetchEvents({
    startDate,
    endDate,
  });

  return (
    <EventsGrid
      initialEvents={events}
      activeTime={activeTime}
      startDate={startDate}
      endDate={endDate}
      hasNextPageInitial={hasNextPage}
    />
  );
}

export default RSCEventsGrid;
