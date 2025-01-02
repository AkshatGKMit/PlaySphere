import React from 'react';

import { TestIds } from '@constants';
import { describe, it, expect } from '@jest/globals';
import Auth from '@screens/auth/Auth';
import { setupStore } from '@store';
import { render } from '@utility/test';
import { fireEvent, screen } from '@testing-library/react-native';
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
    const { getByTestId } = render(<Auth />, { store });

    expect(getByTestId(rootId)).toBeTruthy();
  });

  it('Auth Screen For Login', () => {
    const { getByTestId } = render(<Auth />, { store });

    expect(getByTestId(formSwitchButtonTextId).props.children).toEqual('Sign Up');
  });

  it('Auth Screen For Sign Up', () => {
    const { getByTestId } = render(<Auth />, { store });

    fireEvent.press(getByTestId(formSwitchButtonId));

    expect(getByTestId(usernameFieldId)).toBeTruthy();
  });

  it('Display Error email and password is required', async () => {
    const { getByTestId } = render(<Auth />, { store });

    fireEvent.press(getByTestId(submitButtonId));

    expect(screen.getByText(authValidations(true).email!.required!)).toBeDefined();
    expect(screen.getByText(authValidations(true).password!.required!)).toBeDefined();
  });

  it('Display Error invalid email format', async () => {
    const email = 'abc123';

    const { getByTestId } = render(<Auth />, { store });

    fireEvent.changeText(getByTestId(emailFieldId), email);
    fireEvent.press(getByTestId(submitButtonId));

    expect(screen.getByText(authValidations(true).email!.pattern!.message)).toBeDefined();
  });
});
