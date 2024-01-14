'use client';

import { Star } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Event } from '@/src/app/types/Event';

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
      await fetch(`api/favorites?eventId=${event.id}&userId=${userId}`, {
        method: 'DELETE',
      });
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
          eventId: event.id,
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
      className={`h-20 w-20 rounded-full hover:bg-[#ee2244bc] hover:text-white ${
        isFavorite ? 'bg-[#ee2244bc] text-white' : 'bg-white text-black '
      }`}
      type='submit'
    >
      <Star className='h-full w-full' />
    </Button>
  );
}

export default FavoriteButton;
