import { defineStore } from "pinia";
import { useApiStore } from "@/stores/api";
import type Wish from "@/models/wish";
import { ref } from "vue";

export const useWishStore = defineStore("wish", () => {
  const apiStore = useApiStore();
  const wishes = ref([] as Wish[]);
  async function add(wish: Wish) {
    return apiStore
      .post(import.meta.env.VITE_BASE_URL + "/wish", wish)
      .then(({ data }) => {
        wishes.value.push(data.data);
        return data.data;
      });
  }
  async function list() {
    const { data } = await apiStore.get(
      import.meta.env.VITE_BASE_URL + "/wish"
    );
    wishes.value = data.data;
  }
  async function done(id: number) {
    return apiStore.put(
      import.meta.env.VITE_BASE_URL + "/wish/" + id + "/done"
    );
  }
  return { add, list, done, wishes };
});
