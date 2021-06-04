import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./tailwind.css";
import VWave from "v-wave";

createApp(App).use(store).use(router).use(VWave).mount("#app");
