<template>
  <div class="card w-full bg-base-100/90 shadow-xl">
    <div class="card-body">
      <h2 class="card-title justify-center">کل آرزوها</h2>
      <p class="text-2xl text-center">{{ totalWishes }}</p>
      <div class="card-actions justify-end"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCounterStore } from "../stores/counter";

const store = useCounterStore();
const totalWishes = computed(() => store.totalWishes);
</script>
