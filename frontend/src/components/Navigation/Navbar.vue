<template>
  <div
    class="flex items-center justify-between w-full h-16 px-4 py-2 shadow-2xl  bg-custom-secondary-notrans"
  >
    <router-link
      class="text-2xl font-thin text-gray-200 rounded-md shadow  hover:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-opacity-50"
      :to="{ name: 'Home' }"
      @click.prevent="emit('select', '')"
    >
      Stock Predictions
    </router-link>
    <div
      class="flex items-center space-x-2 text-gray-500"
      v-if="store.getters['user/getAddress']"
    >
      <button
        v-if="store.getters['user/getAddress']"
        v-wave
        class="flex items-center justify-center px-3 py-2 text-blue-300 bg-blue-900 rounded-md  text-md focus:outline-none focus-visible:ring-2 hover:text-blue-100 focus-visible:ring-blue-600"
        @click.prevent="evaluate"
      >
        <span class="pl-1 text-md">Evaluate</span>
      </button>
      <div
        class="px-3 py-2 text-yellow-400 bg-yellow-500 rounded-md bg-opacity-10"
      >
        {{ store.getters["user/getNetwork"].name }}
      </div>
      <Popver />
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import Popver from "../User/Popover.vue";
import repTokenHelper from "../../composables/useRepToken.js";

export default {
  components: {
    Popver,
  },
  setup(props, { emit }) {
    const { evaluatePredictions } = repTokenHelper();
    const store = useStore();

    const evaluate = () => {
      evaluatePredictions();
    };

    return { store, emit, evaluate };
  },
};
</script>
