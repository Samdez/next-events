import { Event } from './types/Event';

export async function getEvents(
  startDate?: string,
  endDate?: string
): Promise<Event[]> {
  const res = await fetch(`http://localhost:3000/api/events`);

  if (!res.ok) {
    throw new Error(`${res.status} ${res.statusText}`);
  }
  const parsed = await res.json();
  return parsed.docs;
}

export async function getEvent(id: string): Promise<Event> {
  const res = await fetch(`http://localhost:3000/api/events/${id}`);
  return res.json();
}
