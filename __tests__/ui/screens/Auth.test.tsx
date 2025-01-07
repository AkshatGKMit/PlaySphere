import React from 'react';

import { TestIds } from '@constants';
import { describe, it, expect, jest } from '@jest/globals';
import Auth from '@screens/auth/Auth';
import { setupStore } from '@store';
import { render } from '@utility/test';
import { act, fireEvent, screen } from '@testing-library/react-native';
import { authValidations } from '@utility/validations';

const {
  root: rootId,
  usernameField: usernameFieldId,
  emailField: emailFieldId,
  formSwitchButton: formSwitchButtonId,
  formSwitchButtonText: formSwitchButtonTextId,
  submitButton: submitButtonId,
} = TestIds.integration.auth;

describe('<Auth/>', () => {
  const store = setupStore({
    auth: {
      isAuthorized: false,
      isLogin: false,
    },
  });

  it('Auth Screen is Displayed', () => {
    jest.useFakeTimers();
    const { getByTestId } = render(<Auth />, { store });
    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(getByTestId(rootId)).toBeTruthy();
  });

  it('Auth Screen For Login', () => {
    jest.useFakeTimers();
    const { getByTestId } = render(<Auth />, { store });
    act(() => {
      jest.advanceTimersByTime(0);
    });

    expect(getByTestId(formSwitchButtonTextId).props.children).toEqual('Sign Up');
  });

  it('Auth Screen For Sign Up', () => {
    jest.useFakeTimers();
    const { getByTestId } = render(<Auth />, { store });
    act(() => {
      jest.advanceTimersByTime(0);
    });

    fireEvent.press(getByTestId(formSwitchButtonId));

    expect(getByTestId(usernameFieldId)).toBeTruthy();
  });

  it('Display Error email and password is required', async () => {
    jest.useFakeTimers();
    const { getByTestId } = render(<Auth />, { store });
    act(() => {
      jest.advanceTimersByTime(0);
    });

    fireEvent.press(getByTestId(submitButtonId));

    expect(screen.getByText(authValidations(true).email!.required!)).toBeDefined();
    expect(screen.getByText(authValidations(true).password!.required!)).toBeDefined();
  });

  it('Display Error invalid email format', async () => {
    const email = 'abc123';

    jest.useFakeTimers();
    const { getByTestId } = render(<Auth />, { store });
    act(() => {
      jest.advanceTimersByTime(0);
    });

    fireEvent.changeText(getByTestId(emailFieldId), email);
    fireEvent.press(getByTestId(submitButtonId));

    expect(screen.getByText(authValidations(true).email!.pattern!.message)).toBeDefined();
  });
});
