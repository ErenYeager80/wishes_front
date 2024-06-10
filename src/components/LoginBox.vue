<template>
  <div class="card w-full bg-base-100/90 shadow-xl min-h-52">
    <div class="card-body">
      <h2 class="card-title justify-center">ثبت نام / ورود</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-2">
          <input
            :disabled="isSubmitted"
            v-model="phoneNumber"
            type="text"
            placeholder="شماره تلفن"
            class="w-full p-2 rounded-md"
          />
          <input
            v-if="isSubmitted"
            v-model="code"
            type="text"
            placeholder="کد را وارد کنید"
            class="w-full p-2 rounded-md"
          />
        </div>
        <button type="submit" class="w-full p-2 bg-blue-700 rounded-md">
          ثبت
        </button>
      </form>
      <div class="card-actions justify-end"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useToast } from "vue-toast-notification";

const code = ref("");
const phoneNumber = ref("");
const userStore = useUserStore();
const isSubmitted = ref(false);
onMounted(() => {
  // document.querySelector("#my_modal_1")!.showModal();
});
const handleSubmit = () => {
  if (!isSubmitted.value) {
    userStore.requestCode(phoneNumber.value).then(({ data }) => {
      alert(data.data.code);
      isSubmitted.value = true;
    });
  } else {
    userStore.login(phoneNumber.value, code.value).then((res) => {
      const $toast = useToast();
      $toast.success("شما با موفقیت وارد شدید", {
        position: "bottom-left",
      });
    });
  }
};
</script>
