import {create} from 'zustand';

interface ModuleData {
  data: any;
  setData: (e: any) => void;
}

export const useWishListStore = create<ModuleData>((set: any) => ({
  data: {},
  setData: data => set(() => ({data: data})),
}));
