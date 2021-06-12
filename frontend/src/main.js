import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./tailwind.css";
import VWave from "v-wave";
import VTooltip from "v-tooltip";
import "v-tooltip/dist/v-tooltip.css";
import { useApolloClient } from "../src/composables/useApolloClient.js";

const app = createApp(App).use(store).use(router).use(VWave).use(VTooltip);
app.config.globalProperties.$apollo = useApolloClient();
app.mount("#app");
