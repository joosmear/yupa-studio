<script setup>
import { PhClock, PhChurch, PhWine, PhForkKnife, PhConfetti, PhCamera, PhMusicNotes, PhStar } from '@phosphor-icons/vue'

defineProps({
  eventos: { type: Array, required: true },
  colorTitulo: { type: String, default: 'text-rose-600' },
  colorLinea:  { type: String, default: 'border-rose-200' },
  colorPunto:  { type: String, default: 'bg-rose-500 border-white' }, 
  colorCardBg: { type: String, default: 'bg-white border-stone-100' },
  colorHora:   { type: String, default: 'text-rose-600' },
  colorIcono:  { type: String, default: 'text-rose-400' },
  colorTexto:  { type: String, default: 'text-gray-800' },
  fuenteTitulo: { type: String, default: 'font-display' }, // Por defecto usa la de boda
  fuenteTexto: { type: String, default: 'font-body' }      // Por defecto usa la normal
})

  const obtenerIcono = (nombre) => {
  const mapa = {
    'iglesia': PhChurch,
    'ceremonia': PhChurch,
    'brindis': PhWine,
    'copa': PhWine,
    'cena': PhForkKnife,
    'comida': PhForkKnife,
    'fiesta': PhConfetti,
    'baile': PhConfetti,
    'fotos': PhCamera,
    'musica': PhMusicNotes
  }
  return mapa[nombre] || PhStar
}

  // Nueva función para detectar si es GIF/Imagen (Para 15 Años)
const esRutaDeImagen = (valor) => {
  if (!valor) return false
  // Si contiene un punto (ej: .gif, .png) o una barra (/assets...), asumimos que es imagen
  return valor.includes('.') || valor.includes('/')
}
</script>

<template>
  <div class="max-w-md mx-auto py-8 px-4">
    <h3 :class="['text-4xl text-center mb-12', colorTitulo, fuenteTitulo]">
      Itinerario
    </h3>
    
    <div class="relative border-l-2 ml-3 space-y-8" :class="colorLinea">
      <div v-for="(evento, index) in eventos" :key="index" class="relative pl-8">
        
        <div class="absolute -left-[9px] top-1 w-4 h-4 rounded-full border-4 shadow-sm"
             :class="colorPunto">
        </div>
        
        <div class="p-4 rounded-xl shadow-sm border hover:shadow-md transition-shadow"
             :class="colorCardBg">
          
          <div class="flex items-center justify-between mb-2">
            <div class="flex items-center gap-2">
              <PhClock size="20" weight="regular" :class="colorIcono" />
              <span class="font-bold font-mono" :class="colorHora">{{ evento.hora }}</span>
            </div>

            <img 
              v-if="esRutaDeImagen(evento.icono)"
              :src="evento.icono"
              class="w-10 h-10 object-contain"
              alt="Icono evento"
            />
            
            <component 
              v-else
              :is="obtenerIcono(evento.icono)" 
              size="38" 
              weight="thin" 
              :class="colorIcono"
            />
          </div>
          
          <h4 class="font-bold text-lg" :class="colorTexto">
            {{ evento.titulo || evento.actividad }}
          </h4>
          
        </div>

      </div>
    </div>
  </div>
</template>