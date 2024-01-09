import Link from 'next/link';
import { Button } from './ui/button';

function getEndOfWeek(date: Date) {
  const lastday = date.getDate() - (date.getDay() - 1) + 6;
  return new Date(date.setDate(lastday)).toISOString();
}
let tomorrow = new Date(
  new Date().setDate(new Date().getDate() + 1)
).toISOString();

function FilterSection({ isActive }: { isActive: 'week' | 'day' | undefined }) {
  const today = new Date().toISOString();

  function createHref(input: 'day' | 'week') {
    if (isActive === input) return '/';
    if (!isActive) {
      if (input === 'day')
        return `?startDate=${today}&endDate=${tomorrow}&isActive=day`;
      if (input === 'week') {
        return `?startDate=${today}&endDate=${getEndOfWeek(
          new Date()
        )}&isActive=week`;
      }
    }
    if (isActive === 'day') {
      if (input === 'week') {
        return `?startDate=${today}&endDate=${getEndOfWeek(
          new Date()
        )}&isActive=week`;
      }
    }
    if (isActive === 'week') {
      if (input === 'day') {
        return `?startDate=${today}&endDate=${tomorrow}&isActive=day`;
      }
    }
    return '/';
  }

  return (
    <>
      <div className='flex flex-wrap items-center justify-center gap-4 p-8'>
        <Link href={createHref('week')} replace>
          <Button
            className={`w-36 border-2 border-secondary  hover:bg-secondary hover:text-primary ${
              isActive === 'week' && 'bg-secondary text-primary'
            }`}
          >
            Cette semaine
          </Button>
        </Link>
        <Link href={createHref('day')} replace>
          <Button
            className={`w-36 border-2 border-secondary hover:bg-secondary hover:text-primary 
          ${isActive === 'day' && 'bg-secondary text-primary'}
          `}
          >
            Ce soir
          </Button>
        </Link>
        <Link href={'/calendar'} replace>
          <Button
            className={`w-36 border-2 border-secondary  hover:bg-secondary hover:text-primary `}
          >
            Calendrier
          </Button>
        </Link>
      </div>
    </>
  );
}

export default FilterSection;
