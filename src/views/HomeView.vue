<script setup>
import { PhLightning, PhCheckCircle, PhWhatsappLogo, PhStar, PhArrowRight, PhHeart, PhCrown, PhArrowDown, PhMonitorPlay, PhQuotes, PhQuestion, PhSteps, PhPaperPlaneTilt, PhDeviceMobileCamera, PhCaretDown, PhCaretRight } from '@phosphor-icons/vue'
import { ref, onMounted, onUnmounted } from 'vue'

// Nuevos Precios y Características Detalladas
const planes = [
  {
    nombre: "Esencial",
    precio: "149",
    icono: PhHeart,
    descripcion: "Todo lo necesario para una invitación elegante y funcional.",
    destacado: false,
    caracteristicas: [
      "Diseño Web Responsivo (Móvil/PC)",
      "Cuenta Regresiva",
      "Música de Fondo (Autoplay)",
      "Ubicación GPS (Google Maps)",
      "Botón 'Agendar en Calendario'",
      "Sección de Regalos (QR/Bancos)",
      "Confirmación Directa a WhatsApp",
      "Enlace Personalizado (yupa.studio/boda/novio-y-novia)",
      "Soporte"
    ]
  },
  {
    nombre: "Gold",
    precio: "249",
    icono: PhStar,
    descripcion: "El favorito. Agrega organización y detalles visuales.",
    destacado: true, // Saldrá resaltado
    caracteristicas: [
      "Todo lo del Plan Esencial",
      "Galería de Fotos (6 fotos - Slider Táctil)",
      "Cronograma de Actividades",
      "Código de Vestimenta",
      "Sección Padrinos y Padres",
      "Soporte Prioritario"
    ]
  },
  {
    nombre: "Premium",
    precio: "599",
    icono: PhCrown,
    descripcion: "La experiencia de lujo completa con efectos de cine.",
    destacado: false,
    caracteristicas: [
      "Todo lo del Plan Gold",
      "URL personalizada .com",
      "Diseño Personalizado",
      "Campos Personalizados",
      "Galería Extendida (Hasta 20 fotos)",
      "Soporte Prioritario y Cambios Ilimitados"
    ]
  }
]

