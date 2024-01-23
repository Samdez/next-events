import { getLocations } from '../queries';
import LocationCard from '@/components/LocationCard';

async function LocationsPage() {
  const locations = await getLocations();

  return (
    <>
      <div className='flex flex-wrap justify-around gap-8'>
        {locations.map((location, i) => {
          return <LocationCard isEven={i % 2 === 0} location={location} />;
        })}
      </div>
    </>
  );
}

export default LocationsPage;
