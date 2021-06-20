<template>
  <StocksTableSkeleton
    v-if="store.getters['quotes/getQuotes'].quotes.length === 0"
  />
  <div
    v-else
    class="p-4 text-gray-300 rounded-2xl bg-custom-secondary max-w-7xl"
  >
    <div class="grid grid-cols-7 gap-1 pb-4 border-b border-gray-800 max-w-7xl">
      <div class="font-medium">Name</div>
      <div class="font-medium text-right">High</div>
      <div class="font-medium text-right">Open</div>
      <div class="font-medium text-right">Low</div>
      <div class="font-medium text-right">Close</div>
      <div class="font-medium text-right">Change</div>
      <div class="font-medium text-right">Percent</div>
    </div>

    <div v-for="quote in filteredQuotes" :key="quote.symbol">
      <StocksTableRow :quote="quote" />
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
      <div class="text-gray-400">Page {{ page }} of 3</div>
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
import { useStore } from "vuex";
import { ref, computed, getCurrentInstance } from "vue";
import { ChevronLeftIcon } from "@heroicons/vue/solid";
import { allQuotes } from "../../graphql/subscriptions.js";
import StocksTableSkeleton from "./StocksTableSkeleton.vue";
import StocksTableRow from "./StocksTableRow.vue";

export default {
  components: {
    ChevronLeftIcon,
    StocksTableRow,
    StocksTableSkeleton,
  },
  setup() {
    const store = useStore();
    const page = ref(1);
    const app = getCurrentInstance();
    const $apollo = app.appContext.config.globalProperties.$apollo;

    const observer = $apollo.client.subscribe({
      query: allQuotes,
    });

    observer.subscribe({
      next(data) {
        store.commit("quotes/SET_QUOTES", data.data.quotes);
      },
      error(error) {
        console.error(error);
      },
    });

    const filteredQuotes = computed(() => {
      const start = page.value * 10 - 10;
      const end = page.value * 10;
      const quotes = store.getters["quotes/getQuotes"].quotes;
      if (quotes.length) {
        return quotes
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .slice(start, end);
      }
      return "";
    });

    return {
      filteredQuotes,
      page,
      store,
    };
  },
};
</script>
