const storage = window.sessionStorage;

export const setItem = <T>(key: string, value: T) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (e) {
    throw new Error('Unable to set item in sessionStorage');
  }
};

export const getItem = <T>(key: string, defaultValue: T): T => {
  try {
    const storeState = storage.getItem(key);

    if (storeState) {
      return JSON.parse(storeState);
    }
  } catch (e) {
    throw new Error('Unable to get item from sessionStorage');
  }
  return defaultValue;
};
