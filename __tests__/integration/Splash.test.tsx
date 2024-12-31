import React from 'react';
import { describe, it, expect } from '@jest/globals';
import { render } from '@utility/test';
import Splash from '@screens/splash/Splash';
import { TestIds } from '@constants';

const { integration: integrationTestIds, unit: unitTestIds } = TestIds;

const { root: rootId } = integrationTestIds.splash;
const { bannerImageView: bannerImageViewIds, appIntro: appIntroIds } = unitTestIds;

describe('<Splash/>', () => {
  it('Renders Splash Screen', () => {
    const { getByTestId } = render(<Splash onReady={() => {}} />);

    expect(getByTestId(rootId)).toBeTruthy();
    expect(getByTestId(bannerImageViewIds.root)).toBeTruthy();
    expect(getByTestId(appIntroIds.root)).toBeTruthy();
  });
});
