<script setup>
  import { PhWhatsappLogo, PhMapPin, PhCalendarCheck, PhGift } from '@phosphor-icons/vue'
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import CuentaRegresiva from '../components/CuentaRegresiva.vue'
  import BotonAccion from '../components/BotonAccion.vue'
  import ReproductorMusica from '../components/ReproductorMusica.vue'
  import ModalRegalos from '../components/ModalRegalos.vue'
  import Cronograma from '../components/Cronograma.vue'
  import CodigoVestimenta from '../components/CodigoVestimenta.vue'
  import GaleriaFotos from '../components/GaleriaFotos.vue'
  import SeccionPadrinos from '../components/SeccionPadrinos.vue'

  const props = defineProps({
    datos: {
      type: Object,
      required: true
    }
  })

  const modalAbierto = ref(false)

  // LÓGICA DE NIVELES
  // 1. ¿Es Gold o Superior? (Incluye Gold y Premium)
  const esGold = computed(() => {
    return ['gold', 'premium'].includes(props.datos.plan)
  })

  // 2. ¿Es Premium? (Solo Premium)
  const esPremium = computed(() => {
    return props.datos.plan === 'premium'
  })

  // --- LÓGICA TYPEWRITER ---
const nombreMostrado = ref("")
const cursorVisible = ref(true)

const iniciarEfectoEscritura = () => {
  const nombreCompleto = props.datos.nombres 
  let i = 0
  nombreMostrado.value = ""
  
  const intervaloEscritura = setInterval(() => {
    if (i < nombreCompleto.length) {
      nombreMostrado.value += nombreCompleto.charAt(i)
      i++
    } else {
      clearInterval(intervaloEscritura)
      cursorVisible.value = false
    }
  }, 100)
}

  onMounted(() => {
  document.title = `Boda de ${props.datos.nombres} | Yupa Studio`
  iniciarEfectoEscritura()
  })

  onUnmounted(() => {
  document.title = 'Yupa Studio | Invitaciones Digitales'
  })
</script>

<template>
  <div class="min-h-screen bg-stone-50 text-stone-800 pb-20 overflow-x-hidden">

    <header class="relative h-screen flex flex-col justify-center items-center text-center overflow-hidden">
  
  <div class="absolute inset-0 z-0">
    <img :src="datos.fotoPortada" class="w-full h-full object-cover grayscale-[30%] brightness-[0.85]" />
  </div>

    <div class="petalos-container absolute inset-0 z-10 pointer-events-none overflow-hidden">
      <img 
        v-for="n in 12" 
        :key="n" 
        src="/assets/petalo.png" 
       class="petalo absolute"
        alt="pétalo"
      />
    </div>

  <div class="relative z-20 text-white space-y-6 px-4">
    
    <p class="uppercase tracking-[0.5em] text-xs md:text-sm opacity-90 animate-fade-in-up">
      Nos casamos
    </p>

    <h1 class="font-elegante text-5xl md:text-7xl lg:text-8xl drop-shadow-lg min-h-[1.2em]">
      {{ nombreMostrado }}<span v-if="cursorVisible" class="font-light">|</span>
    </h1>

    <div class="animate-fade-in-up delay-500">
      <p class="text-lg md:text-xl font-light tracking-widest border-t border-b border-white/30 py-2 inline-block px-8 backdrop-blur-sm">
        {{ new Date(datos.fecha).toLocaleDateString('es-BO', { day: 'numeric', month: 'long', year: 'numeric' }) }}
      </p>
    </div>

  </div>

  <div class="absolute bottom-10 z-20 animate-bounce">
    <div class="w-[1px] h-12 bg-white/50 mx-auto"></div>
  </div>
</header>

    <section class="py-16 px-6 max-w-2xl mx-auto text-center space-y-8">
      <p class="font-elegante text-xl italic text-stone-600 leading-relaxed">
        "{{ datos.frase }}"
      </p>
      
      <div class="py-8">
        <p class="uppercase tracking-widest text-xs font-bold mb-6 text-stone-400">Solo faltan</p>
        <CuentaRegresiva :fechaObjetivo="datos.fecha" />
      </div>
    </section>

    <section class="py-16 bg-white shadow-inner">
      <div class="max-w-4xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div class="rounded-t-full overflow-hidden border-4 border-stone-100 shadow-xl h-96">
          <img :src="datos.fotoSegunda" class="w-full h-full object-cover" alt="Pareja">
        </div>

        <div class="space-y-6 text-center md:text-left">
          <h2 class="font-elegante text-3xl text-rose-900">Ceremonia Religiosa</h2>
          <p class="text-stone-600">
            Acompáñanos a celebrar nuestra unión ante Dios.<br>
            <strong>{{ datos.ubicacion.nombreLugar }}</strong><br>
            {{ datos.ubicacion.direccion }}
          </p>
          
          <div class="flex flex-col gap-3">
            <BotonAccion 
              texto="Ver Ubicación GPS" 
              :icono="PhMapPin" 
              :url="datos.ubicacion.linkGps" 
              color="bg-stone-800"
            />
            <BotonAccion 
              texto="Agendar Fecha" 
              :icono="PhCalendarCheck" 
              :url="datos.linkCalendario" 
              color="bg-rose-600"
            />
          </div>
        </div>
      </div>
    </section>

    <section v-if="esGold" class="bg-white py-10">
      
      <Cronograma 
        v-if="datos.agenda" 
        :eventos="datos.agenda" 
      />

      <CodigoVestimenta 
        v-if="datos.vestimenta" 
        :tipo="datos.vestimenta.tipo" 
        :nota="datos.vestimenta.nota" 
      />
    </section>

    <GaleriaFotos
      v-if="esGold && datos.galeria" 
      :fotos="datos.galeria" 
    />

    <SeccionPadrinos 
      v-if="esPremium && datos.cortejo" 
      :padrinos="datos.cortejo" 
    />

    <section class="py-20 px-4 text-center bg-stone-100">
      <div class="max-w-md mx-auto space-y-8 bg-white p-8 rounded-2xl shadow-xl">
        <PhGift :size="48" class="text-rose-400 mx-auto" />
        <h3 class="font-elegante text-2xl">Regalo de Bodas</h3>
        <p class="text-sm text-stone-500">
          Nuestro mejor regalo es tu presencia. Pero si deseas tener un detalle con nosotros...
        </p>
        <button
          @click="modalAbierto = true"
          class="text-rose-600 font-bold underline">
            Ver Datos Bancarios
        </button>
        
        <hr class="border-stone-200">

        <h3 class="font-elegante text-2xl">Confirmación</h3>
        <p class="text-sm text-stone-500">Por favor confirma antes del 1 de Febrero</p>
        
        <BotonAccion 
          texto="Confirmar por WhatsApp" 
          :icono="PhWhatsappLogo" 
          :url="`https://wa.me/${datos.contacto.whatsapp}`" 
          color="bg-green-600"
        />
      </div>
    </section>

    <footer class="bg-stone-900 text-stone-400 py-8 text-center text-xs">
      <p>Invitación creada con ❤️ por <span class="text-white font-bold">Yupa Studio</span></p>
    </footer>

    <ReproductorMusica :songUrl="datos.musica" />

    <ModalRegalos 
      :mostrar="modalAbierto" 
      :cuentas="datos.regalos" 
      @cerrar="modalAbierto = false"
    />

  </div>
