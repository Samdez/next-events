import { fetchEvents } from '@/src/app/actions';
import EventsGrid from './EventsGrid';
import { fetchPlaceholderImage } from '@/src/app/queries';

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
  const placeholderImage = await fetchPlaceholderImage();

  return (
    <EventsGrid
      initialEvents={events}
      activeTime={activeTime}
      startDate={startDate}
      endDate={endDate}
      hasNextPageInitial={hasNextPage}
      placeholderImageUrl={placeholderImage.ImagePlaceholder.url}
    />
  );
}

export default RSCEventsGrid;
