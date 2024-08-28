export interface userInfo {
  id: string
  avatar: string
  fullName: string
  email: string
  phoneNumber: string
  role: string
  dob: string
  address: string
  department: string
  site: string
  created_at?: Date
  updated_at?: Date
}

export interface UserState {
  userInfo: userInfo | null;
  accessToken: string | null;
  isAuthenticated: () => boolean;
  setUserInfo: (userInfo: userInfo) => void;
  setAccessToken: (token: string) => void;
  logout: () => void;
}


