import 'react-native';
import React from 'react';
import { it, describe, expect } from '@jest/globals';
import { render, screen } from '@testing-library/react-native';

import BannerImageView from '@components/bannerImageView';
import { TestIds } from '@constants';

const {
  root: wrapperTestId,
  imagePrefix: imagePrefixTestId,
  image: imageTestId,
} = TestIds.unit.bannerImageView;

describe('<BannerImageView />', () => {
  it('Renders Banner Images', () => {
    render(<BannerImageView />);

    const container = screen.getByTestId(wrapperTestId);

    expect(container).toBeTruthy();

    const images = screen.getAllByTestId(new RegExp(`${imagePrefixTestId}`));

    expect(images.length).toBe(5);

    for (let index = 0; index < 5; index++) {
      const image = screen.getByTestId(imageTestId(index));
      expect(image).toBeTruthy();
    }
  });
});
