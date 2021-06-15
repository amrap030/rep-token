import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./tailwind.css";
import VWave from "v-wave";
import { useApolloClient } from "../src/composables/useApolloClient.js";

const app = createApp(App).use(store).use(router).use(VWave);
app.config.globalProperties.$apollo = useApolloClient();
app.mount("#app");

export { store };
