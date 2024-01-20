const today = new Date().toISOString();

function getEndOfWeek(date: Date) {
  const lastday = date.getDate() - (date.getDay() - 1) + 6;
  return new Date(date.setDate(lastday)).toISOString();
}

export function createHref({
  time,
  category,
  activeTime,
  activeCategory,
}: {
  time?: 'day' | 'week';
  category?: string;
  activeTime?: string;
  activeCategory?: string;
}): string {
  const dayLimit = `startDate=${today}&endDate=${today}&activeTime=day`;
  const weekLimit = `startDate=${today}&endDate=${getEndOfWeek(
    new Date()
  )}&activeTime=week`;
  const categoryParam = `activeCategory=${category}`;
  const activeCategoryParam = `activeCategory=${activeCategory}`;

  if (!activeTime) {
    if (!activeCategory) {
      if (time === 'day') return `?${dayLimit}`;
      if (time === 'week') return `?${weekLimit}`;
      if (category) return `?${categoryParam}`;
    }
    if (activeCategory) {
      if (time === 'day') return `?${dayLimit}&${activeCategoryParam}`;
      if (time === 'week') return `?${weekLimit}&${activeCategoryParam}`;
      if (category) {
        if (category === activeCategory) return '/';
        return `?${categoryParam}`;
      }
    }
  }
  if (activeTime === 'day') {
    if (!activeCategory) {
      if (time === 'day') return `/`;
      if (time === 'week') return `?${weekLimit}`;
      if (category) return `?${dayLimit}&${categoryParam}`;
    }
    if (activeCategory) {
      if (time === 'day') return `?${activeCategoryParam}`;
      if (time === 'week') return `?${weekLimit}&${activeCategoryParam}`;
      if (category) {
        if (category === activeCategory) return `?${dayLimit}`;
        return `?${dayLimit}&${categoryParam}`;
      }
    }
  }
  if (activeTime === 'week') {
    if (!activeCategory) {
      if (time === 'day') return `?${dayLimit}`;
      if (time === 'week') return `/`;
      if (category) return `?${weekLimit}&${categoryParam}`;
    }
    if (activeCategory) {
      if (time === 'day') return `?${dayLimit}&${activeCategoryParam}`;
      if (time === 'week') return `?${activeCategoryParam}`;
      if (category) {
        if (category === activeCategory) return `?${weekLimit}`;
        return `?${weekLimit}&${categoryParam}`;
      }
    }
  }
  return '';
}
