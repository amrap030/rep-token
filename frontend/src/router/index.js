import { createRouter, createWebHistory } from "vue-router";
import Home from "/src/views/Home.vue";
import StockDetails from "/src/views/StockDetails.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/stocks/:symbol",
    name: "StockDetails",
    component: StockDetails,
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
