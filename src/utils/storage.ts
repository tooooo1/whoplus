const storage = sessionStorage;

export const setItem = <T>(key: string, value: T): void => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to set item ${key}:`, error);
  }
};

export const getItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = storage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Failed to get item ${key}:`, error);
    return defaultValue;
  }
};
