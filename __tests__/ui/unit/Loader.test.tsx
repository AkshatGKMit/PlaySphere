import React from 'react';
import { it, describe, expect } from '@jest/globals';

import Loader from '@components/loader';
import { TestIds } from '@constants';
import { renderReduxProvider } from '@utility/test';

const { loader: loaderTestId } = TestIds.unit;

describe('<Loader />', () => {
  it('renders Loader', () => {
    const { getByTestId } = renderReduxProvider(<Loader />);

    const loaderElement = getByTestId(loaderTestId);

    expect(loaderElement.props).toMatchObject({ color: expect.any(String) });
  });
});
