<script setup>
import { PhSparkle, PhMusicNotes, PhWhatsappLogo, PhCrown, PhArrowRight, PhCheckCircle, PhImage, PhMonitorPlay, PhMusicNote, PhTimer, PhEye } from '@phosphor-icons/vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import PreguntasFrecuentes from '../components/PreguntasFrecuentes.vue'
import Testimonios from '../components/Testimonios.vue'

const planes = [
  {
    nombre: "Party",
    precio: "119",
    icono: PhMusicNotes,
    descripcion: "La tarjeta clásica, versión digital.",
    destacado: false,
    color: "text-fuchsia-500",
    btnColor: "bg-white border-2 border-fuchsia-400 text-fuchsia-500 hover:bg-fuchsia-50",
    caracteristicas: [
      "Diseño Web Móvil",
      "Cuenta Regresiva",
      "Ubicación GPS (Google Maps)",
      "Sección Padrinos y Padres",
      "Sección de Regalos (QR/Sobres)",
      "Confirmación WhatsApp",
      "Música de Fondo"
    ]
  },
  {
    nombre: "Glow",
    precio: "199",
    icono: PhSparkle,
    descripcion: "El favorito. Con fotos y detalles de la fiesta.",
    destacado: true,
    color: "text-purple-600",
    btnColor: "bg-gradient-to-r from-purple-500 to-fuchsia-500 text-white hover:shadow-lg shadow-purple-200",
    caracteristicas: [
      "Todo lo del Plan Party",
      "Galería de Fotos (Sesión de 15)",
      "Cronograma (Vals, Hora Loca...)",
      "Código de Vestimenta (Iconos)",
      "Botón 'Agendar en Calendario'",
      "Frase Inspiradora"
    ]
  },
  {
    nombre: "Queen",
    precio: "349",
    icono: PhCrown,
    descripcion: "Haz sentir VIP a tus amigos.",
    destacado: false,
    color: "text-amber-500",
    btnColor: "bg-stone-900 text-white hover:bg-black",
    caracteristicas: [
      "Todo lo del Plan Glow",
      "Pases Personalizados (Nombre del invitado)",
      "Filtro de Instagram (Link directo)",
      "Galería Extendida (Más fotos)",
      "Generador de Links",
      "Soporte Prioritario"
    ]
  }
]

const features = [
  { titulo: "Book de Fotos", desc: "Muestra tu sesión pre-15.", icono: PhImage },
  { titulo: "Tu Playlist", desc: "Tus amigos eligen música.", icono: PhMusicNote },
  { titulo: "Countdown", desc: "Cuenta regresiva exacta.", icono: PhTimer },
  { titulo: "Confirmación", desc: "Directo a tu WhatsApp.", icono: PhWhatsappLogo }
]

const modelos = [
  {
    titulo: "Euphoria Night",
    tag: "Neón / Moderno",
    img: "https://images.unsplash.com/photo-1493225255756-d9584f8606e9?q=80&w=800&auto=format&fit=crop", 
    link: "/invitacion/camila-xv",
    color: "bg-purple-600"
  },
  {
    titulo: "Rose Gold Dream",
    tag: "Elegante / Romántico",
    img: "https://images.unsplash.com/photo-1530103862676-de3c9da59af7?q=80&w=800&auto=format&fit=crop", 
    link: "/invitacion/valentina-xv",
    color: "bg-rose-500"
  },
  {
    titulo: "Golden Princess",
    tag: "Clásico / Dorado",
    img: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?q=80&w=800&auto=format&fit=crop", 
    link: "/invitacion/sofia-xv",
    color: "bg-amber-500"
  }
]
const testimonios = [
  {
    pareja: "Sra. Claudia (Mamá)", // Usamos 'pareja' porque así lo espera el componente, aunque sea mamá
    texto: "A mi hija le encantó verse en la invitación como una princesa. Fue muy fácil de enviar a toda la familia.",
    boda: "15 de Camila"
  },
  {
    pareja: "Valentina (Quinceañera)",
    texto: "Mis amigas amaron la música y las fotos. ¡Quedó súper aesthetic! Gracias por la paciencia.",
    boda: "Mis 15"
  },
  {
    pareja: "Sra. Patricia",
    texto: "Muy útil el mapa y la confirmación. Me ahorró el estrés de llamar a los invitados uno por uno.",
    boda: "15 de Sofía"
  }
]
const faqsQuince = [
  { pregunta: "¿Qué fotos necesito?", respuesta: "Idealmente de tu sesión pre-15. Si no tienes, usamos fotos bonitas de celular y las editamos." },
  { pregunta: "¿Puedo poner música de TikTok?", respuesta: "¡Sí! Dinos el nombre de la canción o mándanos el link y nosotros la ponemos." },
  { pregunta: "¿Cuánto tardan?", respuesta: "Te la entregamos en menos de 24 horas una vez nos pases los datos." }
]
</script>

