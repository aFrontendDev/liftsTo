import { getLocalStorage, setLocalStorage, clearLocalStorage } from './localStorge.helper.js';

export const isLoggedIn = () => {
  const access = getLocalStorage('access');
  const refresh = getLocalStorage('refresh');
  const accessExp = getLocalStorage('accessExp');
  const refreshExp = getLocalStorage('refreshExp');

  if (!access || !refresh) {
    return false;
  }

  const now = new Date();
  if (refreshExp < now) {
    return false;
  }

  // const nowTime = now.getTime();
  return true;
}

export const logout = () => {
  clearLocalStorage();
}


export const getAccessToken = async () => {
  const refresh = getLocalStorage('refresh');
  const accessExp = getLocalStorage('accessExp');
  const now = new Date();
  const nowTime = now.getTime();

  if (nowTime < accessExp) {
    const accessToken = getLocalStorage('access');
    return accessToken;
  }

  let response = await fetch('https://freddy.codesubmit.io/refresh', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${refresh}`
    }
  });

  let data = await response.json();
  const { access_token } = data || {};
  const currentDate = new Date();
  const expAccess = currentDate.getTime() + (15 * 60000); // 15mins from now
  setLocalStorage({key: 'access', val: access_token});
  setLocalStorage({key: 'accessExp', val: expAccess});
  return access_token;
}