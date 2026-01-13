<script setup>
import { ref } from 'vue'
import { PhMusicNotes, PhPauseCircle } from '@phosphor-icons/vue'

const props = defineProps({ songUrl: String })
const isPlaying = ref(false)
const audioPlayer = ref(null) // Referencia al elemento <audio>

const togglePlay = () => {
  if (isPlaying.value) {
    audioPlayer.value.pause()
  } else {
    audioPlayer.value.play()
  }
  isPlaying.value = !isPlaying.value
}
</script>

<template>
  <div class="fixed bottom-4 right-4 z-50">
    <audio ref="audioPlayer" :src="songUrl" loop></audio>

    <button 
      @click="togglePlay"
      class="bg-white/90 p-3 rounded-full shadow-xl border border-gray-200 animate-bounce-slow"
    >
      <PhPauseCircle v-if="isPlaying" size="32" color="#e11d48" weight="fill" />
      <PhMusicNotes v-else size="32" color="#e11d48" weight="fill" />
    </button>
  </div>
</template>