import React from 'react';
import { it, describe, expect, jest } from '@jest/globals';
import { act, fireEvent } from '@testing-library/react-native';

import { TestIds } from '@constants';
import Search from '@screens/search/Search';
import { setupStore } from '@store';
import { render } from '@utility/test';

const { search: searchId } = TestIds.integration;

describe('Home Screen Snapshot', () => {
  const store = setupStore({
    auth: {
      isAuthorized: true,
      isLogin: true,
    },
  });

  it('Renders Search Screen with Text Input', () => {
    jest.useFakeTimers();
    const { queryByTestId } = render(<Search />, { store });
    act(() => {
      jest.advanceTimersByTime(0);
    });

    const inputComponent = queryByTestId(searchId.inputBox);

    expect(inputComponent).toBeTruthy();
  });

  it('Input Text Contains GTA', async () => {
    const searchText = 'GTA';

    jest.useFakeTimers();
    const { queryByTestId } = render(<Search />, { store });
    act(() => {
      jest.advanceTimersByTime(0);
    });

    const input = queryByTestId(searchId.inputBox);

    expect(input).toBeTruthy();

    if (input) {
      fireEvent.changeText(input, searchText);
      expect(input?.props.value).toEqual(searchText);
    }
  });

  it('Match Search results', async () => {
    const searchText = 'GTA';

    jest.useFakeTimers();
    const { queryByTestId, rerender } = render(<Search />, { store });
    act(() => {
      jest.advanceTimersByTime(0);
    });

    const input = queryByTestId(searchId.inputBox);

    expect(input).toBeTruthy();

    if (input) {
      fireEvent.changeText(input, searchText);
      expect(input?.props.value).toEqual(searchText);
    }

    rerender(<Search />);

    console.log(queryByTestId(searchId.root)?.children);
  });
});
