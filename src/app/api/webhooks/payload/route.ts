import { db } from '@/src/db/client';
import { events } from '@/src/db/schema';
import { eq } from 'drizzle-orm';

interface PostRequestBody {
  eventId: string;
}
interface DeleteRequestBody {
  eventId: string;
}

export async function POST(request: Request) {
  const req = (await request.json()) as PostRequestBody;

  return createEvent(req.eventId);
}
export async function DELETE(request: Request) {
  const req = (await request.json()) as DeleteRequestBody;

  console.log('EVENT ID', req.eventId, '659db6b0b9bd9d74667440f6');

  return deleteEvent(req.eventId);
}

async function createEvent(id: string) {
  try {
    await db.insert(events).values({ id });
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
  }

  return new Response(`Event with id ${id} successfully created`, {
    status: 201,
  });
}

async function deleteEvent(id: string) {
  try {
    await db.delete(events).where(eq(events.id, id));
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
  }

  return new Response(`Event with id ${id} successfully deleted`, {
    status: 200,
  });
}
