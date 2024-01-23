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
  console.log(pathname, slug);

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
          className={`hover:bg-black[#E2B748] text-md  h-14 w-28 text-pretty border-4 border-black bg-[#ee2244bc] text-black hover:border-none hover:bg-black hover:text-[#ee2244bc] ${
            isActive && 'bg-black text-[#ee2244bc]'
          }`}
        >
          {genre.name}
        </Button>
      </Link>
    </div>
  );
}
export default GenreButton;
