import { useEffect, useState } from 'react';

import { Errors } from '@constants';

import useOnlineStatus from './useOnlineStatus';

export const useForm = <T extends Record<keyof T, any> = {}>({
  initialData,
  validations,
}: UseFormOptions<T>): UseForm<T> => {
  const [data, setData] = useState<T>(initialData);
  const [fieldErrors, setFieldErrors] = useState<ErrorRecord<T>>({});
  const [nonFieldError, setNonFieldError] = useState('');

  const { isConnected } = useOnlineStatus();

  useEffect(() => {
    if (isConnected && nonFieldError === Errors.noInternet) {
      setNonFieldError('');
    }
  }, [isConnected, nonFieldError]);

  const handleChangeText = (key: keyof T, value: string) => {
    setData((prevData) => ({
      ...prevData,
      [key]: value,
    }));

    setNonFieldError('');
    setFieldErrors((prevErrors) => ({
      ...prevErrors,
      [key]: undefined,
    }));
  };

  const validateField = (key: keyof T, value: string) => {
    const validation = validations?.[key];
    if (!validation) {
      return true;
    }

    if (validation.required && !value) {
      return validation.required;
    }

    if (validation.minLength && value.length < (validation.minLength.value as number)) {
      return validation.minLength.message;
    }

    if (validation.maxLength && value.length > (validation.maxLength.value as number)) {
      return validation.maxLength.message;
    }

    if (validation.min && parseInt(value, 10) < (validation.min.value as number)) {
      return validation.min.message;
    }

    if (validation.max && parseInt(value, 10) > (validation.max.value as number)) {
      return validation.max.message;
    }

    if (
      validation.pattern?.value &&
      !RegExp(validation.pattern.value as RegExp).test(value.trim())
    ) {
      return validation.pattern.message;
    }

    if (validation.minTime) {
      const inputDate = new Date(value);
      const currentDatePlusDuration = new Date(
        Date.now() + (validation.minTime.value as number) * 60 * 1000,
      );

      if (inputDate < currentDatePlusDuration) {
        return validation.minTime.message;
      }
    }

    return true;
  };

  const handleSubmit = (callback?: (data: T) => void) => {
    if (!isConnected && Object.keys(fieldErrors).length === 0) {
      setNonFieldError(Errors.noInternet);
      return;
    }

    if (!validations) {
      setFieldErrors({});
      callback?.(data);
      return;
    }

    const newErrors: ErrorRecord<T> = {};

    for (const key in validations) {
      const error = validateField(key as keyof T, data[key]);
      if (error !== true) {
        newErrors[key as keyof T] = error as string;
      }
    }

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    setFieldErrors({});
    callback?.(data);
  };

  return {
    data,
    setData,
    handleChangeText,
    handleSubmit,
    fieldErrors,
    setFieldErrors,
    nonFieldError,
    setNonFieldError,
  };
};
