<template>
  <div class="w-full h-full pb-20 pt-36">
    <div class="fixed top-0 z-40 w-full">
      <Banner />
      <Navbar />
    </div>
    <div class="background"></div>
    <router-view
      @stockSelected="setSelected"
      :selected="selected"
      class="w-full"
    />
    <BlockInfo />
  </div>
</template>

<script>
import { ref } from "vue";
import Banner from "./components/UX/Banner.vue";
import Navbar from "./components/Navigation/Navbar.vue";
import BlockInfo from "./components/Ethereum/BlockInfo.vue";
import initWeb3 from "./composables/useWeb3.js";

export default {
  components: { Banner, Navbar, BlockInfo },
  setup() {
    const selected = ref("");
    const { init } = initWeb3();

    const setSelected = (sel) => {
      selected.value = sel;
    };

    init();

    return { selected, setSelected };
  },
};
</script>

<style>
body {
  @apply bg-background;
}

.background {
  background: radial-gradient(
    60% 50% at 50% 45%,
    rgb(252 7 154) 50%,
    rgb(0 0 0 / 0%) 100%
  );
  position: absolute;
  top: 0px;
  left: 0px;
  right: 0px;
  pointer-events: none;
  height: 200vh;
  mix-blend-mode: color;
  transform: translateY(-150vh);
  max-width: 100vw !important;
}
</style>
