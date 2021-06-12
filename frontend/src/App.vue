<template>
  <div class="w-screen h-screen pt-12">
    <div class="background"></div>
    <router-view />
  </div>
</template>

<style>
body {
  @apply bg-background;
}

.background {
  background: radial-gradient(
    50% 50% at 50% 50%,
    rgb(11 7 252 / 51%) 50%,
    rgba(255, 255, 255, 0) 100%
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
