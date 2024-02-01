'use client';

import { formatDate } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from './ui/card';
import { Event } from '@/src/app/types/payload-types';
import Image from 'next/image';
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';

function EventThumbnail({
  event,
  isFavorite,
  userId,
}: {
  event: Event;
  isFavorite: boolean;
  userId?: string | null;
}) {
  const imageUrl =
    !(typeof event.image === 'string') && event.image ? event.image?.url : '';
  const imageTitle =
    !(typeof event.image === 'string') && event.image ? event.image?.title : '';
  const eventPrice = event.sold_out
    ? 'Complet'
    : event.price === '0'
      ? 'Gratuit'
      : event.price
        ? `${event.price} €`
        : 'N/A';
  const locationName =
    !(typeof event.location === 'string') && event.location.name;

  return (
    <Card className='relative h-[360px] rounded-xl border-black shadow-[15px_15px_0px_0px_rgba(0,0,0)]'>
      <FavoriteButton event={event} isFavorite={isFavorite} userId={userId} />
      <Link href={`/concerts/${event.slug}_${event.id}`} className='rounded-xl'>
        <CardContent className='rounded-xl border-4 border-black px-0 py-0'>
          <CardHeader className='h-44 px-2 py-4'>
            <span className='text-xl text-[#ee2244bc]'>
              {formatDate(event.date)}
            </span>
            <span className='pl-2'>{event.time}</span>
            <CardTitle className='text-md text-balance text-2xl'>
              {event.title}
            </CardTitle>
            <CardDescription className="text-md items-center justify-center rounded-md border-black font-['Public_Sans'] text-[#ee2244bc]">
              {locationName}
            </CardDescription>
            {event.genres && (
              <CardDescription className="text-md items-center justify-center rounded-md border-black font-['Public_Sans'] text-black">
                {event.genres}
              </CardDescription>
            )}
          </CardHeader>
          <div className='relative flex h-[176px] w-full justify-center'>
            <Image
              alt={imageTitle}
              src={imageUrl || ''}
              objectFit='cover'
              fill={true}
              className='rounded-b-md'
            />
            <div className='absolute bottom-4 right-4 flex h-6 min-w-14 items-center justify-center rounded-md bg-white px-2'>
              {eventPrice}
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export default EventThumbnail;
