<template>
  <div
    v-if="!isXetraOpen"
    class="z-50 flex items-center justify-center w-full text-xs font-light text-yellow-300 bg-black  h-7"
  >
    Xetra stock market currently closed - opening hours 09:00 - 17:30 Mo-Fr
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
