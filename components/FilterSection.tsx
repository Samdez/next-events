import Link from 'next/link';
import { Button } from './ui/button';

function getEndOfWeek(date: Date) {
  const lastday = date.getDate() - (date.getDay() - 1) + 6;
  return new Date(date.setDate(lastday)).toISOString();
}
const tomorrow = new Date(
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
      <p className='text-6xl'>
        il se passe quoi{' '}
        {isActive === undefined
          ? 'ces jours ci'
          : isActive === 'day'
            ? 'ce soir'
            : 'cette semaine'}{' '}
        ?
      </p>
      <div className='flex flex-wrap items-center justify-center gap-16 p-8'>
        <FilterButton
          path={createHref('day')}
          text='ce soir'
          isActive={isActive}
          period='day'
        />
        <FilterButton
          path={createHref('week')}
          text='cette semaine'
          isActive={isActive}
          period='week'
        />
      </div>
    </>
  );
}

function FilterButton({
  path,
  text,
  isActive,
  period,
}: {
  path: string;
  text: string;
  isActive: string | undefined;
  period: string;
}) {
  return (
    <Link href={path} replace>
      <Button
        className={`hover:bg-black[#E2B748] h-14 w-44 border-4 border-black bg-[#E2B748] text-2xl text-black hover:border-none hover:bg-black hover:text-[#E2B748]
       ${isActive === period && 'bg-black text-[#E2B748]'}
       `}
      >
        {text}
      </Button>
    </Link>
  );
}

export default FilterSection;
