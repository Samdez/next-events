import EventsGrid from '@/components/EventsGrid';
import { getEvents, getLocations } from '../../queries';

async function CityPage({ params }: { params: { city: string } }) {
  const locations = await getLocations(params.city);
  const events = await Promise.all(
    locations.map((location) => {
      return getEvents({
        locationId: location.id,
        startDate: new Date().toISOString(),
      });
    })
  );

  return (
    <EventsGrid
      initialEvents={events.flatMap((e) => e.events)}
      hasNextPageInitial={false}
    />
  );
}

export default CityPage;
