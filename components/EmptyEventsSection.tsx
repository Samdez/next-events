'use client';

import { usePathname } from 'next/navigation';

function EmptyEventsSection({ activeTime }: { activeTime?: string }) {
  const pathname = usePathname();

  if (pathname === '/') {
    return <HomeEmptyEvents activeTime={activeTime} />;
  }
  if (pathname === '/favorites') return <FavoritesEmptyEvents />;
}

export default EmptyEventsSection;

function HomeEmptyEvents({ activeTime }: { activeTime?: string }) {
  return (
    <div className='flex h-96 flex-col items-center justify-center'>
      <p className='p-8 text-4xl text-black'>
        Rien de prévu {activeTime === 'day' ? 'ce soir' : 'cette semaine'}, une
        tisane et au lit! <br />
      </p>
      <p className='text-4xl'>😴</p>
    </div>
  );
}

function FavoritesEmptyEvents() {
  return (
    <div className='flex h-96 flex-col items-center justify-center'>
      <p className='p-8 text-4xl text-black'>Aucun favori</p>
      <p className='text-4xl'>🤷</p>
    </div>
  );
}
