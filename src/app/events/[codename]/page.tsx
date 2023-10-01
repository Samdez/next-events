import { Button } from '@/components/ui/button';
import { getEvent } from '@/src/kontent/utils';
import Image from 'next/image';
import Link from 'next/link';

async function EventPage({ params }: { params: { codename: string } }) {
  const { item: event } = await getEvent(params.codename);

  return (
    <div className='flex flex-col items-center text-white'>
      <h1 className='py-12 text-center text-8xl font-bold'>
        {event.elements.title.value}
      </h1>
      <div className='rounded-lg border-2 border-secondary p-4'>
        <p className='font-semibold'>
          {new Date(event.elements.date.value!).toLocaleDateString('fr-FR')}
        </p>
      </div>
      <Image
        className='mx-auto py-10'
        src={event.elements.image.value[0].url}
        alt={
          event.elements.image.value[0].description ||
          event.elements.title.value
        }
        width={event.elements.image.value[0].width || 640}
        height={event.elements.image.value[0].height || 640}
      />
      <p className='p-12'>{event.elements.description.value}</p>
      {event.elements.sold_out.value[0]?.codename === 'yes' ? (
        <Button className='pointer-events-none border-2 border-white'>
          Complet 😢
        </Button>
      ) : (
        event.elements.ticketing_url.value && (
          <Link href={event.elements.ticketing_url.value} target='_blank'>
            <Button className='bg-secondary text-primary hover:border-2 hover:text-secondary'>
              Billetterie
            </Button>
          </Link>
        )
      )}
    </div>
  );
}

export default EventPage;
