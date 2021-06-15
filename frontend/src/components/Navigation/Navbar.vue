<template>
  <div
    class="flex items-center justify-between w-full h-16 px-4 py-2 shadow-2xl  bg-custom-secondary-notrans"
  >
    <router-link
      class="text-2xl font-thin text-gray-200 shadow hover:text-gray-400"
      :to="{ name: 'Home' }"
      @click.prevent="emit('select', '')"
    >
      Stock Predictions
    </router-link>
    <div class="flex items-center space-x-2 text-gray-500" v-if="address">
      <div
        class="px-3 py-2 text-yellow-400 bg-yellow-500 rounded-md bg-opacity-10"
      >
        {{ store.getters["user/getNetwork"].name }}
      </div>
      <button
        class="flex items-center py-1 pl-3 pr-1 space-x-2 rounded-md  bg-custom-tertiary"
      >
        <div>{{ store.getters["user/getEthBalance"] }} ETH</div>
        <div class="px-2 py-1 rounded-md bg-background">{{ address }}</div>
      </button>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  setup(props, { emit }) {
    const store = useStore();

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

    return { store, emit, address };
  },
};
</script>
