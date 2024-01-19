import {create} from 'zustand';

interface ModuleData {
  isLogin: boolean;
  isLoding: boolean;
  userInfo: any;
  userNickname: string;
  isPlatForm: string;
  accessToken: string;
  fcmToken: string;
  setIsLogin: (e: boolean) => void;
  setIsLoding: (e: boolean) => void;
  setUserInfo: (e: any) => void;
  setUserNickname: (e: string) => void;
  setIsPlatForm: (e: string) => void;
  setAccessToken: (e: string) => void;
  setFcmToken: (e: string) => void;
}

export const useAuthStore = create<ModuleData>((set: any) => ({
  isLogin: false,
  isLoding: true,
  userInfo: {},
  userNickname: '',
  isPlatForm: '',
  accessToken: '',
  fcmToken: '',
  setIsLogin: isLogin => set(() => ({isLogin: isLogin})),
  setIsLoding: isLoding => set(() => ({isLoding: isLoding})),
  setUserInfo: userInfo => set(() => ({userInfo: userInfo})),
  setUserNickname: userNickname => set(() => ({userNickname: userNickname})),
  setIsPlatForm: isPlatForm => set(() => ({isPlatForm: isPlatForm})),
  setAccessToken: accessToken => set(() => ({accessToken: accessToken})),
  setFcmToken: fcmToken => set(() => ({fcmToken: fcmToken})),
}));
