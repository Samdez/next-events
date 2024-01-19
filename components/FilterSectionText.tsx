'use client';

import { useEffect, useState } from 'react';

type FilterSectionTextProps = { isActive: 'day' | 'week' | undefined };
function FilterSectionText({ isActive }: FilterSectionTextProps) {
  const [name, setName] = useState('en ce moment');

  let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  function effect(periodName: string) {
    let iteration = 0;
    let nameInterval: ReturnType<typeof setInterval>;
    return (nameInterval = setInterval(() => {
      setName(() => {
        return periodName
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return periodName[index];
            }

            return letters[Math.floor(Math.random() * 26)];
          })
          .join('');
      });
      if (iteration >= periodName.length) {
        clearInterval(nameInterval);
      }

      iteration += 1 / 3;
    }, 15));
  }

  useEffect(() => {
    const map = {
      day: 'ce soir',
      week: 'cette semaine',
      all: '',
    };

    effect(map[isActive ?? 'all']);
  }, [isActive]);

  return (
    <p className='text-balance text-center text-6xl'>
      Tous les concerts <br className='sm:hidden' /> {name}
      <br className='sm:hidden' /> au Pays basque
    </p>
  );
}

export default FilterSectionText;
