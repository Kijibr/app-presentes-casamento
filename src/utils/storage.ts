export const addToStorage = (key: string, content: unknown) => localStorage.setItem(key, JSON.stringify(content));
export const removeAtStorage = (key: string) => localStorage.removeItem(key);
export const getFromStorage = <T>(key: string): T => JSON.parse(localStorage.getItem(key)!) as T;
export const updateStorage = (key: string, newContent: unknown) => {
  removeAtStorage(key);
  addToStorage(key, newContent);
};