// DEMO 1: Juan y Ana (Boda Clásica)
export const bodaJuan = {
  id: 'juan-y-ana',
  esDemo: true,
  modelo: 'clasica',
  plan: 'premium',
  tipo: 'boda',
  nombres: "Juan & Ana",
  fecha: "2026-02-14T16:00:00",
  frase: "El amor es paciente, es bondadoso. El amor no es envidioso ni jactancioso.",
  
  fotoPortada: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1080",
  fotoSegunda: "https://images.unsplash.com/photo-1494955870715-979ca4f13bf0?q=80&w=1170",
  
  ubicacion: {
    nombreLugar: "Parroquia San Miguel",
    direccion: "Av. Principal #123, Zona Sur",
    linkGps: "https://maps.app.goo.gl/CK5j3kXuYeJJq3Ms6"
  },
  linkCalendario: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+de+Juan+y+Ana&dates=20260214T180000/20260214T230000&location=Parroquia+San+Miguel&details=¡Los+esperamos+para+celebrar!",
  agenda: [
    { hora: "16:00", titulo: "Ceremonia Religiosa", icono: "iglesia" },
    { hora: "18:00", titulo: "Recepción y Brindis", icono: "brindis" },
    { hora: "19:00", titulo: "Cena", icono: "cena" },
    { hora: "21:00", titulo: "Fiesta", icono: "fiesta" }
  ],
  vestimenta: {
    tipo: "Formal Riguroso",
    nota: "Mujeres: Vestido largo. Hombres: Traje."
  },
  galeria: [
    "https://images.unsplash.com/photo-1705088013553-46199f8b4ecc?q=80&w=687&auto",
    "https://images.unsplash.com/photo-1705088014389-cdd8afdc0f2f?q=80&w=1170&auto",
    "https://images.unsplash.com/photo-1705088013485-00c24753747c?q=80&w=2070&auto",
    "https://images.unsplash.com/photo-1705088013581-c40e14a0420f?q=80&w=2070&auto",
    "https://images.unsplash.com/photo-1705088014632-3f0c9799ab6a?q=80&w=2070&auto",
    "https://images.unsplash.com/photo-1705088014762-0c457f3b99fc?q=80&w=1974&auto",
    "https://images.unsplash.com/photo-1705088014726-d8dd9113ee03?q=80&w=2071&auto",
    "https://images.unsplash.com/photo-1705088014788-e35d313fa93a?q=80&w=687&auto",
    "https://images.unsplash.com/photo-1705088013592-1197a888a8e1?q=80&w=687&auto",
    "https://images.unsplash.com/photo-1705088013514-098dff61d018?q=80&w=1171",
    "https://images.unsplash.com/photo-1705088013578-e5f521b534ce?q=80&w=687&auto",
    "https://images.unsplash.com/photo-1705088014803-0705b681cad3?q=80&w=1170",
    "https://images.unsplash.com/photo-1705088013626-ce15181fa76c?q=80&w=687"
  ],
  cortejo: {
    padresNovia: [
      { nombre: "Ricardo García", foto: "https://randomuser.me/api/portraits/men/32.jpg" },
      { nombre: "Elena López", foto: "https://randomuser.me/api/portraits/women/44.jpg" }
    ],
    padresNovio: [
      { nombre: "Mario Pérez", foto: "https://randomuser.me/api/portraits/men/64.jpg" },
      { nombre: "Carmen Ruiz", foto: "https://randomuser.me/api/portraits/women/68.jpg" }
    ],
    padrinosBoda: [
      { nombre: "Sr. Carlos Mesa" },
      { nombre: "Sra. Patricia Flores" }
    ]
  },
  regalos: [
    {
      nombre: "Cuenta Novio",
      qr: "/qrs/qr-prueba.jpeg",
      banco: "BNB",
      cuenta: "999-888-777",
      titular: "Juan Pérez"
    },
    {
      nombre: "Cuenta Novia",
      qr: "/qrs/qr-prueba.jpeg",
      banco: "Banco Unión",
     cuenta: "111-222-333",
      titular: "Ana García"
    }
  ],
  contacto: {
    whatsapp: "59170000000"
  },
  musica: "/songs/boda.mp3"
}


