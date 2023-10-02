import Link from 'next/link';
import { Button } from './ui/button';

function FilterSection({ isActive }: { isActive: 'week' | 'day' | undefined }) {
  const today = new Date().toISOString();

  function getEndOfWeek(date: Date) {
    const lastday = date.getDate() - (date.getDay() - 1) + 6;
    return new Date(date.setDate(lastday)).toISOString();
  }

  function createHref(input: 'day' | 'week') {
    if (isActive === input) return '/';
    if (!isActive) {
      if (input === 'day')
        return `?startDate=${today}&endDate=${today}&isActive=day`;
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
        return `?startDate=${today}&endDate=${today}&isActive=day`;
      }
    }
    return '/';
  }

  return (
    <div className='flex items-center justify-center gap-4 p-8'>
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
    </div>
  );
}

export default FilterSection;
