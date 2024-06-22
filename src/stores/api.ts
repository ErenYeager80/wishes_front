import { defineStore } from "pinia";
import { useUserStore } from "./user";
import axios from "axios";

export const useApiStore = defineStore("api", () => {
  const userStore = useUserStore();
  async function post(route: string, body: any, headers = {} as any) {
    return axios.post(route, body, {
      headers: {
        ...headers,
        Authorization: userStore.getUser
          ? "Bearer " + userStore.getUser.token
          : "",
      },
    });
  }
  async function get(route: string, headers = {} as any) {
    return axios.get(route, {
      headers: {
        ...headers,
        Authorization: userStore.getUser
          ? "Bearer " + userStore.getUser.token
          : "",
      },
    });
  }


  return { post, get };
});
