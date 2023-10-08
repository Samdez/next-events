import { db } from '@/src/db/client';
import { users } from '@/src/db/schema';
import { eq } from 'drizzle-orm';
import type {
  DeletedObjectJSON,
  UserJSON,
  WebhookEvent,
} from '@clerk/clerk-sdk-node';

export async function POST(request: Request) {
  const { type, data } = (await request.json()) as WebhookEvent;
  switch (type) {
    case 'user.created': {
      return createUser(data);
    }
    case 'user.deleted': {
      return deleteUser(data);
    }
  }
}

async function createUser(data: UserJSON) {
  const { id, email_addresses } = data;

  try {
    await db
      .insert(users)
      .values({ id, email: email_addresses[0].email_address });
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
  }

  return new Response(`User with id ${id} successfully created`, {
    status: 201,
  });
}

async function deleteUser(data: DeletedObjectJSON) {
  const { id } = data;
  if (!id) throw new Error('Missing id in webhook response');

  try {
    await db.update(users).set({ active: false }).where(eq(users.id, id));
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
  }

  return new Response(`User with id ${id} successfully deleted`, {
    status: 204,
  });
}
