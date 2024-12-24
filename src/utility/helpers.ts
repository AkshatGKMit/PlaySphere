import { AgeRating } from '@constants';

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