const modelos = [
  { titulo: "Estilo Clásico (Marsala)", img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=600", link: "/boda/juan-y-ana" },
  { titulo: "Estilo Gala Luxury", img: "https://images.unsplash.com/photo-1667420421340-850fc44c9c45", link: "/boda/carlos-y-sofia" },
  { titulo: "Estilo Boho Garden", img: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?q=80&w=1169", link: "/boda/miguel-y-elena" },
]

// --- DATOS NUEVOS ---

const pasos = [
  { 
    titulo: "1. Elige tu Plan", 
    desc: "Selecciona el diseño y paquete que más te guste.", 
    icono: PhSteps 
  },
  { 
    titulo: "2. Envíanos tus Datos", 
    desc: "Te pediremos fotos, fecha y ubicación por WhatsApp.", 
    icono: PhPaperPlaneTilt 
  },
  { 
    titulo: "3. Recibe tu Link", 
    desc: "En menos de 24hrs tu invitación estará lista para compartir.", 
    icono: PhDeviceMobileCamera 
  }
]

const testimonios = [
  {
    pareja: "Carla y Marcos",
    texto: "¡A mis invitados les encantó! La confirmación por WhatsApp nos ahorró muchísimo tiempo de estar llamando a uno por uno.",
    boda: "Boda en Cochabamba"
  },
  {
    pareja: "Andrea y Luis",
    texto: "El diseño es super elegante. Teníamos miedo de que fuera difícil de usar para nuestros abuelos, pero es muy intuitivo.",
    boda: "Boda en Santa Cruz"
  },
  {
    pareja: "Gabriela y Pedro",
    texto: "La ubicación GPS es exacta. Nadie se perdió para llegar al salón. Excelente servicio y muy rápidos.",
    boda: "Boda en La Paz"
  }
]

const faqs = [
  {
    pregunta: "¿Es un pago único o mensual?",
    respuesta: "Es un pago único. No hay mensualidades ni costos ocultos. Tu invitación estará activa por 1 año entero."
  },
  {
    pregunta: "¿Puedo cambiar la información después?",
    respuesta: "¡Sí! Si cambia la hora o el lugar, nos avisas y lo actualizamos al instante sin costo adicional."
  },
  {
    pregunta: "¿Cómo la envío a mis invitados?",
    respuesta: "Recibirás un enlace (link) personalizado. Solo tienes que copiarlo y pegarlo en el chat de WhatsApp de tus invitados."
  },
  {
    pregunta: "¿Con cuánto tiempo debo pedirla?",
    respuesta: "Recomendamos tenerla lista 1 o 2 meses antes de la boda, pero si tienes prisa, la entregamos en menos de 24 horas."
  }
]

// --- LÓGICA DEL SLIDER (Testimonios) ---
const testimonioActual = ref(0)
let intervaloSlider

const siguienteTestimonio = () => {
  testimonioActual.value = (testimonioActual.value + 1) % testimonios.length
}

const iniciarSlider = () => {
  intervaloSlider = setInterval(siguienteTestimonio, 5000) // Cambia cada 5 seg
}

// --- LÓGICA DEL ACORDEÓN (FAQ) ---
const faqAbierta = ref(0) // Empezamos con la 0 abierta

const toggleFaq = (index) => {
  // Si toco la que ya está abierta, la cierro (-1), si no, abro la nueva
  faqAbierta.value = faqAbierta.value === index ? -1 : index
}

// Ciclo de vida
onMounted(() => {
  iniciarSlider()
})

onUnmounted(() => {
  clearInterval(intervaloSlider)
})
</script>

<template>
  <div class="min-h-screen bg-white font-sans text-gray-800">
    
    <header class="relative h-screen flex items-center justify-center overflow-hidden">
      
      <div class="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920&auto=format&fit=crop" 
          class="w-full h-full object-cover animate-pan-slow"
          alt="Fondo Boda"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-stone-900/90"></div>
      </div>

      <nav class="absolute top-0 left-0 w-full z-50 p-6 flex justify-between items-center text-white">
        <div class="font-bold text-2xl tracking-tighter">Yupa Studio<span class="text-rose-500">.</span></div>
        <a href="https://wa.me/59164042420" class="bg-white/10 backdrop-blur-md border border-white/20 px-5 py-2 rounded-full text-sm font-bold hover:bg-white hover:text-stone-900 transition">
          Contactar
        </a>
      </nav>

      <div class="relative z-10 text-center px-4 max-w-5xl mx-auto mt-0">
        
        <span class="inline-block py-1 px-4 rounded-full bg-rose-600/90 text-white text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-8 animate-fade-in-up">
          Nueva Colección 2026
        </span>

        <h1 class="text-5xl md:text-8xl font-extrabold text-white tracking-tight leading-none drop-shadow-2xl mb-8">
          Tus invitaciones<br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-200 to-rose-400 font-serif italic">inolvidables</span>
        </h1>

        <p class="text-lg md:text-2xl text-stone-200 mb-12 font-light max-w-2xl mx-auto leading-relaxed">
          Diseño web de lujo, mapas, música y confirmación inmediata. La forma moderna de decir "Sí, acepto".
        </p>

        <div class="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <router-link to="/boda/juan-y-ana" class="w-full sm:w-auto bg-rose-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-rose-500 hover:scale-105 transition shadow-lg shadow-rose-900/50 flex items-center justify-center gap-3">
            <PhMonitorPlay weight="fill" size="24" />
            Ver Demo Real
          </router-link>
          
          <a href="#precios" class="w-full sm:w-auto bg-transparent border border-white/40 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-stone-900 transition flex items-center justify-center backdrop-blur-sm">
            Ver Precios
          </a>
        </div>

      </div>



    </header>

    <div class="bg-stone-800 text-white py-6 relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-500 via-purple-500 to-rose-500"></div>
      
      <div class="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-center text-center gap-3 md:gap-6">
        
        <div class="bg-rose-600/20 p-3 rounded-full border border-rose-500/30">
          <PhLightning :size="28" weight="fill" class="text-rose-400 animate-pulse" />
        </div>

        <div>
          <h3 class="font-bold text-lg md:text-xl tracking-wide text-stone-100">
            ¿Tienes prisa? Entregamos en <span class="text-rose-400">tiempo récord</span>.
          </h3>
          <p class="text-stone-400 text-xs md:text-sm font-light mt-1">
            Una vez recibimos tus archivos, tu invitación queda lista en menos de 24 horas.
          </p>
        </div>

      </div>
    </div>

    <section class="py-20 px-6 bg-white">
      <div class="max-w-6xl mx-auto">
        <div class="text-center mb-12">
          <h2 class="text-3xl font-bold text-stone-800 mb-4">Nuestros Diseños Recientes</h2>
          <p class="text-stone-500">Elige el estilo que más te guste, nosotros lo personalizamos.</p>
        </div>

        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="modelo in modelos" :key="modelo.titulo" class="group relative rounded-xl overflow-hidden shadow-lg cursor-pointer">
            <div class="h-64 overflow-hidden">
              <img :src="modelo.img" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
            
            <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <router-link :to="modelo.link" class="bg-white text-stone-900 px-6 py-2 rounded-full font-bold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 flex items-center gap-2">
                Ver Demo <PhArrowRight />
              </router-link>
            </div>
            
            <div class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white">
              <p class="font-bold text-lg">{{ modelo.titulo }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 px-6 bg-stone-900 text-white text-center">
      <div class="max-w-5xl mx-auto">
        <h2 class="text-3xl font-bold mb-12">¿Cómo funciona?</h2>
        
        <div class="grid md:grid-cols-3 gap-8 relative">
          <div class="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-rose-600/0 via-rose-600/50 to-rose-600/0"></div>

          <div v-for="(paso, index) in pasos" :key="index" class="relative z-10">
            <div class="w-24 h-24 mx-auto bg-stone-800 border-1 border-rose-500 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-rose-900/20">
              <component :is="paso.icono" :size="48" class="text-rose-400" weight="thin" />
            </div>
            <h3 class="text-xl font-bold mb-2">{{ paso.titulo }}</h3>
            <p class="text-stone-400 text-sm px-4">{{ paso.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 px-6 bg-white overflow-hidden relative">
      <PhQuotes :size="200" weight="fill" class="absolute top-10 left-1/2 -translate-x-1/2 text-rose-50 opacity-50 pointer-events-none" />

      <div class="max-w-4xl mx-auto relative z-10 text-center">
        <h2 class="text-3xl font-bold text-stone-800 mb-12">Lo que dicen los novios</h2>

        <div class="relative h-64 md:h-48 flex items-center justify-center">
          <transition name="fade" mode="out-in">
            <div 
              :key="testimonioActual"
              class="max-w-2xl mx-auto px-4"
            >
              <div class="flex justify-center gap-1 mb-6">
                <PhStar v-for="n in 5" :key="n" weight="fill" class="text-amber-400 text-lg" />
              </div>
              
              <p class="text-xl md:text-2xl text-stone-600 italic mb-8 font-serif leading-relaxed">
                "{{ testimonios[testimonioActual].texto }}"
              </p>
              
              <div>
                <p class="font-bold text-stone-900 text-lg">{{ testimonios[testimonioActual].pareja }}</p>
                <p class="text-xs text-rose-500 font-bold uppercase tracking-widest mt-1">
                  {{ testimonios[testimonioActual].boda }}
                </p>
              </div>
            </div>
          </transition>
        </div>

        <div class="flex justify-center gap-3 mt-8">
          <button 
            v-for="(t, index) in testimonios" 
            :key="index"
            @click="testimonioActual = index"
            class="w-3 h-3 rounded-full transition-all duration-300"
            :class="testimonioActual === index ? 'bg-rose-500 w-8' : 'bg-stone-200 hover:bg-rose-300'"
          ></button>
        </div>
      </div>
    </section>

    <section id="precios" class="py-20 px-6 bg-stone-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-extrabold text-stone-900">Planes Simples</h2>
          <p class="mt-4 text-xl text-stone-500">Un solo pago. Sin mensualidades ocultas.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          
          <div 
            v-for="plan in planes" 
            :key="plan.nombre"
            class="bg-white rounded-2xl p-8 relative transition-all duration-300 hover:shadow-2xl border"
            :class="plan.destacado ? 'border-rose-500 shadow-xl scale-105 z-10' : 'border-stone-200 hover:-translate-y-1'"
          >
            <div v-if="plan.destacado" class="absolute top-0 right-0 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-bl-lg uppercase tracking-widest">
              Más Vendido
            </div>

            <component :is="plan.icono" :size="48" :class="plan.destacado ? 'text-rose-500' : 'text-stone-400'" class="mb-4" weight="thin" />

            <h3 class="text-2xl font-bold text-stone-800">{{ plan.nombre }}</h3>
            <p class="text-stone-500 text-sm mt-2 mb-6 h-10">{{ plan.descripcion }}</p>
            
            <div class="mb-6 pb-6 border-b border-stone-100">
              <span class="text-5xl font-extrabold text-stone-900">{{ plan.precio }}</span>
              <span class="text-xl text-stone-500 font-bold ml-1">Bs</span>
            </div>

            <ul class="space-y-4 mb-8">
              <li v-for="(feature, index) in plan.caracteristicas" :key="index" class="flex items-center text-left">
                <PhCheckCircle class="flex-shrink-0 text-green-500 mt-0.5" size="20" weight="regular" />
                <span class="ml-2 text-stone-600 text-sm leading-tight">{{ feature }}</span>
              </li>
            </ul>

            <a 
              :href="`https://wa.me/59164042420?text=Hola,%20me%20interesa%20el%20plan%20${plan.nombre}%20de%20${plan.precio}Bs`" 
              target="_blank"
              class="block w-full text-center py-3 rounded-xl font-bold transition-colors"
              :class="plan.destacado ? 'bg-rose-600 text-white hover:bg-rose-700 shadow-lg shadow-rose-200' : 'bg-stone-100 text-stone-600 hover:bg-stone-200'"
            >
              Pedir Ahora
            </a>
          </div>

        </div>
      </div>
    </section>

    <section class="py-20 px-6 bg-stone-50">
      <div class="max-w-3xl mx-auto">
        <div class="text-center mb-12">
          <PhQuestion :size="48" class="mx-auto text-rose-500 mb-4" weight="thin" />
          <h2 class="text-3xl font-bold text-stone-800">Preguntas Frecuentes</h2>
        </div>

        <div class="space-y-4">
          <div 
            v-for="(faq, index) in faqs" 
            :key="index" 
            class="bg-white rounded-2xl border border-stone-200 overflow-hidden transition-all duration-300 hover:shadow-md"
            :class="faqAbierta === index ? 'border-rose-200 ring-1 ring-rose-100' : ''"
          >
            <button 
              @click="toggleFaq(index)"
              class="w-full flex items-center justify-between p-6 text-left focus:outline-none"
            >
              <span class="font-bold text-stone-800 text-lg">{{ faq.pregunta }}</span>
              <PhCaretDown 
                :size="20" 
                class="text-stone-400 transition-transform duration-300"
                :class="faqAbierta === index ? 'rotate-180 text-rose-500' : ''" 
              />
            </button>

            <div 
              v-show="faqAbierta === index" 
              class="px-6 pb-6 text-stone-600 leading-relaxed animate-fade-in-down"
            >
              <div class="pt-2 border-t border-stone-100"></div> <p class="mt-4">{{ faq.respuesta }}</p>
            </div>
          </div>
        </div>
        
        <div class="text-center mt-12">
          <p class="mb-4 text-stone-600">¿Tienes otra duda?</p>
          <a href="https://wa.me/59164042420" class="inline-flex items-center gap-2 text-rose-600 font-bold hover:underline bg-rose-50 px-6 py-2 rounded-full transition hover:bg-rose-100">
            <PhWhatsappLogo :size="24" weight="thin" /> Escríbenos al WhatsApp
          </a>
        </div>
      </div>
    </section>

    <footer class="bg-white py-8 text-center border-t border-gray-100">
      <p class="text-gray-500 text-sm">© 2026 Yupa Studio - La Paz, Bolivia 🇧🇴</p>
    </footer>

  </div>
</template>

<style>
/* ANIMACIÓN FADE (Para el slider de testimonios) */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px); /* Entra desde un poquito abajo */
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px); /* Se va hacia un poquito arriba */
}

/* Animación simple para abrir el acordeón suavemente */
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-down {
  animation: fadeInDown 0.3s ease-out forwards;
}
</style>