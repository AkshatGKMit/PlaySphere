export const authValidations = (
  isLogin: boolean,
): Partial<Record<keyof RegisterBody, Validation>> => {
  const baseValidations: Partial<Record<keyof RegisterBody, Validation>> = {
    email: {
      required: 'Email is required',
      pattern: {
        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Must match a valid email format (e.g., user@example.com)',
      },
    },
    password: {
      required: 'Password is required',
      minLength: {
        value: 8,
        message: 'Minimum password length must be 8',
      },
      pattern: {
        value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message:
          'Must include at least one uppercase letter, one lowercase letter, one number, and one special character',
      },
    },
  };

  if (!isLogin) {
    baseValidations.username = {
      required: 'Username is required',
      minLength: {
        value: 5,
        message: 'Minimum characters must be 5',
      },
      maxLength: {
        value: 12,
        message: 'Maximum characters must be 12',
      },
      pattern: {
        value: /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/,
        message: 'Should only contain alphanumeric characters and underscores',
      },
    };
  }

  return baseValidations;
};
