import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

import AboutView from "../views/AboutView.vue";
import LoginRegistrationView from "@/views/LoginRegistrationView.vue";

const routes = [
  // {
  //   path: '/',
  //   name: 'home',
  //   component: HomeView
  // },
  {
    path: "/",
    name: "LoginRegistration",
    component: LoginRegistrationView
  },
  {
    path: "/about",
    name: "about",
    component: AboutView,
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () =>
    //   import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
  {
    path: "/productCategories",
    name: "productCategories",
    component: () => import("../views/ProductCategoriesView.vue")
  },
  {
    path: "/addNewProductCategory",
    name: "addNewProductCategory",
    component: () => import("../views/AddNewProductCategoryView.vue")
  },
  {
    path: "/showProductsList",
    name: "showProductsList",
    component: () => import("../views/ShowProductsListView.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