// DEMO 2: Pedro y María (Boda Ligth)
export const bodaPedro = {
  id: 'pedro-y-maria',
  esDemo: true,
  modelo: 'dreams',
  plan: 'premium',
  tipo: 'boda',
  nombres: "Pedro & María",
  fecha: "2026-08-20T20:00:00",
  frase: "Juntos es nuestro lugar favorito en el mundo.",
  expira: '2026-06-01', // FECHA DE CORTE AUTOMÁTICO (Formato: AÑO-MES-DÍA)
  
  fotoPortada: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1080",
  fotoSegunda: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1080",
  
  ubicacion: {
    nombreLugar: "Parroquia San Miguel",
    direccion: "Av. Principal #123, Zona Sur",
    linkGps: "https://maps.app.goo.gl/CK5j3kXuYeJJq3Ms6"
  },

  linkCalendario: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+de+Juan+y+Ana&dates=20260214T180000/20260214T230000&location=Parroquia+San+Miguel&details=¡Los+esperamos+para+celebrar!",
  
  agenda: [
    { hora: "16:00", titulo: "Ceremonia Religiosa", icono: "iglesia" },
    { hora: "18:00", titulo: "Recepción y Brindis", icono: "brindis" },
    { hora: "19:00", titulo: "Cena", icono: "cena" },
    { hora: "21:00", titulo: "Fiesta", icono: "fiesta" }
  ],

  vestimenta: {
    tipo: "Formal Riguroso",
    nota: "Mujeres: Vestido largo. Hombres: Traje."
  },

  galeria: [
    "https://images.unsplash.com/photo-1705088013553-46199f8b4ecc?q=80&w=687&auto",
    "https://images.unsplash.com/photo-1705088014389-cdd8afdc0f2f?q=80&w=1170&auto",
    "https://images.unsplash.com/photo-1705088013485-00c24753747c?q=80&w=2070&auto",
    "https://images.unsplash.com/photo-1705088013581-c40e14a0420f?q=80&w=2070&auto",
    "https://images.unsplash.com/photo-1705088014632-3f0c9799ab6a?q=80&w=2070&auto",
    "https://images.unsplash.com/photo-1705088014762-0c457f3b99fc?q=80&w=1974&auto",
    "https://images.unsplash.com/photo-1705088014726-d8dd9113ee03?q=80&w=2071&auto"
  ],

  cortejo: {
    padresNovia: [
      { nombre: "Ricardo García", foto: "https://randomuser.me/api/portraits/men/32.jpg" },
      { nombre: "Elena López", foto: "https://randomuser.me/api/portraits/women/44.jpg" }
    ],
    padresNovio: [
      { nombre: "Mario Pérez", foto: "https://randomuser.me/api/portraits/men/64.jpg" },
      { nombre: "Carmen Ruiz", foto: "https://randomuser.me/api/portraits/women/68.jpg" }
    ],
    padrinosBoda: [
      { nombre: "Sr. Carlos Mesa" },
      { nombre: "Sra. Patricia Flores" }
    ]
  },

  regalos: [
    {
      nombre: "Cuenta Novio",
      qr: "/qrs/qr-prueba.jpeg",
      banco: "BNB",
      cuenta: "999-888-777",
      titular: "Juan Pérez"
    },
    {
      nombre: "Cuenta Novia",
      qr: "/qrs/qr-prueba.jpeg",
      banco: "Banco Unión",
     cuenta: "111-222-333",
      titular: "Ana García"
    }
  ],

  contacto: {
    whatsapp: "59170000000"
  },

  musica: "/songs/boda.mp3"
}


