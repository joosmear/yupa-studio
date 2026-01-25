<script setup>
import { ref } from 'vue'
import { PhList, PhX, PhHouse, PhWhatsappLogo, PhStorefront, PhQuestion, PhCaretRight, PhConfetti, PhBaby, PhHeart } from '@phosphor-icons/vue'

// Estado del menú modal
const menuAbierto = ref(false)

const toggleMenu = () => {
  menuAbierto.value = !menuAbierto.value
  if (menuAbierto.value) {
    document.body.style.overflow = 'hidden' // Bloquear scroll
  } else {
    document.body.style.overflow = '' // Restaurar scroll
  }
}

// Categorías para el menú (reflejan las secciones principales)
const categoriasMenu = [
  { nombre: "Bodas", link: "/bodas", icono: PhHeart, color: "text-rose-400" },
  { nombre: "15 Años", link: "/15-anos", icono: PhConfetti, color: "text-fuchsia-400" },
  { nombre: "Infantiles", link: "/infantiles", icono: PhBaby, color: "text-sky-400" },
]

// Modelos destacados para mostrar en el menú (puedes actualizarlos según tus mejores demos)
const modelosDestacados = [
  { 
    nombre: "Clásico Marsala (Boda)", 
    link: "/invitacion/juan-y-ana", 
    img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=150&auto=format&fit=crop" 
  },
  { 
    nombre: "Neon Party (15s)", 
    link: "/invitacion/valentina-xv", 
    img: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=150&auto=format&fit=crop" 
  }
]
</script>

<template>
  <div>
    <nav class="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-center text-white">
      
      <router-link to="/">
        <img 
          src="/logo.png" 
          alt="Yupa Studio" 
          class="h-10 md:h-12 w-auto object-contain hover:opacity-90 transition-opacity" 
        />
      </router-link>

      <div class="flex items-center gap-3">
        
        <a 
          href="https://wa.me/59164042420" 
          target="_blank"
          class="hidden md:inline-block bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-sm font-bold hover:bg-white hover:text-stone-900 transition"
        >
          Contactar
        </a>

        <button 
          @click="toggleMenu"
          class="bg-white/10 backdrop-blur-md border border-white/20 text-white p-2.5 rounded-full hover:bg-white hover:text-stone-900 transition-all duration-300 group shadow-sm"
          aria-label="Abrir menú"
        >
          <PhList size="24" weight="bold" class="group-hover:scale-110 transition-transform" />
        </button>
      </div>
    </nav>

    <Transition name="fade">
      <div 
        v-if="menuAbierto" 
        class="fixed inset-0 z-[100] bg-[#0F1420]/98 backdrop-blur-xl flex flex-col items-center overflow-y-auto"
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
          
          <nav class="flex flex-col gap-2">
            <p class="text-xs font-bold text-stone-500 uppercase tracking-widest mb-2 px-2">Navegación</p>
            
            <router-link 
              to="/" 
              @click="toggleMenu" 
              class="flex items-center gap-4 text-lg text-stone-300 font-light p-3 rounded-xl hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              <PhHouse size="22" weight="duotone" class="text-stone-500" /> Inicio
            </router-link>

            <router-link 
              v-for="cat in categoriasMenu"
              :key="cat.nombre"
              :to="cat.link" 
              @click="toggleMenu" 
              class="flex items-center gap-4 text-lg text-stone-300 font-light p-3 rounded-xl hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              <component :is="cat.icono" size="22" weight="duotone" :class="cat.color" /> 
              {{ cat.nombre }}
            </router-link>
            
            <div class="h-px bg-white/5 my-2"></div>

            <a 
              href="/#precios" 
              @click="toggleMenu" 
              class="flex items-center gap-4 text-base text-stone-400 font-light p-3 rounded-xl hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              <PhStorefront size="20" weight="duotone" /> Precios Generales
            </a>
            
            <a 
              href="/#faq" 
              @click="toggleMenu" 
              class="flex items-center gap-4 text-base text-stone-400 font-light p-3 rounded-xl hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              <PhQuestion size="20" weight="duotone" /> Ayuda y Preguntas
            </a>
          </nav>

          <div class="flex flex-col gap-3">
            <p class="text-xs font-bold text-stone-500 uppercase tracking-widest mb-1 px-2">Demos Populares</p>
            
            <router-link 
              v-for="modelo in modelosDestacados" 
              :key="modelo.nombre"
              :to="modelo.link"
              @click="toggleMenu"
              class="flex items-center gap-4 bg-white/5 p-3 rounded-xl hover:bg-white/10 border border-white/5 hover:border-rose-500/30 transition-all group"
            >
              <img :src="modelo.img" class="w-12 h-12 rounded-lg object-cover opacity-80 group-hover:opacity-100 transition" />
              
              <div class="flex-1">
                <p class="text-stone-200 font-bold text-sm group-hover:text-rose-400 transition">{{ modelo.nombre }}</p>
                <p class="text-stone-500 text-[10px]">Ver demostración en vivo</p>
              </div>

              <PhCaretRight size="16" class="text-stone-600 group-hover:text-rose-500 group-hover:translate-x-1 transition-transform" />
            </router-link>
          </div>

          <div class="mt-4 pt-6 border-t border-white/10 text-center">
            <a 
              href="https://wa.me/59164042420?text=Hola,%20quiero%20empezar%20mi%20invitación" 
              target="_blank"
              class="bg-gradient-to-r from-rose-600 to-rose-500 text-white w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs hover:from-rose-500 hover:to-rose-400 transition shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2"
            >
              <PhWhatsappLogo size="20" weight="bold" />
              Contactar Soporte
            </a>
            <p class="text-stone-500 text-[10px] mt-4 leading-relaxed">
              Yupa Studio © 2026. <br> Diseños digitales premium.
            </p>
          </div>

        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
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