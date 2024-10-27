// تابعی برای گرفتن توکن از localStorage و بررسی اینکه آیا معتبر است یا خیر
export const getLocalStroge = (key) => {
  const item = localStorage.getItem(key);

  try {
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error parsing localStorage item with key "${key}":`, error);
    return null;
  }
};

const token = getLocalStroge('token');

if (token) {
  console.log('توکن معتبر:', token);
} else {
  console.error('توکن نامعتبر یا وجود ندارد.');
}
export function setLocalStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function deleteLocalStorage(key) {
  localStorage.removeItem(key);
}
