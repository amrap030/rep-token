<template>
  <button
    v-if="!store.getters['user/getAddress']"
    v-wave
    class="flex items-center justify-center w-full py-4 font-semibold text-blue-100 bg-blue-700 rounded-lg  text-md focus:outline-none focus-visible:ring-2 hover:bg-blue-800 focus-visible:ring-blue-600"
    @click.prevent="connectWallet"
  >
    <CloudIcon
      v-if="!store.getters['user/getAddress']"
      class="w-5 h-5 text-blue-100"
    />
    <span class="pl-1 text-md">Connect Wallet</span>
  </button>
  <button
    v-else
    v-wave
    class="flex items-center justify-center w-full py-4 font-semibold rounded-lg  text-md focus:outline-none focus-visible:ring-2"
    @click.prevent="predict"
    :class="
      store.getters['user/getEthBalance'] > 0
        ? 'text-blue-100 bg-blue-700 hover:bg-blue-800 focus-visible:ring-blue-600'
        : 'text-red-400 ring-2 ring-red-900 bg-red-900 bg-opacity-25 cursor-not-allowed'
    "
    :disabled="store.getters['user/getEthBalance'] > 0 ? false : true"
  >
    <CloudIcon
      v-if="!store.getters['user/getAddress']"
      class="w-5 h-5 text-blue-100"
    />
    <span class="pl-1 text-md">{{
      store.getters["user/getEthBalance"] > 0
        ? "Predict"
        : "Insufficient ETH balance"
    }}</span>
  </button>
</template>

<script>
import { CloudIcon } from "@heroicons/vue/solid";
import { useStore } from "vuex";
import initWeb3 from "../../composables/useWeb3.js";
import predictionsDBHelper from "../../composables/usePredictionsDB.js";

export default {
  components: {
    CloudIcon,
  },
  props: ["data"],
  setup(props) {
    const store = useStore();
    const { init } = initWeb3();
    const { addPrediction } = predictionsDBHelper();

    const connectWallet = () => {
      init();
    };

    const dateToUnixTimestamp = () => {
      return Math.floor(new Date(props.data.date).getTime() / 1000);
    };

    const predict = async () => {
      await addPrediction(
        props.data.symbol,
        props.data.date.replace("T", " "),
        dateToUnixTimestamp(),
        Number(props.data.price * 100000).toFixed()
      );
    };

    return { store, connectWallet, predict };
  },
};
</script>

<style></style>
