'use client';

import { Star } from 'lucide-react';
import { Button } from './ui/button';
import { Event } from '..';
import { useRouter } from 'next/navigation';

function FavoriteButton({
  isFavorite,
  event,
  userId,
}: {
  isFavorite: boolean;
  event: Event;
  userId?: string | null;
}) {
  const router = useRouter();

  async function handleClick() {
    if (isFavorite) {
      await fetch(
        `api/favorites?eventCodename=${event.system.codename}&userId=${userId}`,
        {
          method: 'DELETE',
        }
      );
    } else {
      await fetch(`api/favorites`, {
        method: 'POST',
        body: JSON.stringify({
          userId,
          eventCodename: event.system.codename,
        }),
      });
    }
    router.refresh();
  }

  return (
    <Button
      onClick={handleClick}
      className={`h-12 w-12 rounded-full hover:text-secondary ${
        isFavorite ? 'bg-primary text-secondary' : 'bg-secondary text-primary'
      }`}
      type='submit'
    >
      <Star />
    </Button>
  );
}

export default FavoriteButton;
