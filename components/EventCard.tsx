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
import { Event } from '@/src/app/types/Event';
import { env } from '@/env';

function EventCard({
  event,
  isFavorite,
  userId,
}: {
  event: Event;
  isFavorite: boolean;
  userId?: string | null;
}) {
  const locationName =
    !(typeof event.location === 'string') && event.location.name;
  const imageUrl =
    !(typeof event.image === 'string') && event.image ? event.image?.url : '';

  return (
    <Card className='flex flex-col items-center  border-none'>
      <Link href={`/events/${event.id}`}>
        <CardHeader>
          <CardTitle>{event.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex justify-center overflow-hidden rounded-lg'>
            <Image
              alt='event picture'
              src={`${env.NEXT_PUBLIC_PAYLOAD_URL}${imageUrl}` || ''}
              width={256}
              height={256}
              className='transition hover:scale-110'
            />
          </div>
          <CardDescription className='p-4 text-center text-xl font-bold'>
            {locationName}
          </CardDescription>
          <CardDescription className='text-center font-semibold'>
            {new Date(event.date).toLocaleDateString('fr-FR')}
          </CardDescription>
        </CardContent>
      </Link>
      <CardFooter className='flex w-full cursor-default justify-around'>
        <Link href={`/events/${event.id}`}>
          <Button>
            {' '}
            {event.sold_out ? (
              'Complet 😢'
            ) : (
              <p>{event.price ? `${event.price} euros` : 'Gratuit'}</p>
            )}{' '}
          </Button>
        </Link>
        <FavoriteButton isFavorite={isFavorite} event={event} userId={userId} />
      </CardFooter>
    </Card>
  );
}

export default EventCard;
