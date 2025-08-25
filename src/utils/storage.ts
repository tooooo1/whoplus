const storage = sessionStorage;

export const setItem = (key: string, value: unknown): void => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Failed to set item ${key}:`, error);
  }
};

export const getItem = <T = unknown>(key: string): T | null => {
  try {
    const item = storage.getItem(key);
    if (item !== null) {
      return JSON.parse(item) as T;
    }
    return null;
  } catch (error) {
    console.error(`Failed to get item ${key}:`, error);
    return null;
  }
};
