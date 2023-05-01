const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

const getLocalStorage = (key) => localStorage.getItem(key) || null;

export { setLocalStorage, getLocalStorage };
