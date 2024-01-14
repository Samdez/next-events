'use client';

import { usePathname } from 'next/navigation';

function EmptyEventsSection({ isActive }: { isActive?: string }) {
  const pathname = usePathname();

  if (pathname === '/') {
    return <HomeEmptyEvents isActive={isActive} />;
  }
  if (pathname === '/favorites') return <FavoritesEmptyEvents />;
}

export default EmptyEventsSection;

function HomeEmptyEvents({ isActive }: { isActive?: string }) {
  return (
    <div className='flex h-96 flex-col items-center justify-center'>
      <p className='p-8 text-4xl text-black'>
        Rien de prévu {isActive === 'day' ? 'ce soir' : 'cette semaine'}, une
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
