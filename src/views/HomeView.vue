<template>
  <div class="min-h-screen flex w-full relative">
    <!-- Sidebar Section -->
    <div :class="['sidebar flex flex-col transition-all duration-300', isSidebarOpen ? 'w-2/12' : 'w-0']">
      <MyWishes v-if="isSidebarOpen" />
    </div>
    <!-- Main Content Section -->
    <div  :class="['main-content flex flex-col items-center p-10 tree-bg transition-all duration-300', isSidebarOpen ? 'w-8/12' : 'w-full']">
      <EventCountdown />
    </div>
    <!-- Right Section -->
    <div class="right-section w-2/12 flex flex-col justify-around bg-gradient-to-b from-[#143045] to-[#675a3d]">
      <LoginBox v-if="!userStore.getUser" />
      <UserInfo v-else />
      <NewsBox />
      <TotalWishes />
      <OnlineUsers />
    </div>
    <!-- Toggle Button -->
    <button @click="toggleSidebar" class="toggle-button">
      {{ isSidebarOpen ? 'Close' : 'Open' }}
    </button>
  </div>
</template>





<script setup lang="ts">
import { ref } from 'vue';
import LoginBox from "../components/LoginBox.vue";
import OnlineUsers from "../components/OnlineUsers.vue";
import EventCountdown from "../components/EventCountdown.vue";
import NewsBox from "../components/NewsBox.vue";
import TotalWishes from "../components/TotalWishes.vue";
import MyWishes from "@/components/MyWishes.vue";
import { useUserStore } from "@/stores/user";
import UserInfo from "@/components/UserInfo.vue";

const userStore = useUserStore();
const isSidebarOpen = ref(true);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>


<style scoped>
.transition-all {
  transition: all 0.3s ease;
}
.toggle-button {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 10;
  background-color: #1d4ed8;
  color: white;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: none; /* Hide by default */
}
@media (max-width: 768px) {
  .toggle-button {
    display: block; /* Show toggle button only on small screens */
  }
  .tree-bg {
    padding: 5px;
  }
  .main-content {
    width: 100%; /* Use custom class for main content */
  }
}
</style>