// DEMO 2: (Noche, Lujo, Dorado)
export const bodaCarlos = {
  id: 'carlos-y-sofia',
  esDemo: true,
  modelo: 'gala',
  plan: 'premium',
  tipo: 'boda',
  nombres: "Carlos y Sofía",
  fecha: "2026-04-18T19:00:00",
  frase: "El amor es paciente, es bondadoso. El amor no es envidioso ni jactancioso.",
  
  fotoPortada: "https://images.unsplash.com/photo-1667420421340-850fc44c9c45",
  fotoSegunda: "https://images.unsplash.com/photo-1529636120425-66f3708694e7?q=80&w=1169",
  
  ubicacion: {
    nombreLugar: "Salón Gran Emperador",
    direccion: "Av. La Reforma #500, Zona Sur",
    linkGps: "https://maps.app.goo.gl/CK5j3kXuYeJJq3Ms6"
  },

  linkCalendario: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+de+Juan+y+Ana&dates=20260214T180000/20260214T230000&location=Parroquia+San+Miguel&details=¡Los+esperamos+para+celebrar!",
  
  agenda: [
    { hora: "16:00", titulo: "Ceremonia Religiosa", icono: "iglesia" },
    { hora: "18:00", titulo: "Recepción y Brindis", icono: "brindis" },
    { hora: "19:00", titulo: "Cena", icono: "cena" },
    { hora: "21:00", titulo: "Fiesta", icono: "baile" }
  ],

  vestimenta: {
    tipo: "Formal Riguroso",
    nota: "Mujeres: Vestido largo. Hombres: Traje."
  },

  galeria: [
    "https://images.unsplash.com/photo-1597175742183-c8def759077b",
    "https://images.unsplash.com/photo-1597089180101-ab1bfff281cf",
    "https://images.unsplash.com/photo-1596763759959-82b852f5158f",
    "https://images.unsplash.com/photo-1597089180162-ffaaaefa4b14",
    "https://images.unsplash.com/photo-1596763760065-fbc8ae35b048",
    "https://images.unsplash.com/photo-1596474971433-44fc045bdff8",
    "https://images.unsplash.com/photo-1596474971501-810dcd1218a7"
  ],

  cortejo: {
    padresNovia: [
      { nombre: "Ricardo García", foto: "https://randomuser.me/api/portraits/men/32.jpg" },
      { nombre: "Elena López", foto: "https://randomuser.me/api/portraits/women/44.jpg" }
    ],
    padresNovio: [
      { nombre: "Mario Pérez", foto: "https://randomuser.me/api/portraits/men/64.jpg" },
      { nombre: "Carmen Ruiz", foto: "https://randomuser.me/api/portraits/women/68.jpg" }
    ],
    padrinosBoda: [
      { nombre: "Sr. Carlos Mesa" },
      { nombre: "Sra. Patricia Flores" }
    ]
  },

  regalos: [
    {
      nombre: "Cuenta Novio",
      qr: "/qrs/qr-prueba.jpeg",
      banco: "BNB",
      cuenta: "999-888-777",
      titular: "Juan Pérez"
    },
    {
      nombre: "Cuenta Novia",
      qr: "/qrs/qr-prueba.jpeg",
      banco: "Banco Unión",
     cuenta: "111-222-333",
      titular: "Ana García"
    }
  ],

  contacto: {
    whatsapp: "59170000000"
  },

  musica: "/songs/boda-gold.mp3"
}


