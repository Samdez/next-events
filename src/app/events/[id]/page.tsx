import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { getEvent } from '../../queries';
import { env } from '@/env';

async function EventPage({ params }: { params: { id: string } }) {
  const event = await getEvent(params.id);
  const imageUrl =
    !(typeof event.image === 'string') && event.image ? event.image?.url : '';
  const imageTitle =
    !(typeof event.image === 'string') && event.image ? event.image?.title : '';

  return (
    <div className='flex flex-col items-center text-white'>
      <h1 className='py-12 text-center text-8xl font-bold'>{event.title}</h1>
      <div className='rounded-lg border-2 border-secondary p-4'>
        <p className='font-semibold'>
          {new Date(event.date).toLocaleDateString('fr-FR')}
        </p>
      </div>
      <Image
        className='mx-auto py-10'
        src={`${env.NEXT_PUBLIC_PAYLOAD_URL}${imageUrl}` || ''}
        alt={imageTitle}
        width={640}
        height={640}
      />
      <p className='p-12'>{event.description}</p>
      {event.sold_out ? (
        <Button className='pointer-events-none border-2 border-white'>
          Complet 😢
        </Button>
      ) : (
        event.ticketing_url && (
          <Link href={event.ticketing_url} target='_blank'>
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