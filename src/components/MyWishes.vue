<template>
  <div class="card w-full bg-base-100/90 shadow-xl ">
    <div class="card-body">
      <h2 class="card-title justify-center">آرزو های من</h2>
      <PerfectScrollbar class="wishes-scroll">
        <div
          v-for="(wish, index) in wishesList"
          :key="index"
          class="wish-item mb-1"
        >
          <div class="wish-header">
            <img
              src="../assets/wish-tree.png"
              alt="Profile"
              class="wish-img w-10 h-10 rounded-full"
            />
            <p class="textarea-xxl font-semibold">{{ wish.title }}</p>
          </div>
          <p class="textarea-xs wish-description">
            {{ wish.content }}
          </p>
        </div>
      </PerfectScrollbar>
      <div class="card-actions justify-center">
        <button type="submit" class="w-1/2 p-2 bg-blue-700 rounded-md" @click="openModal">
          اضافه کردن
        </button>
      </div>
    </div>
  </div>
  <dialog id="my_modal_2" class="modal">
    <div class="modal-box">
      <form
          @submit.prevent="handleSubmit"
          class="form-control mt-7 gap-3 items-center"
      >
        <h3 class="font-bold text-lg text-center">
          اطلاعات کاربری را وارد کنید
        </h3>

        <input
            v-model="wish.title"
            type="text"
            placeholder="عنوان آرزو"
            class="input input-bordered w-full max-w-xs"
        />
        <input
            v-model="wish.content"
            type="text"
            placeholder="متن آرزو"
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
import { ref, onMounted } from "vue";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import type Wish from "@/models/wish";
import {useWishStore} from "@/stores/wish";
import {useToast} from "vue-toast-notification";
const wish = ref({} as Wish)
const wishesList = ref<Wish[]>([]);
const wishStore = useWishStore()
const $toast = useToast();
const handleSubmit = () => {
  wishStore.add(wish.value).then(({data}) => {
    $toast.success("آرزوی شما ثبت شد", {
      position: "bottom-left",
    });
    document.querySelector("#my_modal_2")!.close();
  })
}
const openModal = () => {
  document.querySelector("#my_modal_2")!.showModal();
}
onMounted(() => {
  wishesList.value = [];
  wishStore.list().then(({data}) => {
    wishesList.value = data.data as Wish[]
  })
});
</script>

<style scoped>
.wishes-scroll {
  max-height: 100px;
  direction: rtl;
}

.wish-item {
  position: relative;
  padding-right: 3rem; /* space for image */
}

.wish-header {
  display: flex;
  align-items: center;
  margin-bottom: 0.5rem;
}

.wish-img {
  position: absolute;
  top: 0;
  right: 0;
}

.wish-description {
  margin-top: 0;
}
.ps {
  max-height: 100px; /* or height: 100px; */
}
</style>
