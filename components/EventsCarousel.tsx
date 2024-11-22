'use client';

import { Event } from '@/src/app/types/payload-types';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from './ui/carousel';
import { useQuery } from '@tanstack/react-query';
import EventThumbnail from './EventThumbnail';

function EventsCarousel({
  events,
  userId,
  placeholderImageUrl,
}: {
  events: Event[];
  userId?: string | null;
  placeholderImageUrl: string;
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
    <Carousel className='w-[min(100%,1280px)] py-16'>
      <CarouselContent>
        {events.map((event) => {
          return (
            <CarouselItem key={event.id} className='md:basis-1/3'>
              <EventThumbnail
                event={event}
                placeholderImageUrl={placeholderImageUrl}
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

export default EventsCarousel;
