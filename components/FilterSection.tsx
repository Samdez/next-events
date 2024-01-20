import Link from 'next/link';
import { Button } from './ui/button';
import FilterSectionText from './FilterSectionText';
import { Category } from '@/src/app/types/paylaod-types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { createHref } from '@/src/app/utils/createHref';
import FilterGenreSelect from './FilterGenreSelect';

function FilterSection({
  activeTime,
  categories,
  activeCategory,
}: {
  activeTime: 'week' | 'day' | undefined;
  categories: Category[];
  activeCategory: string | undefined;
}) {
  const dayHRef = createHref({
    time: 'day',
    activeTime,
    activeCategory,
  });
  const weekHRef = createHref({
    time: 'week',
    activeTime,
    activeCategory,
  });
  return (
    <div className='pb-8'>
      <FilterSectionText
        activeTime={activeTime}
        activeCategory={activeCategory}
      />
      <div className='flex flex-wrap justify-evenly gap-2 pb-2'>
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
      <div className='flex w-full flex-wrap justify-evenly gap-2'>
        {categories.map((cat) => {
          return (
            <FilterGenreButton
              path={createHref({
                category: cat.name,
                activeTime,
                activeCategory,
              })}
              text={cat.name}
              activeCategory={activeCategory}
              category={cat.name}
            />
          );
        })}
      </div>
      {/* <FilterGenreButton
        path={catHRef}
        text='electro'
        activeCategory={activeCategory}
        category='electro'
      /> */}
      {/* <div className='flex flex-wrap items-center justify-center gap-16 p-8'>
        <Link href={createHref({})} replace>
          <Select>
            <SelectTrigger className='`hover:bg-black[#E2B748] h-14 w-[280px] border-4 border-black bg-[#E2B748] text-2xl text-black hover:border-none hover:bg-black hover:text-[#E2B748]'>
              <SelectValue placeholder='Genre musical' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='all'>tous les genres</SelectItem>
                {categories.map((category) => {
                  return (
                    <SelectItem value={category.name}>
                      {category.name}
                    </SelectItem>
                  );
                })}
              </SelectGroup>
            </SelectContent>
          </Select>
        </Link>
      </div> */}
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
        className={`hover:bg-black[#E2B748] h-14 w-44 border-4 border-black bg-[#ee2244bc] text-2xl text-black hover:border-none hover:bg-black hover:text-[#ee2244bc]
       ${activeTime === period && 'bg-black text-[#ee2244bc]'}
       `}
      >
        {text}
      </Button>
    </Link>
  );
}

function FilterGenreButton({
  path,
  text,
  activeCategory,
  category,
}: {
  path: string;
  text: string;
  activeCategory: string | undefined;
  category: string;
}) {
  return (
    <Link href={path} replace>
      <Button
        className={`hover:bg-black[#E2B748] text-md  h-14 w-28 text-pretty border-4 border-black bg-[#E2B748] text-black hover:border-none hover:bg-black hover:text-[#E2B748]
       ${activeCategory === category && 'bg-black text-[#E2B748]'}
       `}
      >
        {text}
      </Button>
    </Link>
  );
}

export default FilterSection;
