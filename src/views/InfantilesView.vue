<script setup>
import { PhBalloon, PhCake, PhBaby, PhStar, PhMapPin, PhCheckCircle, PhCaretDown, PhImage, PhWhatsappLogo, PhPlayCircle, PhGift } from '@phosphor-icons/vue'
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from '../components/Navbar.vue'

// --- PLANES INFANTILES (Precios accesibles y nombres divertidos) ---
const planes = [
  {
    nombre: "Chiquitín",
    precio: "89",
    icono: PhBaby,
    descripcion: "Ideal para compartir por WhatsApp rápido.",
    destacado: false,
    color: "text-sky-500",
    btnColor: "bg-sky-50 text-sky-600 hover:bg-sky-100",
    caracteristicas: [
      "Una sola pantalla (Scroll corto)",
      "Foto del Cumpleañero/a",
      "Fecha y Hora",
      "Ubicación GPS (Google Maps)",
      "Botón de Confirmar Asistencia",
      "Música de Fondo"
    ]
  },
  {
    nombre: "Fiesta",
    precio: "149",
    icono: PhBalloon,
    descripcion: "El más divertido. Con galería y temática.",
    destacado: true, // Saldrá resaltado
    color: "text-amber-500",
    btnColor: "bg-amber-500 text-white hover:bg-amber-600 shadow-lg shadow-amber-200",
    caracteristicas: [
      "Diseño Temático (Disney, Superhéroes...)",
      "Galería de 6 Fotos",
      "Cuenta Regresiva Animada",
      "Sugerencia de Regalo (Sobres/Talla)",
      "Confirmación a WhatsApp",
      "Animación de Entrada"
    ]
  },
  {
    nombre: "Mágico",
    precio: "299",
    icono: PhStar,
    descripcion: "Diseño 100% personalizado a tu gusto.",
    destacado: false,
    color: "text-purple-500",
    btnColor: "bg-purple-50 text-purple-600 hover:bg-purple-100",
    caracteristicas: [
      "Todo lo del Plan Fiesta",
      "Diseño exclusivo desde cero",
      "Galería Ilimitada",
      "Video de invitación incrustado",
      "Sección para Padrinos",
      "Dominio propio (.com) opcional"
    ]
  }
]

// --- TEMÁTICAS POPULARES ---
const tematicas = [
  { titulo: "Safari / Selva", img: "https://images.unsplash.com/photo-1558086241-110aa75567f4?q=80&w=600&auto=format&fit=crop" },
  { titulo: "Princesas / Hadas", img: "https://images.unsplash.com/photo-1596956976856-121081121d55?q=80&w=600&auto=format&fit=crop" },
  { titulo: "Superhéroes", img: "https://images.unsplash.com/photo-1531259683007-016a7b628fc3?q=80&w=600&auto=format&fit=crop" },
]

// --- FAQS (Enfoque Padres) ---
const faqs = [
  {
    pregunta: "¿Tienen invitaciones de Bluey / Mario Bros / Frozen?",
    respuesta: "¡Sí! Tenemos plantillas de todos los personajes de moda. Si no tenemos el que buscas, lo adaptamos con el Plan Fiesta."
  },
  {
    pregunta: "¿Puedo poner sugerencia de regalo o talla de ropa?",
    respuesta: "Claro que sí. Es muy útil para que los invitados no se repitan con los regalos o sepan la talla exacta de tu peque."
  },
  {
    pregunta: "¿Sirve para Bautizo y Primer Añito juntos?",
    respuesta: "Exacto. Podemos combinar ambas celebraciones en una sola invitación digital perfectamente organizada."
  }
]

// --- LÓGICA BASICA ---
const faqAbierta = ref(0)
const toggleFaq = (index) => {
  faqAbierta.value = faqAbierta.value === index ? -1 : index
}
</script>

