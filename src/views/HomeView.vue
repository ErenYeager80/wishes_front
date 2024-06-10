<template>
  <div class="min-h-screen flex w-full">
    <div class="w-2/12 flex flex-col justify-around ps-10">
      <LoginBox v-if="!userStore.getUser" />
      <UserInfo v-else />
      <NewsBox />
      <TotalWishes />
    </div>
    <div class="w-8/12 flex flex-col justify-around items-center ps-10 pe-10">
      <EventCountdown />
      <AboutUs />
    </div>
    <div class="w-2/12 flex flex-col justify-around pe-10">
      <MyWishes />
      <HotWishes />
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
import AboutUs from "@/components/AboutUs.vue";
import MyWishes from "@/components/MyWishes.vue";
import HotWishes from "@/components/HotWishes.vue";
import { useUserStore } from "@/stores/user";
import UserInfo from "@/components/UserInfo.vue";

const userStore = useUserStore();
</script>
<style></style>
