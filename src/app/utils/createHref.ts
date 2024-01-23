const today = new Date().toISOString();

function getEndOfWeek(date: Date) {
  const lastday = date.getDate() - (date.getDay() - 1) + 6;
  return new Date(date.setDate(lastday)).toISOString();
}

export function createHref({
  time,
  category,
  activeTime,
}: {
  time?: 'day' | 'week';
  category?: string;
  activeTime?: string;
}): string {
  const dayLimit = `startDate=${today}&endDate=${today}&activeTime=day`;
  const weekLimit = `startDate=${today}&endDate=${getEndOfWeek(
    new Date()
  )}&activeTime=week`;
  let url = '';
  url += category ? `/genres/${category}` : '';

  if (!activeTime) {
    if (time === 'day') return `${url}?${dayLimit}`;
    if (time === 'week') return `${url}?${weekLimit}`;
  }
  if (activeTime === 'day') {
    if (time === 'day') return `/`;
    if (time === 'week') return `?${weekLimit}`;
  }
  if (activeTime === 'week') {
    if (time === 'day') return `?${dayLimit}`;
    if (time === 'week') return `/`;
  }
  return '';
}
