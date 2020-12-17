import Session from '@/common/Session'
import Vue from 'vue'
import VueRouter, { NavigationGuardNext, Route, RouteConfig, RouteRecord } from 'vue-router'
import { component } from 'vue/types/umd'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to: Route, from: Route, next: NavigationGuardNext) => {
  const validate = (record: Route | RouteRecord, key: string) => {
    record = record === null ? to : record;

    return typeof record.meta[key] === "function" ? record.meta[key](to) : record.meta[key];
  }

  const requiredAuth: boolean = to.matched.some((r: RouteRecord) => validate(r, "requiredAuth"));
  const deniedAuth: boolean = to.matched.some((r: RouteRecord) => validate(r, "deniedAuth"));

  // if(localStorage.getItem('currentUser') != null){
  //   loggedIn = true;
  // }else{
  //   loggedIn = false;
  // }

  // if(to.name == 'Login' && loggedIn){
  //   next({name: 'Home'});
  // }else{
  //   next();
  // }

  if(requiredAuth && !Session.isLogin()) {
    return next({path: "/login"});
  } else if (Session.isLogin() && deniedAuth) {
    return next({path: "/"});
  }

  return next();
})

export default router
