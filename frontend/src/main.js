import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./tailwind.css";
import VWave from "v-wave";
import VTooltip from "v-tooltip";
import "v-tooltip/dist/v-tooltip.css";

createApp(App).use(store).use(router).use(VWave).use(VTooltip).mount("#app");
