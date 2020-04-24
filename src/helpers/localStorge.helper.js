
export const setLocalStorage = data => {
  const { key, val } = data || {};
  if (!key || !val) {
    return;
  }

  const strg = window.localStorage;
  strg.setItem(key, val);
}

export const getLocalStorage = key => {
  if (!key) {
    return;
  }

  const strg = window.localStorage;
  return strg.getItem(key);
}

export const deleteLocalStorage = key => {
  if (!key) {
    return;
  }

  const strg = window.localStorage;
  return strg.removeItem(key);
}

export const clearLocalStorage = key => {
  const strg = window.localStorage;
  strg.clear();
}
