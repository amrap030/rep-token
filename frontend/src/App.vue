<template>
  <div class="w-full h-screen py-32">
    <div class="fixed top-0 z-40 w-full">
      <div
        v-if="!isXetraOpen"
        class="z-50 flex items-center justify-center w-full text-xs font-light text-yellow-300 bg-black  h-7"
      >
        Xetra stock market currently closed - opening hours 09:00 - 17:30 Mo-Fr
      </div>
      <div
        class="flex items-center justify-between w-full h-16 px-4 py-2 shadow-2xl  bg-custom-secondary-notrans"
      >
        <router-link
          class="text-2xl font-thin text-gray-200 shadow hover:text-gray-400"
          :to="{ name: 'Home' }"
        >
          Stock Predictions
        </router-link>
        <div class="flex items-center space-x-2 text-gray-500" v-if="address">
          <div
            class="px-3 py-2 text-yellow-400 bg-yellow-500 rounded-md  bg-opacity-10"
          >
            {{ store.getters["user/getNetwork"].name }}
          </div>
          <button
            class="px-3 py-2 rounded-md bg-custom-tertiary"
            @click.prevent="copyToClipboard"
          >
            {{ address }}
          </button>
        </div>
      </div>
    </div>
    <div class="background"></div>
    <router-view />
    <a
      v-if="store.getters['eth/getBlock'] && store.getters['user/getNetwork']"
      class="absolute bottom-0 right-0 items-center hidden m-4 text-xs text-green-900  focus:outline-none md:flex"
      :href="getExplorer"
      target="_blank"
    >
      <div>{{ store.getters["eth/getBlock"] }}</div>
      <div class="w-2 h-2 ml-2 bg-green-400 rounded-full"></div>
    </a>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { watchEffect, ref, computed } from "vue";

export default {
  setup() {
    const store = useStore();
    const date = ref(new Date());
    const isXetraOpen = ref(false);

    const address = computed(() => {
      const ethAdress = store.getters["user/getUser"].address;
      if (ethAdress) {
        return `${ethAdress.substring(0, 6)}...${ethAdress.substring(
          ethAdress.length - 4,
          ethAdress.length
        )}`;
      }
      return "";
    });

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

    const getExplorer = computed(() => {
      if (store.getters["user/getNetwork"]) {
        return `${store.getters["user/getNetwork"].explorer}/block/${store.getters["eth/getBlock"]}`;
      }
      return "";
    });

    return { address, store, isXetraOpen, getExplorer };
  },
};
</script>

<style>
body {
  @apply bg-background;
}

.background {
  background: radial-gradient(
    60% 50% at 50% 45%,
    rgb(252 7 154) 50%,
    rgb(0 0 0 / 0%) 100%
  );
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  pointer-events: none;
  height: 200vh;
  mix-blend-mode: color;
  transform: translateY(-150vh);
  max-width: 100vw !important;
}
</style>
