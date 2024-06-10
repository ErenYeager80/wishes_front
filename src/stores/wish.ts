import { defineStore } from "pinia";
import { useUserStore } from "./user";
import axios from "axios";
import {useApiStore} from "@/stores/api";
import * as async_hooks from "async_hooks";
import type Wish from "@/models/wish";

export const useWishStore = defineStore("wish", () => {
    const apiStore = useApiStore()
    async function add(wish:Wish){
        return apiStore.post(import.meta.env.VITE_BASE_URL + "/wish", wish)
    }
    async function list(){
        return apiStore.get(import.meta.env.VITE_BASE_URL + "/wish")
    }
    return {add, list}
});
