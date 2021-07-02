<template>
  <transition-group name="notifications" tag="template">
    <li
      v-for="(notification, index) in store.getters[
        'notifications/getNotifications'
      ]"
      :key="index"
      :index="index"
      class="flex p-4"
    >
      <div
        class="flex items-center p-2 transition duration-150 ease-in-out rounded-lg  w-80 bg-custom-tertiary"
      >
        <div
          class="flex items-center justify-center flex-shrink-0 w-10 h-10 text-gray-300  sm:h-12 sm:w-12"
        >
          <div
            class="p-3 rounded-md bg-opacity-10"
            :class="
              notification.status === 'Success'
                ? 'bg-green-500 '
                : 'bg-red-500 '
            "
          >
            <CheckCircleIcon
              class="w-5 h-5 text-green-400"
              v-if="notification.status === 'Success'"
            />
            <FireIcon class="w-5 h-5 text-red-400" v-else />
          </div>
        </div>
        <div class="ml-4">
          <p class="text-sm font-medium text-gray-400">
            {{ notification.status }}
          </p>
          <p class="text-sm text-gray-500">{{ notification.message }}</p>
        </div>
      </div>
    </li>
  </transition-group>
</template>

<script>
import { CheckCircleIcon, FireIcon } from "@heroicons/vue/outline";
import { useStore } from "vuex";

export default {
  components: { CheckCircleIcon, FireIcon },
  setup() {
    const store = useStore();

    return { store };
  },
};
</script>

<style>
.notifications-enter-active {
  @apply transition transform duration-300 ease-out;
}
.notifications-enter-from {
  @apply -translate-x-4 opacity-0;
}
.notifications-enter-to {
  @apply translate-x-0 opacity-100;
}
</style>
