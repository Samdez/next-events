import { db } from '@/src/db/client';
import { events } from '@/src/db/schema';
import { IWebhookDeliveryResponse } from '@kontent-ai/webhook-helper';
import { eq } from 'drizzle-orm';

export async function POST(request: Request) {
  const { data, message } = (await request.json()) as IWebhookDeliveryResponse;

  switch (message.operation) {
    case 'publish': {
      return createEvent(data);
    }
    case 'unpublish': {
      return deleteEvent(data);
    }
  }
}

async function createEvent(data: IWebhookDeliveryResponse['data']) {
  try {
    await db.insert(events).values({ codename: data.items[0].codename });
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
  }

  return new Response(
    `Event with codename ${data.items[0].codename} successfully created`,
    {
      status: 201,
    }
  );
}

async function deleteEvent(data: IWebhookDeliveryResponse['data']) {
  try {
    await db.delete(events).where(eq(events.codename, data.items[0].codename));
  } catch (error: unknown) {
    if (error instanceof Error) throw new Error(error.message);
  }

  return new Response(
    `Event with codename ${data.items[0].codename} successfully deleted`,
    {
      status: 204,
    }
  );
}
