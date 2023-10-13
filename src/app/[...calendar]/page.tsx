'use client';
import { Calendar } from '@/components/ui/calendar';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import { Event } from '@/kontent/content-types';
import EventsGrid from '@/components/EventsGrid';
import { useUser } from '@clerk/nextjs';

let d = new Date();
d.setMonth(d.getMonth() + 1);

const defaultSelected: DateRange = {
  from: new Date(),
  // to: new Date(),
  to: d,
};

export function CalendarSection() {
  const { user } = useUser();
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const [events, setEvents] = useState<Event[] | null>(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (range?.from && range?.to) {
      fetch(`/api/calendar?startDate=${range?.from}&endDate=${range?.to}`, {
        next: { tags: ['events'] },
      })
        .then((res) => res.json())
        .then((res) => setEvents(res.data.items));
    }
  }, [range]);

  useEffect(() => {
    if (user) {
      fetch(`/api/favorites?userId=${user.id}`, {
        next: { tags: ['favorites'] },
      })
        .then((res) => res.json())
        .then((res) => setFavorites(res.data));
    }
  }, [events]);

  return (
    <>
      <div className='flex justify-center p-8'>
        <Calendar
          mode='range'
          selected={range}
          onSelect={setRange}
          className='rounded-lg border bg-secondary text-primary'
        />
      </div>
      {events && (
        <EventsGrid
          events={events}
          isCalendarPage={true}
          favorites={favorites || []}
          userId={user?.id}
        />
      )}
    </>
  );
}

export default CalendarSection;
