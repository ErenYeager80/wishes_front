import { defineStore } from "pinia";
import {useApiStore} from "@/stores/api";
import type Wish from "@/models/wish";

export const useWishStore = defineStore("wish", () => {
    const apiStore = useApiStore()
    async function add(wish:Wish){
        return apiStore.post(import.meta.env.VITE_BASE_URL + "/wish", wish)
    }
    async function list(){
        return apiStore.get(import.meta.env.VITE_BASE_URL + "/wish")
    }
    async function done(id: number) {
        return apiStore.put(import.meta.env.VITE_BASE_URL + "/wish/" + id + "/done", )
    }
    return {add, list, done}
});
