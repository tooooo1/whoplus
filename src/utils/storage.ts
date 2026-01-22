const storage = sessionStorage;

export const setItem = (key: string, value: unknown): void => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to set item ${key}:`, error);
  }
};

type Validator<T> = (value: unknown) => value is T;

const isString: Validator<string> = (value): value is string =>
  typeof value === 'string';

const isNumber: Validator<number> = (value): value is number =>
  typeof value === 'number' && !isNaN(value);

const validators: Record<string, Validator<unknown>> = {
  power: isNumber,
  round: isNumber,
  name: isString,
};

export const getItem = <T = unknown>(key: string): T | null => {
  try {
    const item = storage.getItem(key);
    if (item === null) {
      return null;
    }

    const parsed: unknown = JSON.parse(item);
    const validator = validators[key] as Validator<T> | undefined;

    if (validator !== undefined && !validator(parsed)) {
      console.error(`Invalid type for storage key "${key}":`, parsed);
      return null;
    }

    return parsed as T;
  } catch (error) {
    console.error(`Failed to get item ${key}:`, error);
    return null;
  }
};
