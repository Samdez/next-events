import {
  findPenaWithMissingMembers,
  findUserPena,
  getEventFromDB,
  getPenas,
  getUser,
} from '../../queries';
import { auth } from '@clerk/nextjs/server';
import CreatePena from '@/components/CreatePena';
import { UserHasNoPena } from './UserHasNoPena';

async function LagunakPage({ params }: { params: { id: string } }) {
  const { userId } = await auth();

  if (!userId) {
    return <p>Vous devez être connecté pour accéder à cette page</p>;
  }

  const [user, eventFromDB] = await Promise.all([
    getUser(userId),
    getEventFromDB(params.id),
  ]);

  const existingPenas = await getPenas(eventFromDB.id);
  if (!existingPenas.length) {
    return <NoExistingPenas userId={user.id} eventId={eventFromDB.id} />;
  }

  const userPena = await findUserPena(user.id, eventFromDB.id);
  if (userPena.length) {
    return <UserHasPena penaId={userPena[0].id} />;
  }

  const missingMembersPenas = await findPenaWithMissingMembers(eventFromDB.id);
  return (
    <UserHasNoPena
      existingPenasNumber={existingPenas.length}
      penaId={missingMembersPenas[0].id}
      userId={user.id}
      eventId={params.id}
    />
  );
}

function NoExistingPenas({
  userId,
  eventId,
}: {
  userId: number;
  eventId: number;
}) {
  return (
    <div>
      Il n&apos;y a pas encore de pena pour cet évènement
      <CreatePena userId={userId} eventId={eventId} />
    </div>
  );
}

function UserHasPena({ penaId }: { penaId: number }) {
  return <div>Vous faites partie de la pena {penaId}</div>;
}

export default LagunakPage;
