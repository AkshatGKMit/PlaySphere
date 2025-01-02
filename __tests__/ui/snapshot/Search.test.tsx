import React from 'react';
import { it, describe, expect } from '@jest/globals';
import { fireEvent, waitFor } from '@testing-library/react-native';

import { TestIds } from '@constants';
import Search from '@screens/search/Search';
import { setupStore } from '@store';
import { render } from '@utility/test';

const { root: rootId, inputBox: inputBoxId } = TestIds.integration.search;

describe('Home Screen Snapshot', () => {
  const store = setupStore({
    auth: {
      isAuthorized: true,
      isLogin: true,
    },
  });

  it('Renders Search Screen with Text Input', () => {
    const { queryByTestId } = render(<Search />, { store });

    const inputComponent = queryByTestId(inputBoxId);

    expect(inputComponent).toBeTruthy();
  });
});
