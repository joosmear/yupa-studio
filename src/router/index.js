import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
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
      // RUTA ÚNICA: El archivo VistaInvitacion decidirá qué diseño mostrar
      path: '/boda/:id', 
      name: 'invitacion',
      component: VistaInvitacion
    }
  ],
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router