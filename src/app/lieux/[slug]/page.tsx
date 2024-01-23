import Image from 'next/image';
import { getLocation } from '../../queries';
import { env } from '@/env';

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
      description: location.description,
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

async function LocationPage({ params }: { params: { slug: string } }) {
  const location = await getLocation(params.slug);
  const imageUrl =
    !(typeof location.image === 'string') && location.image
      ? location.image?.url
      : '';
  // const locationDescription =
  //   !(typeof location.description === 'string') && location.description
  //     ? location.description
  //     : '';

  console.dir(location.description, { depth: 5 });
  return (
    <div className='flex flex-col items-center  gap-4 text-white'>
      <h1 className='text-center text-6xl font-bold text-black'>
        {location.name}
      </h1>
      {/* <div className='rounded-lg border-4 border-black bg-[#ee2244bc] p-2 text-2xl text-black'>
        <p className='font-semibold'>
          {new Date(event.date).toLocaleDateString('fr-FR')}
        </p>
      </div> */}
      {/* <div>
        <p className='text-center text-4xl font-bold text-black'>
          {locationName}
        </p>
      </div> */}
      <Image
        className='mx-auto'
        src={imageUrl || ''}
        alt={location.name}
        width={640}
        height={640}
      />
      <div>
        {location.description?.map((el) => {
          return (
            Array.isArray(el.children) &&
            el.children?.map((eel) => {
              return (
                <p className="font-['Public_Sans'] text-lg text-black">
                  {eel.text}
                </p>
              );
            })
          );
        })}
      </div>
      {/* {event.sold_out ? (
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
      )} */}

      <div className='flex w-full justify-center py-8'>
        <iframe
          width='600'
          height='450'
          // style='border:0'
          loading='lazy'
          allowFullScreen
          src={`https://www.google.com/maps/embed/v1/place?q=place_id:${location.place_id}&key=${env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
        ></iframe>
      </div>
    </div>
  );
}

export default LocationPage;
