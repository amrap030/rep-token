<template>
  <div
    v-if="store.getters['eth/getGasPrice']"
    class="flex items-center justify-between px-2 py-1 text-sm text-gray-600"
  >
    <div class="flex flex-col text-left">
      <div class="flex items-center space-x-2">
        <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
        <div>Average</div>
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-2 h-2 bg-green-400 rounded-full"></div>
        <div>Fast</div>
      </div>
      <div class="flex items-center space-x-2">
        <div class="w-2 h-2 bg-green-400 rounded-full"></div>
        <div>Fastest</div>
      </div>
    </div>
    <div class="flex flex-col items-center">
      <div>&#126; {{ store.getters["eth/getGasPrice"].avgWait * 60 }} s</div>
      <div>&#126; {{ store.getters["eth/getGasPrice"].fastWait * 60 }} s</div>
      <div>
        &#126; {{ store.getters["eth/getGasPrice"].fastestWait * 60 }} s
      </div>
    </div>
    <div class="flex flex-col text-right">
      <div>{{ store.getters["eth/getGasPrice"].average / 10 }} gwei</div>
      <div>{{ store.getters["eth/getGasPrice"].fast / 10 }} gwei</div>
      <div>{{ store.getters["eth/getGasPrice"].fastest / 10 }} gwei</div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  setup() {
    const store = useStore();

    const fetchGasPrices = async () => {
      const response = await fetch(
        "https://ethgasstation.info/json/ethgasAPI.json"
      );
      const prices = await response.json();
      if (prices) {
        store.commit("eth/SET_GAS_PRICE", prices);
      }
    };

    fetchGasPrices();

    setInterval(() => {
      fetchGasPrices();
    }, 10000);

    return { store };
  },
};
</script>

<style></style>
