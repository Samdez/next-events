'use client';

import { createPena } from '@/src/app/actions';
import { Button } from './ui/button';

export default function CreatePena({
  userId,
  eventId,
}: {
  userId: number;
  eventId: number;
}) {
  return (
    <Button onClick={() => createPena(userId, eventId)}>Créer une pena</Button>
  );
}
