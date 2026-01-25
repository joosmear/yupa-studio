import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BodasView from '../views/BodasView.vue'
import QuinceView from '../views/QuinceView.vue'
import InfantilesView from '../views/InfantilesView.vue'
import VistaInvitacion from '../views/VistaInvitacion.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/bodas',
      name: 'bodas',
      component: BodasView
    },
    {
      path: '/15-anos',
      name: 'quince',
      component: QuinceView 
    },
    {
      path: '/infantiles',
      name: 'infantiles',
      component: InfantilesView
    },
    {
      path: '/invitacion/:id', 
      name: 'invitacion',
      component: VistaInvitacion
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})
export default router