// DEMO 3:(Jardín, Verde, Relajado)
export const bodaMiguel = {
  id: 'miguel-y-elena',
  esDemo: true,
  modelo: 'boho',
  plan: 'premium',
  tipo: 'boda',
  nombres: "Miguel & Elena",
  fecha: "2026-03-15T10:30:00",
  frase: "Bajo el cielo abierto y rodeados de naturaleza, queremos celebrar nuestro amor.",
  
  fotoPortada: "https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?q=80&w=1169",
  fotoSegunda: "https://images.unsplash.com/photo-1529636120425-66f3708694e7?q=80&w=1169",
  
  ubicacion: {
    nombreLugar: "Jardines de Aranjuez",
    direccion: "Carretera a Viacha Km 10",
    linkGps: "https://maps.app.goo.gl/CK5j3kXuYeJJq3Ms6"
  },

  linkCalendario: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+de+Juan+y+Ana&dates=20260214T180000/20260214T230000&location=Parroquia+San+Miguel&details=¡Los+esperamos+para+celebrar!",
  
  agenda: [
    { hora: '10:30', actividad: 'Ceremonia al Aire Libre', icono: 'ceremonia' },
    { hora: '12:00', actividad: 'Almuerzo Campestre', icono: 'cena' },
    { hora: '15:00', actividad: 'Baile', icono: 'fiesta' }
  ],

  vestimenta: {
    tipo: 'Formal Campestre',
    nota: 'Colores claros y zapatos cómodos para pasto.'
  },

  galeria: [
    "https://images.unsplash.com/photo-1529634597503-139d3726fed5?q=80&w=1169",
    "https://images.unsplash.com/photo-1529635322560-e767888a1583?q=80&w=688",
    "https://images.unsplash.com/photo-1529634897274-69e6ac04f315?q=80&w=1169",
    "https://images.unsplash.com/photo-1529635104544-aa97f1511ae6?q=80&w=1169",
    "https://images.unsplash.com/photo-1529635229076-82fefed713c4?q=80&w=1169",
    "https://images.unsplash.com/photo-1529635004337-98bdc35214a7?q=80&w=688",
    "https://images.unsplash.com/photo-1529636475857-2ee7c59e2fdf?q=80&w=1169"
  ],

  cortejo: {
    padresNovia: [
      { nombre: "Ricardo García", foto: "https://randomuser.me/api/portraits/men/32.jpg" },
      { nombre: "Elena López", foto: "https://randomuser.me/api/portraits/women/44.jpg" }
    ],
    padresNovio: [
      { nombre: "Mario Pérez", foto: "https://randomuser.me/api/portraits/men/64.jpg" },
      { nombre: "Carmen Ruiz", foto: "https://randomuser.me/api/portraits/women/68.jpg" }
    ],
    padrinosBoda: [
      { nombre: "Sr. Carlos Mesa" },
      { nombre: "Sra. Patricia Flores" }
    ]
  },

  regalos: [
    {
      nombre: "Cuenta Novio",
      qr: "/qrs/qr-prueba.jpeg",
      banco: "BNB",
      cuenta: "999-888-777",
      titular: "Juan Pérez"
    },
    {
      nombre: "Cuenta Novia",
      qr: "/qrs/qr-prueba.jpeg",
      banco: "Banco Unión",
     cuenta: "111-222-333",
      titular: "Ana García"
    }
  ],

  contacto: {
    whatsapp: "59170000000"
  },

  musica: "/songs/boda-boho.mp3"
}

