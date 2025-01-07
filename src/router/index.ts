import { createRouter, createWebHistory } from "vue-router";
import { type IStaticMethods } from "preline/preline";
import { useBaseStore } from "../stores/baseStore";
declare global {
  interface Window {
    HSStaticMethods: IStaticMethods;
  }
}
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "master",
      component: () => import("../views/MasterView.vue"),
      children: [
        {
          path: "/assign",
          name: "assign",
          component: () => import("../views/AssignView.vue"),
        },
        {
          path: "/recruitment",
          name: "recruitment",
          component: () => import("../views/RecruitmentView.vue"),
        },
      ],
    },
    {
      path: "/login",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/register",
      name: "register",
      component: () => import("../views/RegisterView.vue"),
    },
  ],
});
router.beforeEach((to, from, next) => {
  const baseStore = useBaseStore();

  if (to.path === "/login" || to.path === "/register") {
    baseStore.$state.dataLogin = null;
    next();
  } else if (baseStore.$state.dataLogin == null) {
    next({ path: "/login" });
  } else next();
});
router.afterEach((to, from, failure) => {
  if (!failure) {
    setTimeout(() => {
      window.HSStaticMethods.autoInit();
    }, 100);
  }
});

export default router;
