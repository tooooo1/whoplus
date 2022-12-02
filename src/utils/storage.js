const storage = window.sessionStorage;

export const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};

export const getItem = (key, defaultValue) => {
  try {
    const storeState = storage.getItem(key);

    if (storeState) {
      return JSON.parse(storeState);
    }
  } catch (e) {
    console.error(e);
  }
  return defaultValue;
};