// Quince anios DEMOS
// Demo 1: Valentia (Color Lila)
export const demoValentina = {
  id: 'valentina-xv',
  esDemo: true,
  modelo: 'xv-mariposa',
  plan: 'gold',
  tipo: 'xv',
  nombre: "Valentina Pérez",
  fecha: "2026-05-20T16:00:00",
  frase: "Gracias por ser parte de mi vida y por celebrar este hermoso capítulo junto a mí. Espero que sigamos creando muchos más recuerdos juntos.",
  fotoPortada: "https://images.pexels.com/photos/27815939/pexels-photo-27815939.jpeg",
  fotoSegunda: "https://images.pexels.com/photos/27815939/pexels-photo-27815939.jpeg",

  padres: {
    padre: "Juan Pérez",
    madre: "María González"
  },
  padrinos: {
    nombres: "Luis Torres y Ana López"
  },

  ubicacion: {
    nombreLugar: "Jardines de Aranjuez",
    direccion: "Carretera a Viacha Km 10",
    linkGps: "https://maps.app.goo.gl/CK5j3kXuYeJJq3Ms6"
  },
  linkCalendario: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+de+Juan+y+Ana&dates=20260214T180000/20260214T230000&location=Parroquia+San+Miguel&details=¡Los+esperamos+para+celebrar!",
  
  galeria: [
    "https://images.pexels.com/photos/27815938/pexels-photo-27815938.jpeg",
    "https://images.pexels.com/photos/27815947/pexels-photo-27815947.jpeg",
    "https://images.pexels.com/photos/18461052/pexels-photo-18461052.jpeg",
    "https://images.pexels.com/photos/17697229/pexels-photo-17697229.jpeg",
    "https://images.pexels.com/photos/18461057/pexels-photo-18461057.png",
    "https://images.pexels.com/photos/18461051/pexels-photo-18461051.jpeg"
  ],

  agenda: [
    { hora: '17:00', actividad: 'Recepción Social', icono: "/assets/iconos/recepcion.gif" },
    { hora: '18:00', actividad: 'Ingreso Quinceñera', icono: '/assets/iconos/ingreso.gif' },
    { hora: '19:00', actividad: 'Baile', icono: '/assets/iconos/baile.gif' },
    { hora: '20:00', actividad: 'La Hora Loca', icono: '/assets/iconos/la-hora.gif' },
    { hora: '21:00', actividad: 'Cena', icono: '/assets/iconos/cena.gif' }
  ],

  vestimenta: {
    tipo: 'Elegante & Juvenil',
    nota: 'Usar colores pastel.',
    //etiquetaHombres: 'Guayabera', // Dato opcional
    //etiquetaMujeres: 'Vestido Floral' // Dato opcional
  },

  regalos: [
    {
      nombre: "Cuenta Novio",
      qr: "/qrs/qr-prueba.jpeg",
      banco: "BNB",
      cuenta: "999-888-777",
      titular: "Juan Pérez"
    },
    {
      nombre: "Cuenta Novia",
      qr: "/qrs/qr-prueba.jpeg",
      banco: "Banco Unión",
     cuenta: "111-222-333",
      titular: "Ana García"
    }
  ],

  contacto: {
    whatsapp: "59170000000"
  },

  musica: "/songs/tiempo-de-vals.wav"
}

// CLIENTE DEMO: Estilo Euphoria / Neón
export const demoCamila = {
  id: 'camila-xv',
  esDemo: true, // Activa el Switcher
  modelo: 'xv-neon', // Este debe coincidir con tu ruta
  plan: 'premium', // Iniciamos en premium para mostrar el filtro de IG
  tipo: 'xv',
  
  nombre: "Camila Rios",
  fecha: "2026-08-15T19:00:00", // Fiesta de noche
  frase: "La vida es una fiesta, vístete para ella. ¡Prepárate para brillar toda la noche!",
  
  // Fotos oscuras con neón (Unsplash)
  fotoPortada: "https://images.unsplash.com/photo-1763625641897-bf7d98f63e69", 
  fotoSegunda: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop",

  padres: {
    padre: "Carlos Rios",
    madre: "Sofia Mendez"
  },
  padrinos: {
    nombres: "Alejandro y Valeria"
  },

  ubicacion: {
    nombreLugar: "Lounge Infinity",
    direccion: "Av. Equipetrol Calle 4, Zona Norte",
    linkGps: "https://goo.gl/maps/xyz" // Link ficticio
  },
  
  linkCalendario: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=XV+Camila&details=Neon+Party!",
  
  // Galería con ambiente de fiesta/disco
  galeria: [
    "https://images.unsplash.com/photo-1763959946737-5255a1df0d93?q=80&w=688&auto",
    "https://images.unsplash.com/photo-1763959946740-7be8c282d00a?q=80&w=688&auto",
    "https://images.unsplash.com/photo-1763959951338-f9363788d9fa?q=80&w=1169&auto",
    "https://images.unsplash.com/photo-1763959945112-5ea44b5277f4?q=80&w=688&auto",
    "https://images.unsplash.com/photo-1763959945334-1d5b96c46f16?q=80&w=688&auto",
    "https://images.unsplash.com/photo-1705626308236-490402f6c1cd?q=80&w=681&auto",
    "https://images.unsplash.com/photo-1705626313801-3f514863ca83?q=80&w=1170&auto"
  ],

  agenda: [
    { hora: '19:00', actividad: 'Welcome Drinks', icono: '/assets/iconos/recepcion.gif' },
    { hora: '20:00', actividad: 'Entrada Triunfal', icono: '/assets/iconos/ingreso.gif' },
    { hora: '21:00', actividad: 'Vals Moderno', icono: '/assets/iconos/baile.gif' },
    { hora: '22:00', actividad: 'Hora Loca LED', icono: '/assets/iconos/la-hora.gif' },
    { hora: '23:00', actividad: 'After Party', icono: '/assets/iconos/cena.gif' }
  ],

  vestimenta: {
    tipo: 'Neon Party Chic',
    nota: 'Ven de negro o con colores neón para resaltar.',
    etiquetaHombres: 'Semi-Formal Dark',
    etiquetaMujeres: 'Cocktail Dress'
  },

 regalos: [
   {
     nombre: "Cuenta Papá",
     qr: "/qrs/qr-prueba.jpeg",
     banco: "Banco Ganadero",
     cuenta: "444-555-666",
     titular: "Carlos Rios"
   }
 ],

  contacto: {
    whatsapp: "59170000000"
  },

  musica: "/songs/levitating.mp3" // Sugerencia: Una canción pop moderna
}

