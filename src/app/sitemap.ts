import { getEvents } from './queries';

export default async function sitemap() {
  const baseUrl = 'https://www.goazen.info';

  const events = await getEvents({ startDate: new Date().toISOString() });

  const eventsUrls = events.events.map((event) => {
    return {
      url: `${baseUrl}/events/${event.id}`,
      lastModified: new Date(),
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    { url: `${baseUrl}/sign-in`, lastModified: new Date() },
    { url: `${baseUrl}/sign-up`, lastModified: new Date() },
    { url: `${baseUrl}/favorites`, lastModified: new Date() },
    { url: `${baseUrl}/calendar`, lastModified: new Date() },
    ...eventsUrls,
  ];
}
