<template>
  <div class="flex flex-col items-center justify-center w-screen space-y-16">
    <div
      class="z-10 w-full max-w-lg p-4 space-y-4 rounded-2xl bg-custom-secondary"
    >
      <StocksDropdown :selected="selected" />
      <div class="flex space-x-2">
        <div class="w-full">
          <label class="sr-only">Price</label>
          <div
            class="flex w-full px-3 py-4 font-medium text-left text-gray-100 rounded-lg  bg-custom-tertiary focus:outline-none"
          >
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              v-model="price"
              class="w-full bg-gray-800  sm:text-sm sm:leading-5 focus:outline-none"
              placeholder="Price"
            />
            <label for="price"><CurrencyDollarIcon class="w-5 h-5" /></label>
          </div>
        </div>
        <div class="w-full">
          <label class="sr-only">Date</label>
          <div
            class="relative flex items-center w-full px-3 py-4 font-medium text-left text-gray-100 rounded-lg  bg-custom-tertiary focus:outline-none"
          >
            <input
              id="calendar"
              type="text"
              v-model="date"
              class="w-full h-5 bg-gray-800  sm:text-sm sm:leading-5 focus:outline-none disabled"
              placeholder="Date"
              onfocus="(this.type='datetime-local')"
            />
            <label for="calendar"><CalendarIcon class="w-5 h-5" /></label>
          </div>
        </div>
      </div>
      <div class="flex">
        <button
          v-wave
          class="flex items-center justify-center w-full py-4 font-semibold text-blue-100 bg-blue-700 rounded-lg  text-md hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-600"
          @click.prevent="handler"
        >
          <CloudIcon class="w-5 h-5 text-blue-100" />
          <span class="pl-1 text-md">Connect Wallet</span>
        </button>
      </div>
    </div>
    <div class="w-full max-w-7xl"><StocksTable /></div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import StocksDropdown from "../components/Predictions/StocksDropdown.vue";
import StocksTable from "../components/StocksTable/StocksTable.vue";
import {
  CloudIcon,
  CurrencyDollarIcon,
  CalendarIcon,
} from "@heroicons/vue/solid";
import { initWeb3 } from "../composables/useWeb3.js";

export default {
  name: "Home",
  components: {
    StocksDropdown,
    StocksTable,
    CloudIcon,
    CurrencyDollarIcon,
    CalendarIcon,
  },
  props: ["selected"],
  setup(props) {
    const price = ref(props.selected ? props.selected.price : "");
    const date = ref(
      props.selected
        ? new Date().toISOString().substring(0, 11) +
            new Date().toLocaleTimeString().substring(0, 5)
        : ""
    );
    const route = useRoute();

    const handler = () => {
      initWeb3();
    };

    return { price, date, route, handler };
  },
};
</script>

<style scoped>
input[type="datetime-local"]::-webkit-inner-spin-button,
input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  position: absolute;
  margin-right: 0.7rem;
  color: transparent;
  background: transparent;
  right: 0;
  -webkit-appearance: none;
}
</style>
