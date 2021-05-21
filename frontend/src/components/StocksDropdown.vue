<template>
  <Listbox
    as="div"
    class="relative w-full space-y-1"
    v-model="selectedStock"
    v-slot="{ open }"
  >
    <ListboxButton
      class="flex items-center justify-between w-full px-3 py-4 font-medium text-left text-gray-900 border rounded-lg  focus:outline-none"
      ><span>{{
        selectedStock.length > 0 ? selectedStock : "Select a stock..."
      }}</span>

      <ChevronDownIcon
        class="w-5 h-5 text-gray-800 transition duration-500 ease-in-out transform "
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
        class="absolute w-full overflow-hidden font-medium bg-white border rounded-lg  focus:outline-none"
      >
        <ListboxOption
          as="template"
          v-slot="{ active, selected }"
          v-for="stock in stocks"
          :key="stock.id"
          :value="stock.name"
        >
          <li
            class="flex items-center justify-between px-3 py-4 cursor-pointer"
            :class="{ 'bg-pink-100 text-pink-600': active }"
          >
            <span>{{ stock.name }}</span>
            <CheckIcon v-show="selected" class="w-5 h-5" />
          </li>
        </ListboxOption>
      </ListboxOptions>
    </transition>
  </Listbox>
</template>

<script>
import { ref } from "vue";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
} from "@headlessui/vue";
import { CheckIcon, ChevronDownIcon } from "@heroicons/vue/solid";

export default {
  components: {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
    CheckIcon,
    ChevronDownIcon,
  },

  setup() {
    const stocks = [
      { id: 1, name: "adidas" },
      { id: 2, name: "Allianz" },
      { id: 3, name: "BASF" },
      { id: 4, name: "Bayer" },
      { id: 5, name: "BMW" },
    ];
    const selectedStock = ref([]);

    return {
      stocks,
      selectedStock,
    };
  },
};
</script>
