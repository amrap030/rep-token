<template>
  <a
    :href="explorerAddress"
    target="_blank"
    class="grid grid-cols-8 gap-1 py-4 text-gray-300 border-b border-gray-800 cursor-pointer  border-opacity-30 group hover:text-gray-400 max-w-7xl whitespace-nowrap"
  >
    <div class="col-span-2"># {{ Number(rank + 1) }}</div>
    <div class="col-span-5 text-left">{{ ranking.address }}</div>
    <div class="col-span-1 text-left">{{ ranking.balance }}</div>
  </a>
</template>

<script>
import { computed } from "vue";

export default {
  props: ["ranking", "rank"],
  setup(props) {
    const explorerAddress = computed(() => {
      return `https://rinkeby.etherscan.io/address/${props.ranking.address}`;
    });

    return { explorerAddress };
  },
};
</script>

<style></style>
