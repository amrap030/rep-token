<template>
  <div class="flex flex-col items-center justify-center w-screen space-y-16">
    <div class="w-full max-w-lg p-4 space-y-4 rounded-lg bg-custom-secondary">
      <StocksDropdown />
      <div class="flex space-x-2">
        <div class="w-full">
          <label class="sr-only">Price</label>
          <div
            class="flex w-full px-3 py-4 font-medium text-left text-gray-100 bg-gray-800 rounded-lg  focus:outline-none"
          >
            <input
              id="price"
              type="text"
              class="w-full bg-gray-800  sm:text-sm sm:leading-5 focus:outline-none"
              placeholder="Price"
            />
            <label for="price"><CurrencyDollarIcon class="w-5 h-5" /></label>
          </div>
        </div>
        <div class="w-full">
          <label class="sr-only">Date</label>
          <div
            class="flex items-center w-full px-3 py-4 font-medium text-left text-gray-100 bg-gray-800 rounded-lg  focus:outline-none"
          >
            <input
              id="calendar"
              type="text"
              class="w-full bg-gray-800  sm:text-sm sm:leading-5 focus:outline-none disabled"
              placeholder="Date"
            />
            <label for="calendar"><CalendarIcon class="w-5 h-5" /></label>
          </div>
        </div>
      </div>
      <div class="flex">
        <button
          v-wave
          class="flex items-center justify-center w-full py-4 font-semibold text-purple-300 bg-purple-800 rounded-lg  text-md sm:focus:shadow-outline-indigo hover:bg-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-600"
          @click.prevent="handler"
        >
          <CloudIcon class="w-5 h-5 text-purple-300" />
          <span class="pl-1 text-md">Connect Wallet</span>
        </button>
      </div>
    </div>
    <div><StocksTable /></div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import StocksDropdown from "../components/StocksDropdown.vue";
import StocksTable from "../components/StocksTable.vue";
import {
  CloudIcon,
  CurrencyDollarIcon,
  CalendarIcon,
} from "@heroicons/vue/solid";
import { initWeb3 } from "../composables/useWeb3.js";
//import { init } from "../web3/index.js";

export default {
  name: "Home",
  components: {
    StocksDropdown,
    StocksTable,
    CloudIcon,
    CurrencyDollarIcon,
    CalendarIcon,
  },
  setup() {
    const handler = () => {
      initWeb3();
    };
    const store = useStore();
    const name = computed(() => {
      return store.state.user.name;
    });
    return { name, handler };
  },
};
</script>
