<template>
  <Listbox
    as="div"
    class="relative w-full space-y-1 bg-gray-800 rounded-lg"
    v-model="selectedStock"
    v-slot="{ open }"
  >
    <ListboxButton
      class="flex items-center justify-between w-full px-3 py-4 font-medium text-left  focus:outline-none"
      ><span class="text-gray-100 truncate">{{
        selectedStock.length > 0 ? selectedStock : "Select a stock..."
      }}</span>

      <ChevronDownIcon
        class="w-5 h-5 text-gray-100 transition duration-500 ease-in-out transform "
        :class="{
          'rotate-180': open,
        }"
      />
    </ListboxButton>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-out"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <ListboxOptions
        class="absolute w-full overflow-y-scroll font-medium text-gray-100 bg-gray-800 rounded-lg  focus:outline-none max-h-96"
      >
        <ListboxOption
          as="template"
          v-slot="{ active, selected }"
          v-for="symbol in symbols"
          :key="symbol.name"
          :value="symbol.name + ' - ' + symbol.description"
        >
          <li
            v-wave
            class="flex items-center justify-between px-3 py-4 cursor-pointer"
            :class="{ 'bg-purple-800 text-purple-200': active }"
          >
            <span class="truncate"
              >{{ symbol.name }} - {{ symbol.description }}</span
            >
            <CheckIcon v-show="selected" class="w-5 h-5" />
          </li>
        </ListboxOption>
      </ListboxOptions>
    </transition>
  </Listbox>
</template>

<script>
import { ref, onMounted } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronDownIcon } from "@heroicons/vue/solid";
import { getSymbols } from "../graphql/queries.js";
import { useApolloClient } from "../composables/useApolloClient.js";

export default {
  name: "StocksDropdown",
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    CheckIcon,
    ChevronDownIcon,
  },
  setup() {
    const apollo = useApolloClient();
    const symbols = ref([]);
    const selectedStock = ref([]);

    onMounted(async () => {
      const data = await apollo.client.query({
        query: getSymbols,
      });
      symbols.value = data.data.symbols;
    });

    return {
      selectedStock,
      symbols,
    };
  },
};
</script>
