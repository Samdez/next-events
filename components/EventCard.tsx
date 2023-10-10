import { Event } from '../kontent/content-types/event';
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

function EventCard({ event }: { event: Event }) {
  return (
    <Link href={`/events/${event.system.codename}`}>
      <Card className='flex flex-col items-center  border-none'>
        <CardHeader>
          <CardTitle>{event.elements.title.value}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className='flex justify-center overflow-hidden rounded-lg'>
            <Image
              alt='event picture'
              src={event.elements.image.value[0].url}
              width={256}
              height={256}
              className='transition hover:scale-110'
            />
          </div>
          <CardDescription className='p-4 text-center text-xl font-bold'>
            {event.elements.location.linkedItems[0].elements.name.value}
          </CardDescription>
          <CardDescription className='text-center font-semibold'>
            {new Date(event.elements.date.value!).toLocaleDateString('fr-FR')}
          </CardDescription>
        </CardContent>
        <CardFooter>
          <Button>
            {' '}
            {event.elements.sold_out.value[0]?.codename === 'yes' ? (
              'Complet 😢'
            ) : (
              <p>
                {event.elements.price.value
                  ? `${event.elements.price.value} euros`
                  : 'Gratuit'}
              </p>
            )}{' '}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default EventCard;
