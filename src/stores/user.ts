// Utilities
import {defineStore} from 'pinia'
import User from '../models/user'
import {th} from "vuetify/locale";
import {useApiStore} from "./api";

export const useUserStore = defineStore('user', {
  state: () => ({
    user:null as User|null,
  }),
  actions:{
    async checkValidity(){
      const api=useApiStore();

      return api.get(import.meta.env.VITE_BASE_URL+"/auth/me")
    },
    async requestCode(username:string){
      const api=useApiStore();

      return api.post(import.meta.env.VITE_BASE_URL+"/auth/request-code",{username})
    },
    async login(username:string,code:string){
      const api=useApiStore();

      return api.post(import.meta.env.VITE_BASE_URL+"/auth/login",{username,code}).then(({data})=>{
        console.log(data)
        return data
      })
    }
  },
  getters:{
    getUser():User|null{
      let data=localStorage.getItem('user')
      return JSON.parse(data) as User | null;
    }
  }
})
