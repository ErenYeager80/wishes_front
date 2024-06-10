import { defineStore } from "pinia";

export const useCounterStore = defineStore("counter", {
  state: () => ({
    onlineUsers: 100,
    totalWishes: 15,
  }),
  actions: {
    incrementOnlineUsers() {
      this.onlineUsers++;
    },
    incrementTotalWishes() {
      this.totalWishes++;
    },
  },
});