<template>
  <div class="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-fuchsia-200">
    <Navbar />

    <header class="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#1a0b2e]">
       <div class="absolute inset-0 z-0">
        <img src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=1920&auto=format&fit=crop" class="w-full h-full object-cover opacity-40 animate-pan-slow" />
        <div class="absolute inset-0 bg-gradient-to-t from-[#1a0b2e] via-[#1a0b2e]/60 to-purple-900/20"></div>
      </div>
      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-fuchsia-600/30 rounded-full blur-[120px] animate-pulse-slow"></div>
        <div class="absolute bottom-[10%] right-[-5%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
      </div>
      <div class="relative z-10 text-center px-4 max-w-5xl mx-auto mt-0 md:-mt-10 transition-all duration-500">
        <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-fuchsia-200 text-xs font-bold tracking-[0.2em] uppercase mb-8 shadow-2xl animate-fade-in-up">
          <PhSparkle weight="fill" class="text-fuchsia-400 animate-pulse" /> Tendencia 2026
        </div>
        <h1 class="text-6xl md:text-8xl lg:text-9xl font-extrabold text-white tracking-tighter leading-none drop-shadow-2xl mb-6 font-seasons">
          Mis 15 <span class="text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-400 to-purple-600">Años</span>
        </h1>
        <p class="text-3xl md:text-5xl font-serif italic text-fuchsia-200 mb-8 -mt-4 opacity-90">Soñados & Inolvidables</p>
        <p class="text-lg md:text-xl text-purple-100/80 mb-10 font-light max-w-xl mx-auto leading-relaxed">
          La invitación digital que tus amigos <span class="text-white font-medium border-b border-fuchsia-500/50">sí van a ver</span>.
          <br> Música, countdown, dress code y pases QR.
        </p>
        <div class="flex flex-col sm:flex-row gap-5 justify-center items-center">
          <router-link to="/invitacion/valentina-xv" class="group relative w-full sm:w-auto bg-fuchsia-600 text-white px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(192,38,211,0.6)]">
            <div class="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
            <span class="flex items-center justify-center gap-3 relative z-10"><PhMonitorPlay weight="fill" size="24" /> Ver Demo Real</span>
          </router-link>
          <a href="#precios" class="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg text-white border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all flex items-center justify-center gap-2">Ver Paquetes</a>
        </div>
      </div>
      <div class="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white/30 cursor-pointer">
         <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
      </div>
    </header>

    <section class="relative z-20 -mt-12 px-4">
      <div class="max-w-6xl mx-auto bg-white rounded-[2.5rem] shadow-2xl shadow-purple-900/10 p-8 md:p-12 border border-purple-50">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div v-for="(feat, index) in features" :key="index" class="group flex flex-col items-center text-center">
            <div class="w-20 h-20 md:w-24 md:h-24 bg-fuchsia-50 border border-fuchsia-100 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-fuchsia-100 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6">
              <component :is="feat.icono" :size="40" weight="thin" class="text-fuchsia-600 drop-shadow-sm" />
            </div>
            <h4 class="font-bold text-stone-800 text-lg mb-1 group-hover:text-fuchsia-700 transition-colors">{{ feat.titulo }}</h4>
            <p class="text-sm text-stone-400 font-light leading-snug">{{ feat.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="precios" class="py-20 px-6 bg-slate-50">
       <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-extrabold text-slate-900">Paquetes 15 Años</h2>
          <p class="mt-4 text-xl text-slate-500">Elige el estilo que va contigo.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          <div v-for="plan in planes" :key="plan.nombre" class="bg-white rounded-[2rem] p-8 relative transition-all duration-300 hover:shadow-2xl border" :class="plan.destacado ? 'border-purple-500 shadow-2xl scale-105 z-10' : 'border-slate-100 hover:-translate-y-1'">
            <div v-if="plan.destacado" class="absolute top-0 right-0 bg-purple-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-2xl rounded-tr-xl uppercase tracking-widest">Más Pedido</div>
            <component :is="plan.icono" :size="48" :class="plan.color" class="mb-4" weight="duotone" />
            <h3 class="text-2xl font-bold text-slate-800">{{ plan.nombre }}</h3>
            <p class="text-slate-500 text-sm mt-2 mb-6 h-10">{{ plan.descripcion }}</p>
            <div class="mb-6 pb-6 border-b border-slate-100">
              <span class="text-5xl font-extrabold text-slate-900">{{ plan.precio }}</span>
              <span class="text-xl text-slate-400 font-bold ml-1">Bs</span>
              <p class="text-xs text-slate-400 mt-1 uppercase tracking-wide">Pago Único</p>
            </div>
            <ul class="space-y-4 mb-8">
              <li v-for="(feature, index) in plan.caracteristicas" :key="index" class="flex items-center text-left">
                <PhCheckCircle class="flex-shrink-0 text-purple-600 mt-0.5" size="22" weight="thin" />
                <span class="ml-3 text-slate-600 text-sm font-medium">{{ feature }}</span>
              </li>
            </ul>
            <a :href="`https://wa.me/59164042420?text=Hola,%20quiero%20el%20plan%20de%2015%20Años%20${plan.nombre}`" target="_blank" class="block w-full text-center py-4 rounded-xl font-bold transition-all duration-300" :class="plan.btnColor">Lo Quiero</a>
          </div>
        </div>
        <div class="mt-16 text-center border-t border-slate-200 pt-8 max-w-2xl mx-auto opacity-80">
          <p class="text-slate-400 text-xs font-bold uppercase tracking-widest mb-3">Métodos de Pago</p>
          <div class="flex flex-wrap justify-center gap-6 text-sm text-slate-500 font-medium">
            <span class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-purple-400"></span> QR Simple</span>
            <span class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-purple-400"></span> Tigo Money</span>
            <span class="flex items-center gap-2"><span class="w-2 h-2 rounded-full bg-purple-400"></span> Transferencia</span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 px-6 bg-white relative overflow-hidden">
       <div class="absolute top-1/2 left-0 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-fuchsia-100/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>
      <div class="max-w-6xl mx-auto relative z-10">
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 text-purple-600 text-xs font-bold uppercase tracking-widest mb-4">
            <PhSparkle weight="fill" /> Catálogo 2026
          </div>
          <h2 class="text-4xl font-extrabold text-stone-900 mb-4">Diseños que Enamoran</h2>
          <p class="text-xl text-stone-500 font-light max-w-2xl mx-auto">Desde lo clásico y romántico hasta el estilo neón de tendencia.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-10 md:gap-12">
          <div v-for="modelo in modelos" :key="modelo.titulo" class="group flex flex-col items-center">
            <div class="relative w-full max-w-[280px] aspect-[9/18] rounded-[2.5rem] border-[8px] border-stone-900 bg-stone-900 shadow-2xl overflow-hidden transform transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-purple-200/50 group-hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)]">
              <div class="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-stone-900 rounded-b-2xl z-20"></div>
              <img :src="modelo.img" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 backdrop-blur-[2px]">
                <router-link :to="modelo.link" class="bg-white text-stone-900 px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 shadow-xl"><PhEye weight="bold" /> Ver Demo</router-link>
              </div>
            </div>
            <div class="mt-8 text-center">
               <h3 class="text-2xl font-bold text-stone-800 mb-1 group-hover:text-purple-600 transition-colors">{{ modelo.titulo }}</h3>
               <span class="text-sm font-medium text-stone-400 uppercase tracking-widest">{{ modelo.tag }}</span>
            </div>
          </div>
        </div>
        <div class="text-center mt-16">
           <p class="text-stone-400 text-sm mb-4">¿Buscas algo más personalizado?</p>
           <a href="https://wa.me/59164042420" class="inline-flex items-center gap-2 text-stone-800 font-bold border-b-2 border-purple-500 hover:text-purple-600 transition-colors pb-1">Hablemos por WhatsApp <PhArrowRight /></a>
        </div>
      </div>
    </section>

    <Testimonios 
      :datos="testimonios" 
      titulo="Lo que dicen las chicas"
      temaColor="bg-fuchsia-600"
      temaTexto="text-fuchsia-400"
    />

    <PreguntasFrecuentes 
      :datos="faqsQuince" 
      tema="text-purple-600" 
      fondoActivo="bg-purple-50"
    />

    <Footer />
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
/* Animación de brillo en el botón */
@keyframes shimmer {
  100% { transform: translateX(100%); }
}
.group-hover\:animate-shimmer {
  animation: shimmer 1.5s infinite;
}
</style>