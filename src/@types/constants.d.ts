import {
  AgeRating,
  AgeRating,
  Elevation,
  FontFamily,
  FontFamily,
  FontWeight,
  LibraryStatus,
  RatingCategory,
  RatingCategory,
  Typography,
} from '@constants';

declare global {
  interface AgeRatingType {
    slug: string;
    age: number | null;
    color: string;
  }

  type AuthFields = {
    [K in keyof RegisterBody]: K;
  };

  type FontFamilyNormal = (typeof FontFamily.normal)[keyof typeof FontFamily.normal];
  type FontFamilyItalic = (typeof FontFamily.italic)[keyof typeof FontFamily.italic];

  type FontFamily = FontFamilyNormal | FontFamilyItalic;
  type Typography = (typeof Typography)[keyof typeof Typography];
  type FontWeight = (typeof FontWeight)[keyof typeof FontWeight];
  type Elevation = (typeof Elevation)[keyof typeof Elevation];

  type LibraryStatus = (typeof LibraryStatus)[keyof typeof LibraryStatus];
  type RatingCategory = (typeof RatingCategory)[keyof typeof RatingCategory];
  type AgeRating = (typeof AgeRating)[keyof typeof AgeRating];
}
