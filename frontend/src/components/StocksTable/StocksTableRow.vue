<template>
  <router-link
    :to="{
      name: 'StockDetails',
      params: { symbol: quote.symbol },
    }"
  >
    <div
      class="grid grid-cols-7 gap-1 py-4 text-gray-300 border-b border-gray-800 cursor-pointer  border-opacity-30 group hover:text-gray-400 max-w-7xl whitespace-nowrap"
    >
      <div class="truncate">
        {{ quote.name }}
        <span class="text-gray-500 group-hover:text-gray-700"
          >({{ quote.symbol }})</span
        >
      </div>
      <div class="text-right">&#8364; {{ Number(quote.high).toFixed(2) }}</div>
      <div class="text-right">&#8364; {{ Number(quote.open).toFixed(2) }}</div>
      <div class="text-right">&#8364; {{ Number(quote.low).toFixed(2) }}</div>
      <div class="text-right">&#8364; {{ Number(quote.close).toFixed(2) }}</div>
      <div
        class="text-right"
        :class="
          Math.round(quote.change * 100) / 100 < 0
            ? ' text-red-500 group-hover:text-red-700'
            : ' text-green-500 group-hover:text-green-700'
        "
      >
        <span class="flex items-center justify-end">
          <ArrowDownIcon
            v-if="Math.round(quote.change * 100) / 100 !== 0"
            class="inline-block w-4 h-4"
            :class="
              Math.round(quote.change * 100) / 100 < 0
                ? ''
                : 'transform rotate-180'
            "
          />
          &nbsp;{{ Number(quote.change).toFixed(2) }}
        </span>
      </div>
      <div
        class="text-right"
        :class="
          Math.round(quote.change_percent * 100) / 100 < 0
            ? ' text-red-500 group-hover:text-red-700'
            : ' text-green-500 group-hover:text-green-700'
        "
      >
        <span class="flex items-center justify-end"
          ><ArrowDownIcon
            v-if="Math.round(quote.change_percent * 100) / 100 !== 0"
            class="inline-block w-4 h-4"
            :class="
              Math.round(quote.change_percent * 100) / 100 < 0
                ? ''
                : 'transform rotate-180'
            "
          />&nbsp;{{ Number(quote.change_percent).toFixed(2) }} &#037;
        </span>
      </div>
    </div>
  </router-link>
</template>

<script>
import { ArrowDownIcon } from "@heroicons/vue/solid";

export default {
  components: { ArrowDownIcon },
  props: ["quote"],
};
</script>

<style></style>
