interface OnlineStatus {
  isConnected: boolean;
  showNoConnectionScreenMessage: boolean;
}

interface RefObject<T> {
  current: T | null;
}

interface Options {
  value: number | string | RegExp;
  message: string;
}

interface Validation {
  required?: string;
  pattern?: Options;
  min?: Options;
  minLength?: Options;
  max?: Options;
  maxLength?: Options;
  pattern?: Options;
  minTime?: Options;
}

interface UseFormOptions<T> {
  initialData: T;
  validations?: {
    [K in keyof T]?: Validation;
  };
}

interface UseForm<T> {
  data: T;
  setData: (data: T) => void;
  handleChangeText: (key: keyof T, value: string) => void;
  handleSubmit: (callback?: (data: T) => void) => void;
  fieldErrors: ErrorRecord<T>;
  setFieldErrors: (data: ErrorRecord<T>) => void;
  nonFieldError: string;
  setNonFieldError: (data: string) => void;
}

type ErrorRecord<T> = {
  [K in keyof T]?: string;
};
type Validations<T extends {}> = Partial<Record<keyof T, Validation>>;
