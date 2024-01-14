import {create} from 'zustand';

interface ModuleData {
  result: any;
  isEnter: boolean;
  setResult: (e: any) => void;
  setIsEnter: (e: boolean) => void;
}

export const useSearchStore = create<ModuleData>((set: any) => ({
  result: [],
  isEnter: false,
  setResult: result => set(() => ({result: result})),
  setIsEnter: isEnter => set(() => ({isEnter: isEnter})),
}));
