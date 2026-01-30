<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import PreguntasFrecuentes from '../components/PreguntasFrecuentes.vue'
import Testimonios from '../components/Testimonios.vue'
import { PhBalloon, PhGift, PhMapPin, PhWhatsappLogo, PhStar, PhRocket, PhConfetti, PhEye, PhArrowRight } from '@phosphor-icons/vue'

// --- PLANES INFANTILES (Nombres divertidos) ---
const planes = [
  {
    nombre: "Chispitas",
    precio: "99",
    icono: PhBalloon,
    descripcion: "Bonito y simple para celebrar.",
    destacado: false,
    color: "text-sky-500", // Icono Celeste
    btnColor: "bg-white border-2 border-sky-400 text-sky-500 hover:bg-sky-50",
    caracteristicas: [
      "Diseño Temático (Personaje)",
      "Fecha y Hora",
      "Ubicación GPS",
      "Confirmación WhatsApp",
      "Música Infantil de Fondo",
      "Cuenta Regresiva",
      "Animación de Entrada",
      "Sección de Regalos",
    ]
  },
  {
    nombre: "Arcoíris",
    precio: "189",
    icono: PhStar,
    descripcion: "Con fotos y música. ¡El más alegre!",
    destacado: true,
    color: "text-amber-500", // Icono Amarillo/Dorado
    btnColor: "bg-amber-400 text-white hover:bg-amber-500 shadow-lg shadow-amber-200",
    caracteristicas: [
      "Todo lo del Plan Chispitas",
      "Galería de Fotos del Cumpleañero",
      "Cronograma (Itinerario)",
      "Botón Agendar Calendario",
      "Animaciones (Flotantes)"
    ]
  },
  {
    nombre: "Mágico",
    precio: "299",
    icono: PhRocket,
    descripcion: "Sin límites para una gran fiesta.",
    destacado: false,
    color: "text-indigo-500", // Icono Morado
    btnColor: "bg-white border-2 border-indigo-400 text-indigo-500 hover:bg-indigo-50",
    caracteristicas: [
      "Todo lo del Plan Arcoíris",
      "Invitación Perzonalizada",
      "Video Invitación Incluida",
      "Soporte Prioritario"
    ]
  }
]

// --- CARACTERÍSTICAS DIVERTIDAS ---
const features = [
  { titulo: "Temática", desc: "Su personaje favorito", icono: PhConfetti },
  { titulo: "Mapa Fácil", desc: "Para que nadie se pierda", icono: PhMapPin },
  { titulo: "Regalos", desc: "Sugerencias de juguetes", icono: PhGift },
  { titulo: "Confirmar", desc: "Respuesta rápida", icono: PhWhatsappLogo }
]

// --- CATÁLOGO DE EJEMPLOS ---
const modelos = [
  {
    titulo: "Safari Adventure",
    tag: "Selva / Animalitos",
    img: "https://images.unsplash.com/photo-1558086478-68e1694f2603?q=80&w=800&auto=format&fit=crop", 
    link: "#",
    color: "bg-emerald-500"
  },
  {
    titulo: "Dino Party",
    tag: "Dinosaurios",
    img: "https://images.unsplash.com/photo-1562046461-b51f845014b2?q=80&w=800&auto=format&fit=crop", 
    link: "#",
    color: "bg-amber-500"
  },
  {
    titulo: "Princess Castle",
    tag: "Princesas / Rosa",
    img: "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?q=80&w=800&auto=format&fit=crop", 
    link: "#",
    color: "bg-rose-400"
  }
]

// --- TESTIMONIOS (Mamás y Papás) ---
const testimonios = [
  {
    pareja: "Familia Méndez",
    texto: "La invitación de Dinosaurios de mi hijo quedó espectacular. Todos los papás del colegio nos preguntaron dónde la hicimos.",
    boda: "Cumple 5 de Thiago"
  },
  {
    pareja: "Sra. Carmen",
    texto: "Me salvó la vida. Organizar el primer año es estresante, pero la invitación fue lo más fácil y rápido.",
    boda: "1er Añito de Lucas"
  },
  {
    pareja: "Papás de Mía",
    texto: "Nos encantó que pudimos poner la lista de regalos sugeridos de forma sutil. Muy recomendado.",
    boda: "Bautizo de Mía"
  }
]

