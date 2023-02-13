import { defineStore } from "pinia";

interface UserInfo {
  name?: string;
  age?: number;
}

interface ExampleState {
  count: number;
  obj: UserInfo;
}

export const useExampleState = defineStore({
  id: "example",
  state: (): ExampleState => ({
    count: 1,
    obj: {
      name: "hh",
      age: 18,
    },
  }),

  getters: {
    getCount(): number {
      return this.count * 2;
    },
  },
  actions: {
    setCount(count: number) {
      console.log(count);
      this.count = count;
    },
  },
});
