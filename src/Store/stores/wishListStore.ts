import {create} from 'zustand';

interface ModuleData {
  data: any;
  count: number;
  setData: (e: any) => void;
  setCountReset: (e: number) => void;
  increaseCount: (e: any) => void;
  decreaseCount: (e: any) => void;
}

export const useWishListStore = create<ModuleData>((set: any) => ({
  data: {},
  count: 0,
  setData: data => set(() => ({data: data})),
  setCountReset: () => set(() => ({count: 0})),
  increaseCount: state =>
    set(() => ({
      count: state.quantity > state.count ? state.count + 1 : state.quantity,
    })),
  decreaseCount: state =>
    set(() => ({count: state.count <= 0 ? 0 : state.count - 1})),
}));
