import {create} from 'zustand';

interface ModuleData {
  todos: any;
  setTodos: (e: any) => void;
}

export const useTodoStore = create<ModuleData>((set: any) => ({
  todos: {},
  setTodos: todos => set(() => ({todos: todos})),
}));
