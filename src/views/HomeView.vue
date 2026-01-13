<script setup>
import { PhCheckCircle, PhWhatsappLogo } from '@phosphor-icons/vue'
</script>

<template>
  <div class="min-h-screen bg-white font-sans text-gray-800">
    
    <nav class="flex justify-between items-center p-6 max-w-6xl mx-auto">
      <div class="text-2xl font-bold tracking-tighter text-rose-600">Yupa<span class="text-gray-800">Studio</span>.</div>
      <a href="#precios" class="text-sm font-medium hover:text-rose-600">Precios</a>
    </nav>

    <header class="text-center py-20 px-6">
      <h1 class="text-5xl md:text-6xl font-bold mb-6 tracking-tight text-slate-900">
        Invitaciones que <br><span class="text-rose-600">emocionan.</span>
      </h1>
      <p class="text-xl text-gray-500 mb-8 max-w-2xl mx-auto">
        Olvídate del papel. Crea una experiencia digital inolvidable para tu boda o evento en Bolivia.
      </p>
      <div class="flex justify-center gap-4">
        <a href="#precios" class="bg-slate-900 text-white px-8 py-3 rounded-full font-medium hover:bg-slate-800 transition">
          Ver Planes
        </a>
        <router-link to="/boda/juan" class="bg-rose-100 text-rose-700 px-8 py-3 rounded-full font-medium hover:bg-rose-200 transition">
          Ver Ejemplo Real
        </router-link>
      </div>
    </header>

    <section id="precios" class="py-20 bg-slate-50">
      <div class="max-w-6xl mx-auto px-6">
        <h2 class="text-3xl font-bold text-center mb-12">Planes Simples</h2>
        
        <div class="grid md:grid-cols-3 gap-8">
          
          <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 class="font-bold text-xl mb-2">Básico</h3>
            <p class="text-4xl font-bold mb-6">100 Bs</p>
            <ul class="space-y-3 mb-8 text-gray-600 text-sm">
              <li class="flex gap-2"><PhCheckCircle class="text-green-500" size="20"/> Invitación Web</li>
              <li class="flex gap-2"><PhCheckCircle class="text-green-500" size="20"/> Ubicación GPS</li>
              <li class="flex gap-2"><PhCheckCircle class="text-green-500" size="20"/> Cuenta Regresiva</li>
            </ul>
            <a href="https://wa.me/59164172764?text=Hola,%20me%20interesa%20el%20Plan%20Basico" target="_blank" class="block w-full py-3 text-center border-2 border-slate-900 rounded-xl font-bold hover:bg-slate-50">Pedir</a>
          </div>

          <div class="bg-slate-900 text-white p-8 rounded-2xl shadow-xl transform md:-translate-y-4 relative overflow-hidden">
            <div class="absolute top-0 right-0 bg-rose-500 text-xs font-bold px-3 py-1 rounded-bl-lg">MÁS VENDIDO</div>
            <h3 class="font-bold text-xl mb-2">Gold</h3>
            <p class="text-4xl font-bold mb-6 text-rose-400">200 Bs</p>
            <ul class="space-y-3 mb-8 text-gray-300 text-sm">
              <li class="flex gap-2"><PhCheckCircle class="text-rose-500" size="20"/> <strong>Todo lo del Básico</strong></li>
              <li class="flex gap-2"><PhCheckCircle class="text-rose-500" size="20"/> Galería de Fotos</li>
              <li class="flex gap-2"><PhCheckCircle class="text-rose-500" size="20"/> Música de Fondo</li>
              <li class="flex gap-2"><PhCheckCircle class="text-rose-500" size="20"/> Confirmación WhatsApp</li>
            </ul>
            <a href="https://wa.me/59164172764?text=Hola,%20quiero%20el%20Plan%20GOLD" target="_blank" class="block w-full py-3 text-center bg-rose-600 rounded-xl font-bold hover:bg-rose-700">Lo quiero</a>
          </div>

          <div class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 class="font-bold text-xl mb-2">Premium</h3>
            <p class="text-4xl font-bold mb-6">350 Bs</p>
            <ul class="space-y-3 mb-8 text-gray-600 text-sm">
              <li class="flex gap-2"><PhCheckCircle class="text-green-500" size="20"/> Todo lo del Gold</li>
              <li class="flex gap-2"><PhCheckCircle class="text-purple-500" size="20"/> <strong>Dominio .com propio</strong></li>
              <li class="flex gap-2"><PhCheckCircle class="text-purple-500" size="20"/> Soporte Prioritario</li>
            </ul>
            <a href="https://wa.me/59164172764?text=Hola,%20me%20interesa%20el%20Plan%20Premium" target="_blank" class="block w-full py-3 text-center border-2 border-slate-900 rounded-xl font-bold hover:bg-slate-50">Pedir</a>
          </div>

        </div>
      </div>
    </section>

    <footer class="bg-white py-8 text-center border-t border-gray-100">
      <p class="text-gray-500 text-sm">© 2026 Yupa Studio - La Paz, Bolivia 🇧🇴</p>
    </footer>

  </div>
</template>