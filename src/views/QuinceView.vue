<script setup>
import { PhSparkle, PhMusicNotes, PhWhatsappLogo, PhCrown, PhArrowRight, PhHeart, PhCamera, PhClock, PhConfetti, PhCaretDown, PhCheckCircle, PhImage, PhMonitorPlay } from '@phosphor-icons/vue'
import { ref, onMounted, onUnmounted } from 'vue'
import Navbar from '../components/Navbar.vue'

// --- PLANES 15 AÑOS (Ajustados al mercado) ---
const planes = [
  {
    nombre: "Party",
    precio: "119",
    icono: PhMusicNotes,
    descripcion: "Lo esencial para invitar con estilo.",
    destacado: false,
    color: "text-fuchsia-500",
    btnColor: "bg-fuchsia-50 text-fuchsia-600 hover:bg-fuchsia-100",
    caracteristicas: [
      "Diseño Web Móvil (Responsive)",
      "Cuenta Regresiva",
      "Ubicación GPS (Google Maps)",
      "Música de Fondo",
      "Confirmación a WhatsApp",
      "Enlace: yupa.studio/mis-xv/nombre"
    ]
  },
  {
    nombre: "Glow",
    precio: "199",
    icono: PhSparkle,
    descripcion: "El favorito. Con galería de fotos y cronograma.",
    destacado: true, // Saldrá resaltado
    color: "text-purple-600",
    btnColor: "bg-purple-600 text-white hover:bg-purple-700 shadow-lg shadow-purple-200",
    caracteristicas: [
      "Todo lo del Plan Party",
      "Galería de Fotos (Sesión Pre-15)",
      "Cronograma de la Fiesta",
      "Código de Vestimenta (Iconos)",
      "Sección de Regalos (QR/Sobres)",
      "Frase Inspiradora"
    ]
  },
  {
    nombre: "Queen",
    precio: "450",
    icono: PhCrown,
    descripcion: "La experiencia VIP totalmente personalizada.",
    destacado: false,
    color: "text-amber-500",
    btnColor: "bg-amber-50 text-amber-600 hover:bg-amber-100",
    caracteristicas: [
      "Todo lo del Plan Glow",
      "Dominio propio (.com)",
      "Galería Ilimitada",
      "Colores y Tipografía a medida",
      "Sección de Padres y Padrinos",
      "Soporte Prioritario VIP"
    ]
  }
]

