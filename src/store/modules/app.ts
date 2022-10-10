import { defineStore } from 'pinia';

interface AppState {
	count: number;
}

export const useAppStore = defineStore({
	id: 'app',
	state: (): AppState => ({
		count: 1,
	}),

	getters: {
		getCount(): number {
			return this.count * 2;
		},
	},
	actions: {
		setCount(count: number) {
			console.log(count)
			this.count = count;
		}
	}
})