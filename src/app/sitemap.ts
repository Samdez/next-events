import { getCategories, getEvents, getLocations } from './queries';
import { type MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://goazen.info';

  const events = await getEvents({ startDate: new Date().toISOString() });
  const categories = await getCategories();
  const locations = await getLocations();

  const eventsUrls = events.events.map((event) => {
    const locationSlug =
      !(typeof event.location === 'string') && event.location?.slug;
    const locationCity =
      !(typeof event.location === 'string') &&
      event.location?.city?.toLowerCase();
    return {
      url: `${baseUrl}/concerts/${locationCity}/${locationSlug}/${event.slug}_${event.id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    };
  });

  const categoriesUrl = categories.map((cat) => {
    return {
      url: `${baseUrl}/genres/${cat.name}`,
      lastModified: new Date(),
    };
  });

  const locationsUrl = locations.map((loc) => {
    const locationCity = typeof loc.city === 'string' && loc.city;
    return {
      url: `${baseUrl}/concerts/${locationCity}/${loc.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    };
  });

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...eventsUrls,
    ...locationsUrl,
    ...categoriesUrl,
    { url: `${baseUrl}/contact`, lastModified: new Date() },
  ];
}
