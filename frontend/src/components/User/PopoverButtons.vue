<template>
  <div
    class="flex items-center justify-between p-5 text-sm bg-blue-600 bg-opacity-50 "
  >
    <button
      @click.prevent="copyToClipboard"
      class="flex items-center px-2 py-1 space-x-1 text-gray-200 rounded  focus:outline-none focus-visible:ring focus-visible:ring-yellow-500 focus-visible:ring-opacity-50 hover:text-gray-400"
    >
      <ClipboardCopyIcon class="w-5 h-5" />
      <span>Copy Address</span>
    </button>
    <a
      :href="explorerAddress"
      target="_blank"
      class="flex items-center px-2 py-1 space-x-1 text-gray-200 rounded  focus:outline-none focus-visible:ring focus-visible:ring-yellow-500 focus-visible:ring-opacity-50 hover:text-gray-400"
    >
      <ExternalLinkIcon class="w-5 h-5" />
      <span>View on explorer</span>
    </a>
  </div>
</template>

<script>
import { ClipboardCopyIcon, ExternalLinkIcon } from "@heroicons/vue/outline";
import { useStore } from "vuex";
import { computed } from "vue";

export default {
  components: {
    ClipboardCopyIcon,
    ExternalLinkIcon,
  },
  setup() {
    const store = useStore();

    const copyToClipboard = () => {
      let dummy = document.createElement("textarea");
      document.body.appendChild(dummy);
      dummy.value = store.getters["user/getAddress"];
      dummy.select();
      document.execCommand("copy");
      document.body.removeChild(dummy);
    };

    const explorerAddress = computed(() => {
      if (store.getters["user/getAddress"]) {
        return `${store.getters["user/getNetwork"].explorer}/address/${store.getters["user/getAddress"]}`;
      }
      return "";
    });

    return {
      copyToClipboard,
      explorerAddress,
    };
  },
};
</script>

<style></style>
