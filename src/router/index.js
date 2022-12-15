import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  }
  ,
  {
    path: '/produtividade',
    name: 'produtividade',
    component: () => import(/* webpackChunkName: "produtividade" */ '../views/ProdutividadeView.vue')
  }
  ,
  {
    path: '/maquinas',
    name: 'maquinas',
    component: () => import(/* webpackChunkName: "maquinas" */ '../views/MaquinasView.vue')
  }
  ,
  {
    path: '/paradas',
    name: 'paradas',
    component: () => import(/* webpackChunkName: "paradas" */ '../views/ParadasView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
