<template>
  <a
    v-if="store.getters['eth/getBlock'] && store.getters['user/getNetwork']"
    class="fixed bottom-0 right-0 items-center hidden m-4 text-xs text-green-900  focus:outline-none md:flex"
    :href="getExplorer"
    target="_blank"
  >
    <div>{{ store.getters["eth/getBlock"] }}</div>
    <div class="w-2 h-2 ml-2 bg-green-400 rounded-full"></div>
  </a>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup() {
    const store = useStore();

    const getExplorer = computed(() => {
      if (store.getters["user/getNetwork"]) {
        return `${store.getters["user/getNetwork"].explorer}/block/${store.getters["eth/getBlock"]}`;
      }
      return "";
    });

    return { store, getExplorer };
  },
};
</script>
