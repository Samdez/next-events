import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import Link from 'next/link';
import { Location } from '@/src/app/types/payload-types';
import { cn } from '@/lib/utils';

function LocationCard({
  location,
  isEven,
}: {
  location?: Location;
  isEven: boolean;
}) {
  if (!location) return;

  const imageUrl =
    !(typeof location.image === 'string') && location.image
      ? location.image?.url
      : '';

  return (
    <>
      <Card
        className={cn(
          'mx-4 flex h-1/2 w-full min-w-[256px] flex-col items-center rounded-xl border-8 border-black shadow-[15px_15px_0px_0px_rgba(0,0,0)] md:mx-0 md:w-1/3',
          { 'mt-12': !isEven }
        )}
      >
        <Link
          href={`/concerts/${location.city}/${location?.slug}`}
          className='w-full rounded-xl'
        >
          <CardHeader className='flex h-28 items-center justify-center border-b-4 border-black bg-[#ee2244bc] p-2'>
            <CardTitle className='text-balance text-center text-2xl md:text-4xl'>
              {location.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='m-4 flex h-[300px] justify-center overflow-hidden rounded-lg'>
              <Image
                alt={location.name}
                src={imageUrl || ''}
                width={250}
                height={250}
                className='object-cover transition hover:scale-110'
                priority={true}
              />
            </div>
          </CardContent>
        </Link>
      </Card>
    </>
  );
}

export default LocationCard;
