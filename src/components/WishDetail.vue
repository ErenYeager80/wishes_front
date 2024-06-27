<template>
  <teleport to="body">
    <div class="fixed z-[850] inset-0 overflow-y-auto bg-black bg-opacity-50">
      <div
        class="flex items-start justify-center min-h-screen pt-24 text-center"
      >
        <div
          class="shadow-xl bg-gradient-to-b from-[#143045] to-[#675a3d] rounded-lg text-right overflow-hidden p-8 w-1/4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <h2 class="card-title textarea-xxl justify-center pb-5">
            {{ wish.title }}
          </h2>
          <img
            :src="
              wish.file
                ? 'https://api.wishestree.ir/' + wish.file.path
                : '/src/assets/wish-tree.png'
            "
            alt="Profile"
            class="wish-img w-full rounded-lg"
          />
          <p class="py-4">{{ wish.content }}</p>
          <div class="flex justify-center">
            <button
              @click="closeModal"
              class="mt-3 font-semibold items-center p-3 w-1/3 bg-[#3a7da3] flex justify-center rounded-md"
            >
              انصراف
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import { defineEmits } from "vue";

defineProps(["wish"]);

const emits = defineEmits(["close"]);
const closeModal = () => {
  emits("close");
};
</script>
