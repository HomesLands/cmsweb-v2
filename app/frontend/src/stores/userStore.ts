import { create } from 'zustand';
import { userInfo } from '@/types/user';

interface UserState {
  userInfo: userInfo | null;
  accessToken: string | null;
  isAuthenticated: () => boolean;
  setUserInfo: (userInfo: userInfo) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  userInfo: null,
  accessToken: localStorage.getItem('accessToken'),
  isAuthenticated: () => !!localStorage.getItem('accessToken'),
  setUserInfo: (userInfo: userInfo) => set({ userInfo }),
  setAccessToken: (token: string) => {
    localStorage.setItem('accessToken', token);
    set({ accessToken: token });
  },
  logout: () => {
    localStorage.removeItem('accessToken');
    set({ userInfo: null, accessToken: null });
  }
}));
