'use client';

import { Event } from '@/src/app/types/payload-types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from './ui/carousel';
import Image from 'next/image';
import { cn, formatDate } from '@/lib/utils';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from './ui/card';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import FavoriteButtonV2 from './FavoriteButton.V2';

function EventsCarousel({
  events,
  userId,
}: {
  events: Event[];
  userId?: string | null;
}) {
  const { isLoading, data } = useQuery({
    queryKey: ['favorites'],
    queryFn: async () =>
      fetch(`/api/favorites?userId=${userId}`, {
        next: { tags: ['favorites'] },
      }).then((res) => res.json()),
    enabled: !!userId,
  });

  let favoritesIds: string[];
  if (!isLoading) {
    favoritesIds = data?.data.map((fav: Event) => fav?.id);
  }

  return (
    <Carousel className='w-full max-w-screen-xl'>
      <CarouselContent>
        {events.map((event) => {
          return (
            <CarouselItem key={event.id} className='md:basis-1/3'>
              <EventThumbnail
                event={event}
                isFavorite={favoritesIds?.includes(event.id)}
                userId={userId}
              />
            </CarouselItem>
          );
        })}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}

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

  return (
    <Card className='relative rounded-xl'>
      {/* <div
          className={cn(
            `absolute right-0 top-0 rounded-bl-xl rounded-tr-xl border-4 border-black p-2`,
            { 'bg-[#ee2244bc] text-white': isFavorite }
            )}
            >
            <Star height={24} fill='white' />
          </div> */}
      <FavoriteButtonV2 event={event} isFavorite={isFavorite} userId={userId} />
      <Link href={`/concerts/${event.slug}_${event.id}`} className='rounded-xl'>
        <CardContent className='rounded-xl border-4 border-black px-0 py-0'>
          <CardHeader className='px-2'>
            <span className='text-[#ee2244bc]'>{formatDate(event.date)}</span>
            <span className='pl-2'>{event.time}</span>
            <CardTitle className='text-md text-balance text-2xl'>
              {event.title}
            </CardTitle>
            {event.genres && (
              <CardDescription className="text-md items-center justify-center rounded-md border-black pb-2 font-['Public_Sans'] text-black">
                {event.genres}
              </CardDescription>
            )}
          </CardHeader>
          <div className='relative flex h-[318px] w-full justify-center'>
            <Image
              alt={imageTitle}
              src={imageUrl || ''}
              objectFit='cover'
              fill={true}
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

export default EventsCarousel;
