<template>
  <div class="card w-full bg-base-100/90 shadow-xl">
    <div class="card-body">
      <h2 class="card-title justify-center">افراد آنلاین</h2>
      <p class="text-2xl text-center">
        {{ onlineUsers }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCounterStore } from "../stores/counter";

const store = useCounterStore();
const onlineUsers = computed(() => store.onlineUsers);
</script>
