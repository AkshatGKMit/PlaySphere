import 'react-native';
import { it, describe, expect, jest } from '@jest/globals';
import { act, screen } from '@testing-library/react-native';

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
    jest.useFakeTimers();
    render(AppIntro());
    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(screen.getByTestId(rootId)).toBeTruthy();
    expect(screen.getByTestId(appLogoId)).toBeTruthy();
    expect(screen.getByTestId(appNameId)).toBeTruthy();
    expect(screen.getByTestId(appTagLineId)).toBeTruthy();
  });
});
