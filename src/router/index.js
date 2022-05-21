import Vue from 'vue'
import VueRouter from 'vue-router'
import {getToken} from "@/plugins/cookie";


Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'LoginView',
    component: () => import('../views/LoginView.vue')
  },
  {
    path: '/',
    name: 'Layout',
    component: () => import('../views/LayoutView.vue'),
    children: [
      {
        path: "/",
        redirect: "task",
      },
      {
        path: 'task',
        name: 'TaskLayoutView',
        component: () => import('../views/task/TaskLayoutView.vue'),
        children: [
          {
            path: "/",
            redirect: "activity",
          },
          {
            path: 'stat',
            name: 'StatView',
            component: () => import('../views/task/StatView.vue'),
          },
          {
            path: 'promo',
            name: 'PromoView',
            component: () => import('../views/task/PromoView.vue'),
          },
          {
            path: 'fans',
            name: 'FansView',
            component: () => import('../views/task/FansView.vue'),
          },
          {
            path: 'activity',
            name: 'ActivityView',
            component: () => import('../views/task/ActivityView.vue'),
            children: [
              {
                path: "/",
                redirect: "list",
              },
              {
                path: 'list',
                name: 'ActivityListView',
                component: () => import('../views/task/ActivityListView.vue'),
              },
              {
                path: 'create',
                name: 'ActivityCreateView',
                component: () => import('../views/task/ActivityCreateView.vue'),
              },
            ]
          },


        ]
      },
      {
        path: 'msg',
        name: 'MsgLayoutView',
        component: () => import('../views/message/MsgLayoutView.vue'),
        children: [
          {
            path: "/",
            redirect: "push"
          },
          {
            path: 'push',
            name: 'PushView',
            component: () => import('../views/message/PushView.vue')
          },
          {
            path: 'sop',
            name: 'SopView',
            component: () => import('../views/message/SopView.vue')
          },
        ]
      },
      {
        path: 'auth',
        name: 'AuthView',
        component: () => import('../views/auth/AuthView.vue')
      },
    ]
  },
  {
    path: '/*',
    component: () => import('../views/NotFoundView.vue')
  }
]

const router = new VueRouter({
  routes,
  mode: "history"
})


router.beforeEach((to, from ,next) =>{
  let token = getToken();
  // 如果已登录，就继续
  if (token) {
    next();
    return;
  }
  // 未登录，但是访问登录界面
  if (to.name === "LoginView") {
    next();
    return;
  }
  // 未登录去登录
  next({name: "LoginView"});
})

export default router
