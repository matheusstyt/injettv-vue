import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Produtividade from '../views/ProdutividadeView.vue'
import Carrosel from '../views/CarroselView.vue'
import Error from '../views/ErrorPageView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/produtividade',
    name: 'produtividade',
    component: Produtividade
  },
  {
    path: '/error',
    name: 'error',
    component: Error
  },
  {
    path: '/carrosel',
    name: 'carrosel',
    component: Carrosel
  },
  {
    path: '/painel',
    name: 'painel',
    component: () => import(/* webpackChunkName: "painel" */ '../views/PainelView.vue')
  },{
    path: '/maquinas',
    name: 'maquinas',
    component: () => import(/* webpackChunkName: "maquinas" */ '../views/MaquinasView.vue')
  },{
    path: '/maquinas',
    name: 'maquinas',
    component: () => import(/* webpackChunkName: "maquinas" */ '../views/MaquinasView.vue')
  },{
    path: '/parada',
    name: 'parada',
    component: () => import(/* webpackChunkName: "parada" */ '../views/ParadasView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
