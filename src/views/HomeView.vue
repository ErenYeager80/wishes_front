<template>
  <div class="min-h-screen flex w-full">
    <div class="w-2/12 flex flex-col relative">
      <MyWishes/>
    </div>
    <div class="w-8/12 flex flex-col items-center p-10 tree-bg">
      <EventCountdown />
    </div>
    <div class="w-2/12 flex flex-col justify-around bg-gradient-to-b from-[#143045] to-[#675a3d]">
      <LoginBox v-if="!userStore.getUser" />
      <UserInfo v-else />
      <NewsBox />
      <TotalWishes />
      <OnlineUsers />
    </div>
  </div>
</template>

<script setup lang="ts">
import LoginBox from "../components/LoginBox.vue";
import OnlineUsers from "../components/OnlineUsers.vue";
import EventCountdown from "../components/EventCountdown.vue";
import NewsBox from "../components/NewsBox.vue";
import TotalWishes from "../components/TotalWishes.vue";
import MyWishes from "@/components/MyWishes.vue";
import { useUserStore } from "@/stores/user";
import UserInfo from "@/components/UserInfo.vue";

const userStore = useUserStore();
</script>
<style></style>