// --- FAQS INFANTILES ---
const faqsKids = [
  { pregunta: "¿Hacen de cualquier personaje?", respuesta: "¡Sí! Desde superhéroes y princesas hasta granjita o astronautas. Si tienes una idea, la hacemos realidad." },
  { pregunta: "¿Sirve para Bautizos y Baby Shower?", respuesta: "Claro que sí. Tenemos diseños tiernos y elegantes perfectos para esas ocasiones especiales." },
  { pregunta: "¿Puedo poner dos ubicaciones?", respuesta: "Sí, podemos poner la ubicación de la iglesia (para bautizos) y la del salón de fiestas." }
]
</script>

<template>
  <div class="min-h-screen bg-sky-50 font-sans text-slate-800 selection:bg-amber-200">
    <Navbar />

    <header class="relative h-screen flex flex-col items-center justify-center overflow-hidden bg-sky-50">
      
      <div class="absolute inset-0 z-0">
         <img 
           src="https://images.unsplash.com/photo-1513151233558-d860c5398176?q=80&w=1920&auto=format&fit=crop" 
           class="w-full h-full object-cover opacity-50 animate-pan-slow"
           alt="Confeti Fondo"
         />
         <div class="absolute inset-0 bg-gradient-to-b from-sky-200/20 via-white/40 to-white"></div>
      </div>

      <div class="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         <div class="absolute top-[15%] left-[10%] w-32 h-32 bg-amber-300/60 rounded-full blur-2xl animate-float"></div>
         <div class="absolute top-[20%] right-[15%] w-40 h-40 bg-pink-400/50 rounded-full blur-2xl animate-float delay-1000"></div>
         <div class="absolute bottom-[30%] left-[20%] w-56 h-56 bg-sky-400/40 rounded-full blur-3xl animate-float delay-700"></div>
      </div>

      <div class="relative z-30 text-center px-4 max-w-5xl mx-auto mt-10">
        
        <div class="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/80 backdrop-blur-sm border-2 border-sky-100 text-sky-500 text-xs font-bold tracking-widest uppercase mb-8 shadow-lg animate-bounce-slow">
           <PhBalloon weight="fill" class="text-amber-400 text-lg" /> 
           Celebraciones Mágicas
        </div>

        <h1 class="text-6xl md:text-8xl font-extrabold text-slate-800 tracking-tight leading-[1.1] mb-6 drop-shadow-sm font-display relative">
           Celebra la 
           <span class="relative inline-block">
             magia
             <svg class="absolute -bottom-2 left-0 w-full h-4 text-amber-400" viewBox="0 0 100 15" preserveAspectRatio="none">
               <path d="M0 10 Q 50 20 100 10" stroke="currentColor" stroke-width="4" fill="none" stroke-linecap="round" />
             </svg>
           </span> 
           <br>
           <span class="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-purple-500 to-pink-500">
             de crecer.
           </span>
        </h1>

        <p class="text-xl md:text-2xl text-slate-600/90 mb-10 font-medium max-w-2xl mx-auto leading-relaxed">
           Invitaciones digitales para Cumpleaños, Bautizos y Baby Showers.
           <span class="text-sky-600 font-bold">Tiernas, divertidas y listas en 24hrs.</span>
        </p>

        <div class="flex flex-col sm:flex-row gap-4 justify-center items-center">
           <a href="#precios" class="group w-full sm:w-auto bg-sky-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-sky-400 hover:-translate-y-1 transition-all shadow-[0_10px_20px_-5px_rgba(14,165,233,0.4)] flex items-center justify-center gap-2">
             <PhGift weight="fill" size="24" class="group-hover:animate-wiggle" />
             Ver Planes
           </a>
           
           <a href="#catalogo" class="w-full sm:w-auto px-8 py-4 rounded-full font-bold text-lg text-sky-600 bg-white border-2 border-sky-100 hover:bg-sky-50 hover:border-sky-200 transition-all flex items-center justify-center gap-2">
             <PhConfetti weight="duotone" size="24" />
             Ver Diseños
           </a>
        </div>
      </div>

      <div class="absolute bottom-0 left-0 w-full z-20">
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" class="text-white fill-current drop-shadow-sm">
           <path fill-opacity="1" d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,197.3C1248,171,1344,149,1392,138.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
         </svg>
      </div>

    </header>

    <section class="relative z-20 px-4">
      <div class="max-w-6xl mx-auto bg-white rounded-[3rem] shadow-xl p-8 md:p-12 border border-sky-100">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          
          <div v-for="(feat, index) in features" :key="index" class="group flex flex-col items-center text-center">
            <div class="w-20 h-20 bg-sky-50 border-2 border-sky-100 rounded-full flex items-center justify-center mb-4 shadow-sm transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12">
              <component :is="feat.icono" :size="36" weight="duotone" class="text-sky-500" />
            </div>
            <h4 class="font-bold text-slate-700 text-lg mb-1">{{ feat.titulo }}</h4>
            <p class="text-sm text-slate-400 font-medium">{{ feat.desc }}</p>
          </div>

        </div>
      </div>
    </section>

    <section id="precios" class="py-24 px-6 bg-sky-50">
       <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl font-extrabold text-sky-900">Paquetes Infantiles</h2>
          <p class="mt-4 text-xl text-sky-600/80">Soluciones para cada tipo de fiesta.</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-start">
          <div v-for="plan in planes" :key="plan.nombre" class="bg-white rounded-[2.5rem] p-8 relative transition-all duration-300 hover:shadow-xl border" :class="plan.destacado ? 'border-amber-400 shadow-2xl scale-105 z-10' : 'border-sky-100 hover:-translate-y-2'">
            
            <div v-if="plan.destacado" class="absolute top-0 right-0 bg-amber-400 text-white text-xs font-bold px-5 py-2 rounded-bl-3xl rounded-tr-[2.2rem] uppercase tracking-widest">Recomendado</div>

            <component :is="plan.icono" :size="64" :class="plan.color" class="mb-4 mx-auto block" weight="duotone" />

            <h3 class="text-2xl font-bold text-slate-800 text-center">{{ plan.nombre }}</h3>
            <p class="text-slate-400 text-sm mt-2 mb-6 h-10 text-center flex items-center justify-center">{{ plan.descripcion }}</p>
            
            <div class="mb-6 pb-6 border-b border-slate-100 text-center">
              <span class="text-5xl font-extrabold text-slate-800">{{ plan.precio }}</span>
              <span class="text-xl text-slate-400 font-bold ml-1">Bs</span>
              <p class="text-xs text-slate-400 mt-1 uppercase tracking-wide">Pago Único</p>
            </div>

            <ul class="space-y-4 mb-8">
              <li v-for="(feature, index) in plan.caracteristicas" :key="index" class="flex items-center text-left">
                <PhStar class="flex-shrink-0 text-amber-400 mt-0.5" size="20" weight="duotone" />
                <span class="ml-3 text-slate-600 text-sm font-medium">{{ feature }}</span>
              </li>
            </ul>

            <a :href="`https://wa.me/59164042420?text=Hola,%20quiero%20el%20plan%20Infantil%20${plan.nombre}`" target="_blank" class="block w-full text-center py-4 rounded-xl font-bold transition-all duration-300" :class="plan.btnColor">Lo Quiero</a>
          </div>
        </div>
      </div>
    </section>

    <section id="catalogo" class="py-24 px-6 bg-white relative overflow-hidden">
      
      <div class="absolute top-1/2 left-0 w-96 h-96 bg-sky-100/60 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2 pointer-events-none"></div>
      <div class="absolute bottom-0 right-0 w-96 h-96 bg-amber-100/60 rounded-full blur-3xl translate-x-1/2 translate-y-1/2 pointer-events-none"></div>

      <div class="max-w-6xl mx-auto relative z-10">
        
        <div class="text-center mb-16">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 text-sky-600 text-xs font-bold uppercase tracking-widest mb-4 border border-sky-100">
            <PhConfetti weight="fill" class="text-amber-400" /> Galería Mágica
          </div>
          <h2 class="text-4xl font-extrabold text-slate-800 mb-4 font-display">Diseños que Encantan</h2>
          <p class="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
            Desde la selva hasta el castillo de princesas.
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-10 md:gap-12">
          
          <div 
            v-for="modelo in modelos" 
            :key="modelo.titulo" 
            class="group flex flex-col items-center"
          >
            <div class="relative w-full max-w-[280px] aspect-[9/18] rounded-[2.5rem] border-[8px] border-slate-800 bg-slate-800 shadow-2xl overflow-hidden transform transition-all duration-500 group-hover:-translate-y-4 group-hover:shadow-sky-200 group-hover:shadow-[0_20px_40px_-15px_rgba(14,165,233,0.3)]">
              
              <div class="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-800 rounded-b-2xl z-20"></div>

              <img 
                :src="modelo.img" 
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
              />
              
              <div class="absolute inset-0 bg-sky-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10 backdrop-blur-[2px]">
                <router-link 
                  :to="modelo.link" 
                  class="bg-white text-sky-600 px-6 py-3 rounded-full font-bold flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:scale-105 shadow-xl"
                >
                  <PhEye weight="bold" /> Ver Demo
                </router-link>
              </div>
            </div>

            <div class="mt-8 text-center">
               <h3 class="text-2xl font-bold text-slate-700 mb-1 group-hover:text-sky-500 transition-colors">{{ modelo.titulo }}</h3>
               <span class="text-sm font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded-full">{{ modelo.tag }}</span>
            </div>
          </div>

        </div>

        <div class="text-center mt-16 bg-sky-50 rounded-3xl p-8 max-w-2xl mx-auto border border-sky-100">
           <p class="text-slate-500 text-sm font-bold uppercase tracking-widest mb-2">¿Buscas otro personaje?</p>
           <h4 class="text-2xl font-bold text-sky-900 mb-6">Hacemos de Mario, Sonic, La Granja o lo que imagines.</h4>
           <a href="https://wa.me/59164042420" class="inline-flex items-center gap-2 bg-sky-500 text-white px-6 py-3 rounded-full font-bold hover:bg-sky-400 transition-colors shadow-lg shadow-sky-200">
             <PhWhatsappLogo weight="fill" size="20" />
             Pedir Personaje Personalizado
           </a>
        </div>

      </div>
    </section>

    <Testimonios 
      :datos="testimonios" 
      titulo="Papás Felices"
      temaColor="bg-sky-500"
      temaTexto="text-sky-500"
    />

    <PreguntasFrecuentes 
      :datos="faqsKids" 
      tema="text-sky-600" 
      fondoActivo="bg-sky-50"
    />

    <Footer />
  </div>
</template>

<style scoped>
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
.animate-bounce-slow {
  animation: bounce-slow 3s infinite ease-in-out;
}
.font-display {
  font-family: 'Nunito', sans-serif; /* O la fuente que uses, pero que sea redondita */
}
</style>

<style scoped>
/* Animación de Flotar Suave */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
}
.animate-float {
  animation: float 6s ease-in-out infinite;
}

/* Animación de Rebote Lento (Badge) */
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-5px); }
}
.animate-bounce-slow {
  animation: bounce-slow 3s infinite ease-in-out;
}

/* Animación Wiggle (Regalo al pasar el mouse) */
@keyframes wiggle {
  0%, 100% { transform: rotate(-3deg); }
  50% { transform: rotate(3deg); }
}
.group-hover\:animate-wiggle {
  animation: wiggle 0.5s ease-in-out infinite;
}

/* Fuente redondeada opcional si la tienes, si no usa sans */
.font-display {
  font-family: system-ui, -apple-system, sans-serif;
}
</style>