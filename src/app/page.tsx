import FilterSection from '@/components/FilterSection';
import { getCategories } from './queries';
import { searchParamsSchema } from '../schemas/searchParams';
import { Suspense } from 'react';
import { PacmanLoader } from 'react-spinners';
import RSCEventsGrid from '@/components/RSCEventsGrid';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const {
    activeTime,
    startDate = new Date().toISOString(),
    endDate,
  } = searchParamsSchema.parse(searchParams);

  const categories = await getCategories();

  return (
    <>
      <FilterSection activeTime={activeTime} categories={categories} />
      <Suspense
        fallback={
          <div className='mx-auto mt-[14vh] flex min-h-screen w-full justify-center'>
            <PacmanLoader />
          </div>
        }
        key={`${activeTime}_${startDate}_${endDate}`}
      >
        <RSCEventsGrid
          startDate={startDate}
          endDate={endDate}
          activeTime={activeTime}
        />
      </Suspense>
    </>
  );
}