// --- MODELOS DE 15 AÑOS ---
const modelos = [
  { titulo: "Rose Gold Dream", img: "https://images.unsplash.com/photo-1566737236500-c8ac43014a67?q=80&w=600&auto=format&fit=crop", link: "/invitacion/valentina-xv" },
  { titulo: "Neon Party", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=600&auto=format&fit=crop", link: "#" }, // Placeholder
  { titulo: "Boho Chic", img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=600&auto=format&fit=crop", link: "#" },
]

// --- TESTIMONIOS (Mamás y Quinceañeras) ---
const testimonios = [
  {
    autor: "Sra. Claudia (Mamá)",
    texto: "A mi hija le encantó verse en la invitación como una princesa. Fue muy fácil de enviar a toda la familia.",
    evento: "15 de Camila"
  },
  {
    autor: "Valentina (Quinceañera)",
    texto: "Mis amigas amaron la música y las fotos. ¡Quedó súper aesthetic! Gracias por la paciencia.",
    evento: "Mis 15"
  },
  {
    autor: "Sra. Patricia",
    texto: "Muy útil el mapa y la confirmación. Me ahorró el estrés de llamar a los invitados uno por uno.",
    evento: "15 de Sofía"
  }
]

// --- FAQS ---
const faqs = [
  {
    pregunta: "¿Qué fotos necesito para la invitación?",
    respuesta: "Idealmente fotos de su sesión pre-15 (estudio o exterior). Si aún no tienen, pueden usar una foto bonita de celular, ¡nosotros la arreglamos!"
  },
  {
    pregunta: "¿Puedo poner mi canción favorita de TikTok?",
    respuesta: "¡Sí! Solo dinos el nombre de la canción o mándanos el link de YouTube/Spotify y nosotros la ponemos de fondo."
  },
  {
    pregunta: "¿Cuánto tardan en entregarla?",
    respuesta: "Sabemos que la fiesta se acerca. Te la entregamos en menos de 24 horas una vez nos pases los datos."
  }
]

// --- LÓGICA (Igual a BodasView) ---
const testimonioActual = ref(0)
const faqAbierta = ref(0)
let intervaloSlider

const siguienteTestimonio = () => {
  testimonioActual.value = (testimonioActual.value + 1) % testimonios.length
}

const toggleFaq = (index) => {
  faqAbierta.value = faqAbierta.value === index ? -1 : index
}

onMounted(() => {
  intervaloSlider = setInterval(siguienteTestimonio, 5000)
})

onUnmounted(() => {
  clearInterval(intervaloSlider)
})
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-fuchsia-200">
    
    <Navbar />

    <header class="relative h-[85vh] flex items-center justify-center overflow-hidden bg-purple-900">
      
      <div class="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1544211079-1d4d0337b51f?q=80&w=1920&auto=format&fit=crop" 
          class="w-full h-full object-cover opacity-60 animate-pan-slow"
          alt="Fiesta de 15"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-purple-900/60 via-fuchsia-900/40 to-slate-50"></div>
      </div>

      <div class="relative z-10 text-center px-4 max-w-4xl mx-auto mt-10">
        
        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold tracking-widest uppercase mb-8 animate-fade-in-up">
          <PhSparkle weight="fill" class="text-yellow-300" /> Tendencia 2026
        </div>

        <h1 class="text-5xl md:text-8xl font-extrabold text-white tracking-tight leading-none drop-shadow-2xl mb-6 font-seasons">
          Mis 15 Años <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 font-serif italic">Soñados</span>
        </h1>

        <p class="text-lg md:text-2xl text-purple-100 mb-10 font-light max-w-2xl mx-auto leading-relaxed">
          La invitación que tus amigos sí van a ver. <br>
          Música, fotos, countdown y confirmación inmediata.
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <router-link to="/invitacion/valentina-xv" class="w-full sm:w-auto bg-fuchsia-600 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-fuchsia-500 hover:scale-105 transition shadow-lg shadow-fuchsia-900/50 flex items-center justify-center gap-2">
            <PhMonitorPlay weight="fill" size="24" />
            Ver Demo
          </router-link>
          
          <a href="#precios" class="w-full sm:w-auto bg-white/10 border border-white/40 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-purple-900 transition flex items-center justify-center backdrop-blur-sm">
            Ver Paquetes
          </a>
        </div>
      </div>
    </header>

    <div class="bg-white py-12 -mt-10 relative z-20 rounded-t-[3rem] shadow-xl">
       <div class="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div class="space-y-2">
             <div class="w-12 h-12 mx-auto bg-purple-50 rounded-full flex items-center justify-center text-purple-600">
                <PhCamera size="24" weight="fill" />
             </div>
             <h4 class="font-bold text-slate-700">Galería de Fotos</h4>
          </div>
          <div class="space-y-2">
             <div class="w-12 h-12 mx-auto bg-pink-50 rounded-full flex items-center justify-center text-pink-600">
                <PhMusicNotes size="24" weight="fill" />
             </div>
             <h4 class="font-bold text-slate-700">Tu Playlist</h4>
          </div>
          <div class="space-y-2">
             <div class="w-12 h-12 mx-auto bg-indigo-50 rounded-full flex items-center justify-center text-indigo-600">
                <PhClock size="24" weight="fill" />
             </div>
             <h4 class="font-bold text-slate-700">Cuenta Regresiva</h4>
          </div>
          <div class="space-y-2">
             <div class="w-12 h-12 mx-auto bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600">
                <PhWhatsappLogo size="24" weight="fill" />
             </div>
             <h4 class="font-bold text-slate-700">Confirmación</h4>
          </div>
       </div>
    </div>

    <section id="precios" class="py-20 px-6 bg-slate-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-extrabold text-slate-900">Paquetes 15 Años</h2>
          <p class="mt-4 text-xl text-slate-500">Elige el estilo que va contigo.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          
          <div 
            v-for="plan in planes" 
            :key="plan.nombre"
            class="bg-white rounded-[2rem] p-8 relative transition-all duration-300 hover:shadow-2xl border"
            :class="plan.destacado ? 'border-purple-500 shadow-2xl scale-105 z-10' : 'border-slate-100 hover:-translate-y-1'"
          >
            <div v-if="plan.destacado" class="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-2xl rounded-tr-xl uppercase tracking-widest">
              Más Pedido
            </div>

            <component :is="plan.icono" :size="48" :class="plan.color" class="mb-4" weight="duotone" />

            <h3 class="text-2xl font-bold text-slate-800">{{ plan.nombre }}</h3>
            <p class="text-slate-500 text-sm mt-2 mb-6 h-10">{{ plan.descripcion }}</p>
            
            <div class="mb-6 pb-6 border-b border-slate-100">
              <span class="text-5xl font-extrabold text-slate-900">{{ plan.precio }}</span>
              <span class="text-xl text-slate-400 font-bold ml-1">Bs</span>
            </div>

            <ul class="space-y-4 mb-8">
              <li v-for="(feature, index) in plan.caracteristicas" :key="index" class="flex items-center text-left">
                <PhCheckCircle class="flex-shrink-0 text-emerald-400 mt-0.5" size="20" weight="fill" />
                <span class="ml-3 text-slate-600 text-sm font-medium">{{ feature }}</span>
              </li>
            </ul>

            <a 
              :href="`https://wa.me/59164042420?text=Hola,%20quiero%20el%20plan%20de%2015%20Años%20${plan.nombre}`" 
              target="_blank"
              class="block w-full text-center py-4 rounded-xl font-bold transition-all duration-300"
              :class="plan.btnColor"
            >
              Lo Quiero
            </a>
          </div>

        </div>
      </div>
    </section>

    <section class="py-20 px-6 bg-white">
       <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
             <h2 class="text-3xl font-bold text-slate-900 mb-2">Diseños que Enamoran</h2>
             <p class="text-slate-500">Desde lo clásico hasta lo neón.</p>
          </div>
          
          <div class="grid md:grid-cols-3 gap-8">
             <div v-for="modelo in modelos" :key="modelo.titulo" class="group relative rounded-2xl overflow-hidden shadow-lg cursor-pointer aspect-[3/4]">
                <img :src="modelo.img" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                
                <div class="absolute bottom-0 left-0 p-6 w-full text-white">
                   <h3 class="text-xl font-bold mb-2">{{ modelo.titulo }}</h3>
                   <router-link :to="modelo.link" class="inline-flex items-center gap-2 text-sm font-bold text-purple-200 hover:text-white transition">
                      Ver Invitación <PhArrowRight />
                   </router-link>
                </div>
             </div>
          </div>
       </div>
    </section>

    <section class="py-20 px-6 bg-purple-50">
       <div class="max-w-3xl mx-auto">
          <div class="text-center mb-10">
             <h2 class="text-3xl font-bold text-purple-900">Preguntas Frecuentes</h2>
          </div>
          
          <div class="space-y-4">
            <div 
              v-for="(faq, index) in faqs" 
              :key="index" 
              class="bg-white rounded-2xl border border-purple-100 overflow-hidden"
            >
              <button 
                @click="toggleFaq(index)"
                class="w-full flex items-center justify-between p-6 text-left focus:outline-none"
              >
                <span class="font-bold text-slate-800">{{ faq.pregunta }}</span>
                <PhCaretDown 
                  :size="20" 
                  class="text-purple-400 transition-transform duration-300"
                  :class="faqAbierta === index ? 'rotate-180 text-purple-600' : ''" 
                />
              </button>
              <div v-show="faqAbierta === index" class="px-6 pb-6 text-slate-600 animate-fade-in-down">
                <p>{{ faq.respuesta }}</p>
              </div>
            </div>
          </div>
       </div>
    </section>

    <footer class="bg-slate-900 text-slate-400 py-10 text-center text-sm">
      <p>© 2026 Yupa Studio - Especialistas en 15 Años</p>
    </footer>

  </div>
</template>

<style scoped>
.font-seasons {
  font-family: 'The Seasons', 'Playfair Display', serif; 
}
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-5px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-down {
  animation: fadeInDown 0.3s ease-out forwards;
}
</style>