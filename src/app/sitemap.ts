import { getCategories, getEvents, getLocations } from './queries';
import { type MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://goazen.info';

  const events = await getEvents({ startDate: new Date().toISOString() });
  const categories = await getCategories();
  const locations = await getLocations();

  const eventsUrls = events.events.map((event) => {
    const locationCity =
      !(typeof event.location === 'string') &&
      event.location.city?.toLowerCase();
    return {
      url: `${baseUrl}/concerts/${locationCity}/${event.slug}_${event.id}`,
      lastModified: new Date(),
    };
  });

  const categoriesUrl = categories.map((cat) => {
    return {
      url: `${baseUrl}/genres/${cat.name}`,
      lastModified: new Date(),
    };
  });

  const locationsUrl = locations.map((loc) => {
    return {
      url: `${baseUrl}/lieux/${loc.slug}`,
      lastModified: new Date(),
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...eventsUrls,
    ...categoriesUrl,
    ...locationsUrl,
    { url: `${baseUrl}/sign-in`, lastModified: new Date() },
    { url: `${baseUrl}/sign-up`, lastModified: new Date() },
    { url: `${baseUrl}/favoris`, lastModified: new Date() },
    { url: `${baseUrl}/agenda`, lastModified: new Date() },
    { url: `${baseUrl}/contact`, lastModified: new Date() },
  ];
}
