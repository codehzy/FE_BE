import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  // 登录页
  {
    path: "/",
    name: "login",
    component: () => import("../views/login/login.vue"),
  },
  // 首页
  {
    path: "/chatUser",
    name: "chatUser",
    meta: {
      requireAuth: true,
    },
    component: () => import("../views/chatUser/chatUser.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requireAuth)) {
    // 判断该路由是否需要登录权限
    if (localStorage.getItem("token")) {
      // 判断当前的token是否存在 ； 登录存入的token
      if (to.path === "/") {
        localStorage.removeItem("token");
        window.location.reload();
      } else {
        next();
      }
    } else {
      next({
        path: "/",
      });
    }
  } else {
    next();
  }
});

export default router;
