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
      // Esta es una RUTA DINÁMICA. ":id" cambiará según el cliente
      path: '/boda/:id', 
      name: 'invitacion',
      component: VistaInvitacion
    }
  ],
  // Esto hace que al cambiar de página, el scroll vuelva arriba
  scrollBehavior() {
    return { top: 0 }
  }
})

export default router