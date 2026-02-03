<script setup>
import { PhHouse, PhSmileySad, PhMagnifyingGlass } from '@phosphor-icons/vue'
</script>

<template>
  <div class="min-h-screen bg-slate-950 text-slate-300 flex flex-col items-center justify-center p-6 text-center relative overflow-hidden font-sans">
    
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
      <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[100px] animate-pulse"></div>
      <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-600/10 rounded-full blur-[100px] animate-pulse delay-1000"></div>
    </div>

    <div class="relative z-10 max-w-md w-full space-y-8">
      
      <div class="relative inline-block">
        <div class="absolute inset-0 bg-gradient-to-r from-purple-500 to-rose-500 blur-2xl opacity-20 rounded-full"></div>
        <PhSmileySad :size="80" weight="duotone" class="text-slate-400 relative z-10 animate-float" />
      </div>

      <div class="space-y-2">
        <h1 class="text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-slate-600 tracking-tighter">
          404
        </h1>
        <h2 class="text-2xl font-bold text-white">¡Ups! Invitación no encontrada</h2>
        <p class="text-slate-400 text-sm leading-relaxed">
          Parece que el enlace que buscas no existe, ha caducado o quizás hubo un error al escribirlo.
        </p>
      </div>

      <div class="bg-slate-900/50 border border-slate-800 rounded-xl p-4 flex items-center gap-3 opacity-60 pointer-events-none select-none">
        <PhMagnifyingGlass class="text-slate-500" />
        <div class="h-2 w-24 bg-slate-800 rounded-full"></div>
        <div class="h-2 w-12 bg-slate-800 rounded-full"></div>
      </div>

      <div>
        <router-link 
          to="/" 
          class="inline-flex items-center gap-2 bg-white text-slate-900 px-8 py-3 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          <PhHouse weight="bold" />
          Volver al Inicio
        </router-link>
      </div>

    </div>

    <footer class="absolute bottom-8 text-[10px] text-slate-600 uppercase tracking-widest">
      Yupa Studio · Digital Invitations
    </footer>

  </div>
</template>

<style scoped>
.animate-float {
  animation: float 6s ease-in-out infinite;
}

@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}
</style>