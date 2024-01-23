import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { getEvent } from '../../queries';

export async function generateMetadata({ params }: { params: { id: string } }) {
  try {
    const event = await getEvent(params.id);
    if (!event) {
      return {
        title: 'Not found',
        description: 'The page you are looking for does not exist',
      };
    }
    return {
      title: event.title,
      description: event.description,
      alternates: {
        canonical: `/concerts/${event.id}`,
      },
    };
  } catch (error) {
    return {
      title: 'Not found',
      description: 'The page you are looking for does not exist',
    };
  }
}

async function EventPage({ params }: { params: { id: string } }) {
  const event = await getEvent(params.id);
  const imageUrl =
    !(typeof event.image === 'string') && event.image ? event.image?.url : '';
  const imageTitle =
    !(typeof event.image === 'string') && event.image ? event.image?.title : '';

  return (
    <div className='flex flex-col items-center  text-white'>
      <h1 className='text-center text-6xl font-bold text-black'>
        {event.title}
      </h1>
      <div className='rounded-lg border-4 border-black bg-[#ee2244bc] p-2 text-2xl text-black'>
        <p className='font-semibold'>
          {new Date(event.date).toLocaleDateString('fr-FR')}
        </p>
      </div>
      <Image
        className='mx-auto py-10'
        src={imageUrl || ''}
        alt={imageTitle}
        width={640}
        height={640}
      />
      <p className="p-12 font-['Public_Sans'] text-lg text-black">
        {event.description}
      </p>
      {event.sold_out ? (
        <Button className='pointer-events-none rounded-lg border-4 border-black bg-[#ee2244bc] p-2 text-2xl text-black'>
          Complet 😢
        </Button>
      ) : (
        event.ticketing_url && (
          <a href={`${event.ticketing_url}`} target='_blank'>
            <Button className='rounded-lg border-4 border-black bg-[#ee2244bc] p-2 text-2xl text-black'>
              Billetterie
            </Button>
          </a>
        )
      )}
    </div>
  );
}

export default EventPage;
