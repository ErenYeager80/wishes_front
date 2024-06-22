<template>
  <div class="w-full border-t px-10 rounded-t-2xl">
    <h2 class="card-title justify-center py-4">ثبت نام / ورود</h2>
    <Form @submit="handleSubmit">
      <div class="mb-2">
        <Field
          :disabled="isSubmitted"
          v-model="phoneNumber"
          name="phone"
          rules="required"
          type="text"
          placeholder="شماره تلفن"
          class="w-full p-2 rounded-md"
        />
        <ErrorMessage
          class="flex justify-start text-red-600"
          dir="ltr"
          name="phone"
        />
        <Field
          v-if="isSubmitted"
          v-model="code"
          rules="required"
          name="code"
          type="text"
          placeholder="کد را وارد کنید"
          class="w-full p-2 rounded-md"
        />
      </div>
      <button
        type="submit"
        class="inline-flex items-center justify-center w-full p-2 bg-[#3a7da3] disabled:bg-[#2a5b75] rounded-md"
        :disabled="isButton"
      >
        ثبت
        <span v-if="isButton" class="ms-2 loading loading-spinner"></span>
      </button>
    </Form>
    <div class="card-actions justify-end"></div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useUserStore } from "@/stores/user";
import { useToast } from "vue-toast-notification";
import { Form, Field, ErrorMessage } from "vee-validate";

const isButton = ref(false);
const code = ref("");
const phoneNumber = ref("");
const userStore = useUserStore();
const isSubmitted = ref(false);
onMounted(() => {
  // document.querySelector("#my_modal_1")!.showModal();
});
const handleSubmit = () => {
  isButton.value = true;
  if (!isSubmitted.value) {
    userStore.requestCode(phoneNumber.value).then(({ data }) => {
      isButton.value = false;
      alert(data.data.code);
      isSubmitted.value = true;
    });
  } else {
    userStore.login(phoneNumber.value, code.value).then(() => {
      isButton.value = false;
      const $toast = useToast();
      $toast.success("شما با موفقیت وارد شدید", {
        position: "bottom-left",
      });
    });
  }
};
</script>
