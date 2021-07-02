<template>
  <div class="flex flex-col items-center justify-center">
    <div
      class="z-10 w-full max-w-lg p-4 space-y-4 rounded-2xl bg-custom-secondary"
    >
      <StocksDropdown @stockSelected="setPriceAndDate" :selected="selected" />
      <div class="flex space-x-2">
        <div class="w-full">
          <label class="sr-only">Price</label>
          <div
            class="flex w-full px-3 py-4 font-medium text-left text-gray-100 rounded-lg  bg-custom-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-opacity-50"
            tabindex="0"
          >
            <input
              id="price"
              type="number"
              step="0.01"
              min="0"
              v-model="price"
              class="w-full bg-gray-800  sm:text-sm sm:leading-5 focus:outline-none"
              placeholder="Price"
              tabindex="-1"
            />
            <label for="price"><CurrencyDollarIcon class="w-5 h-5" /></label>
          </div>
        </div>
        <div class="w-full">
          <label class="sr-only">Date</label>
          <div
            class="relative flex items-center w-full px-3 py-4 font-medium text-left text-gray-100 rounded-lg  bg-custom-tertiary focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-opacity-50"
            tabindex="0"
          >
            <input
              id="calendar"
              type="text"
              v-model="date"
              class="w-full h-5 bg-gray-800  sm:text-sm sm:leading-5 disabled focus:outline-none"
              placeholder="Date"
              onfocus="(this.type='datetime-local')"
              tabindex="-1"
            />
            <label for="calendar"><CalendarIcon class="w-5 h-5" /></label>
          </div>
        </div>
      </div>
      <div class="flex">
        <Button :data="{ date, price, symbol: smbl, ...selected }" />
      </div>
      <GasPrices v-if="store.getters['user/getAddress']" />
    </div>
    <div class="w-full mt-16 max-w-7xl"><StocksTable /></div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import StocksDropdown from "../components/Predictions/StocksDropdown.vue";
import StocksTable from "../components/StocksTable/StocksTable.vue";
import Button from "../components/Predictions/Button.vue";
import GasPrices from "../components/Predictions/GasPrices.vue";
import { CurrencyDollarIcon, CalendarIcon } from "@heroicons/vue/solid";

export default {
  name: "Home",
  components: {
    StocksDropdown,
    StocksTable,
    CurrencyDollarIcon,
    CalendarIcon,
    Button,
    GasPrices,
  },
  props: ["selected"],
  setup(props) {
    const store = useStore();
    const price = ref(props.selected ? props.selected.price : "");
    const date = ref(
      props.selected
        ? new Date().toISOString().substring(0, 11) +
            new Date().toLocaleTimeString().substring(0, 5)
        : ""
    );
    const smbl = ref("");
    const route = useRoute();

    const setPriceAndDate = (symbol) => {
      smbl.value = symbol;
      date.value =
        new Date().toISOString().substring(0, 11) +
        new Date().toLocaleTimeString().substring(0, 5);
      price.value = Number(
        store.getters["quotes/getQuotes"].quotes.find(
          (quote) => quote.symbol === symbol
        ).close
      ).toFixed(2);
    };

    return {
      price,
      date,
      route,
      smbl,
      setPriceAndDate,
      store,
    };
  },
};
</script>

<style scoped>
input[type="datetime-local"]::-webkit-inner-spin-button,
input[type="datetime-local"]::-webkit-calendar-picker-indicator {
  position: absolute;
  margin-right: 0.7rem;
  color: transparent;
  background: transparent;
  right: 0;
  -webkit-appearance: none;
}
</style>
