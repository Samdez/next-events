import { env } from '@/src/env';
import { createDeliveryClient } from '@kontent-ai/delivery-sdk';
import { Event } from '@/content-types';
import { contentTypes } from '@/project';

function initClient() {
  return createDeliveryClient({
    environmentId: env.KONTENT_ENVIRONMENT_ID,
  });
}

export async function getEvents(startDate?: string, endDate?: string) {
  const client = initClient();
  if (startDate && endDate) {
    const res = await client
      .items<Event>()
      .type(contentTypes.event.codename)
      .greaterThanFilter('elements.date', startDate)
      .lessThanFilter('elements.date', endDate)
      .orderByAscending('elements.date')
      .toPromise();

    return res.data;
  }
  const res = await client
    .items<Event>()
    .type(contentTypes.event.codename)
    .greaterThanFilter('elements.date', new Date().toISOString())
    .orderByAscending('elements.date')
    .toPromise();

  return res.data;
}

export async function getEvent(codename: string) {
  const client = initClient();
  const res = await client.item<Event>(codename).toPromise();

  return res.data;
}
