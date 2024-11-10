'use client';

import { Button } from '@/components/ui/button';
import { addUserToPena } from '../../actions';

export function UserHasNoPena({
  existingPenasNumber,
  penaId,
  userId,
  eventId,
}: {
  existingPenasNumber: number;
  penaId: number;
  userId: number;
  eventId: string;
}) {
  return (
    <>
      <div>
        Il existe déjà{' '}
        {existingPenasNumber > 1 ? `${existingPenasNumber} penas` : '1 pena'}{' '}
        pour ce concert!
      </div>
      <Button onClick={() => addUserToPena(penaId, userId, eventId)}>
        Rejoindre une pena
      </Button>
    </>
  );
}
