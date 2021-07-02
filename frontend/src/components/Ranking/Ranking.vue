<template>
  <StocksTableSkeleton v-if="store.getters['ranking/getIsLoading']" />
  <div
    v-else
    class="p-4 text-gray-300 rounded-2xl bg-custom-secondary max-w-7xl"
  >
    <div
      class="grid grid-cols-8 gap-1 pb-4 border-b border-gray-800  border-opacity-30 max-w-7xl"
    >
      <div class="col-span-2 font-medium">Rank</div>
      <div class="col-span-5 font-medium text-left">Address</div>
      <div class="col-span-1 font-medium text-left">
        Balance
        <span class="text-gray-500 group-hover:text-gray-700">(REP)</span>
      </div>
    </div>

    <div v-if="sortedRankings.length > 0">
      <div
        v-for="(ranking, index) in sortedRankings"
        :key="ranking.address"
        :index="index"
      >
        <RankingsRow :ranking="ranking" :rank="index" />
      </div>
    </div>
    <div
      class="grid grid-cols-8 gap-1 py-4 border-b border-gray-800  border-opacity-30 max-w-7xl"
      v-else
    >
      <div
        class="flex items-center justify-center col-span-8 font-light text-gray-400 "
      >
        No users available!
      </div>
    </div>
    <div
      class="flex items-center justify-center pt-4 space-x-4 text-center  max-w-7xl"
    >
      <button
        class="rounded-md  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900"
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
      <div class="text-gray-400">
        Page {{ page }} of
        {{ Math.ceil(store.getters["ranking/getRanking"].length / 10) }}
      </div>
      <button
        class="rounded-md  focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-900"
        :disabled="
          page === Math.ceil(store.getters['ranking/getRanking'].length / 10)
            ? true
            : false
        "
        @click.prevent="page++"
      >
        <ChevronLeftIcon
          class="w-5 h-5 transform rotate-180 cursor-pointer"
          :class="
            page === Math.ceil(store.getters['ranking/getRanking'].length / 10)
              ? 'cursor-not-allowed text-gray-700'
              : 'text-blue-600'
          "
        />
      </button>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from "@heroicons/vue/solid";
import { useStore } from "vuex";
import RankingsRow from "./RankingsRow.vue";
import { ref, computed } from "vue";
import StocksTableSkeleton from "../StocksTable/StocksTableSkeleton.vue";

export default {
  components: { ChevronLeftIcon, RankingsRow, StocksTableSkeleton },
  setup() {
    const page = ref(1);
    const store = useStore();

    const sortedRankings = computed(() => {
      const start = page.value * 10 - 10;
      const end = page.value * 10;
      const rankings = store.getters["ranking/getRanking"];
      if (rankings.length) {
        return rankings
          .slice()
          .sort((a, b) => a.balance - b.balance)
          .slice(start, end);
      }
      return "";
    });

    return { page, store, sortedRankings };
  },
};
</script>

<style></style>
