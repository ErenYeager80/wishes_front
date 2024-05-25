
<template>
  <v-card
    class="mx-auto w-100"
    hover
  >
    <v-card-item>
      <v-card-title>
        ورود/ثبتنام
      </v-card-title>
      <v-card-subtitle>
      </v-card-subtitle>
    </v-card-item>

    <v-card-text>
      <v-form @submit.prevent="submit">
        <v-text-field v-if="!isSubmit" v-model="username"
          label="شماره تلفن"
        ></v-text-field>
        <v-otp-input v-model="code" style="direction: ltr !important;" v-else focus-all :length="6"></v-otp-input>
        <v-btn class="mt-2 " type="submit" color="success" variant="flat" block>ثبت</v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {mapActions} from "pinia";
import {useUserStore} from "../stores/user";

export default defineComponent({
  name: "Auth",
  data:()=>({
    username:"",
    isSubmit:false,
    code:""
  }),
  methods:{
    ...mapActions(useUserStore,['requestCode','login']),
    submit(){
      if(!this.isSubmit){
        this.requestCode(this.username).then(res=>{
          this.isSubmit=true
          console.log(res)
        });
      }
      else{
        this.login(this.username,this.code).then(res=>{
          // this.isSubmit=true
          console.log(res)
        });
      }

    }  ,

  }
})
</script>

<style scoped lang="sass">

</style>
