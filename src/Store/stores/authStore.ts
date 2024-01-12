import {create} from 'zustand';

interface ModuleData {
  userInfo: any;
  isPlatForm: string;
  accessToken: string;
  setUserInfo: (e: any) => void;
  setIsPlatForm: (e: string) => void;
  setAccessToken: (e: string) => void;
}

export const useAuthStore = create<ModuleData>((set: any) => ({
  userInfo: {},
  isPlatForm: '',
  accessToken: '',
  setUserInfo: userInfo => set(() => ({userInfo: userInfo})),
  setIsPlatForm: isPlatForm => set(() => ({isPlatForm: isPlatForm})),
  setAccessToken: accessToken => set(() => ({accessToken: accessToken})),
}));
