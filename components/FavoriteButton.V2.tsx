'use client';

import { Star } from 'lucide-react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Event } from '@/src/app/types/payload-types';
import { cn } from '@/lib/utils';

function FavoriteButtonV2({
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
      await fetch(`../api/favorites?eventId=${event.id}&userId=${userId}`, {
        method: 'DELETE',
      });
      await queryClient.invalidateQueries({
        queryKey: ['favorites'],
      });
    },
  });
  const createFavoriteMutation = useMutation({
    mutationFn: async () => {
      await fetch(`../api/favorites`, {
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
      className={cn(
        `absolute right-0 top-0 z-10 rounded-bl-xl rounded-tr-xl border-4 border-black bg-white p-2 text-black`,
        { 'bg-[#ee2244bc] text-white': isFavorite }
      )}
      type='submit'
    >
      <Star height={24} fill='white' />
    </Button>
  );
}

export default FavoriteButtonV2;
