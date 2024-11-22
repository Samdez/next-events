import EventsGrid from '@/components/EventsGrid';
import { fetchPlaceholderImage, getCategories, getEvents } from '../../queries';
import { searchParamsSchema } from '@/src/schemas/searchParams';
import FilterSection from '@/components/FilterSection';

async function Genre({
  params,
  searchParams,
}: {
  params: { genre: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const { genre } = params;
  const {
    activeTime,
    startDate = new Date().toISOString(),
    endDate,
  } = searchParamsSchema.parse(searchParams);

  const categories = await getCategories();
  const placeholderImageUrl = await fetchPlaceholderImage();
  const { events, hasNextPage } = await getEvents({
    category: genre,
    startDate,
    endDate,
  });

  return (
    <>
      <FilterSection categories={categories} activeTime={activeTime} />
      <EventsGrid
        initialEvents={events}
        hasNextPageInitial={hasNextPage}
        startDate={startDate}
        endDate={endDate}
        activeTime={activeTime}
        placeholderImageUrl={placeholderImageUrl}
      />
      ;
    </>
  );
}

export default Genre;
