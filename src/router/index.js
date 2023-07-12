import { createRouter, createWebHashHistory } from 'vue-router';

import HomeView from '../views/HomeView.vue';
import KnifeView from '../views/KnifeView.vue';
import WikiView from '../views/WikiView.vue';
import MoreView from '../views/MoreView.vue';
import IndexView from '../views/IndexView.vue';

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: IndexView,
      children: [
        {
          path: "/home",
          component:HomeView,
        },
        {
          path: "/knife",
          component:KnifeView,
        },
        {
          path: "/wiki",
          component:WikiView,
        },
        {
          path: "/more",
          component:MoreView,
        },
      ],
      redirect: "/home", //页面默认加载的路由
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
})

export default router
