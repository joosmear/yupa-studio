<script setup>
import CuentaRegresiva from '../components/CuentaRegresiva.vue'
import BotonAccion from '../components/BotonAccion.vue'
import ReproductorMusica from '../components/ReproductorMusica.vue'
import { PhWhatsappLogo, PhMapPin, PhCalendarCheck, PhGift } from '@phosphor-icons/vue'
import { onMounted, onUnmounted } from 'vue'
import { ref, computed } from 'vue'
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

  onMounted(() => {
  document.title = `Boda de ${props.datos.nombres} | Yupa Studio`
  })

  onUnmounted(() => {
  document.title = 'Yupa Studio | Invitaciones Digitales'
  })

  // LÓGICA DE NIVELES
  // 1. ¿Es Gold o Superior? (Incluye Gold y Premium)
  const esGold = computed(() => {
    return ['gold', 'premium'].includes(props.datos.plan)
  })

  // 2. ¿Es Premium? (Solo Premium)
  const esPremium = computed(() => {
    return props.datos.plan === 'premium'
  })
</script>

<template>
  <div class="min-h-screen bg-stone-50 text-stone-800 pb-20 overflow-x-hidden">

    <header 
      class="relative h-screen flex items-center justify-center bg-cover bg-center bg-fixed"
      :style="`background-image: url(${datos.fotoPortada})`"
    >
      <div class="absolute inset-0 bg-black/40"></div>

      <div class="relative z-10 text-center text-white px-4 animate-bounce-slow">
        <p class="font-elegante tracking-[0.2em] uppercase text-sm mb-4">¡Nos Casamos!</p>
        <h1 class="font-boda text-6xl md:text-8xl mb-6 drop-shadow-lg">
          {{ datos.nombres }}
        </h1>
        <div class="inline-block border-y border-white/80 py-2 px-6 backdrop-blur-sm">
          <p class="font-elegante text-xl">14 . Febrero . 2026</p>
        </div>
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