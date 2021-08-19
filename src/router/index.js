import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import store from '../store';

Vue.use(VueRouter);

const ifUserAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/login');
};
const ifUserNotAuthenticated = async (to, from, next) => {
  if (await !store.getters.isAuthenticated) {
    next();
    return;
  }
  next('/');
};

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/components/Login.vue'),
    beforeEnter: ifUserNotAuthenticated,
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/components/Register.vue'),
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import(/* webpackChunkName: "about" */ '@/components/Account.vue'),
    beforeEnter: ifUserAuthenticated,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
