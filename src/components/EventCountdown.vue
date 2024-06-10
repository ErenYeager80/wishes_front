<template>
  <div class="card bg-base-100/90 shadow-xl max-h-52 w-fit">
    <div class="card-body">
      <h2 class="card-title justify-center">زمان باقی مانده تا ایونت</h2>

      <div class="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div
          class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content"
        >
          <span class="countdown font-mono text-5xl">
            <span :style="`--value:${timeLeft.second}`"></span>
          </span>
          ثانیه
        </div>
        <div
          class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content"
        >
          <span class="countdown font-mono text-5xl">
            <span :style="`--value:${timeLeft.minute}`"></span>
          </span>
          دقیقه
        </div>
        <div
          class="flex flex-col p-2 bg-neutral rounded-box text-neutral-content"
        >
          <span class="countdown font-mono text-5xl">
            <span :style="`--value:${timeLeft.hour}`"></span>
          </span>
          ساعت
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const timeLeft = ref({
  second: 0,
  hour: 0,
  minute: 0,
});

const getNextTargetDate = () => {
  const now = new Date();
  let targetDate = new Date();

  if (now.getHours() < 12) {
    targetDate.setHours(12, 0, 0, 0);
  } else {
    targetDate.setHours(24, 0, 0, 0);
  }

  return targetDate;
};

const updateTimeLeft = () => {
  const now = new Date();
  const targetDate = getNextTargetDate();
  const difference = targetDate.getTime() - now.getTime();

  timeLeft.value.hour = Math.floor(difference / (1000 * 60 * 60));
  timeLeft.value.minute = Math.floor(
    (difference % (1000 * 60 * 60)) / (1000 * 60)
  );
  timeLeft.value.second = Math.floor((difference % (1000 * 60)) / 1000);
};

let timer: NodeJS.Timeout;

onMounted(() => {
  updateTimeLeft();
  timer = setInterval(updateTimeLeft, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>
