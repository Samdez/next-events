'use client';

import { Calendar } from '@/components/ui/calendar';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';
import EventsGrid from '@/components/EventsGrid';
import { useAuth } from '@clerk/nextjs';
import { Event } from '../types/Event';

let d = new Date();
d.setMonth(d.getMonth() + 1);

const defaultSelected: DateRange = {
  from: new Date(),
  to: new Date(),
};

function CalendarSection() {
  const { userId } = useAuth();
  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const [events, setEvents] = useState<Event[] | null>(null);

  useEffect(() => {
    if (range?.from && range?.to) {
      fetch(`/api/calendar?startDate=${range?.from}&endDate=${range?.to}`, {
        next: { tags: ['events'] },
      })
        .then((res) => res.json())
        .then((res) => setEvents(res.data));
    }
    setEvents([]);
  }, [range]);

  return (
    <>
      <div className='flex justify-center p-8'>
        <Calendar
          mode='range'
          selected={range}
          onSelect={setRange}
          className='rounded-lg border-4 border-black bg-white text-black'
        />
      </div>
      {!!events?.length && (
        <EventsGrid
          initialEvents={events}
          userId={userId}
          hasNextPageInitial={false}
        />
      )}
    </>
  );
}

export default CalendarSection;
