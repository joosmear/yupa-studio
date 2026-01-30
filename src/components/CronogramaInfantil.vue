<script setup>
import { 
  // Iconos Generales
  PhClock, PhStar, PhSparkle, PhHeart,
  // Fiesta y Diversión
  PhConfetti, PhBalloon, PhMagicWand, PhMaskHappy, PhGameController, PhPuzzlePiece,
  // Comida
  PhCake, PhForkKnife, PhPizza, PhIceCream, PhPopcorn, PhCookie,
  // Bebida
  PhWine, PhCoffee, PhBaby, // Baby para biberón/leche
  // Momentos
  PhCamera, PhGift, PhMusicNotes, PhCrown, PhChurch
} from '@phosphor-icons/vue'

const props = defineProps({
  eventos: { type: Array, required: true },
  
  // Personalización de Colores (Con valores por defecto rositas/infantiles)
  colorTitulo: { type: String, default: 'text-rose-500' },
  colorLinea:  { type: String, default: 'border-rose-200' },
  colorPunto:  { type: String, default: 'bg-white border-rose-400' }, 
  colorCardBg: { type: String, default: 'bg-white border-rose-100' },
  colorHora:   { type: String, default: 'text-rose-500' },
  colorIcono:  { type: String, default: 'text-rose-400' },
  colorTexto:  { type: String, default: 'text-slate-600' },
  
  // Fuentes (Ajustables desde el padre)
  fuenteTitulo: { type: String, default: 'font-pacifico' }, 
  fuenteTexto: { type: String, default: 'font-fredoka' },
  
  // Tamaño del círculo del icono
  tamanoCirculo: { type: String, default: 'w-14 h-14' }
})

// --- 1. LÓGICA PARA DETECTAR SI ES IMAGEN/GIF ---
const esRutaDeImagen = (valor) => {
  if (!valor) return false
  // Si tiene extensión de imagen o empieza con barra, es una ruta
  return valor.includes('.') || valor.includes('/') || valor.includes('http')
}

// --- 2. MAPEO MASIVO DE ICONOS (Diccionario Completo) ---
const obtenerIcono = (nombre) => {
  if (!nombre) return PhStar // Icono por defecto si viene vacío

  const busqueda = nombre.toLowerCase().trim()
  
  const mapa = {
    // Básicos
    'estrella': PhStar,
    'chispitas': PhSparkle,
    'reloj': PhClock,
    'corazon': PhHeart,
    
    // Ceremonia / Bienvenida
    'iglesia': PhChurch,
    'misa': PhChurch,
    'recepcion': PhBaby,
    'bienvenida': PhBaby,
    'llegada': PhConfetti,
    
    // Fiesta / Show
    'fiesta': PhConfetti,
    'baile': PhMusicNotes,
    'vals': PhMusicNotes,
    'musica': PhMusicNotes,
    'show': PhMagicWand,
    'magia': PhMagicWand,
    'payaso': PhMaskHappy,
    'juegos': PhGameController,
    'piñata': PhConfetti,
    'sorpresa': PhGift,
    'regalos': PhGift,
    'regalo': PhGift,
    
    // Comida
    'comida': PhForkKnife,
    'cena': PhForkKnife,
    'almuerzo': PhForkKnife,
    'pastel': PhCake,
    'torta': PhCake,
    'vela': PhCake,
    'pizza': PhPizza,
    'helado': PhIceCream,
    'palomitas': PhPopcorn,
    'dulces': PhCookie,
    'mesa dulces': PhCookie,
    
    // Bebida
    'brindis': PhWine,
    'bebidas': PhWine,
    
    // Fotos / Recuerdos
    'fotos': PhCamera,
    'fotografia': PhCamera,
    'video': PhCamera,
    
    // Especiales
    'corona': PhCrown,
    'princesa': PhCrown,
    'quince': PhCrown
  }

  // Busca coincidencia exacta o retorna estrella por defecto
  return mapa[busqueda] || PhStar 
}
</script>

<template>
  <div class="relative">
    <div 
      class="absolute top-4 bottom-10 left-8 md:left-1/2 md:-ml-[1px] border-l-2 border-dashed z-0"
      :class="colorLinea"
    ></div>

    <div class="space-y-8 relative z-10">
      <div 
        v-for="(evento, index) in eventos" 
        :key="index" 
        class="relative flex flex-row md:items-center gap-4 md:gap-8 group"
        :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
      >
        
        <div 
           class="shrink-0 rounded-full flex items-center justify-center border-4 shadow-sm z-10 overflow-hidden relative bg-white transition-transform duration-300 group-hover:scale-110"
           :class="[tamanoCirculo, colorPunto]"
        >
           <img 
             v-if="esRutaDeImagen(evento.icono)"
             :src="evento.icono"
             class="w-full h-full object-cover p-1"
             alt="icono"
           />
           
           <component 
             v-else
             :is="obtenerIcono(evento.icono || evento.actividad)" 
             size="28" 
             weight="duotone"
             :class="colorIcono"
           />
        </div>

        <div class="flex-1 min-w-0">
           <div 
             class="p-4 md:p-6 rounded-2xl border shadow-sm transition-all duration-300 hover:shadow-md hover:-translate-y-1 relative"
             :class="[colorCardBg, index % 2 === 0 ? 'md:text-left' : 'md:text-right text-left']"
           >
              <div 
                class="inline-block px-3 py-1 rounded-full text-xs font-black mb-2 shadow-sm"
                :class="[colorHora, 'bg-rose-50 border border-rose-100']"
              >
                {{ evento.hora }}
              </div>

              <h4 class="text-lg md:text-xl font-bold leading-tight" :class="[colorTexto, fuenteTexto]">
                {{ evento.actividad }}
              </h4>
           </div>
        </div>
        
        <div class="hidden md:block flex-1"></div>

      </div>
    </div>
  </div>
</template>