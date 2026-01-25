<script setup>
import { PhConfetti, PhHeart, PhBaby, PhArrowRight, PhClock, PhMapPin, PhMusicNote, PhWhatsappLogo, PhNumberCircleOne, PhNumberCircleTwo, PhNumberCircleThree } from '@phosphor-icons/vue'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import PreguntasFrecuentes from '../components/PreguntasFrecuentes.vue'
import Testimonios from '../components/Testimonios.vue'

// Categorías de Servicios
const categorias = [
  {
    titulo: "Bodas",
    descripcion: "Elegancia atemporal, mapas GPS y confirmación de asistencia.",
    imagen: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop",
    ruta: "/bodas",
    icono: PhHeart,
    // Colores Yupa: Rose
    claseBoton: "bg-rose-600 hover:bg-rose-500",
    claseTexto: "text-rose-600",
    claseSombra: "shadow-rose-500/40", 
    textoBoton: "Ver Planes de Boda"
  },
  {
    titulo: "15 Años",
    descripcion: "Brillo, música, cuenta regresiva y estilo moderno.",
    imagen: "https://images.unsplash.com/photo-1705626308236-490402f6c1cd?q=80&w=681",
    ruta: "/15-anos",
    icono: PhConfetti,
    // Colores Yupa: Fuchsia
    claseBoton: "bg-fuchsia-600 hover:bg-fuchsia-500",
    claseTexto: "text-fuchsia-600",
    claseSombra: "shadow-fuchsia-500/40",
    textoBoton: "Ver Estilos 15s"
  },
  {
    titulo: "Infantiles",
    descripcion: "Diseños tiernos y divertidos para celebrar la vida.",
    imagen: "https://images.unsplash.com/photo-1748813792164-41696e6173b6?q=80&w=1170",
    ruta: "/infantiles",
    icono: PhBaby,
    // Colores Yupa: Sky
    claseBoton: "bg-sky-500 hover:bg-sky-400",
    claseTexto: "text-sky-500",
    claseSombra: "shadow-sky-500/40",
    textoBoton: "Ver Invitaciones Kids"
  }
]

const pasos = [
  { 
    titulo: "Elige Diseño y Plan", 
    desc: "Entra a tu categoría (Boda, 15s...), escoge la plantilla que te enamore y el plan ideal.", 
    icono: PhNumberCircleOne
  },
  { 
    titulo: "Envía tus Datos", 
    desc: "Te pediremos las fotos y la ubicación por WhatsApp para personalizar todo.", 
    icono: PhNumberCircleTwo
  },
  { 
    titulo: "Recibe tu Link", 
    desc: "En menos de 24 horas recibes tu invitación lista para enviar a tus invitados.", 
    icono: PhNumberCircleThree
  }
]

const beneficios = [
  { 
    texto: "Entrega Rápida", 
    subtexto: "En menos de 24 horas",
    icono: PhClock
  },
  { 
    texto: "Ubicación GPS", 
    subtexto: "Tus invitados llegan fácil",
    icono: PhMapPin
  },
  { 
    texto: "Música de Fondo", 
    subtexto: "Ambiente desde el clic",
    icono: PhMusicNote
  },
  { 
    texto: "Confirmación WhatsApp", 
    subtexto: "Gestión sin estrés",
    icono: PhWhatsappLogo
  }
]
const faqsHome = [
  {
    pregunta: "¿Es un pago único o debo pagar mes a mes?",
    respuesta: "Es un solo pago único. No hay suscripciones ni costos ocultos. Tu invitación se mantiene activa hasta 1 mes después de tu evento para que todos puedan ver las fotos y ubicaciones."
  },
  {
    pregunta: "¿Qué pasa si tengo que cambiar la fecha o el lugar?",
    respuesta: "¡No te preocupes! Entendemos que los imprevistos pasan. Nos avisas por WhatsApp y actualizamos la información al instante sin costo adicional. Tus invitados verán el cambio automáticamente en el mismo link."
  },
  {
    pregunta: "¿Cómo se la envío a mis invitados?",
    respuesta: "Es súper fácil. Te entregamos un enlace personalizado (ej: yupa.studio/boda/ana-y-juan). Solo copias y pegas ese link en tus chats de WhatsApp, grupos o Messenger. ¡Sin límites de envíos!"
  },
  {
    pregunta: "¿Mis invitados necesitan descargar alguna aplicación?",
    respuesta: "No, para nada. Nuestra tecnología funciona en cualquier navegador (Chrome, Safari, etc.) sin instalar nada. Se abre al instante en cualquier celular, tablet o computadora."
  },
  {
    pregunta: "¿Cuánto tiempo tardan en entregarla?",
    respuesta: "Sabemos que el tiempo es oro. Una vez nos envías tus datos y fotos, garantizamos la entrega de tu diseño terminado en menos de 24 horas."
  }
]
const testimoniosHome = [
  {
    texto: "Tenía miedo de que mis abuelos no pudieran abrirla, pero es tan sencilla que todos confirmaron sin problemas. La función del mapa GPS nos salvó de muchas llamadas perdidas.",
    pareja: "Carla y Marcos", // Cliente Boda (Pragmático)
    boda: "Boda en Cochabamba"
  },
  {
    texto: "¡Quedó hermosa! Mi hija quería algo muy 'aesthetic' con su canción favorita de fondo. La cuenta regresiva emocionó a todas sus amigas antes de la fiesta.",
    pareja: "Sra. Patricia", // Cliente 15s (Mamá complaciente)
    boda: "15 Años en Santa Cruz"
  },
  {
    texto: "Necesitábamos las invitaciones urgente para el bautizo y Yupa Studio nos la entregó esa misma tarde. Excelente servicio y muy amables al explicarnos todo.",
    pareja: "Familia Ríos", // Cliente Infantil (Con prisa/Urgencia)
    boda: "Bautizo en La Paz"
  },
  {
    texto: "Vivimos en España pero la boda es en Tarija. Fue la solución perfecta para invitar a nuestra familia a distancia sin gastar en envíos postales. Muy recomendado.",
    pareja: "Lucía y David", // Cliente Distancia (Internacional)
    boda: "Boda en Tarija"
  }
]
</script>

