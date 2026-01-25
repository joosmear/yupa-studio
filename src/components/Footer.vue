<script setup>
import { PhInstagramLogo, PhFacebookLogo, PhTiktokLogo, PhWhatsappLogo, PhEnvelopeSimple } from '@phosphor-icons/vue'

const redes = [
  { nombre: "Facebook", url: "https://www.tiktok.com/@yupa.studio", icono: PhFacebookLogo },
  { nombre: "TikTok", url: "https://www.tiktok.com/@yupa.studio", icono: PhTiktokLogo },
]
</script>

<template>
  <footer class="bg-[#0F1420] text-stone-400 py-16 border-t border-white/5 relative overflow-hidden">
    
    <div class="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-600/10 rounded-full blur-[100px] pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
      
      <router-link to="/" class="mb-6 inline-block hover:opacity-80 transition-opacity">
        <img 
          src="/logo.png" 
          alt="Yupa Studio" 
          class="h-12 w-auto object-contain grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-500" 
        />
      </router-link>

      <nav class="flex flex-wrap justify-center gap-6 md:gap-10 mb-10 text-sm font-medium tracking-wide">
        <router-link to="/bodas" class="hover:text-white transition-colors">Bodas</router-link>
        <router-link to="/15-anos" class="hover:text-white transition-colors">15 Años</router-link>
        <router-link to="/infantiles" class="hover:text-white transition-colors">Infantiles</router-link>
        <a href="https://wa.me/59164042420" class="hover:text-white transition-colors">Contacto</a>
      </nav>

      <div class="flex gap-4 mb-10">
        <a 
          v-for="red in redes" 
          :key="red.nombre"
          :href="red.url"
          class="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-rose-600 hover:text-white transition-all duration-300 group"
        >
          <component 
            :is="red.icono" 
            size="20" 
            weight="light" 
            class="group-hover:scale-110 transition-transform" 
          />
        </a>
      </div>

      <div class="w-full max-w-xs h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-8"></div>

      <div class="flex flex-col md:flex-row items-center gap-2 text-xs opacity-50 font-light">
        <p>© 2026 Yupa Studio - Invitaciones Digitales.</p>
        <span class="hidden md:block mx-2">•</span>
        <p>La Paz, Bolivia</p>
      </div>

    </div>
  </footer>
</template>