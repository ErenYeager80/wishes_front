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
  function compare(x: Wish, y: Wish) {
    if ((x.done_at && y.done_at) || (!x.done_at && !y.done_at)) {
      return 0;
    } else if (!x.done_at && y.done_at) {
      return -1;
    } else if (x.done_at && !y.done_at) {
      return 1;
    } else return 0;
  }
  async function list() {
    const { data } = await apiStore.get(
      import.meta.env.VITE_BASE_URL + "/wish"
    );
    wishes.value = data.data;

    wishes.value.sort(compare);
  }
  async function done(id: number) {
    return apiStore
      .put(import.meta.env.VITE_BASE_URL + "/wish/" + id + "/done")
      .then(({ data }) => {
        const index = wishes.value.findIndex((w) => w.id == data.data.id);
        wishes.value[index] = data.data;
        wishes.value.sort(compare);
      });
  }
  return { add, list, done, wishes };
});
