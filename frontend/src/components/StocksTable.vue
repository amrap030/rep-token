<template>
  <div class="p-4 text-gray-300 rounded-2xl bg-custom-secondary">
    <div class="grid grid-cols-7 gap-1 pb-4 border-b border-gray-800 max-w-7xl">
      <div class="font-medium">Name</div>
      <div class="font-medium text-right">High</div>
      <div class="font-medium text-right">Low</div>
      <div class="font-medium text-right">Open</div>
      <div class="font-medium text-right">Close</div>
      <div class="font-medium text-right">Change</div>
      <div class="font-medium text-right">Percent</div>
    </div>

    <div v-for="quote in filteredQuotes" :key="quote.symbol">
      <router-link
        :to="{ name: 'StockDetails', params: { symbol: quote.symbol } }"
      >
        <div
          class="relative grid grid-cols-7 gap-1 py-4 text-gray-300 border-b border-gray-800 cursor-pointer  group hover:text-gray-400 max-w-7xl whitespace-nowrap"
        >
          <div
            class="truncate"
            v-tooltip="{
              content: quote.name,
              delay: { show: 0, hide: 0 },
              placement: 'bottom',
            }"
          >
            {{ quote.name }}
            <span class="text-gray-500 group-hover:text-gray-700"
              >({{ quote.symbol }})</span
            >
          </div>
          <div class="text-right">
            &#8364; {{ Math.round(quote.high * 100) / 100 }}
          </div>
          <div class="text-right">
            &#8364; {{ Math.round(quote.low * 100) / 100 }}
          </div>
          <div class="text-right">
            &#8364; {{ Math.round(quote.open * 100) / 100 }}
          </div>
          <div class="text-right">
            &#8364; {{ Math.round(quote.close * 100) / 100 }}
          </div>
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
              &nbsp;{{ Math.round(quote.change * 100) / 100 }}
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
              />&nbsp;{{ Math.round(quote.change_percent * 100) / 100 }} &#037;
            </span>
          </div>
        </div>
      </router-link>
    </div>
    <div
      class="flex items-center justify-center pt-4 space-x-4 text-center  max-w-7xl"
    >
      <button
        class="rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
        :disabled="page === 1 ? true : false"
        @click.prevent="page--"
      >
        <ChevronLeftIcon
          class="w-5 h-5 cursor-pointer"
          :class="
            page === 1 ? 'cursor-not-allowed text-gray-700' : 'text-blue-600'
          "
        />
      </button>
      <div>Page {{ page }} of 3</div>
      <button
        class="rounded-md focus:outline-none focus:ring-2 focus:ring-blue-900"
        :disabled="page === 3 ? true : false"
        @click.prevent="page++"
      >
        <ChevronLeftIcon
          class="w-5 h-5 transform rotate-180 cursor-pointer"
          :class="
            page === 3 ? 'cursor-not-allowed text-gray-700' : 'text-blue-600'
          "
        />
      </button>
    </div>
  </div>
</template>

<script>
import { useApolloClient } from "../composables/useApolloClient.js";
import { ref, computed } from "vue";
import { ChevronLeftIcon, ArrowDownIcon } from "@heroicons/vue/solid";
import { allQuotes } from "../graphql/subscriptions.js";

export default {
  components: {
    ChevronLeftIcon,
    ArrowDownIcon,
  },
  setup() {
    const page = ref(1);
    const quotes = ref([]);
    const apollo = useApolloClient();

    const observer = apollo.client.subscribe({
      query: allQuotes,
    });

    observer.subscribe({
      next(data) {
        quotes.value = data.data.quotes;
      },
      error(error) {
        console.error(error);
      },
    });

    const filteredQuotes = computed(() => {
      const start = page.value * 10 - 10;
      const end = page.value * 10;
      return quotes.value
        .slice()
        .sort((a, b) => a.name.localeCompare(b.name))
        .slice(start, end);
    });

    return {
      filteredQuotes,
      page,
    };
  },
};
</script>

<style></style>