<template>
  <div class="min-h-screen bg-[#FDFBF7] font-sans text-slate-800 selection:bg-amber-200">
    
    <Navbar />

    <header class="relative h-[80vh] flex items-center justify-center overflow-hidden bg-sky-100">
      
      <div class="absolute inset-0 z-0">
         <img 
          src="https://images.unsplash.com/photo-1530103862676-de3c9da59af7?q=80&w=1920&auto=format&fit=crop" 
          class="w-full h-full object-cover opacity-80"
          alt="Cumpleaños Infantil"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-sky-200/50 via-white/20 to-[#FDFBF7]"></div>
      </div>

      <div class="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
        
        <div class="inline-block animate-bounce mb-4">
           <PhCake weight="fill" class="text-pink-500 text-5xl drop-shadow-lg" />
        </div>

        <h1 class="text-5xl md:text-7xl font-extrabold text-slate-800 tracking-tight leading-none drop-shadow-sm mb-6">
          Celebra la magia <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-amber-500 to-pink-500">de crecer</span>
        </h1>

        <p class="text-lg md:text-2xl text-slate-600 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
          Invitaciones digitales para Cumpleaños, Bautizos y Baby Showers.
          <br class="hidden md:block"> Tiernas, divertidas y fáciles de enviar.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a href="#precios" class="w-full sm:w-auto bg-sky-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-sky-600 hover:-translate-y-1 transition shadow-lg shadow-sky-200 flex items-center justify-center gap-2">
            <PhGift weight="fill" size="24" />
            Ver Planes
          </a>
        </div>
      </div>
    </header>

    <section class="py-16 px-6 -mt-16 relative z-20">
       <div class="max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-xl p-8 md:p-12 border-b-8 border-sky-100">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
             <div class="space-y-3 group">
                <div class="w-16 h-16 mx-auto bg-sky-50 rounded-2xl flex items-center justify-center text-sky-500 group-hover:scale-110 transition-transform">
                   <PhImage size="32" weight="duotone" />
                </div>
                <h4 class="font-bold text-slate-700">Foto del Peque</h4>
             </div>
             <div class="space-y-3 group">
                <div class="w-16 h-16 mx-auto bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                   <PhMapPin size="32" weight="duotone" />
                </div>
                <h4 class="font-bold text-slate-700">Mapa del Salón</h4>
             </div>
             <div class="space-y-3 group">
                <div class="w-16 h-16 mx-auto bg-pink-50 rounded-2xl flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform">
                   <PhPlayCircle size="32" weight="duotone" />
                </div>
                <h4 class="font-bold text-slate-700">Canción Favorita</h4>
             </div>
             <div class="space-y-3 group">
                <div class="w-16 h-16 mx-auto bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                   <PhWhatsappLogo size="32" weight="duotone" />
                </div>
                <h4 class="font-bold text-slate-700">Confirmación</h4>
             </div>
          </div>
       </div>
    </section>

    <section id="precios" class="py-16 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-extrabold text-slate-800">Precios Chiquititos</h2>
          <p class="mt-3 text-lg text-slate-500">Un pago único. Sin complicaciones.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto items-start">
          
          <div 
            v-for="plan in planes" 
            :key="plan.nombre"
            class="bg-white rounded-[2rem] p-6 relative transition-all duration-300 hover:shadow-xl border-2"
            :class="plan.destacado ? 'border-amber-400 shadow-xl scale-105 z-10' : 'border-slate-100 hover:-translate-y-1'"
          >
            <div v-if="plan.destacado" class="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-widest shadow-sm">
              Más Popular
            </div>

            <div class="text-center mb-6">
               <component :is="plan.icono" :size="48" :class="plan.color" class="mx-auto mb-2" weight="duotone" />
               <h3 class="text-2xl font-bold text-slate-800">{{ plan.nombre }}</h3>
               <div class="flex items-center justify-center gap-1 mt-2">
                  <span class="text-4xl font-extrabold text-slate-800">{{ plan.precio }}</span>
                  <span class="text-lg text-slate-400 font-bold">Bs</span>
               </div>
               <p class="text-slate-500 text-sm mt-2">{{ plan.descripcion }}</p>
            </div>

            <ul class="space-y-3 mb-8 bg-slate-50 p-4 rounded-xl">
              <li v-for="(feature, index) in plan.caracteristicas" :key="index" class="flex items-start text-left">
                <PhCheckCircle class="flex-shrink-0 text-emerald-400 mt-0.5" size="18" weight="fill" />
                <span class="ml-2 text-slate-600 text-sm font-medium">{{ feature }}</span>
              </li>
            </ul>

            <a 
              :href="`https://wa.me/59164042420?text=Hola,%20quiero%20el%20plan%20Infantil%20${plan.nombre}`" 
              target="_blank"
              class="block w-full text-center py-3 rounded-xl font-bold transition-all duration-300 transform active:scale-95"
              :class="plan.btnColor"
            >
              Elegir Plan
            </a>
          </div>

        </div>
      </div>
    </section>

    <section class="py-16 px-6 bg-white">
       <div class="max-w-5xl mx-auto">
          <div class="text-center mb-10">
             <h2 class="text-3xl font-bold text-slate-900 mb-2">Temáticas Favoritas</h2>
             <p class="text-slate-500">¿Cuál le gusta a tu peque? ¡Las tenemos todas!</p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-6">
             <div v-for="tema in tematicas" :key="tema.titulo" class="group relative rounded-2xl overflow-hidden shadow-md cursor-pointer h-48">
                <img :src="tema.img" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div class="absolute inset-0 bg-black/40 flex items-center justify-center">
                   <h3 class="text-white font-bold text-xl drop-shadow-md">{{ tema.titulo }}</h3>
                </div>
             </div>
          </div>
          
          <div class="text-center mt-8">
             <p class="text-sm text-slate-400 italic">Y muchas más: Dinosaurios, Granja, Sirenas, Paw Patrol...</p>
          </div>
       </div>
    </section>

    <section class="py-16 px-6 bg-sky-50">
       <div class="max-w-3xl mx-auto">
          <div class="text-center mb-8">
             <h2 class="text-2xl md:text-3xl font-bold text-sky-800">Preguntas de Mamás y Papás</h2>
          </div>
          
          <div class="space-y-3">
            <div 
              v-for="(faq, index) in faqs" 
              :key="index" 
              class="bg-white rounded-xl border border-sky-100 overflow-hidden"
            >
              <button 
                @click="toggleFaq(index)"
                class="w-full flex items-center justify-between p-5 text-left focus:outline-none hover:bg-sky-50 transition-colors"
              >
                <span class="font-bold text-slate-700">{{ faq.pregunta }}</span>
                <PhCaretDown 
                  :size="20" 
                  class="text-sky-400 transition-transform duration-300"
                  :class="faqAbierta === index ? 'rotate-180 text-sky-600' : ''" 
                />
              </button>
              <div v-show="faqAbierta === index" class="px-5 pb-5 text-slate-600 text-sm leading-relaxed">
                <p>{{ faq.respuesta }}</p>
              </div>
            </div>
          </div>
       </div>
    </section>

    <footer class="bg-[#FDFBF7] text-slate-400 py-10 text-center text-xs border-t border-slate-200">
      <p>Hecho con 💛 para celebrar la vida</p>
      <p class="mt-1">© 2026 Yupa Studio Kids</p>
    </footer>

  </div>
</template>