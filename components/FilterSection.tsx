'use client';

import Link from 'next/link';
import { Button } from './ui/button';
import FilterSectionText from './FilterSectionText';
import { Category } from '@/src/app/types/payload-types';
import { createHref } from '@/src/app/utils/createHref';
import GenreButton from './GenreButton';
import { useCategory } from '@/src/hooks/useGenre';

function FilterSection({
  activeTime,
  categories,
}: {
  activeTime?: 'week' | 'day' | undefined;
  categories: Category[];
}) {
  const category = useCategory();
  const dayHRef = createHref({
    time: 'day',
    activeTime,
    category,
  });
  const weekHRef = createHref({
    time: 'week',
    activeTime,
    category,
  });
  return (
    <div className='pb-8'>
      <FilterSectionText activeTime={activeTime} activeCategory={category} />
      <div className='flex w-full flex-wrap justify-evenly gap-2 py-4'>
        {categories.map((genre) => {
          return <GenreButton genre={genre} key={genre.id} />;
        })}
      </div>
      <div className='flex flex-wrap justify-evenly gap-2'>
        <FilterButton
          path={dayHRef}
          text='ce soir'
          activeTime={activeTime}
          period='day'
        />
        <FilterButton
          path={weekHRef}
          text='cette semaine'
          activeTime={activeTime}
          period='week'
        />
      </div>
    </div>
  );
}

function FilterButton({
  path,
  text,
  activeTime,
  period,
}: {
  path: string;
  text: string;
  activeTime: string | undefined;
  period: string;
}) {
  return (
    <Link href={path} replace>
      <Button
        className={`hover:bg-black[#E2B748] h-14 w-44 border-4 border-black  bg-[#E2B748] text-2xl text-black hover:border-none hover:bg-black hover:text-[#E2B748]
       ${activeTime === period && 'bg-black text-[#E2B748]'}
       `}
      >
        {text}
      </Button>
    </Link>
  );
}

export default FilterSection;
