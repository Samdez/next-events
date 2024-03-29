import { type ClassValue, clsx } from 'clsx';
import slugify from 'slugify';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function slugifyString(string: string) {
  const slug = string.replace('/', '_');
  return slugify(slug, { replacement: '_', lower: true, trim: true });
}

export function formatDate(date: string) {
  const options: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };
  return new Date(date).toLocaleDateString('fr-FR', options);
}
