<template>
  <div class="flex items-center justify-center w-screen">
    <div class="w-full max-w-lg p-4 space-y-4 bg-white rounded-lg shadow-xl">
      <StocksDropdown />
      <div class="flex space-x-2">
        <div class="w-full">
          <label class="sr-only">Price</label>
          <div
            class="flex w-full px-3 py-4 font-medium text-left text-gray-900 border rounded-lg  focus:outline-none"
          >
            <input
              type="text"
              class="w-full sm:text-sm sm:leading-5 focus:outline-none"
              placeholder="Price"
            />
            <CurrencyDollarIcon class="w-5 h-5" />
          </div>
        </div>
        <div class="w-full">
          <label class="sr-only">Date</label>
          <div
            class="flex w-full px-3 py-4 font-medium text-left text-gray-900 border rounded-lg  focus:outline-none"
          >
            <input
              type="text"
              class="w-full sm:text-sm sm:leading-5 focus:outline-none disabled"
              placeholder="Date"
            />
            <CalendarIcon class="w-5 h-5" />
          </div>
        </div>
      </div>
      <div class="flex">
        <button
          v-wave
          class="flex items-center justify-center w-full py-4 font-semibold text-pink-600 bg-pink-100 rounded-lg  text-md sm:focus:shadow-outline-indigo hover:bg-pink-200 focus:outline-none"
          @click.prevent="show"
        >
          <CloudIcon class="w-5 h-5 text-pink-600" />
          <span class="pl-1 text-md">Connect Wallet</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import StocksDropdown from "../components/StocksDropdown.vue";
import {
  CloudIcon,
  CurrencyDollarIcon,
  CalendarIcon,
} from "@heroicons/vue/solid";
//import Web3 from "web3";

export default {
  components: { StocksDropdown, CloudIcon, CurrencyDollarIcon, CalendarIcon },
  setup() {
    // if (window.ethereum) {
    //   const web3 = new Web3(window.ethereum);
    //   const accounts = web3.eth.getAccounts();
    //   console.log(accounts);
    // } else if (window.web3) {
    //   window.web3 = new Web3(window.web3.currentProvider);
    //   console.log("hey2");
    // } else {
    //   // DO NOTHING...
    // }
    const store = useStore();
    const name = computed(() => {
      return store.state.user.name;
    });
    return { name };
  },
};
</script>
