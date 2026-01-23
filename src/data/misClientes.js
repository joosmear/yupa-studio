// src/data/misClientes.js

// CLIENTE 1: Juan y Ana (Boda Clásica)
export const bodaJuan = {
  id: 'juan-y-ana',
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


// CLIENTE 2: Pedro y María (Boda Ligth)
export const bodaPedro = {
  id: 'pedro-y-maria',
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


// 3. CLIENTE PARA ESTILO GALA (Noche, Lujo, Dorado)
export const bodaCarlos = {
  id: 'carlos-y-sofia',
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


// 4. CLIENTE PARA ESTILO BOHO (Jardín, Verde, Relajado)
export const bodaMiguel = {
  id: 'miguel-y-elena',
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