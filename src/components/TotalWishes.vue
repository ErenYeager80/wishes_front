<template>
  <div class=" w-full border-t px-10 rounded-t-2xl">
      <h2 class="card-title justify-center py-4 ">کل آرزوها: {{ totalWishes }}</h2>
<!--      <p class="text-2xl text-center">{{ totalWishes }}</p>-->
      <div class="card-actions justify-end"></div>
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCounterStore } from "../stores/counter";

const store = useCounterStore();
const totalWishes = computed(() => store.totalWishes);
</script>
