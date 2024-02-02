'use client';

import { slugifyString } from '@/lib/utils';
import { Category } from '@/src/app/types/payload-types';
import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname, useSearchParams } from 'next/navigation';

function GenreButton({ genre }: { genre: Category }) {
  const pathname = usePathname();
  const slug = slugifyString(genre.name);
  const isActive = pathname === `/genres/${slug}`;

  const isHome = !pathname.includes('genres');
  const searchParams = useSearchParams();

  function createHref() {
    const startDate = searchParams.get('startDate') || '';
    const endDate = searchParams.get('endDate') || '';
    const activeTime = searchParams.get('activeTime') || '';
    let url = '';
    if (isHome) url = `genres/${slug}?`;
    if (isActive) {
      url += `/?`;
    } else {
      url = `/genres/${slug}?`;
    }

    url += startDate && `&startDate=${startDate}`;
    url += endDate && `&endDate=${endDate}`;
    url += activeTime && `&activeTime=${activeTime}`;
    return url;
  }

  return (
    <div>
      <Link href={createHref()}>
        <Button
          className={`hover:bg-black[#E2B748]  h-10 w-20 text-pretty border-2 border-black bg-white text-black hover:border-none hover:text-[#ee2244bc] ${
            isActive && 'border-none text-[#ee2244bc]'
          }`}
        >
          {genre.name}
        </Button>
      </Link>
    </div>
  );
}
export default GenreButton;