export const demoSofia = {
  id: 'sofia-xv', // Coincide con tu catálogo
  esDemo: true,
  modelo: 'xv-royal', // CLAVE
  plan: 'premium',
  tipo: 'xv',
  nombre: "Sofia Ramirez",
  fecha: "2026-10-10T19:00:00",
  frase: "En esta noche mágica, rodeada de estrellas y del amor de quienes más quiero...",
  fotoPortada: "https://images.unsplash.com/photo-1677212013193-bcda844e2e65",
  fotoSegunda: "https://plus.unsplash.com/premium_photo-1673626577666-5e5df3fdab86",
  
  padres: {
    padre: "Juan Pérez",
    madre: "María González"
  },
  padrinos: {
    nombres: "Luis Torres y Ana López"
  },

  ubicacion: {
    nombreLugar: "Jardines de Aranjuez",
    direccion: "Carretera a Viacha Km 10",
    linkGps: "https://maps.app.goo.gl/CK5j3kXuYeJJq3Ms6"
  },
  linkCalendario: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+de+Juan+y+Ana&dates=20260214T180000/20260214T230000&location=Parroquia+San+Miguel&details=¡Los+esperamos+para+celebrar!",
  
  galeria: [
    "https://images.unsplash.com/photo-1677211776486-9cede78a4d16",
    "https://images.unsplash.com/photo-1677212087600-651a104e3c46",
    "https://images.unsplash.com/photo-1677211877650-f6d39a36a6e0",
    "https://images.unsplash.com/photo-1677211830168-1ba3e52aa194",
    "https://images.unsplash.com/photo-1677211905366-c485bf8e9436",
    "https://images.unsplash.com/photo-1677211747567-90affa5fcb40",
    "https://images.unsplash.com/photo-1677211728850-60fbeb1ddc6b"
  ],

  agenda: [
    { hora: '17:00', actividad: 'Recepción Social', icono: "/assets/iconos/recepcion.gif" },
    { hora: '18:00', actividad: 'Ingreso Quinceñera', icono: '/assets/iconos/ingreso.gif' },
    { hora: '19:00', actividad: 'Baile', icono: '/assets/iconos/baile.gif' },
    { hora: '20:00', actividad: 'La Hora Loca', icono: '/assets/iconos/la-hora.gif' },
    { hora: '21:00', actividad: 'Cena', icono: '/assets/iconos/cena.gif' }
  ],

  vestimenta: {
    tipo: 'Elegante & Juvenil',
    nota: 'Usar colores pastel.',
    //etiquetaHombres: 'Guayabera', // Dato opcional
    //etiquetaMujeres: 'Vestido Floral' // Dato opcional
  },

  regalos: [
    {
      nombre: "Cuenta Novio",
      qr: "/qrs/qr-prueba.jpeg",
      banco: "BNB",
      cuenta: "999-888-777",
      titular: "Juan Pérez"
    },
    {
      nombre: "Cuenta Novia",
      qr: "/qrs/qr-prueba.jpeg",
      banco: "Banco Unión",
     cuenta: "111-222-333",
      titular: "Ana García"
    }
  ],

  contacto: {
    whatsapp: "59170000000"
  },

  musica: "/songs/tiempo-de-vals.wav"
}

