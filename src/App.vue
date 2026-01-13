<script setup>
import PlantillaBoda01 from './views/PlantillaBoda01.vue'

// Importamos a nuestros clientes desde la "base de datos"
import { bodaJuan, bodaPedro } from './data/misClientes.js'

// AQUÍ ELEGIMOS A QUIÉN MOSTRAR HOY
// Cambia 'bodaJuan' por 'bodaPedro' para ver la magia
const clienteActual = bodaPedro 

</script>

<template>
  <PlantillaBoda01 :datos="clienteActual" />
</template>