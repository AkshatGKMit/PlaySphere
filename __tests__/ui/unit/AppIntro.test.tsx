import 'react-native';
import { it, describe, expect } from '@jest/globals';
import { screen } from '@testing-library/react-native';

import AppIntro from '@components/appIntro';
import { TestIds } from '@constants';
import { render } from '@utility/test';

const {
  root: rootId,
  appLogo: appLogoId,
  appName: appNameId,
  appTagLine: appTagLineId,
} = TestIds.unit.appIntro;

describe('<AppIntro />', () => {
  it('Renders App Intro', () => {
    render(AppIntro());

    expect(screen.getByTestId(rootId)).toBeTruthy();
    expect(screen.getByTestId(appLogoId)).toBeTruthy();
    expect(screen.getByTestId(appNameId)).toBeTruthy();
    expect(screen.getByTestId(appTagLineId)).toBeTruthy();
  });
});
