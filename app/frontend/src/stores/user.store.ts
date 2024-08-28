import { create } from 'zustand';
import { userInfo, UserState } from '@/types/user.type';

const encodeToken = (token: string): string => {
  return btoa(token);
};

const decodeToken = (token: string | null): string | null => {
  return token ? atob(token) : null;
};

export const useUserStore = create<UserState>((set) => ({
  userInfo: null,
  accessToken: decodeToken(localStorage.getItem('accessToken')),
  isAuthenticated: () => !!localStorage.getItem('accessToken'),
  setUserInfo: (userInfo: userInfo) => set({ userInfo }),
  setAccessToken: (token: string) => {
    const encodedToken = encodeToken(token);
    localStorage.setItem('accessToken', encodedToken);
    set({ accessToken: encodedToken });
  },
  logout: () => {
    localStorage.removeItem('accessToken');
    set({ userInfo: null, accessToken: null });
  }
}));
