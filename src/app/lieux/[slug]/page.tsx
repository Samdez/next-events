import Image from 'next/image';
import { getEvents, getFavorites, getLocation } from '../../queries';
import { env } from '@/env';
import { serializeRichText } from '../../../../lib/serializeRichText.js';
import { Node } from 'slate';
import EventsCarousel from '@/components/EventsCarousel';
import { auth } from '@clerk/nextjs';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  try {
    const location = await getLocation(params.slug);
    if (!location) {
      return {
        title: 'Not found',
        description: 'The page you are looking for does not exist',
      };
    }
    return {
      title: location.name,
      description: generateMetaDescription(
        location.description as unknown as Node[]
      ),
      alternates: {
        canonical: `/lieux/${location.slug}`,
      },
    };
  } catch (error) {
    return {
      title: 'Not found',
      description: 'The page you are looking for does not exist',
    };
  }
}

const generateMetaDescription = (nodes: Node[]) => {
  return nodes.map((n) => Node.string(n)).join('\n');
};

async function LocationPage({ params }: { params: { slug: string } }) {
  const { userId } = auth();
  const location = await getLocation(params.slug);
  const { events } = await getEvents({
    locationId: location.id,
    startDate: new Date().toISOString(),
  });
  const imageUrl =
    !(typeof location?.image === 'string') && location.image
      ? location.image?.url
      : '';

  return (
    <div className='flex flex-col items-center gap-4 px-4 py-8 text-white'>
      <h1 className='text-center text-6xl font-bold text-black'>
        {location.name}
      </h1>
      {imageUrl && (
        <Image
          className='mx-auto'
          src={imageUrl || ''}
          alt={location.name}
          width={640}
          height={640}
        />
      )}
      <div>{serializeRichText(location.description)}</div>
      <div className='flex w-full justify-center py-8'>
        <iframe
          width='600'
          height='450'
          loading='lazy'
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/place?q=place_id:${location.place_id}&key=${env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        ></iframe>
      </div>
      <h2 className='text-4xl text-black'>Prochains concerts: </h2>
      <EventsCarousel events={events} userId={userId} />
    </div>
  );
}

export default LocationPage;
