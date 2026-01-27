<script setup>
import { PhCheckCircle, PhStar, PhHeart, PhCrown, PhMonitorPlay, PhSparkle, PhImage, PhMusicNote, PhMapPin, PhWhatsappLogo } from '@phosphor-icons/vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import Testimonios from '../components/Testimonios.vue'
import PreguntasFrecuentes from '../components/PreguntasFrecuentes.vue'

// Nuevos Precios y Características Detalladas
const planes = [
  {
    nombre: "Esencial",
    precio: "149",
    icono: PhHeart,
    descripcion: "La versión digital de tu tarjeta impresa. Elegante y completa.",
    destacado: false,
    color: "text-rose-400",
    btnColor: "bg-white border-2 border-rose-400 text-rose-500 hover:bg-rose-50",
    caracteristicas: [
      "Diseño Responsivo (Móvil/PC)",
      "Ubicación GPS (Google Maps)",
      "Sección Padrinos y Padres", // <--- MOVIDO AQUÍ
      "Cuenta Regresiva",
      "Confirmación a WhatsApp",
      "Sección de Regalos (QR/Bancos)",
      "Música de Fondo",
      "Frase de los Novios"
    ]
  },
  {
    nombre: "Gold",
    precio: "249",
    icono: PhStar,
    descripcion: "El favorito. Cuenta tu historia con fotos y detalles.",
    destacado: true,
    color: "text-amber-500",
    btnColor: "bg-gradient-to-r from-amber-400 to-amber-500 text-white hover:shadow-lg shadow-amber-100",
    caracteristicas: [
      "Todo lo del Plan Esencial",
      "Galería de Fotos (Sesión Pre-boda)",
      "Cronograma de Actividades (Línea de tiempo)",
      "Código de Vestimenta (Con iconos)",
      "Botón 'Agendar en Calendario'"
    ]
  },
  {
    nombre: "Premium",
    precio: "399",
    icono: PhCrown,
    descripcion: "Impacta a tus invitados con pases personalizados.",
    destacado: false,
    color: "text-slate-800",
    btnColor: "bg-stone-900 text-white hover:bg-black",
    caracteristicas: [
      "Todo lo del Plan Gold",
      "Personalización por Invitado (Nombres en portada)",
      "Generador de Links (Para enviar fácil)",
      "Galería Extendida (Más fotos)",
      "Filtro de Instagram (Opcional)",
      "Soporte Prioritario VIP"
    ]
  }
]

const features = [
  { titulo: "Book de Fotos", desc: "Su historia de amor", icono: PhImage },
  { titulo: "Música Romántica", desc: "La canción de ustedes", icono: PhMusicNote },
  { titulo: "Mapa Exacto", desc: "Nadie se pierde", icono: PhMapPin },
  { titulo: "Confirmación", desc: "Lista de invitados fácil", icono: PhWhatsappLogo }
]

