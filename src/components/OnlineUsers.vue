<template>
  <div class=" w-full border-t rounded-t-2xl">
      <h2 class="card-title justify-center py-4 ">افراد آنلاین: {{ onlineUsers }}</h2>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useCounterStore } from "../stores/counter";

const store = useCounterStore();
const onlineUsers = computed(() => store.onlineUsers);
</script>
