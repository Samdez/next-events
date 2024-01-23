import { getCategories, getEvents } from './queries';

export default async function sitemap() {
  const baseUrl = 'https://www.goazen.info';

  const events = await getEvents({ startDate: new Date().toISOString() });
  const categories = await getCategories();

  const eventsUrls = events.events.map((event) => {
    return {
      url: `${baseUrl}/concerts/${event.id}`,
      lastModified: new Date(),
    };
  });

  const categoriesUrl = categories.map((cat) => {
    return {
      url: `${baseUrl}/genres/${cat.name}`,
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
    { url: `${baseUrl}/favoris`, lastModified: new Date() },
    { url: `${baseUrl}/agenda`, lastModified: new Date() },
    ...eventsUrls,
    ...categoriesUrl,
  ];
}
