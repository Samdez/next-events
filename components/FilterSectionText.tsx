'use client';

import { useEffect, useState } from 'react';

type FilterSectionTextProps = {
  activeTime: 'day' | 'week' | undefined;
  activeCategory: string | undefined;
};
function FilterSectionText({
  activeTime,
  activeCategory,
}: FilterSectionTextProps) {
  const [name, setName] = useState('en ce moment');
  const [category, setCategory] = useState('');

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

  function effectCategory(catName: string) {
    let iteration = 0;
    let nameInterval: ReturnType<typeof setInterval>;
    return (nameInterval = setInterval(() => {
      setCategory(() => {
        return catName
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return catName[index];
            }

            return letters[Math.floor(Math.random() * 26)];
          })
          .join('');
      });
      if (iteration >= catName.length) {
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

    effect(map[activeTime ?? 'all']);
  }, [activeTime]);

  useEffect(() => {
    effectCategory(activeCategory || '');
  }, [activeCategory]);

  return (
    <h1 className='text-balance text-center text-2xl'>
      Tous les concerts
      {/* <br className='sm:hidden' /> */}
      {` ${category} ${name} ` || ' '}
      {/* <br className='sm:hidden' /> */}
      au Pays basque
    </h1>
  );
}

export default FilterSectionText;