</template>

<style scoped>
/* Estilos base del pétalo */
.petalo {
  position: absolute;
  top: -15%; /* Empiezan un poco más arriba para que no se vea el "pop" */
  opacity: 0;
  animation: caer linear infinite;
  z-index: 10;
}

/* --- VARIACIONES DEL 1 AL 12 --- */
/* Jugamos con: Posición (left), Velocidad (duration), Retraso (delay), Tamaño (width) y Desenfoque (blur) */

/* Pétalo 1: Rápido, izquierda */
.petalo:nth-child(1) { 
  left: 10%; 
  animation-duration: 8s; 
  animation-delay: 0s; 
  width: 20px; 
}

/* Pétalo 2: Lento, grande y borroso (parece que está cerca de la cámara) */
.petalo:nth-child(2) { 
  left: 20%; 
  animation-duration: 12s; 
  animation-delay: 2s; 
  width: 35px; 
  filter: blur(1.5px); 
}

/* Pétalo 3: Derecha, velocidad media */
.petalo:nth-child(3) { 
  left: 70%; 
  animation-duration: 10s; 
  animation-delay: 4s; 
  width: 28px; 
}

/* Pétalo 4: Centro, muy lento, pequeño (parece que está lejos) */
.petalo:nth-child(4) { 
  left: 40%; 
  animation-duration: 15s; 
  animation-delay: 1s; 
  width: 15px; 
  filter: blur(0.5px); 
}

/* Pétalo 5: Extrema derecha, rápido */
.petalo:nth-child(5) { 
  left: 85%; 
  animation-duration: 9s; 
  animation-delay: 3s; 
  width: 30px; 
  filter: blur(2px); 
}

/* Pétalo 6: Extrema izquierda, lento */
.petalo:nth-child(6) { 
  left: 5%; 
  animation-duration: 11s; 
  animation-delay: 5s; 
  width: 22px; 
}

/* Pétalo 7: Centro, velocidad normal */
.petalo:nth-child(7) { 
  left: 50%; 
  animation-duration: 13s; 
  animation-delay: 7s; 
  width: 18px; 
  opacity: 0.8;
}

/* Pétalo 8: Derecha, entra rápido casi al inicio */
.petalo:nth-child(8) { 
  left: 95%; 
  animation-duration: 7s; 
  animation-delay: 1.5s; 
  width: 25px; 
}

/* Pétalo 9: Izquierda, muy grande y muy borroso (primer plano) */
.petalo:nth-child(9) { 
  left: 30%; 
  animation-duration: 14s; 
  animation-delay: 6s; 
  width: 38px; 
  filter: blur(3px); 
}

/* Pétalo 10: Centro-derecha, estándar */
.petalo:nth-child(10) { 
  left: 60%; 
  animation-duration: 9.5s; 
  animation-delay: 2.5s; 
  width: 24px; 
}

/* Pétalo 11: Izquierda, pequeño y rápido */
.petalo:nth-child(11) { 
  left: 15%; 
  animation-duration: 10s; 
  animation-delay: 8s; 
  width: 16px; 
}

/* Pétalo 12: Derecha, lento y suave */
.petalo:nth-child(12) { 
  left: 75%; 
  animation-duration: 12.5s; 
  animation-delay: 0.5s; 
  width: 28px; 
  filter: blur(1px); 
}

/* --- ANIMACIÓN --- */
@keyframes caer {
  0% { 
    transform: translateY(0) rotate(0deg) translateX(0); 
    opacity: 0; 
  }
  10% { 
    opacity: 1; 
  }
  90% {
    opacity: 0.8;
  }
  100% { 
    /* Caen hasta abajo, giran una vuelta completa y se mueven un poco al lado */
    transform: translateY(110vh) rotate(360deg) translateX(50px); 
    opacity: 0; 
  }
}
</style>