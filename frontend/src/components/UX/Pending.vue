<template>
  <div
    class="absolute flex items-center justify-center w-full h-16 space-x-1 font-light text-yellow-300 "
    :class="isXetraOpen ? 'top-0' : 'top-7'"
  >
    Pending Transactions
    <span class="ml-1 animate-pulse">.</span>
    <span
      class="animate-pulse"
      style="animation-delay: 150ms; animation-fill-mode: backwards"
      >.</span
    >
    <span
      class="animate-pulse"
      style="animation-delay: 300ms; animation-fill-mode: backwards"
      >.</span
    >
  </div>
</template>

<script>
import { ref, watchEffect } from "vue";

export default {
  setup() {
    const date = ref(new Date());
    const isXetraOpen = ref(false);

    setInterval(() => {
      date.value = new Date();
    }, 60000);

    watchEffect(() => {
      const start = 9 * 60;
      const end = 17 * 60 + 30;
      const now = date.value.getHours() * 60 + date.value.getMinutes();
      isXetraOpen.value =
        date.value.getDay() > 0 &&
        date.value.getDay() <= 5 &&
        start <= now &&
        now <= end;
    });

    return { isXetraOpen };
  },
};
</script>
