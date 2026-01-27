<script setup>
  // 1. Limpiamos iconos que ya no se usan (PhGift, PhCrown)
  import { PhWhatsappLogo, PhMapPin, PhCalendarCheck, PhSparkle, PhMagnifyingGlassPlus, PhX, PhCamera } from '@phosphor-icons/vue'
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import CuentaRegresiva from '../components/CuentaRegresiva.vue'
  import BotonAccion from '../components/BotonAccion.vue'
  import ReproductorMusica from '../components/ReproductorMusica.vue'
  import ModalRegalos15 from '../components/ModalRegalos15.vue'
  import Cronograma15 from '../components/Cronograma15.vue'
  import CodigoVestimenta15 from '../components/CodigoVestimenta15.vue'
  import MenuNavegacion from '../components/MenuNavegacion.vue'
  import IconoAnimado from '../components/IconoAnimado.vue'
  import DemoSwitcher from '../components/DemoSwitcher.vue'

  const props = defineProps({
    datos: { type: Object, required: true }
  })

  // const galeriaAbierta = ref(false) -> ELIMINADO (Ya no se usa)
  const modalAbierto = ref(false)

  // --- ESTADO DEL DEMO SWITCHER ---
  const planVisualizado = ref(props.datos.esDemo ? 'queen' : props.datos.plan) 

  const actualizarPlan = (nuevoPlan) => {
    planVisualizado.value = nuevoPlan
  }

  // --- LÓGICA DE PLANES (Compatible con nombres viejos y nuevos) ---
  const esGold = computed(() => ['gold', 'premium', 'glow', 'queen'].includes(planVisualizado.value))
  const esPremium = computed(() => ['premium', 'queen'].includes(planVisualizado.value))

  // --- GALERÍA INTELIGENTE ---
  const fotosVisibles = computed(() => {
    if (!props.datos.galeria) return []
    // Si es Premium muestra todo, si es Gold muestra solo 6
    if (esPremium.value) return props.datos.galeria
    return props.datos.galeria.slice(0, 6)
  })

  // Efecto de escritura
  const nombreMostrado = ref("")
  const cursorVisible = ref(true)

  const iniciarEfectoEscritura = () => {
    const nombreCompleto = props.datos.nombre || props.datos.nombres 
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
    }, 150)
  }

  onMounted(() => {
    document.title = `Mis 15 Años | ${props.datos.nombre}`
    document.body.classList.add('scroll-magico') 
    iniciarEfectoEscritura()
  })

  onUnmounted(() => {
    document.body.classList.remove('scroll-magico')
    document.title = 'Invitación Digital'
  })

  // Lógica Lightbox (Foto en grande)
  const fotoEnGrande = ref(null)

  const abrirFoto = (foto) => {
    fotoEnGrande.value = foto
    document.body.style.overflow = 'hidden'
  }

  const cerrarFoto = () => {
    fotoEnGrande.value = null
    document.body.style.overflow = ''
  }
</script>

