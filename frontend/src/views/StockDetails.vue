<template>
  <div class="flex flex-col mx-auto max-w-7xl">
    <div class="font-medium text-gray-300 mt-6text-base">
      <span class="text-gray-400">Home > Stocks ></span> {{ symbol }}
    </div>
    <div class="flex justify-between mt-6">
      <div class="flex flex-col text-base">
        <div v-if="quotes.length" class="text-xl text-gray-200">
          {{ quotes[0].description }}
          <span class="text-gray-500">({{ quotes[0].name }})</span>
        </div>
        <div v-if="quotes.length" class="flex items-end mt-1 space-x-2">
          <div class="text-4xl text-gray-200">
            &#8364;
            {{
              Number(
                quotes[0].quotes[quotes[0].quotes.length - 1].close
              ).toFixed(2)
            }}
          </div>
          <div class="flex items-center text-gray-200">
            (
            <div
              class="flex items-center"
              :class="
                Math.round(
                  quotes[0].quotes[quotes[0].quotes.length - 1].change_percent *
                    100
                ) /
                  100 <
                0
                  ? ' text-red-500 '
                  : ' text-green-500'
              "
            >
              <ArrowDownIcon
                v-if="
                  Math.round(
                    quotes[0].quotes[quotes[0].quotes.length - 1]
                      .change_percent * 100
                  ) /
                    100 !==
                  0
                "
                class="w-4 h-4"
              />&nbsp;
              <div>
                {{
                  Number(
                    quotes[0].quotes[quotes[0].quotes.length - 1].change_percent
                  ).toFixed(2)
                }}
                &#037;
              </div>
            </div>
            )
          </div>
        </div>
      </div>
      <div class="flex items-end">
        <button
          v-wave
          class="px-6 py-2 text-blue-100 bg-blue-600 rounded-lg  hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
          Predict
        </button>
      </div>
    </div>
    <div class="z-10 flex mt-4 space-x-4">
      <Quotes
        v-if="quotes.length"
        :quotes="quotes[0].quotes[quotes[0].quotes.length - 1]"
      />

      <Chart :symbol="symbol" :quotes="quotes" />
    </div>
  </div>
</template>

<script>
import Chart from "../components/Chart.vue";
import Quotes from "../components/Quotes.vue";
import { ref, getCurrentInstance } from "vue";
import { filteredQuotes } from "../graphql/subscriptions.js";
import { ArrowDownIcon } from "@heroicons/vue/solid";

export default {
  props: ["symbol"],
  components: { Chart, Quotes, ArrowDownIcon },
  setup(props) {
    const app = getCurrentInstance();
    const $apollo = app.appContext.config.globalProperties.$apollo;
    const quotes = ref([]);

    const quoteObserver = $apollo.client.subscribe({
      query: filteredQuotes,
      variables: {
        symbol: props.symbol,
      },
    });

    quoteObserver.subscribe({
      next(data) {
        quotes.value = data.data.symbols;
        console.log(quotes.value);
      },
      error(error) {
        console.error(error);
      },
    });
    return { quotes };
  },
};
</script>

<style></style>