<template>
  <div class="min-h-screen bg-stone-50 font-sans text-stone-800 selection:bg-rose-200">
    <Navbar />
    <header class="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-[#0F1420]">

      <div class="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1920&auto=format&fit=crop" 
          class="w-full h-full object-cover opacity-20 scale-105 animate-pan-slow"
          alt="Fondo Textura"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-[#0F1420] via-[#0F1420]/80 to-transparent"></div>
      </div>
    
      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div class="absolute top-[-10%] left-[-10%] w-96 h-96 bg-rose-600/30 rounded-full blur-[100px] animate-pulse-slow"></div>
        <div class="absolute bottom-0 right-[-10%] w-[500px] h-[500px] bg-fuchsia-600/20 rounded-full blur-[120px] animate-pulse-slow delay-1000"></div>
        <div class="absolute top-[20%] right-[20%] w-64 h-64 bg-sky-500/20 rounded-full blur-[80px] animate-pulse-slow delay-700"></div>
      </div>
    
      <div class="relative z-10 text-center px-6 max-w-5xl mx-auto -mt-16 md:-mt-16 transition-all duration-500">

        <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-stone-300 text-xs font-bold tracking-[0.2em] uppercase mb-8 animate-fade-in-up">
          <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
          Innovación en Eventos
        </div>
      
        <h1 class="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white mb-6 tracking-tight leading-[1.1] drop-shadow-2xl">
          Invitaciones que <br>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-300 via-fuchsia-300 to-sky-300 animate-gradient-text">
            emocionan.
          </span>
        </h1>
      
        <p class="text-lg md:text-2xl text-stone-300 font-light max-w-2xl mx-auto mb-10 leading-relaxed">
          Diseños digitales inteligentes para <span class="text-white font-medium">Bodas, 15 Años y Eventos Infantiles</span>.
          <span class="opacity-80">Sorprende a tus invitados desde el primer clic.</span>
        </p>
      
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 animate-bounce text-white/30">
           <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
           </svg>
        </div>
      
      </div>
    </header>

    <section class="relative z-20 -mt-24 pb-20 w-full px-4 md:px-10">
  
      <div class="w-full max-w-[1800px] mx-auto">

        <div class="grid md:grid-cols-3 gap-6 lg:gap-10">

          <div 
            v-for="(cat, index) in categorias" 
            :key="index"
            class="group bg-white rounded-[2.5rem] shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full hover:-translate-y-4 hover:shadow-3xl"
          >

            <div class="h-80 overflow-hidden relative">
              <img 
                :src="cat.imagen" 
                class="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1" 
              />

              <div class="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-500"></div>

              <div class="absolute inset-0 flex items-center justify-center">
                <div class="bg-white/10 backdrop-blur-md border border-white/30 p-6 rounded-full shadow-2xl transform transition-transform duration-500 group-hover:scale-110 group-hover:bg-white/20">
                  <component 
                    :is="cat.icono" 
                    :size="64" 
                    weight="thin" 
                    class="text-white drop-shadow-md" 
                  />
                </div>
              </div>
            </div>
          
            <div class="p-10 flex flex-col flex-grow text-center items-center relative">

              <div class="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 rounded-b-full opacity-50 transition-colors duration-300" :class="cat.claseBoton"></div>
            
              <h3 class="text-4xl font-extrabold text-stone-800 mb-4 tracking-tight">{{ cat.titulo }}</h3>

              <p class="text-stone-500 mb-10 text-lg leading-relaxed font-light">
                {{ cat.descripcion }}
              </p>

              <div class="mt-auto w-full">
                <router-link 
                  :to="cat.ruta" 
                  class="w-full py-5 rounded-2xl font-bold text-white flex items-center justify-center gap-3 transition-all duration-300 transform active:scale-95 text-lg shadow-lg"
                  :class="[cat.claseBoton, cat.claseSombra]"
                >
                  {{ cat.textoBoton }} 
                  <PhArrowRight weight="light" size="24" />
                </router-link>
              </div>
            
            </div>
          </div>
        
        </div>
      </div>
    </section>

    <section class="py-20 px-6 bg-stone-50 border-t border-stone-100">
      <div class="max-w-5xl mx-auto">
        
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-stone-800">¿Cómo funciona?</h2>
          <p class="text-stone-500 mt-2">Tener tu invitación digital es muy simple.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-12 relative">
          <div class="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-stone-200 via-rose-200 to-stone-200"></div>

          <div v-for="(paso, index) in pasos" :key="index" class="relative z-10 flex flex-col items-center text-center">
            
            <div class="w-24 h-24 bg-white border border-stone-100 rounded-full flex items-center justify-center mb-6 shadow-lg shadow-stone-100 group hover:scale-110 transition-transform duration-300">
              <component 
                :is="paso.icono" 
                :size="48" 
                weight="thin" 
                class="text-rose-500" 
              />
            </div>

            <h3 class="text-xl font-bold text-stone-800 mb-2">{{ paso.titulo }}</h3>
            <p class="text-stone-500 text-sm px-4 leading-relaxed">{{ paso.desc }}</p>
          </div>

        </div>
      </div>
    </section>

    <section class="py-24 px-6 bg-white relative border-t border-stone-100 overflow-hidden">
      <div class="max-w-7xl mx-auto relative z-10">

        <div class="text-center mb-16">
          <h3 class="text-stone-400 font-bold uppercase tracking-[0.2em] text-xs md:text-sm mb-3">
            Experiencia Yupa Studio
          </h3>
          <h2 class="text-3xl md:text-4xl font-extrabold text-stone-800 tracking-tight">
            Todo lo que necesitas, <br class="md:hidden"> en un solo link
          </h2>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          <div 
            v-for="(ben, i) in beneficios" 
            :key="i" 
            class="group flex flex-col items-center text-center gap-4 p-4 rounded-3xl transition-all duration-300 hover:bg-stone-50"
          >
            <div class="w-24 h-24 rounded-full bg-rose-50 border border-rose-100 flex items-center justify-center mb-2 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-sm">
              <component 
                :is="ben.icono" 
                :size="48" 
                weight="thin" 
                class="text-rose-500 drop-shadow-sm" 
              />
            </div>
            <div>
               <h4 class="font-bold text-lg text-stone-800 mb-1 group-hover:text-stone-600 transition-colors">
                 {{ ben.texto }}
               </h4>
               <p class="text-sm text-stone-400 font-light">
                 {{ ben.subtexto }}
               </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <Testimonios 
      :datos="testimoniosHome" 
      titulo="Clientes Felices"
      temaColor="bg-rose-500"
      temaTexto="text-rose-400"
    />

    <PreguntasFrecuentes 
      :datos="faqsHome" 
      tema="text-rose-500"
      fondoActivo="bg-rose-50"
    />

    <Footer />
  </div>
</template>

<style scoped>
/* Animación de movimiento lento de fondo */
@keyframes pan-slow {
  0% { transform: scale(1.05) translate(0, 0); }
  50% { transform: scale(1.1) translate(-1%, -1%); }
  100% { transform: scale(1.05) translate(0, 0); }
}
.animate-pan-slow {
  animation: pan-slow 20s ease-in-out infinite alternate;
}

/* Animación de pulsación lenta para las luces */
@keyframes pulse-slow {
  0%, 100% { opacity: 0.3; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.1); }
}
.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}

/* Animación de entrada suave hacia arriba */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
}
</style>