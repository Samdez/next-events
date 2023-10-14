'use client';

import { Star } from 'lucide-react';
import { Button } from './ui/button';
import { Event } from '..';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from 'react-query';
import { useAuth } from '@clerk/nextjs';

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
  const { isSignedIn } = useAuth();
  const queryClient = useQueryClient();

  const deleteFavoriteMutation = useMutation({
    mutationFn: async () => {
      await fetch(
        `api/favorites?eventCodename=${event.system.codename}&userId=${userId}`,
        {
          method: 'DELETE',
        }
      );
      await queryClient.invalidateQueries({
        queryKey: ['favorites'],
      });
    },
  });
  const createFavoriteMutation = useMutation({
    mutationFn: async () => {
      await fetch(`api/favorites`, {
        method: 'POST',
        body: JSON.stringify({
          userId,
          eventCodename: event.system.codename,
        }),
      });
      await queryClient.invalidateQueries({
        queryKey: ['favorites'],
      });
    },
  });
  async function handleClick() {
    if (!isSignedIn) router.push('/sign-in');
    if (isFavorite) {
      deleteFavoriteMutation.mutate();
    } else {
      createFavoriteMutation.mutate();
    }
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
