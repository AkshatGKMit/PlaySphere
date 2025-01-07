import React from 'react';
import { describe, it, jest, expect } from '@jest/globals';
import { act, fireEvent, screen } from '@testing-library/react-native';

import ActionButton from '@components/actionButton';
import { render } from '@utility/test';

describe('<ActionButton/>', () => {
  const onPressMock = jest.fn().mockImplementation(() => 'Button Press');

  it('Renders Action Button', async () => {
    jest.useFakeTimers();
    render(
      <ActionButton
        label="Test Button"
        onPress={onPressMock}
      />,
    );
    act(() => {
      jest.advanceTimersByTime(0);
    });

    fireEvent.press(screen.getByText('Test Button'));
    expect(onPressMock).toReturnWith('Button Press');
  });
});
