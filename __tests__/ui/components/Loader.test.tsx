import React from 'react';
import { it, describe, expect, jest } from '@jest/globals';

import Loader from '@components/loader';
import { TestIds } from '@constants';
import { render } from '@utility/test';
import { act } from '@testing-library/react-native';

const { loader: loaderTestId } = TestIds.unit;

describe('<Loader />', () => {
  it('renders Loader', () => {
    jest.useFakeTimers();
    const { getByTestId } = render(<Loader />);
    act(() => {
      jest.advanceTimersByTime(0);
    });

    const loaderElement = getByTestId(loaderTestId);

    expect(loaderElement.props).toBeTruthy();
  });
});
