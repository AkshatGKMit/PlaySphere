import React from 'react';
import { describe, it, jest, expect } from '@jest/globals';
import { fireEvent, screen } from '@testing-library/react-native';

import ActionButton from '@components/actionButton';
import { render } from '@utility/test';

describe('<ActionButton/>', () => {
  const onPressMock = jest.fn().mockImplementation(() => 'Button Press');

  it('Renders Action Button', () => {
    render(
      <ActionButton
        label="Test Button"
        onPress={onPressMock}
      />,
    );

    fireEvent.press(screen.getByText('Test Button'));
    expect(onPressMock).toReturnWith('Button Press');
  });
});
