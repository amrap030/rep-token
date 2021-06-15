<template>
  <div
    class="flex flex-col w-full p-4 space-y-4  md:w-64 bg-custom-secondary rounded-xl"
  >
    <div class="spaxe-y-0.5">
      <div class="text-gray-500">Open</div>
      <div class="text-2xl font-medium text-gray-200">
        &#8364; {{ Number(quotes.open).toFixed(2) }}
      </div>
    </div>
    <div class="spaxe-y-0.5">
      <div class="text-gray-500">High</div>
      <div class="text-2xl font-medium text-gray-200">
        &#8364; {{ Number(quotes.high).toFixed(2) }}
      </div>
    </div>
    <div class="spaxe-y-0.5">
      <div class="text-gray-500">Low</div>
      <div class="text-2xl font-medium text-gray-200">
        &#8364; {{ Number(quotes.low).toFixed(2) }}
      </div>
    </div>
    <div class="spaxe-y-0.5">
      <div class="text-gray-500">Close</div>
      <div class="text-2xl font-medium text-gray-200">
        &#8364; {{ Number(quotes.close).toFixed(2) }}
      </div>
      <div
        :class="
          Math.round(quotes.change_percent * 100) / 100 < 0
            ? ' text-red-500 group-hover:text-red-700'
            : ' text-green-500 group-hover:text-green-700'
        "
      >
        <span class="flex items-center justify-start"
          ><ArrowDownIcon
            v-if="Math.round(quotes.change_percent * 100) / 100 !== 0"
            class="inline-block w-4 h-4"
            :class="
              Math.round(quotes.change_percent * 100) / 100 < 0
                ? ''
                : 'transform rotate-180'
            "
          />&nbsp;{{ Number(quotes.change_percent).toFixed(2) }} &#037;
        </span>
      </div>
    </div>
    <div class="spaxe-y-0.5">
      <div class="text-gray-500">Volume</div>
      <div class="text-2xl font-medium text-gray-200">
        {{ quotes.volume }}
      </div>
    </div>
  </div>
</template>

<script>
import { ArrowDownIcon } from "@heroicons/vue/solid";

export default {
  props: ["quotes"],
  components: { ArrowDownIcon },
  setup() {},
};
</script>

<style></style>
