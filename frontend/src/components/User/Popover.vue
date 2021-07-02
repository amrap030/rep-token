<template>
  <Popover class="relative">
    <PopoverButton
      class="flex items-center py-1 pl-3 pr-1 space-x-2 rounded-md  bg-custom-tertiary focus:outline-none focus-visible:ring-2 hover:text-gray-400 focus-visible:ring-yellow-500 focus-visible:ring-opacity-50"
    >
      <div>{{ store.getters["user/getEthBalance"] }} ETH</div>
      <div class="px-2 py-1 rounded-md bg-background">{{ getAddress }}</div>
    </PopoverButton>
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-1 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-1 opacity-0"
    >
      <PopoverPanel
        class="absolute right-0 z-10 px-4 mt-5 w-96 sm:px-0 lg:max-w-3xl"
      >
        <div
          class="overflow-hidden rounded-lg shadow-lg  ring-1 ring-black ring-opacity-5"
        >
          <div class="relative grid gap-8 bg-custom-secondary p-7">
            <PopoverContent />
          </div>
          <PopoverButtons />
        </div>
      </PopoverPanel>
    </transition>
  </Popover>
</template>

<script>
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/vue";
import PopoverButtons from "../User/PopoverButtons.vue";
import PopoverContent from "../User/PopoverContent.vue";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  components: {
    Popover,
    PopoverButton,
    PopoverButtons,
    PopoverContent,
    PopoverPanel,
  },
  setup() {
    const store = useStore();

    const getAddress = computed(() => {
      const ethAdress = store.getters["user/getAddress"];
      if (ethAdress) {
        return `${ethAdress.substring(0, 6)}...${ethAdress.substring(
          ethAdress.length - 4,
          ethAdress.length
        )}`;
      }
      return "";
    });

    return {
      store,
      getAddress,
    };
  },
};
</script>
