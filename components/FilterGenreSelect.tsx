'use client';

import { Category } from '@/src/app/types/payload-types';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

function FilterGenreSelect({ categories }: { categories: Category[] }) {
  return (
    <div className='flex flex-wrap items-center justify-center gap-16 p-8'>
      <Select>
        <SelectTrigger className='`hover:bg-black[#E2B748] h-14 w-[280px] border-4 border-black bg-[#E2B748] text-2xl text-black hover:border-none hover:bg-black hover:text-[#E2B748]'>
          <SelectValue placeholder='Genre musical' />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {categories.map((category) => {
              return (
                <SelectItem value={category.id}>{category.name}</SelectItem>
              );
            })}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default FilterGenreSelect;
