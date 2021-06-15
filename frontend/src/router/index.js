import { createRouter, createWebHistory } from "vue-router";
import Home from "/src/views/Home.vue";
import StockDetails from "/src/views/StockDetails.vue";

const routes = [
  {
    path: "/",
    redirect: "/predict",
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/predict",
  },
  {
    path: "/predict",
    name: "Home",
    component: Home,
  },
  {
    path: "/symbols/:symbol",
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