<template>
  <div class="min-h-screen bg-slate-50 text-slate-800 overflow-x-hidden font-body">

    <header class="relative h-screen w-full flex flex-col justify-center items-center text-center overflow-hidden px-4">
      <div class="absolute inset-0 z-0 bg-stone-100">
        <div class="absolute inset-0 bg-white/70 z-10 backdrop-blur-[2px]"></div>
        <img :src="datos.fotoPortada" class="w-full h-full object-cover opacity-90" />
      </div>
      <div class="absolute inset-0 z-20 pointer-events-none opacity-90">
          <img src="/assets/marco-floral-lila.png" class="w-full h-full object-cover" alt="Marco Floral" />
      </div>
      <div class="mariposas-container absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <img v-for="n in 10" :key="n" src="/assets/mariposa-lila.png" class="mariposa absolute opacity-60" alt="mariposa"/>
      </div>
      <transition name="fade">
        <div v-if="esPremium" class="absolute top-12 z-30 animate-pulse delay-700">
           <div class="bg-white/80 backdrop-blur-md border border-purple-200 px-6 py-2 rounded-full shadow-lg">
             <p class="text-purple-900 text-sm font-bold tracking-wide">✨ Hola Amiga Sofi ✨</p>
           </div>
        </div>
      </transition>
      <div class="relative z-30 text-purple-900 space-y-4 animate-fade-in-up w-full max-w-6xl mx-auto flex flex-col items-center justify-center h-full mt-10"> 
        <div class="mb-4 text-[#75527e]/80 opacity-90 animacion-tiara">
          <svg id="OBJECTS" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 418.172 135.699" class="w-32 md:w-40 h-auto mx-auto fill-current">
            <path d="M374.89,100.045c2.256.042,3.943-.656,5.668-1.052,6.908-1.587,13.832-2.994,20.924-2.788,3.397.099,6.671.817,9.687,2.654,5.836,3.556,8.182,9.834,6.441,17.068-2.064,8.574-10.183,15.251-17.982,14.79-5.898-.349-10.475-5.883-10.131-12.25.233-4.325,3.278-7.587,7.061-7.585,1.677.001,3.085.591,3.941,2.34.811,1.657.428,3.194-.469,4.64-.193.311-.438.578-.644.879-.652.95-.507,1.74.553,1.919,5.755.973,10.156-3.299,10.174-9.489.006-2.089-1.196-3.495-2.722-4.513-2.187-1.457-4.587-1.939-7.08-1.967-4.268-.048-8.473.654-12.643,1.557-5.687,1.232-11.397,2.208-17.018,3.987-16.999,5.38-34.035,10.644-51.176,15.394-19.258,5.337-38.847,8.171-58.681,9.141-15.978.781-31.933,1.226-47.918.542-5.465-.234-10.949.067-16.423.214-23.61.635-47.153-.443-70.567-4.02-13.518-2.065-26.887-5.202-40.002-9.465-12.14-3.946-24.466-7.089-36.558-11.191-8.391-2.846-16.968-4.324-25.58-5.714-2.092-.338-4.23-.351-6.349-.42-1.343-.044-2.667.234-3.965.666-3.395,1.129-5.26,3.158-5.402,5.921-.169,3.268,2.007,7.279,4.741,8.556,1.668.779,3.427,1.223,5.246.874,1.093-.21,1.698-.778.736-2.028-.294-.382-.61-.759-.83-1.195-1.571-3.126-.117-6.233,3.073-6.603,4.73-.548,8.511,4.356,7.632,9.899-.804,5.075-4.595,9.157-9.13,9.834C10.171,132.031.49,122.811.018,112.117c-.228-5.17,1.676-9.117,5.294-12.059,3.298-2.682,7.08-3.68,11.059-3.836,7.205-.281,14.241,1.154,21.258,2.78,1.71.396,3.393,1.06,5.394,1.075-1.44-10.998,3.74-18.955,8.842-26.858,2.287-3.542,5.163-3.615,8.097-.733,1.171,1.15,2.288,2.372,3.534,3.669,1.42-2.465,2.229-5.376,3.42-8.064.755-1.703,1.384-3.485,2.211-5.14,2.056-4.12,4.837-5.215,8.789-3.639,1.885.751,3.49,2.143,5.445,3.35,1.939-7.01,5.46-12.494,9.987-17.14,6.768-6.946,11.307-8.644,20.962-2.792,5.19,3.145,9.337,7.82,12.542,13.499.357.634.751,1.241,1.144,1.848.055.085.204.09.368.155,1.255-.868,1.864-2.424,2.757-3.684,3.283-4.63,6.608-5.121,10.678-1.505.604.537,1.184,1.11,1.738,1.632,1.134-.639,1.415-1.802,1.917-2.739,2.757-5.144,6.128-9.724,9.967-13.837,4.542-4.866,9.721-8.167,16.236-7.574,1.291.118,2.005-.471,2.771-1.573,3.194-4.587,6.476-9.096,9.745-13.614,4.285-5.921,9.648-10.155,15.825-13.138,6.089-2.941,12.14-2.936,18.22.027,6.056,2.952,11.366,7.061,15.588,12.876,3.276,4.512,6.582,9,9.745,13.613.935,1.364,1.837,1.926,3.355,1.799,5.057-.423,9.434,1.673,13.323,5.172,4.871,4.383,8.79,9.746,12.161,15.661.652,1.144.969,2.609,2.239,3.306.957-.852,1.866-1.803,2.891-2.548,3.199-2.323,6.126-1.829,8.713,1.337,1.274,1.559,2.105,3.565,3.879,5.15,2.121-4.808,5.22-8.418,8.584-11.761,3.599-3.576,7.638-6.091,12.381-7.21,3.276-.773,6.252-.222,8.981,1.803,6.435,4.775,11.369,11.018,14.112,19.318.193.585.424,1.153.656,1.781,1.772-1.061,3.383-2.214,5.116-3.025,4.177-1.955,7.131-.769,9.249,3.781,1.464,3.144,2.659,6.449,4.022,9.656.468,1.103.604,2.48,1.746,3.124,1.21-.596,1.744-1.944,2.601-2.908,3.272-3.679,6.239-3.59,9.058.466,2.854,4.107,5.232,8.571,7.046,13.393,1.518,4.034,2.453,8.186,1.225,13.032ZM150.274,122.308c.06-1.596-.708-2.075-1.207-2.69-7.01-8.642-8.742-18.873-7.041-30.144.629-4.165,1.882-8.108,3.457-11.916.521-1.26.746-2.238-.368-3.327-1.63-1.593-2.534-3.849-3.687-5.873-1.381-2.425-2.774-4.845-4.656-6.968-2.555,2.811-4.037,6.12-5.835,9.139-4.871,8.177-8.273,17.093-10.251,26.759-2.023,9.888,2.263,16.595,8.262,22.566.693.69,1.601.898,2.493,1.014,6.211.813,12.452,1.025,18.832,1.44ZM267.709,122.312c5.156-.325,10.02-.82,14.888-.882,4.342-.055,7.488-2.049,10.385-5.706,4.444-5.612,5.796-11.792,4.348-19.029-1.883-9.418-5.292-18.074-10.028-26.031-1.855-3.116-3.348-6.579-5.879-9.178-.345.322-.634.53-.855.807-3.083,3.876-4.797,8.881-8.033,12.641-.808.939-.099,1.897.254,2.798,1.368,3.491,2.554,7.062,3.203,10.818,1.987,11.503.347,21.993-6.789,30.913-.513.641-1.175,1.186-1.494,2.849ZM237.87,122.812c.745.633,1.309.591,1.858.573,4.573-.147,9.147-.27,13.719-.466,6.496-.278,6.42-.366,10.356-6.381,4.803-7.34,6.695-15.422,5.095-24.425-.916-5.149-2.882-9.857-5.08-14.455-3.442-7.202-8.29-13.225-12.584-19.713-.377-.569-.748-1.431-1.574-.822-.659.486-1.305,1.125-1.223,2.121.061.741.325,1.472.56,2.181,3.218,9.726,3.95,19.829,3.047,30.045-1.06,11.991-4.34,22.872-13.424,30.339-.25.205-.413.546-.75,1.004ZM180.155,122.854c-.585-1.397-1.62-1.978-2.449-2.769-4.498-4.291-7.557-9.638-9.283-16.011-3.739-13.808-3.536-27.571.321-41.299.272-.969.614-1.913.867-2.887.347-1.341-.272-2.287-1.232-2.795-.977-.516-1.297.658-1.741,1.288-2.305,3.276-4.619,6.546-6.849,9.888-3.802,5.7-7.012,11.794-9.17,18.554-1.035,3.243-1.691,6.55-1.857,10.033-.473,9.927,3.59,17.592,9.124,24.599.95,1.202,2.145,1.221,3.368,1.27,5.581.227,11.163.442,16.745.646.654.024,1.337.142,2.156-.517ZM226.009,96.169c-.4.427-.643.562-.701.767-2.604,9.147-8.434,15.709-13.909,22.552-1.77,2.212-2.926,2.222-4.672-.076-1.239-1.631-2.316-3.424-3.757-4.852-4.044-4.007-6.8-9.026-8.92-14.571-.472-1.235-.609-2.729-1.969-3.764-3.766,3.705-8.19,6.36-12.56,9.108-1.226.771-1.119,1.605-.593,2.795,1.578,3.571,3.797,6.566,6.288,9.328,1.118,1.239,2.519,2.268,3.175,3.88.776,1.907,1.961,2.196,3.521,1.88,2.644-.535,5.307-.893,7.991-.639,9.009.853,18.067-.901,27.063.688.851.15,1.831.232,2.306-.974.902-2.291,2.696-3.685,4.176-5.391,2.286-2.634,4.336-5.464,5.801-8.802.524-1.195.497-2.064-.683-2.812-4.363-2.764-8.793-5.412-12.557-9.117ZM297.879,119.154c7.386-1.236,14.67-3.004,21.968-4.691.804-.186,1.412-.683,1.85-1.491,3.151-5.822,4.974-11.92,3.128-18.823-.718-2.685-1.653-5.272-2.859-7.705-2.685-5.418-5.447-10.785-8.198-16.16-.258-.505-.449-1.176-1.086-1.201-.541.128-.765.594-.986,1.021-2.602,5.034-5.304,9.999-8.506,14.572-.782,1.117-.485,2.069-.212,3.184.961,3.922,1.665,7.881,1.737,11.99.117,6.692-1.67,12.478-5.863,17.242-.449.51-1.084.927-.974,2.062ZM105.477,68.045c-3.83,7.929-7.761,14.555-10.77,21.814-3.134,7.559-2.62,14.741,1.08,21.839.862,1.654,1.798,2.687,3.539,3.029,4.838.952,9.643,2.122,14.467,3.173,2.126.463,4.266.846,6.539,1.294-.25-1.682-1.234-2.241-1.867-3.082-2.454-3.258-4.067-6.922-4.733-11.192-.66-4.232-.639-8.529.533-12.464,1.403-4.707.779-8.305-1.977-12.09-2.541-3.49-4.547-7.499-6.812-12.321ZM328.863,111.654c.507.415,1.059.167,1.583.027,6.413-1.724,12.818-3.486,19.238-5.175,1.018-.268,1.789-1.079,2.733-1.379,1.832-.58,2.324-2.087,2.611-3.967.498-3.263.054-6.391-1.121-9.321-3.157-7.87-6.415-15.687-9.681-23.499-.925-2.212-1.265-2.313-3.03-1.12-.952.643-1.894,1.394-2.656,2.298-2.707,3.211-5.291,6.556-8.005,9.758-1.828,2.157-2.184,4.156-.991,7.093,3.225,7.938,3.329,15.994-.464,23.85-.215.446-.426.881-.216,1.436ZM89.891,112.205c-.698-1.671-1.074-2.576-1.453-3.48-2.304-5.501-2.733-11.2-1.431-17.096.492-2.226,1.034-4.456,2.005-6.452.914-1.878.54-3.188-.569-4.773-2.793-3.99-6.045-7.476-9.093-11.185-.6-.731-1.365-1.316-2.121-1.846-1.955-1.371-2.372-1.285-3.317.985-3.251,7.808-6.461,15.637-9.655,23.475-1.257,3.085-1.566,6.349-1.078,9.691.225,1.538.738,2.755,2.226,3.467,1.54.737,3.035,1.504,4.679,1.932,6.389,1.664,12.764,3.398,19.806,5.283ZM118.046,78.389c1.594-3.364,2.484-6.235,4.093-8.419,2.829-3.842,2.075-7.271.078-11.017-3.744-7.023-8.696-12.183-15.923-14.078-1.839-.482-3.552-.321-5.155.817-6.141,4.36-10.664,10.364-13.753,17.778-.469,1.126-1.014,2.539-.364,3.668,1.873,3.257,2.865,7.107,5.093,10.161,1.092-.926,1.481-2.159,2.043-3.24,1.989-3.832,3.855-7.75,5.929-11.521,2.666-4.848,5.999-5.347,9.679-1.479,2.918,3.067,5.005,6.808,6.328,11.088.549,1.776,1.11,3.548,1.953,6.242ZM300.018,77.773c1.098-1.784,1.408-3.674,1.969-5.443,1.391-4.383,3.482-8.27,6.522-11.39,3.606-3.7,6.865-3.21,9.458,1.428,1.798,3.215,3.366,6.596,5.096,9.862.895,1.689,1.567,3.579,2.964,5.143,1.889-2.606,2.523-5.7,4.096-8.103,1.51-2.308,1.36-4.44.311-6.742-3.042-6.673-7.238-12.189-12.727-16.403-1.977-1.518-4.064-1.807-6.385-1.124-6.923,2.037-11.824,7.017-15.281,13.863-2.796,5.537-2.67,5.671.193,11.259,1.273,2.484,2.111,5.266,3.782,7.651ZM212.8,23.186c-.276.08-.552.161-.829.241,0,6.943.028,13.887-.024,20.83-.01,1.334.609,1.754,1.53,2.05,4.704,1.515,7.665,5.32,10.29,9.764,1.776,3.007,2.369,6.524,3.765,9.862,2.82-1.792,5.514-3.524,8.225-5.222,2.752-1.723,2.733-1.696,1.515-4.823-5.326-13.676-14.564-23.516-24.472-32.703ZM206.028,23.498c-.26-.113-.519-.226-.779-.339-4.067,3.944-8.083,7.957-11.866,12.264-5.189,5.907-9.304,12.678-12.389,20.26-.282.692-.526,1.405-.824,2.088-.37.847-.172,1.448.533,1.89,3.293,2.064,6.584,4.132,10.044,6.303.623-2.069,1.027-3.927,1.723-5.631,2.197-5.38,4.83-10.642,9.891-12.878,3.197-1.413,4.288-3.166,3.757-6.886-.319-2.234-.085-4.572-.088-6.863-.005-3.403-.001-6.805-.001-10.208ZM240.375,32.013c-4.558-4.435-7.919-9.688-11.865-14.337-3.065-3.612-6.634-6.353-10.538-8.641-2.964-1.737-6.062-2.403-9.352-2.391-6.059.022-10.897,3.424-15.428,7.405-5.847,5.137-9.712,12.457-15.458,18.059.828.674,1.263,1.04,1.708,1.389,2.54,1.99,2.528,1.975,4.759-.626,6.108-7.122,13.136-12.981,20.086-18.947,3.162-2.715,6.322-2.775,9.526-.047,6.703,5.707,13.427,11.388,19.389,18.119,3.104,3.506,3.074,3.541,7.174.019ZM241.254,100.819c1.302-4.069,1.613-7.861,1.827-11.653.427-7.537-.14-14.973-2.074-22.226-.721-2.702-.78-2.719-2.902-1.659-2.957,1.476-5.795,3.293-8.909,4.319-1.246.411-1.124,1.337-1.068,2.343.295,5.34.286,10.665-.638,15.938-.214,1.222.002,2.108.868,3.013,3.806,3.976,8.09,7.102,12.895,9.927ZM177.855,64.31c-3.463,12.13-3.82,24.091-1.111,36.579,5.125-2.939,9.449-6.194,13.306-10.261.659-.695.805-1.378.647-2.35-.894-5.518-1.112-11.08-.702-16.672.072-.979-.15-1.594-1.076-2.015-3.508-1.593-6.972-3.314-11.064-5.281ZM244.698,49.882c1.025-.896,1.696-1.56,2.431-2.111,2.587-1.943,5.025-1.741,7.314.623.658.679,1.258,1.448,1.805,2.246,3.913,5.707,8.234,11.053,11.709,17.149.211.371.441.948,1.357.453.723-2.473,1.521-5.22,2.333-7.963.285-.963-.076-1.692-.537-2.459-3.474-5.783-7.193-11.337-11.765-16.069-2.244-2.322-4.693-4.324-7.637-5.353-4.095-1.431-7.69-.295-10.878,2.853-.898.887-1.077,1.747-.369,2.955,1.416,2.416,2.723,4.916,4.238,7.676ZM149.141,68.593c1.068-.249,1.304-1.205,1.724-1.908,3.594-6.011,7.774-11.5,11.851-17.068,2.978-4.066,5.543-4.193,9.288-1.008.434.369.877.724,1.47,1.214,1.431-2.592,2.727-5.102,4.174-7.495.82-1.357.598-2.261-.432-3.228-3.254-3.056-6.859-4.159-10.944-2.634-3.153,1.177-5.719,3.419-8.098,5.966-4.259,4.562-7.765,9.835-11.071,15.295-.442.729-1.029,1.437-.646,2.417,1.073,2.745,1.319,5.852,2.684,8.45ZM57.74,103.187c-.42-9.719-.456-9.736,2.795-19.022.545-1.556.529-2.608-.721-3.565-.736-.563-1.417-1.223-2.096-1.877-1.06-1.021-1.933-.983-2.748.406-2.658,4.53-5.295,9.064-6.858,14.279-.594,1.981-.656,3.972-.27,5.986.249,1.299.744,2.322,2.105,2.543,2.518.41,4.976,1.302,7.791,1.25ZM360.395,102.962c.362.096.685.288.98.243,1.762-.273,3.523-.561,5.273-.919,3.297-.673,3.895-1.471,3.91-5.235.003-.878-.076-1.789-.284-2.632-1.437-5.836-4.386-10.763-7.358-15.669-.408-.673-.973-1.113-1.691-.586-1.402,1.029-2.954,2.005-3.811,3.617-.788,1.481.463,2.864.984,4.18,2.019,5.095,3.108,10.294,1.917,15.88-.069.326.045.704.08,1.121ZM212.637,108.051c1.12-.053,1.511-1.083,2.013-1.834,3.864-5.775,6.226-12.301,7.312-19.435.248-1.626.436-3.27.541-4.915.076-1.181-.536-1.745-1.46-1.095-1.985,1.397-4.096.891-6.198.782-2.784-.143-2.817-.131-2.956,2.975-.338,7.508.334,14.995.414,22.495.004.343.217.684.333,1.027ZM205.46,107.964c.407-.159.39-.58.402-.934.207-5.829.437-11.657.581-17.488.05-2.023-.139-4.053-.184-6.081-.032-1.429-.627-2.07-1.882-1.976-1.444.107-2.902.073-4.332.289-1.483.224-2.57-1.438-4.048-1.107-.778,8.752,4.275,23.221,9.461,27.297ZM209.077,70.638c2.168-4.369,4.063-8.221,5.991-12.052.537-1.068.327-1.831-.413-2.675-3.361-3.827-7.827-3.797-11.218.061-.764.869-.867,1.584-.326,2.648,1.949,3.831,3.833,7.705,5.966,12.017ZM218.714,59.644c-2.202,5.362-4.141,10.016-6.014,14.704-.336.841.095,1.525.92,1.574,2.446.147,4.894.257,7.343.31.836.018,1.604-.374,1.567-1.519-.166-5.074-1.021-9.927-3.815-15.07ZM199.439,59.606c-2.707,5.132-3.687,9.858-3.757,14.879-.015,1.058.483,1.704,1.402,1.738,2.862.105,5.716.052,8.962-.627-2.227-5.389-4.256-10.298-6.608-15.99Z" fill="currentColor"/><path d="M61.866,56.837c-2.105-.04-3.801-1.623-3.99-3.723-.178-1.978,1.004-3.622,3.083-4.201.965-.269,1.946-.531,2.932-.625,2.418-.231,3.197.786,2.823,3.536-.449,3.305-2.151,5.065-4.847,5.013Z" fill="currentColor"/><path d="M354.2,48.235c1.157.266,2.485.456,3.748.891,1.392.478,2.189,1.668,2.288,3.354.109,1.859-.7,3.132-2.113,3.921-1.591.889-3.938.431-5.282-.974-1.461-1.528-1.657-3.564-1.423-5.577.186-1.602,1.5-1.589,2.782-1.615Z" fill="currentColor"/><path d="M97.393,18.934c2.133-.013,3.821,1.94,3.787,4.382-.036,2.575-2.393,5.112-4.677,5.033-1.727-.06-3.403-2.285-3.386-4.496.02-2.591,2.032-4.905,4.276-4.919Z" fill="currentColor"/><path d="M317.041,23.397c-.065-2.556,1.482-4.438,3.664-4.46,2.183-.021,4.331,2.339,4.401,4.835.059,2.1-1.681,4.463-3.367,4.573-2.261.147-4.632-2.349-4.698-4.948Z" fill="currentColor"/>
          </svg>
          <PhSparkle weight="fill" class="text-white absolute top-0 right-10 animate-ping opacity-70 w-6 h-6" />
        </div>
        <div class="space-y-0">
          <div class="flex items-center justify-center gap-4 text-[#75527e]/90">
             <span class="font-luxurious text-4xl md:text-5xl drop-shadow-sm pb-2">mis</span>
             <span class="font-seasons font-normal text-[8.5rem] md:text-[11rem] text-[#75527e] drop-shadow-md leading-none">15</span>
             <span class="font-luxurious text-4xl md:text-5xl drop-shadow-sm pb-2">años</span>
          </div>
          <h1 class="font-luxurious text-6xl md:text-8xl lg:text-9xl text-[#75527e] drop-shadow-lg py-2 leading-tight">
            {{ nombreMostrado }}
            <span v-if="cursorVisible" class="animate-pulse text-[#a37ab0]">|</span>
          </h1>
        </div>
      </div>
      <div class="absolute bottom-8 z-30 animate-bounce text-[#75527e]/70">
         <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 256 256"><path fill="currentColor" d="M213.66 101.66l-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32Z"/></svg>
      </div>
    </header>

    <section class="py-20 px-6 w-full text-center space-y-10 relative bg-[#75527e] text-white">
      <div class="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 bg-fuchsia-900 rounded-full blur-3xl opacity-20 z-0"></div>
      <div class="relative z-10 space-y-8 max-w-2xl mx-auto">
        <IconoAnimado 
          src="/assets/iconos/heart.gif"
          class="w-24 h-24 mx-auto opacity-80 mb-4 text-[#d8b4e2]"
        />
        <p class="font-cormorant text-xl md:text-3xl text-stone-200 italic leading-relaxed px-6 font-light">
          "{{ datos.frase }}"
        </p>
        <div class="py-6">
          <p class="uppercase tracking-widest text-xs font-bold mb-8 text-[#fff]/70">Faltan pocos días</p>
          <CuentaRegresiva 
            :fechaObjetivo="datos.fecha" 
            colorCaja="bg-white/5 border border-white/10 backdrop-blur-sm shadow-xl"
            colorNumero="text-white"
            colorEtiqueta="text-stone-400"
            colorSegundos="text-[#d8b4e2]" 
          />
        </div>
      </div>
    </section>

    <section v-if="datos.padres" class="min-h-screen flex items-center justify-center relative bg-[#F9F8F6] overflow-hidden py-20 px-6">
      <div class="relative z-10 w-full max-w-4xl mx-auto text-center space-y-16 animate-fade-in-up">
      
        <div class="space-y-4">
          <h3 class="font-cormorant text-4xl md:text-6xl text-[#75527e] leading-tight">
            Con la bendición de Dios<br>
            <span class="text-3xl md:text-4xl opacity-80 font-cormorant italic">y el amor de mis padres</span>
          </h3>
        </div>
      
        <div class="bg-white/60 backdrop-blur-sm p-10 md:p-14 rounded-2xl shadow-sm border border-[#75527e]/10 mx-auto max-w-3xl">
          <div class="flex flex-col md:flex-row justify-center items-center gap-8 md:gap-0">
             <div class="flex-1 space-y-2">
                <p class="font-cormorant italic text-3xl md:text-4xl text-[#545454] font-medium">
                  {{ datos.padres.padre }}
                </p>
                <p class="text-xs uppercase tracking-[0.2em] text-[#a37ab0] font-bold">Padre</p>
             </div>

             <div class="px-8 text-[#75527e]/40 font-seasons text-4xl">
                <IconoAnimado 
                  src="/assets/iconos/heart.gif"
                  class="w-24 h-24 mx-auto opacity-80 mb-4 text-[#d8b4e2]"
                />
             </div>

             <div class="flex-1 space-y-2">
                <p class="font-cormorant italic text-3xl md:text-4xl text-[#545454] font-medium">
                  {{ datos.padres.madre }}
                </p>
                <p class="text-xs uppercase tracking-[0.2em] text-[#a37ab0] font-bold">Madre</p>
             </div>
          </div>
        </div>

        <div v-if="datos.padrinos" class="space-y-4 pt-4">
            <div class="inline-block px-4 py-1 border-b border-[#75527e]/30 mb-2">
               <p class="text-sm uppercase tracking-widest text-[#75527e]">Mis Padrinos</p>
            </div>
            <p class="font-cormorant text-2xl md:text-3xl text-[#545454]">
               {{ datos.padrinos.nombres }}
            </p>
        </div>
      </div>
    </section>

    <section class="py-24 px-6 bg-[#faf5fc] relative overflow-hidden">       
      <div class="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl pointer-events-none"></div>

      <div class="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center relative z-10">      
        <div class="h-[500px] w-full rounded-t-[10rem] rounded-b-3xl border-[8px] border-white shadow-xl overflow-hidden relative group">
          <img 
            :src="datos.fotoSegunda" 
            class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
            alt="Recepción"
          />
          <div class="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent pointer-events-none"></div>
        </div>

        <div class="text-center md:text-left space-y-10">
          <div class="space-y-4">
            <h2 class="font-seasons text-5xl md:text-6xl text-[#75527e]">
              Recepción Social
            </h2>
            <p class="text-[#8e7f94] text-lg font-cormorant italic">
              Celebremos juntos este momento inolvidable
            </p>
          </div>
        
          <div class="space-y-8 pl-2 md:pl-4 border-l-2 border-[#75527e]/10 md:border-none">
            <div class="flex flex-col md:flex-row items-center md:items-start gap-5 group">
              <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm text-[#75527e] group-hover:scale-110 transition-transform duration-300 shrink-0">
                 <PhMapPin :size="28" weight="light" />
              </div>

              <div class="text-center md:text-left">
                <strong class="block text-xl text-[#545454] leading-tight font-cormorant font-bold mb-1">
                  {{ datos.ubicacion.nombreLugar }}
                </strong>
                <span class="text-base text-stone-500 font-light block max-w-xs mx-auto md:mx-0">
                  {{ datos.ubicacion.direccion }}
                </span>
              </div>
            </div>
          
            <div class="flex flex-col md:flex-row items-center md:items-start gap-5 group">
              <div class="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-sm text-[#75527e] group-hover:scale-110 transition-transform duration-300 shrink-0">
                 <PhCalendarCheck :size="28" weight="light" />
              </div>
              <div class="text-center md:text-left">
                <strong class="block text-xl text-[#545454] leading-tight capitalize font-cormorant font-bold mb-1">
                  {{ new Date(datos.fecha).toLocaleDateString('es-BO', { weekday: 'long', day: 'numeric', month: 'long' }) }}
                </strong>
                <span class="text-base text-stone-500 font-light">
                  Horas: {{ new Date(datos.fecha).toLocaleTimeString('es-BO', { hour: '2-digit', minute: '2-digit' }) }}
                </span>
              </div>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row gap-4 justify-center md:justify-start pt-4">
            <BotonAccion 
              texto="Ver Ubicación" 
              :icono="PhMapPin" 
              :url="datos.ubicacion.linkGps" 
              color="bg-[#75527e]/80 text-white shadow-md hover:bg-[#5e4165]" 
            />
            <BotonAccion 
              v-if="esGold" 
              texto="Agendar Fecha" 
              :icono="PhCalendarCheck" 
              :url="datos.linkCalendario" 
              color="bg-[#75527e] text-white shadow-md hover:bg-[#5e4165]" 
            />
          </div>
        
        </div>
      </div>
    </section>

    <section v-if="esGold && datos.galeria" class="py-20 bg-[#75527e] relative overflow-hidden min-h-[600px]">
  
      <div class="mariposas-container absolute inset-0 z-20 pointer-events-none overflow-hidden">
        <img v-for="n in 10" :key="n" src="/assets/mariposa-lila.png" class="mariposa absolute opacity-60" alt="mariposa"/>
      </div>

      <div class="relative z-20 text-center mb-12">
        <h3 class="font-luxurious text-5xl md:text-6xl text-white drop-shadow-md">
          Mis Momentos
        </h3>
        <p class="font-cormorant text-xl text-white/80 italic mt-2">Haz clic para ampliar</p>
      </div>

      <div class="relative z-20 w-full overflow-hidden py-8">
        <div class="flex animate-marquee hover:[animation-play-state:paused]">

          <div class="flex shrink-0 gap-8 px-4">
            <div 
              v-for="(foto, index) in fotosVisibles" 
              :key="'orig-'+index" 
              class="relative group w-64 h-80 md:w-80 md:h-96 flex-shrink-0 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
              @click="abrirFoto(foto)"
            >
              <div class="w-full h-full rounded-2xl border-[6px] border-white shadow-xl overflow-hidden bg-white relative">
                <img :src="foto" class="w-full h-full object-cover" loading="lazy" />

                <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                   <PhMagnifyingGlassPlus size="48" weight="light" />
                </div>
              </div>
            </div>
          </div>
        
          <div class="flex shrink-0 gap-8 px-4" aria-hidden="true">
            <div 
              v-for="(foto, index) in fotosVisibles" 
              :key="'clon-'+index" 
              class="relative group w-64 h-80 md:w-80 md:h-96 flex-shrink-0 transform hover:scale-105 transition-transform duration-300 cursor-pointer"
              @click="abrirFoto(foto)"
            >
              <div class="w-full h-full rounded-2xl border-[6px] border-white shadow-xl overflow-hidden bg-white relative">
                <img :src="foto" class="w-full h-full object-cover" loading="lazy" />

                <div class="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                   <PhMagnifyingGlassPlus size="48" weight="light" />
                </div>
              </div>
            </div>
          </div>
        
        </div>
      </div>

      <Transition
        enter-active-class="transition duration-300 ease-out"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div 
          v-if="fotoEnGrande" 
          class="fixed inset-0 z-[100] bg-[#2a1b2e]/95 backdrop-blur-md flex items-center justify-center p-4"
          @click="cerrarFoto"
        >

          <button 
            class="absolute top-6 right-6 text-white hover:text-rose-200 z-[101] p-3 bg-black/20 rounded-full transition-colors cursor-pointer" 
            @click.stop="cerrarFoto"
          >
            <PhX size="32" weight="bold" />
          </button>
        
          <div class="relative max-w-5xl max-h-[90vh] w-full h-full flex items-center justify-center p-2 animate-fade-in-up">
              <img 
                :src="fotoEnGrande" 
                class="max-w-full max-h-full object-contain rounded-lg shadow-2xl border-4 border-white/10"
                alt="Foto grande"
                @click.stop
              />
          </div>
        </div>
      </Transition>

      <div v-if="!esPremium && datos.galeria.length > 6" class="text-center pt-8 relative z-30">
           <p class="text-white/60 text-xs italic bg-black/20 inline-block px-4 py-1 rounded-full">
             + {{ datos.galeria.length - 6 }} fotos adicionales disponibles en Plan Queen
           </p>
        </div>

        <div v-if="esPremium && datos.linkFiltro" class="text-center mt-8 relative z-30">
           <a :href="datos.linkFiltro" target="_blank" class="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-purple-900/50 hover:scale-105 transition-transform border border-white/20">
             <PhCamera size="24" weight="fill" />
             Probar mi Filtro de Instagram
           </a>
        </div>

    </section>

    <transition name="fade">
      <section v-if="esGold" class="bg-white py-10 relative">
        <div class="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-slate-50 to-white"></div>
          <div class="text-center mb-16 relative z-10">
            <h2 class="font-seasons text-5xl text-[#75527e] mb-2">Itinerario</h2>
            <p class="font-cormorant text-xl text-[#a37ab0] italic">Sigue el ritmo de mi fiesta</p>
          </div>

          <Cronograma15 
            :eventos="datos.agenda"
            colorCardBg="bg-[#faf5fc]"
            colorLinea="border-[#e0cfe6]"
          />
        
          <CodigoVestimenta15 
            v-if="datos.vestimenta"
            :nota="datos.vestimenta.nota"
            :tipo="datos.vestimenta.tipo"  
            :labelHombres="datos.vestimenta.etiquetaHombres || 'Traje Formal'"
            :labelMujeres="datos.vestimenta.etiquetaMujeres || 'Vestido Largo'"
            imgHombres="/assets/iconos/suit.png"
            imgMujeres="/assets/iconos/dress.png"
          />
      </section>
    </transition>

    <div v-if="!esGold" class="py-12 bg-purple-50 text-center border-t border-purple-100">
        <p class="text-purple-400 text-sm italic flex items-center justify-center gap-2">
          <PhSparkle weight="fill" /> El Plan Glow incluye Galería y Cronograma
        </p>
    </div>

    <section class="py-24 px-6 bg-[#75527e] relative overflow-hidden">  
      
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-lg h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
      
      <div class="max-w-lg mx-auto relative z-10">

        <div class="bg-white rounded-[2.5rem] shadow-2xl shadow-black/20 overflow-hidden relative border border-white/20">

          <div class="p-10 md:p-12 text-center space-y-10">
            <div class="space-y-5">
               <div class="w-32 h-32 mx-auto bg-[#faf5fc] rounded-full flex items-center justify-center text-[#75527e] shadow-inner transform hover:scale-110 transition-transform duration-500">
                  <IconoAnimado 
                    src="/assets/iconos/gift.gif"
                    class="w-24 h-24 mx-auto opacity-80 mb-4 text-[#75527e]"
                  />
               </div>
               <h3 class="font-seasons text-4xl text-[#75527e]">Muestras de Cariño</h3>
               <p class="font-cormorant text-lg text-[#665c69] leading-relaxed px-2">
                 Mi mayor regalo es que estés conmigo. Pero si deseas tener un detalle especial, estoy ahorrando para cumplir un gran sueño:
                 <span class="block mt-2 font-bold text-[#75527e] italic">
                   ¡Irme de viaje con mis amigas!
                 </span>
               </p>
               <button 
                 @click="modalAbierto = true" 
                 class="group relative inline-flex items-center justify-center px-8 py-3 overflow-hidden font-cormorant font-bold tracking-widest text-[#75527e] border border-[#75527e]/30 rounded-full transition-all duration-300 hover:bg-[#75527e] hover:text-white hover:border-[#75527e]"
               >
                 <span class="uppercase text-xs">Ver Datos Bancarios</span>
               </button>
            </div>
            
            <div class="w-full flex items-center justify-center opacity-30">
                <div class="h-px w-16 bg-[#75527e]"></div>
                <div class="mx-2 text-[#75527e]">❦</div> <div class="h-px w-16 bg-[#75527e]"></div>
            </div>
            
            <div class="space-y-4">
               <h3 class="font-seasons text-4xl text-[#75527e]">Confirmación</h3>
               <p class="font-cormorant text-[#a37ab0] text-lg italic">
                 Por favor confirma antes del <br>
                 <span class="font-bold not-italic">{{ new Date(datos.fecha).toLocaleDateString('es-BO', { month: 'long', day: 'numeric' }) }}</span>
               </p>
               <div class="pt-4 flex justify-center">
                 <BotonAccion 
                   texto="Confirmar Asistencia" 
                   :icono="PhWhatsappLogo" 
                   :url="`https://wa.me/${datos.contacto.whatsapp}`" 
                   color="bg-[#75527e] text-white hover:bg-[#5e4165] shadow-lg shadow-[#75527e]/20 rounded-full px-8 py-3" 
                 />
               </div>
            </div>
          </div>
        </div>
      
        <div class="text-center mt-12 opacity-80 hover:opacity-100 transition-opacity duration-500">
           <p class="font-seasons text-4xl text-white drop-shadow-md">Te espero...</p>
        </div>
      
      </div>
    </section>

    <footer class="bg-[#1a0f1d] text-[#a37ab0] py-10 text-center text-xs pb-32">
      <p class="mb-2 opacity-50">Mis 15 Años • {{ nombreMostrado }}</p>
      <p>Invitación creada con ✨ por <span class="text-[#d8b4e2] font-bold">Yupa Studio</span></p>
    </footer>

    <ReproductorMusica 
      v-if="datos.musica" 
      :songUrl="datos.musica"
      colorBoton="bg-[#FDFBF7] border-[#75527e]/50"
      colorIcono="text-[#75527e]"
    />
    
    <ModalRegalos15 
      :mostrar="modalAbierto" 
      :cuentas="datos.regalos" 
      @cerrar="modalAbierto = false"
      claseColorPrincipal="text-[#75527e] border-[#75527e]"
      claseOverlay="bg-[#2a1b2e]/95 backdrop-blur-md"
    />

    <MenuNavegacion v-show="!modalAbierto && !fotoEnGrande" />

    <DemoSwitcher 
      v-if="datos.esDemo" 
      @cambioPlan="actualizarPlan" 
    />

  </div>
</template>

<style scoped>
/* --- ANIMACIÓN MARIPOSAS (Flotar hacia arriba) --- */
.mariposa {
  position: absolute;
  bottom: -10%; /* Empiezan abajo */
  opacity: 0;
  animation: vuelo-magico linear infinite;
  z-index: 10;
  filter: drop-shadow(0 4px 6px rgba(0,0,0,0.1));
}

/* Configuraciones individuales para caos natural */
.mariposa:nth-child(1) { left: 10%; animation-duration: 15s; animation-delay: 0s; width: 30px; }
.mariposa:nth-child(2) { left: 20%; animation-duration: 18s; animation-delay: 4s; width: 45px; filter: blur(1px); }
.mariposa:nth-child(3) { left: 80%; animation-duration: 12s; animation-delay: 2s; width: 35px; }
.mariposa:nth-child(4) { left: 40%; animation-duration: 20s; animation-delay: 0.5s; width: 25px; opacity: 0.6; }
.mariposa:nth-child(5) { left: 60%; animation-duration: 14s; animation-delay: 6s; width: 50px; }
.mariposa:nth-child(6) { left: 90%; animation-duration: 16s; animation-delay: 3s; width: 32px; }
.mariposa:nth-child(7) { left: 30%; animation-duration: 19s; animation-delay: 8s; width: 28px; filter: blur(0.5px); }
.mariposa:nth-child(8) { left: 70%; animation-duration: 17s; animation-delay: 1s; width: 40px; }
.mariposa:nth-child(9) { left: 50%; animation-duration: 22s; animation-delay: 5s; width: 22px; }
.mariposa:nth-child(10) { left: 15%; animation-duration: 13s; animation-delay: 7s; width: 38px; }

@keyframes vuelo-magico {
  0% { 
    transform: translateY(0) translateX(0) rotate(0deg); 
    opacity: 0; 
  }
  10% { 
    opacity: 1; 
  }
  25% { 
    transform: translateY(-25vh) translateX(30px) rotate(15deg); 
  }
  50% { 
    transform: translateY(-50vh) translateX(-20px) rotate(-10deg); 
  }
  75% { 
    transform: translateY(-75vh) translateX(15px) rotate(5deg); 
  }
  100% { 
    transform: translateY(-110vh) translateX(0) rotate(0deg); 
    opacity: 0; 
  }


  
}

@keyframes brillo-real {
  0% { 
    filter: drop-shadow(0 4px 3px rgba(0,0,0,0.2)) brightness(1); 
  }
  50% { 
    /* Aumenta el brillo y crea un resplandor blanco alrededor */
    filter: drop-shadow(0 0 8px rgba(255,255,255,0.8)) brightness(1.3); 
  }
  100% { 
    filter: drop-shadow(0 4px 3px rgba(0,0,0,0.2)) brightness(1); 
  }
}

.animacion-tiara {
  animation: brillo-real 3s infinite ease-in-out;
}
</style>

<style>
/* Scroll personalizado en color Lila */
body.scroll-magico::-webkit-scrollbar { width: 10px; }
body.scroll-magico::-webkit-scrollbar-track { background: #f8fafc; }
body.scroll-magico::-webkit-scrollbar-thumb { 
  background: linear-gradient(to bottom, #75527e, #a855f7); 
  border-radius: 10px; 
  border: 2px solid #f8fafc; 
}

/* Fuentes personalizadas */
.font-luxurious {
  font-family: 'Luxurious Script', cursive;
}
.font-seasons {
  /* Usamos Playfair como reemplazo temporal si no tienes The Seasons */
  font-family: 'The Seasons', 'Playfair Display', serif; 
  font-weight: 400;
}
.font-cormorant {
  font-family: 'Cormorant Garamond', serif;
}

/* Animación del Carrusel Infinito */
@keyframes marquee {
  0% { transform: translateX(0%); }
  100% { transform: translateX(-50%); }
}
.animate-marquee {
  animation: marquee 40s linear infinite;
  width: max-content;
}
</style>