const modelos = [
  { titulo: "Estilo Clásico (Marsala)",
    tag: "Elegante / Atemporal",
    img: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=600",
    link: "/invitacion/juan-y-ana" },
  { titulo: "Estilo Gala Luxury",
    tag: "Minimalista / Black",
    img: "https://images.unsplash.com/photo-1667420421340-850fc44c9c45",
    link: "/invitacion/carlos-y-sofia" },
  { titulo: "Estilo Boho Garden",
    tag: "Rustico / Exterior",
    img: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?q=80&w=1169",
    link: "/invitacion/miguel-y-elena" },
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

const faqsBodas = [
  {
    pregunta: "¿Es un pago único o mensual?",
    respuesta: "Es un pago único. No hay mensualidades ni costos ocultos. Tu invitación estará activa por 3 meses."
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
    respuesta: "Recomendamos pedirla con 1 o 2 meses de anticipación para que tus invitados se organicen. De todas formas, nuestro servicio es rápido: la entregamos siempre en menos de 24 horas."
  }
]
</script>

<template>
  <div class="min-h-screen bg-white font-sans text-gray-800">
    <Navbar />
    <header class="relative h-screen flex items-center justify-center overflow-hidden bg-stone-900">
      
      <div class="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1920&auto=format&fit=crop" 
          class="w-full h-full object-cover animate-pan-slow"
          alt="Fondo Boda Lujo"
        />
        <div class="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-stone-900"></div>
      </div>
    
      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         <div class="absolute top-[20%] left-[20%] w-64 h-64 bg-amber-500/20 rounded-full blur-[100px] animate-pulse-slow"></div>
         <div class="absolute bottom-[20%] right-[10%] w-80 h-80 bg-rose-500/20 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>
      </div>
    
      <div class="relative z-10 text-center px-4 max-w-5xl mx-auto mt-0">

        <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-amber-100 text-[10px] md:text-xs font-bold tracking-[0.2em] uppercase mb-8 shadow-[0_0_15px_rgba(251,191,36,0.3)] animate-fade-in-up">
          <PhSparkle weight="fill" class="text-amber-300 animate-pulse" /> 
          Nueva Colección 2026
        </div>
      
        <h1 class="text-5xl md:text-8xl font-extrabold text-white tracking-tight leading-none drop-shadow-2xl mb-8">
          Tus invitaciones<br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-amber-200 to-rose-100 font-serif italic relative">
            inolvidables
            <div class="absolute -top-4 -right-4 text-amber-300 opacity-80 animate-ping-slow">
               <PhSparkle weight="fill" size="24" />
            </div>
          </span>
        </h1>
      
        <p class="text-lg md:text-2xl text-stone-200/90 mb-12 font-light max-w-2xl mx-auto leading-relaxed text-shadow-sm">
          Diseño web de lujo, mapas, música y confirmación inmediata. <br>
          La forma moderna de decir <span class="font-semibold text-white">"Sí, acepto"</span>.
        </p>
      
        <div class="flex flex-col sm:flex-row gap-6 justify-center items-center">

          <router-link to="/invitacion/juan-y-ana" class="group w-full sm:w-auto bg-gradient-to-r from-rose-700 to-rose-600 text-white px-10 py-4 rounded-full font-bold text-lg hover:brightness-110 hover:scale-105 transition-all duration-300 shadow-[0_0_30px_rgba(225,29,72,0.4)] flex items-center justify-center gap-3 border border-white/10">
            <PhMonitorPlay weight="fill" size="24" class="text-rose-200" />
            Ver Demo Real
          </router-link>

          <a href="#precios" class="w-full sm:w-auto bg-white/5 border border-white/30 text-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-stone-900 hover:border-white transition-all duration-300 flex items-center justify-center backdrop-blur-sm">
            Ver Precios
          </a>
        </div>
      </div>
    
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/30 cursor-pointer">
          <PhCaretDown size="32" weight="thin" />
      </div>
    
    </header>

    <section class="relative z-20 -mt-8 px-4">
      <div class="max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-stone-900/10 p-8 md:p-12 border border-stone-100">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div v-for="(feat, index) in features" :key="index" class="group flex flex-col items-center text-center">
            <div class="w-20 h-20 md:w-24 md:h-24 bg-rose-50 border border-rose-100 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-rose-50 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
              <component :is="feat.icono" :size="32" weight="light" class="text-rose-600" />
            </div>
            <h4 class="font-bold text-stone-800 text-lg mb-1 group-hover:text-rose-600 transition-colors">{{ feat.titulo }}</h4>
            <p class="text-sm text-stone-400 font-light leading-snug">{{ feat.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="precios" class="py-24 px-6 bg-stone-50">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-extrabold text-stone-800 font-serif">Nuestros Paquetes</h2>
          <p class="mt-4 text-xl text-stone-500 font-light">Un solo pago. Sin sorpresas.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          <div v-for="plan in planes" :key="plan.nombre" class="bg-white rounded-[2.5rem] p-10 relative transition-all duration-300 flex flex-col h-full border" :class="plan.destacado ? 'border-amber-400 shadow-2xl scale-105 z-10' : 'border-stone-100 hover:shadow-xl hover:-translate-y-2'">
            
            <div v-if="plan.destacado" class="absolute top-0 right-0 bg-amber-400 text-white text-xs font-bold px-5 py-2 rounded-bl-3xl rounded-tr-[2.2rem] uppercase tracking-widest shadow-md">Recomendado</div>

            <div class="mb-6 flex justify-center">
               <component :is="plan.icono" :size="72" weight="thin" class="transition-transform duration-500 group-hover:scale-110" :class="plan.color" />
            </div>

            <h3 class="text-2xl font-bold text-stone-800 text-center font-serif">{{ plan.nombre }}</h3>
            <p class="text-stone-400 text-sm mt-2 mb-8 h-10 text-center leading-snug flex items-center justify-center">{{ plan.descripcion }}</p>
            
            <div class="mb-8 pb-8 border-b border-stone-100 text-center">
              <span class="text-5xl font-extrabold text-stone-900">{{ plan.precio }}</span>
              <span class="text-xl font-bold text-stone-400 ml-1">Bs</span>
              <p class="text-xs text-stone-400 mt-2 uppercase tracking-wide opacity-70">Pago Único</p>
            </div>

            <ul class="space-y-4 mb-10 flex-grow px-2">
              <li v-for="(feature, index) in plan.caracteristicas" :key="index" class="flex items-start text-left">
                <PhCheckCircle class="flex-shrink-0 mt-0.5 text-rose-500" size="22" weight="light" />
                <span class="ml-3 text-stone-600 text-sm font-medium">{{ feature }}</span>
              </li>
            </ul>

            <a :href="`https://wa.me/59164042420?text=Hola,%20me%20interesa%20el%20plan%20de%20Boda%20${plan.nombre}`" target="_blank" class="block w-full text-center py-4 rounded-xl font-bold transition-all duration-300 shadow-sm" :class="plan.btnColor">Elegir Plan</a>
          </div>
        </div>

        <div class="mt-16 text-center border-t border-stone-200 pt-8 max-w-2xl mx-auto opacity-70">
          <p class="text-stone-400 text-xs font-bold uppercase tracking-widest mb-3">Métodos de Pago</p>
          <div class="flex flex-wrap justify-center gap-6 text-sm text-stone-500 font-medium">
             <span>QR Simple</span> • <span>Transferencia</span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 px-6 bg-white relative overflow-hidden">
      <div class="absolute top-1/2 left-0 w-96 h-96 bg-rose-50 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>

      <div class="max-w-6xl mx-auto relative z-10">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-extrabold text-stone-800 mb-4 font-serif">Diseños que Enamoran</h2>
          <p class="text-xl text-stone-500 font-light">Estilos clásicos, modernos y bohemios.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-10 md:gap-12">
          <div v-for="modelo in modelos" :key="modelo.titulo" class="group flex flex-col items-center">
            
            <div class="relative w-full max-w-[280px] aspect-[9/18] rounded-[2.5rem] border-[8px] border-stone-200 bg-stone-100 shadow-2xl overflow-hidden transform transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-rose-100">
              <div class="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-stone-200 rounded-b-2xl z-20"></div>
              <img :src="modelo.img" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
              
              <div class="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 backdrop-blur-[1px]">
                <router-link :to="modelo.link" class="bg-white text-stone-900 px-6 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition-transform">Ver Demo</router-link>
              </div>
            </div>

            <div class="mt-8 text-center">
               <h3 class="text-2xl font-bold text-stone-800 mb-1 font-serif">{{ modelo.titulo }}</h3>
               <span class="text-xs font-bold text-stone-400 uppercase tracking-widest">{{ modelo.tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Testimonios :datos="testimonios" titulo="Novios Felices" temaColor="bg-rose-500" temaTexto="text-rose-500" />
    <PreguntasFrecuentes :datos="faqsBodas" tema="text-rose-600" fondoActivo="bg-rose-50" />
    <Footer />
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