import { defineStore } from "pinia";

interface AppState {}

export const useAppStore = defineStore({
  id: "app",
  state: (): AppState => ({}),

  getters: {},
  actions: {},
});
