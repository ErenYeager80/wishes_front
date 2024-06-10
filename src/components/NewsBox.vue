<template>
  <div class="card w-full bg-base-100/90 shadow-xl max-h-52">
    <div class="card-body">
      <h1 class="card-title justify-center">اخبار روز</h1>

      <PerfectScrollbar style="direction: rtl">
        <p v-for="(news, index) in newsList" :key="index" class="mb-2">
          {{ news }}
        </p>
        <font-awesome-icon :icon="['fas', 'newspaper']" />
      </PerfectScrollbar>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { PerfectScrollbar } from "vue3-perfect-scrollbar";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const newsList = ref<string[]>([]);

onMounted(() => {
  // Fetch news from an API or static data
  newsList.value = [
    "خبر اول",
    "خبر دوم",
    "خبر سوم",
    "خبر چهارم",
    "خبر پنجم",
    "خبر ششم",
    "خبر هفتم",
  ];
});
</script>
<style scoped>
.ps {
  max-height: 100px; /* or height: 100px; */
}
</style>
