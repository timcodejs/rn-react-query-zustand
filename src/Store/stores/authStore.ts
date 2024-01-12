import {create} from 'zustand';

interface ModuleData {
  accessToken: string;
  setAccessToken: (e: string) => void;
}

export const useAuthStore = create<ModuleData>((set: any) => ({
  accessToken: '',
  setAccessToken: accessToken => set(() => ({accessToken: accessToken})),
}));