// Ninos

export const datosValeria = {
  id: 'valeria',
  esDemo: true, 
  modelo:  'magico',
  plan: 'magico',
  tipo: 'infatil',
  nombre: "Valeria",
  fecha: "2026-10-25T16:00:00",
  frase: "¡Llegó mi primer añito! Acompáñame a vivir una aventura mágica y salvaje.",
  edad: "1",

  fotoPortada: "https://images.unsplash.com/photo-1719160233586-7b1da92f196d?q=80&w=687",
  imgFondoPattern: "/assets/infantil/patrones-unicornio.jpeg",
  videoYoutube: 'zfKTe9q2j80',
  
    padres: {
    padre: "Alejandro Méndez",
    madre: "Carolina Ríos"
  },
  padrinos: {
    nombres: "Javier Soria & Lucía Méndez"
  },

  ubicacion: {
    nombreLugar: "Salón de Eventos 'Little Jungle'",
    direccion: "Av. Las Palmeras #450, Zona Sur, La Paz",
    linkGps: "https://goo.gl/maps/tu-link-aqui"
  },

  linkCalendario: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+de+Juan+y+Ana&dates=20260214T180000/20260214T230000&location=Parroquia+San+Miguel&details=¡Los+esperamos+para+celebrar!",

  galeria: [
    { url: "https://images.unsplash.com/photo-1719160233557-226f017fbfd7?q=80&w=687", descripcion: 'Mi primer baño 🛁' },
    { url: "https://images.unsplash.com/photo-1719160233586-7b1da92f196d?q=80&w=687", descripcion: 'Con la abuela ❤️' },
    { url: "https://images.unsplash.com/photo-1719160276130-cb1f7e857072?q=80&w=687", descripcion: 'Ya sé gatear!' },
    { url: "https://images.unsplash.com/photo-1719160276256-278749d129d3?q=80&w=687", descripcion: 'Dormilona 😴' },
    { url: "https://images.unsplash.com/photo-1719160276127-b83ffa2c5e02?q=80&w=687", descripcion: 'Jugando en el parque' },
    { url: "https://images.unsplash.com/photo-1719160232990-8f125e7728dc?q=80&w=687", descripcion: 'Mi sonrisa favorita' }
  ],

  agenda: [
    { hora: '15:00', actividad: '¡Bienvenidos! (Recepción de invitados', icono: 'recepcion' },
    { hora: '16:00', actividad: 'Juegos Divertidos (Show infantil o juegos)', icono: 'juegos' },
    { hora: '17:00', actividad: 'Soplamos la Velita (Momento del Pastel)', icono: 'pastel' },
    { hora: '18:00', actividad: 'Lluvia de Dulces (La Piñata)', icono: 'piñata' },
    { hora: '19:00', actividad: 'Cajitas de Sorpresas (Fin de la fiesta)', icono: 'regalo' }
  ],

  regalos: [
    {
      tag: 'Mamá',
      banco: "Banco Nacional",
      titular: "Carolina Ríos",
      cuenta: "123-456-7890",
      qrImagen: '/qrs/qr-prueba.jpeg'
    },
    {
      tag: 'Papá',
      banco: "Yape / QR",
      titular: "Alejandro Méndez",
      cuenta: "77712345",
      qrImagen: '/qrs/qr-prueba.jpeg'
    }
  ],

  contacto: {
    whatsapp: "59177712345", // Número para el botón de confirmar
    mensajeDefault: "¡Hola! Quiero confirmar mi asistencia al cumple de Valeria 🦁"
  },

  musica: "/songs/un-mundo-ideal.mp3"
}