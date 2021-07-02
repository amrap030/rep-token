<template>
  <div
    class="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg  bg-custom-tertiary"
  >
    <div
      class="flex items-center justify-center flex-shrink-0 w-10 h-10 text-gray-300  sm:h-12 sm:w-12"
    >
      <div class="p-3 bg-yellow-500 rounded-md bg-opacity-10">
        <StarIcon class="w-5 h-5 text-yellow-400" />
      </div>
    </div>
    <div class="ml-4">
      <p class="text-sm font-medium text-gray-400">Ranking</p>
      <p class="text-sm text-gray-500">You are at rank # {{ getRank }}</p>
    </div>
  </div>
  <div
    class="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg  bg-custom-tertiary"
  >
    <div
      class="flex items-center justify-center flex-shrink-0 w-10 h-10 text-gray-300  sm:h-12 sm:w-12"
    >
      <div class="p-3 bg-yellow-500 rounded-md bg-opacity-10">
        <ArchiveIcon class="w-5 h-5 text-yellow-400" />
      </div>
    </div>
    <div class="ml-4">
      <p class="text-sm font-medium text-gray-400">Balance</p>
      <p class="text-sm text-gray-500">
        You currently hold
        {{ store.getters["user/getRepBalance"] }} REP Tokens
      </p>
    </div>
  </div>
  <div
    class="flex items-center p-2 -m-3 transition duration-150 ease-in-out rounded-lg  bg-custom-tertiary"
  >
    <div
      class="flex items-center justify-center flex-shrink-0 w-10 h-10 text-gray-300  sm:h-12 sm:w-12"
    >
      <div class="p-3 bg-yellow-500 rounded-md bg-opacity-10">
        <BadgeCheckIcon class="w-5 h-5 text-yellow-400" />
      </div>
    </div>
    <div class="ml-4">
      <p class="text-sm font-medium text-gray-400">Predictions</p>
      <p class="text-sm text-gray-500">
        {{
          store.getters["user/getPredictions"].filter(
            (prediction) => prediction.checked === true
          ).length
        }}
        of
        {{ store.getters["user/getPredictions"].length }} predictions evaluated
      </p>
    </div>
  </div>
</template>

<script>
import { StarIcon, ArchiveIcon, BadgeCheckIcon } from "@heroicons/vue/outline";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  components: { StarIcon, ArchiveIcon, BadgeCheckIcon },
  setup() {
    const store = useStore();

    const getRank = computed(() => {
      const index = store.getters["ranking/getRanking"].findIndex(
        (ranking) => ranking.address === store.getters["user/getAddress"]
      );
      return index + 1;
    });

    return { store, getRank };
  },
};
</script>

<style></style>
