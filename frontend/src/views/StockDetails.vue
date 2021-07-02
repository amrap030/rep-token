<template>
  <div class="flex flex-col p-4 mx-auto max-w-7xl md:p-0">
    <div class="z-10 font-medium text-gray-300 mt-6text-base">
      <span class="text-gray-400"
        ><router-link
          :to="{ name: 'Home' }"
          class="hover:text-gray-300"
          @click.prevent="emit('stockSelected', '')"
          >Home</router-link
        >
        > Symbols ></span
      >
      {{ symbol }}
    </div>
    <div
      class="z-10 flex flex-col justify-between mt-6 space-y-2  md:space-y-0 md:flex-row"
    >
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
                :class="
                  Math.round(
                    quotes[0].quotes[quotes[0].quotes.length - 1]
                      .change_percent * 100
                  ) /
                    100 <
                  0
                    ? ''
                    : 'transform rotate-180'
                "
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
        <router-link
          :to="{ name: 'Home' }"
          v-wave
          class="z-10 px-6 py-2 text-blue-100 bg-blue-600 rounded-lg  hover:bg-blue-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          @click.prevent="
            emit('stockSelected', {
              symbol,
              price: Number(
                quotes[0].quotes[quotes[0].quotes.length - 1].close
              ).toFixed(2),
            })
          "
        >
          Predict
        </router-link>
      </div>
    </div>
    <div
      class="z-10 flex flex-col mt-4 space-y-4  md:flex-row md:space-y-0 md:space-x-4"
    >
      <QuotesSkeleton
        v-if="(quotes[0] && quotes[0].quotes.length < 2) || !quotes.length"
      />
      <Quotes
        v-if="quotes[0] && quotes[0].quotes.length > 1"
        :quotes="quotes[0].quotes[quotes[0].quotes.length - 1]"
      />
      <CandleChart :symbol="symbol" :quotes="quotes" />
    </div>
  </div>
</template>

<script>
import CandleChart from "../components/Charts/CandleChart.vue";
import Quotes from "../components/Quotes/Quotes.vue";
import QuotesSkeleton from "../components/Quotes/QuotesSkeleton.vue";
import { ref, getCurrentInstance } from "vue";
import { filteredQuotes } from "../graphql/subscriptions.js";
import { ArrowDownIcon } from "@heroicons/vue/solid";
import { useStore } from "vuex";

export default {
  props: ["symbol"],
  components: { CandleChart, Quotes, QuotesSkeleton, ArrowDownIcon },
  setup(props, { emit }) {
    const store = useStore();
    const app = getCurrentInstance();
    const $apollo = app.appContext.config.globalProperties.$apollo;
    const quote = store.getters["quotes/getQuotes"].quotes.find(
      (quote) => quote.symbol === props.symbol
    );
    const quotes = ref(
      quote
        ? [
            {
              description: quote.name,
              name: quote.symbol,
              quotes: [
                { close: quote.close, change_percent: quote.change_percent },
              ],
            },
          ]
        : []
    );

    const quoteObserver = $apollo.client.subscribe({
      query: filteredQuotes,
      variables: {
        symbol: props.symbol,
      },
    });

    quoteObserver.subscribe({
      next(data) {
        quotes.value = data.data.symbols;
      },
      error(error) {
        console.error(error);
      },
    });
    return { quotes, emit };
  },
};
</script>

<style></style>
