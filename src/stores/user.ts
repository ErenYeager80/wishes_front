// Utilities
import { defineStore } from "pinia";
import { useApiStore } from "./api";
import type User from "@/models/user";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null as User | null,
  }),

  actions: {
    async checkValidity() {
      const api = useApiStore();

      api.get(import.meta.env.VITE_BASE_URL + "/auth/me").catch(() => {
        localStorage.removeItem("user");
        this.user = null;
      });
    },
    async requestCode(username: string) {
      const api = useApiStore();

      return api.post(import.meta.env.VITE_BASE_URL + "/auth/request-code", {
        username,
      });
    },
    async requestProfile(user: User) {
      const api = useApiStore();
      return api.post(import.meta.env.VITE_BASE_URL + "/user/profile", {
        firstName: user.firstName,
        lastName: user.lastName,
      });
    },
    async logout() {
      localStorage.removeItem("user");
      this.user = null;
      console.log(this.user);
    },
    async login(username: string, code: string) {
      const api = useApiStore();

      return api
        .post(import.meta.env.VITE_BASE_URL + "/auth/login", { username, code })
        .then(({ data }) => {
          this.user = {
            firstName: data.data.user.first_name,
            lastName: data.data.user.last_name,
            role: data.data.user.role,
            phone: data.data.user.phone,
            token: data.data.user.token,
          } as User;
          localStorage.setItem("user", JSON.stringify(this.user));

          return data;
        });
    },
    updateUser(user: User) {
      const data = JSON.parse(localStorage.getItem("user")!);
      console.log({ ...data, ...user });
      localStorage.setItem("user", JSON.stringify({ ...data, ...user }));
      this.user = user;
    },
  },
  getters: {
    getUser(): User | null {
      const data = localStorage.getItem("user");
      if (data) {
        const parsedData = JSON.parse(data);
        this.user = parsedData as User;
      }
      return this.user;
    },
  },
});
