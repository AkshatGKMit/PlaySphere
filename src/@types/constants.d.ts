import { Elevation, FontFamily, FontFamily, FontWeight, Typography } from '@constants';

declare global {
  type FontFamilyNormal = (typeof FontFamily.normal)[keyof typeof FontFamily.normal];
  type FontFamilyItalic = (typeof FontFamily.italic)[keyof typeof FontFamily.italic];

  type FontFamily = FontFamilyNormal | FontFamilyItalic;
  type Typography = (typeof Typography)[keyof typeof Typography];
  type FontWeight = (typeof FontWeight)[keyof typeof FontWeight];
  type Elevation = (typeof Elevation)[keyof typeof Elevation];
}
