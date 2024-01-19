import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Button } from './ui/button';
import Link from 'next/link';
import FavoriteButton from './FavoriteButton';
import { Event } from '@/src/app/types/paylaod-types';
import { cn } from '@/lib/utils';

function EventCard({
  event,
  isFavorite,
  userId,
  isEven,
}: {
  event?: Event;
  isFavorite: boolean;
  userId?: string | null;
  isEven: boolean;
}) {
  if (!event) return;
  const locationName =
    !(typeof event.location === 'string') && event.location.name;
  const imageUrl =
    !(typeof event.image === 'string') && event.image ? event.image?.url : '';
  const imageTitle =
    !(typeof event.image === 'string') && event.image ? event.image?.title : '';

  return (
    <Card
      className={cn(
        'mx-4 flex h-1/2 w-full min-w-[256px] flex-col items-center rounded-xl border-8 border-black shadow-[15px_15px_0px_0px_rgba(0,0,0)] md:mx-0 md:w-1/3',
        { 'mt-12': !isEven }
      )}
    >
      <Link href={`/concerts/${event.id}`} className='w-full rounded-xl'>
        <CardHeader className='flex h-28 items-center justify-center border-b-4 border-black bg-[#ee2244bc] p-2'>
          <CardTitle className='text-balance text-center text-2xl md:text-4xl'>
            {event.title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className='m-4 flex h-[300px] justify-center overflow-hidden rounded-lg'>
            <Image
              alt={imageTitle}
              src={imageUrl || ''}
              width={250}
              height={250}
              className='object-cover transition hover:scale-110'
              priority={true}
            />
          </div>
          <CardDescription className='text-center text-4xl font-bold'>
            {locationName}
          </CardDescription>
          {event.genres && (
            <CardDescription className='mx-auto flex h-12 w-36 items-center justify-center rounded-xl border-4 border-[#FFDCA8] text-2xl font-bold'>
              {event.genres}
            </CardDescription>
          )}
          <div className='flex w-full justify-around'>
            <CardDescription className='mt-4 text-2xl font-semibold'>
              {new Date(event.date).toLocaleDateString('fr-FR')}
            </CardDescription>
            {event.time && (
              <CardDescription className='mt-4 text-2xl font-semibold'>
                {event.time}
              </CardDescription>
            )}
          </div>
        </CardContent>
      </Link>
      <CardFooter className='flex w-full cursor-default justify-around'>
        <Link href={`/events/${event.id}`}>
          <Button
            className={`hover:bg-black[#E2B748] h-16 w-28 border-4 border-black bg-[#E2B748] text-xl text-black hover:border-none hover:bg-black hover:text-[#E2B748]`}
          >
            {' '}
            {event.sold_out ? (
              'Complet 😢'
            ) : (
              <p>{event.price ? `${event.price} €` : 'Gratuit'}</p>
            )}{' '}
          </Button>
        </Link>
        <FavoriteButton isFavorite={isFavorite} event={event} userId={userId} />
      </CardFooter>
    </Card>
  );
}

export default EventCard;
