<template>
  <div class="p-4 text-gray-300 rounded-lg bg-custom-secondary">
    <div class="grid grid-cols-8 gap-1 pb-4 border-b border-gray-800 max-w-7xl">
      <div class="font-medium font-">Symbol</div>
      <div class="font-medium">Name</div>
      <div class="font-medium text-right">High</div>
      <div class="font-medium text-right">Low</div>
      <div class="font-medium text-right">Open</div>
      <div class="font-medium text-right">Close</div>
      <div class="font-medium text-right">Change</div>
      <div class="font-medium text-right">Percent</div>
    </div>

    <div v-for="quote in filteredQuotes" :key="quote.symbol">
      <div
        v-wave
        class="grid grid-cols-8 gap-1 py-4 font-light text-gray-300 border-b border-gray-800 cursor-pointer  hover:text-gray-400 max-w-7xl whitespace-nowrap"
      >
        <div>
          {{ quote.symbol }}
        </div>
        <div class="truncate">
          {{ quote.name }}
        </div>
        <div class="text-right">&#8364; {{ quote.high }}</div>
        <div class="text-right">&#8364; {{ quote.low }}</div>
        <div class="text-right">&#8364; {{ quote.open }}</div>
        <div class="text-right">&#8364; {{ quote.close }}</div>
        <div class="text-right">
          {{ quote.change }}
        </div>
        <div
          class="text-right"
          :class="
            quote.change_percent < 0 ? ' text-red-500' : ' text-green-500'
          "
        >
          &#037; {{ quote.change_percent }}
        </div>
      </div>
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
        <ChevronRightIcon
          class="w-5 h-5 cursor-pointer"
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
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/vue/solid";
import { allQuotes } from "../graphql/subscriptions.js";

export default {
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
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
