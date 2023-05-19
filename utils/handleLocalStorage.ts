export const getStorage = (storageName: string): number[] => {
  if (typeof window === 'undefined') return [];
  return JSON.parse(window.localStorage.getItem(storageName) || '[]');
};

export const setStorage = (arr: number[], storageName: string) => {
  window.localStorage.setItem(storageName, JSON.stringify(arr));
};

export const addItemToStorage = (itemId: number, storageName: string) => {
  const prevHiddenImages = getStorage(storageName);
  if (!prevHiddenImages.includes(itemId)) {
    prevHiddenImages.push(itemId);
    setStorage(prevHiddenImages, storageName);
  }
};

export const removeItemFromStorage = (itemId: number, storageName: string) => {
  const prevHiddenImages = getStorage(storageName);
  if (prevHiddenImages.includes(itemId)) {
    const filtered = prevHiddenImages.filter((id: number) => id !== itemId);
    setStorage(filtered, storageName);
  }
};

export const getOneStorage = (storageName: string) => {
  if (typeof window === 'undefined') return [];
  return window.localStorage.getItem(storageName);
};

export const setOneStorage = (storageName: string, password: string) => {
  window.localStorage.setItem(storageName, password);
};
