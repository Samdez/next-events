import { env } from '@/env';
import { createDeliveryClient } from '@kontent-ai/delivery-sdk';
import { Event } from '@/kontent/content-types';
import { contentTypes } from '@/kontent/project';

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
      .greaterThanOrEqualFilter('elements.date', startDate.split('T')[0])
      .lessThanFilter('elements.date', endDate.split('T')[0])
      .orderByAscending('elements.date')
      .toPromise();

    return res.data;
  }
  const res = await client
    .items<Event>()
    .type(contentTypes.event.codename)
    .greaterThanOrEqualFilter('elements.date', new Date().toISOString())
    .orderByAscending('elements.date')
    .toPromise();

  return res.data;
}

export async function getEvent(codename: string) {
  const client = initClient();
  const res = await client.item<Event>(codename).toPromise();

  return res.data;
}
