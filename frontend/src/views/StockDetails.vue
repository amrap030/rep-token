<template>
  <div class="flex flex-col mx-auto space-y-12 max-w-7xl">
    <div class="text-base font-normal text-gray-300">
      <span class="text-gray-400">Home > Stocks ></span> {{ symbol }}
    </div>
    <div class="z-10 flex">
      <Chart :symbol="symbol" />
    </div>
  </div>
</template>

<script>
import Chart from "../components/Chart.vue";

export default {
  props: ["symbol"],
  components: { Chart },
  setup() {
    return {};
  },
};
</script>

<style>
.tv-lightweight-charts {
  margin: auto !important;
  @apply transform -translate-y-4;
}
</style>
