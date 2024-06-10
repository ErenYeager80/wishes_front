<template>
  <div class="card w-full bg-base-100/90 shadow-xl max-h-52">
    <div class="card-body">
      <h1 class="card-title justify-center">آرزو های داغ</h1>
      <PerfectScrollbar class="wishes-scroll">
        <div
          v-for="(wish, index) in wishesList"
          :key="index"
          class="wish-item mb-4"
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
            {{ wish.description }}
          </p>
        </div>
      </PerfectScrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";

const wishesList = ref<{ title: string; description: string }[]>([]);

onMounted(() => {
  wishesList.value = [
    { title: "آرزو اول", description: " آرزو اول" },
    { title: "آرزو دوم", description: " آرزو دوم" },
    { title: "آرزو سوم", description: " آرزو سوم" },
    { title: "آرزو چهارم", description: " آرزو چهارم" },
    { title: "آرزو پنجم", description: " آرزو پنجم" },
    { title: "آرزو ششم", description: " آرزو ششم" },
    { title: "آرزو هفتم", description: " آرزو هفتم" },
  ];
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
</style>
