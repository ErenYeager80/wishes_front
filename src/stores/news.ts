import { defineStore } from "pinia";
import {useApiStore} from "./api";
import type News from "../models/news";

export const useNewsStore = defineStore("news", () => {
    const apiStore = useApiStore()
    async function add(news:News){
        return apiStore.post(import.meta.env.VITE_BASE_URL + "/news", news)
    }
    async function list(){
        return apiStore.get(import.meta.env.VITE_BASE_URL + "/news")
    }
    return {add, list}
});
