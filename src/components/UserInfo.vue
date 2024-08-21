<template>
  <div class="card w-full px-10 border-t">
      <h2 class="card-title justify-center p-4">پنل کاربری</h2>
      <form @submit.prevent="handleSubmit">
        <div class="mb-2 space-y-2">
          <h1>نام: {{ userStore.getUser.firstName }}</h1>
          <h1>نام خانوادگی: {{ userStore.getUser.lastName }}</h1>
          <h1>تلفن: {{ userStore.getUser.phone }}</h1>
        </div>
        <div class="py-4">
          <button type="submit" class="w-full p-2 bg-red-700 rounded-md">
            خروج
          </button>
        </div>
      </form>
      <div class="card-actions justify-end"></div>
  </div>
  <dialog id="my_modal_1" class="modal">
    <div class="modal-box bg-gradient-to-b from-[#143045] to-[#675a3d]">
      <form
        @submit.prevent="submitProfile"
        class="form-control mt-7 gap-3 items-center "
      >
        <h3 class="font-bold text-lg text-center">
          اطلاعات کاربری را وارد کنید
        </h3>

        <input
          v-model="user.firstName"
          type="text"
          placeholder="نام"
          class="input input-bordered w-full max-w-xs"
        />
        <input
          v-model="user.lastName"
          type="text"
          placeholder="نام خانوادگی"
          class="input input-bordered w-full max-w-xs"
        />

        <div class="modal-action">
          <button class="btn btn-success">ثبت</button>
        </div>
      </form>
    </div>
  </dialog>
</template>
<script setup lang="ts">
import { useToast } from "vue-toast-notification";
import { useUserStore } from "@/stores/user";
import { onMounted, ref } from "vue";
import type User from "@/models/user";
const userStore = useUserStore();
const user = ref({} as User);

const $toast = useToast();

const handleSubmit = async () => {
  await userStore.logout();
  $toast.error("شما با موفقیت خارج شدید", {
    position: "bottom-left",
  });
};
const submitProfile = () => {
  userStore.requestProfile(user.value).then(({ data }) => {
    document.querySelector("#my_modal_1")!.close();
    $toast.success("اطلاعات شما ثبت شد", {
      position: "bottom-left",
    });
    userStore.updateUser(user.value);
  });
};
onMounted(() => {
  if (!userStore.getUser?.firstName)
    document.querySelector("#my_modal_1")!.showModal();
  user.value = userStore.getUser;
});
</script>
<style scoped></style>
