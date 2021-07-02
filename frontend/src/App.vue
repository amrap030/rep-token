<template>
  <div class="w-full h-full pb-20 pt-36">
    <div class="fixed top-0 z-40 w-full">
      <Banner />
      <Navbar @select="setSelected" />
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

export default {
  components: { Banner, Navbar, BlockInfo },
  setup() {
    const selected = ref("");

    const setSelected = (sel) => {
      selected.value = sel;
    };

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
