'use client';

import { slugifyString } from '@/lib/utils';
import { Category } from '@/src/app/types/paylaod-types';
import Link from 'next/link';
import { Button } from './ui/button';
import { usePathname } from 'next/navigation';

function GenreButton({ genre }: { genre: Category }) {
  const pathname = usePathname();
  const slug = slugifyString(genre.name);
  const isActive = pathname === `/genres/${slug}`;
  const isHome = !pathname.includes('genres');

  function createHref() {
    if (isActive) return '/';
    return isHome ? `genres/${slug}` : slug;
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
