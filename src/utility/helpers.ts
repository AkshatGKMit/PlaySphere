import { AgeRating } from '@constants';

export function parseUrl<SearchParams = {}>(
  url: string,
): { baseUrl: string; searchParams: SearchParams } {
  const [baseUrl, paramsString] = url.split('?');

  const searchParams: Partial<Record<string, string>> = {};

  if (paramsString) {
    paramsString.split('&').forEach((param) => {
      const [key, value] = param.split('=');
      searchParams[decodeURIComponent(key)] = decodeURIComponent(value || '');
    });
  }

  return { baseUrl, searchParams: searchParams as SearchParams };
}

export function parseDateString(dateString: string, matchWithToday?: boolean) {
  const [year, month, day] = dateString.split('-').map(Number);

  const inputDate = new Date(year, month - 1, day);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (matchWithToday && inputDate <= today) {
    return null;
  }

  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' };
  return inputDate.toLocaleDateString('en-US', options);
}

export function capitalizeWord(str: string) {
  if (typeof str !== 'string' || str.length === 0) {
    return str;
  }

  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function generateRandomString(length: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters[randomIndex];
  }

  return result;
}

export const debounce = <T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): ((...args: Parameters<T>) => void) => {
  let timer: NodeJS.Timeout | undefined;

  return (...args: Parameters<T>): void => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

export const formatAgeRatingToAge = (ageRating?: EntityFilter | null): AgeRatingType | null => {
  if (
    !ageRating ||
    ageRating.slug === AgeRating.id1.slug ||
    ageRating.slug === AgeRating.id6.slug
  ) {
    return null;
  }

  for (const key in AgeRating) {
    if (AgeRating[key as keyof typeof AgeRating].slug === ageRating?.slug) {
      return AgeRating[key as keyof typeof AgeRating];
    }
  }

  return null;
};
