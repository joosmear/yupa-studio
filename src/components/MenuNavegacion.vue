<script setup>
import { ref } from 'vue'
import { PhList, PhX, PhHouse, PhWhatsappLogo, PhStorefront, PhQuestion, PhCaretRight } from '@phosphor-icons/vue'

const abierto = ref(false)

const toggleMenu = () => {
  abierto.value = !abierto.value
  if (abierto.value) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'auto'
  }
}

const modelos = [
  { 
    nombre: "Clásico Marsala", 
    link: "/invitacion/juan-y-ana", 
    img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=150&auto=format&fit=crop" 
  },
  { 
    nombre: "Gala Luxury", 
    link: "/invitacion/carlos-y-sofia", 
    img: "https://images.unsplash.com/photo-1667420421340-850fc44c9c45?q=80&w=150&auto=format&fit=crop" 
  },
  { 
    nombre: "Boho Garden", 
    link: "/invitacion/miguel-y-elena", 
    img: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?q=80&w=150&auto=format&fit=crop" 
  }
]
</script>

<template>
  <div>
    <button 
      @click="toggleMenu"
      class="fixed top-5 right-5 z-[60] bg-white/10 backdrop-blur-md border border-white/20 text-stone-800 p-3 rounded-full shadow-lg hover:bg-white/90 hover:text-rose-600 transition-all duration-300 group"
      :class="{ 'opacity-0 pointer-events-none': abierto }" 
    >
      <PhList size="24" weight="bold" class="text-stone-600 group-hover:text-rose-600" />
    </button>

    <Transition name="fade">
      <div 
        v-if="abierto" 
        class="fixed inset-0 z-[70] bg-[#0F1420]/98 backdrop-blur-xl flex flex-col items-center overflow-y-auto"
      >
        
        <div class="w-full max-w-md p-6 flex justify-between items-center border-b border-white/5">
           <img 
     src="/logo.png" 
     alt="Yupa Studio" 
     class="h-8 md:h-10 w-auto object-contain" 
   />
          <button 
            @click="toggleMenu"
            class="text-white/50 hover:text-rose-500 p-2 rounded-full hover:bg-white/5 transition"
          >
            <PhX size="32" weight="light" />
          </button>
        </div>

        <div class="w-full max-w-md p-6 flex flex-col gap-8 pb-20">
          
          <nav class="flex flex-col gap-3">
            <p class="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">Menú Principal</p>
            
            <router-link 
              to="/" 
              @click="toggleMenu" 
              class="flex items-center gap-4 text-lg text-stone-300 font-light p-3 rounded-lg hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              <PhHouse size="22" weight="duotone" /> Inicio
            </router-link>

            <a 
              href="/#precios" 
              @click="toggleMenu" 
              class="flex items-center gap-4 text-lg text-stone-300 font-light p-3 rounded-lg hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              <PhStorefront size="22" weight="duotone" /> Precios y Planes
            </a>
            
            <a 
              href="/#faq" 
              @click="toggleMenu" 
              class="flex items-center gap-4 text-lg text-stone-300 font-light p-3 rounded-lg hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              <PhQuestion size="22" weight="duotone" /> Preguntas Frecuentes
            </a>
          </nav>

          <div class="flex flex-col gap-3">
            <p class="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1">Explora otros Estilos</p>
            
            <router-link 
              v-for="modelo in modelos" 
              :key="modelo.nombre"
              :to="modelo.link"
              @click="toggleMenu"
              class="flex items-center gap-4 bg-white/5 p-3 rounded-xl hover:bg-white/10 border border-white/5 hover:border-rose-500/30 transition-all group"
            >
              <img :src="modelo.img" class="w-12 h-12 rounded-lg object-cover opacity-80 group-hover:opacity-100 transition" />
              
              <div class="flex-1">
                <p class="text-stone-200 font-bold text-sm group-hover:text-rose-400 transition">{{ modelo.nombre }}</p>
                <p class="text-stone-500 text-[10px]">Ver demostración</p>
              </div>

              <PhCaretRight size="16" class="text-stone-600 group-hover:text-rose-500 group-hover:translate-x-1 transition-transform" />
            </router-link>
          </div>

          <div class="mt-4 pt-6 border-t border-white/10 text-center">
            <a 
              href="https://wa.me/59164042420?text=Hola,%20quiero%20empezar%20mi%20invitación" 
              target="_blank"
              class="bg-rose-600 text-white w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-rose-500 transition shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2"
            >
              <PhWhatsappLogo size="20" weight="bold" />
              Crear mi Invitación
            </a>
            <p class="text-stone-500 text-[10px] mt-4 leading-relaxed">
              ¿Te gusta lo que ves? <br> Diseño profesional en menos de 24 horas.
            </p>
          </div>

        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
/* Eliminamos el @apply y dejamos solo las animaciones CSS estándar */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>