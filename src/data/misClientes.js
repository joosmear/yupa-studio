// src/data/misClientes.js
// CLIENTE 1: Juan y Ana (Boda Clásica)
export const bodaJuan = {
  id: 'juan-y-ana',
  plan: 'premium',
  tipo: 'boda',
  nombres: "Juan & Ana",
  fecha: "2026-02-14T18:00:00", // Año-Mes-Día T Hora:Minutos
  frase: "El amor es paciente, es bondadoso. El amor no es envidioso ni jactancioso.",
  
  // Fotos (Usamos links de Unsplash por ahora)
  fotoPortada: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1080",
  fotoSegunda: "https://images.unsplash.com/photo-1606216794079-73f85bbd57d5?q=80&w=1974",
  
  ubicacion: {
    nombreLugar: "Parroquia San Miguel",
    direccion: "Av. Principal #123, Zona Sur",
    linkGps: "https://maps.app.goo.gl/CK5j3kXuYeJJq3Ms6" // Aquí iría el link real de Google Maps
  },

  linkCalendario: "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Boda+de+Juan+y+Ana&dates=20260214T180000/20260214T230000&location=Parroquia+San+Miguel&details=¡Los+esperamos+para+celebrar!",
  
  contacto: {
    whatsapp: "59170000000", // Sin el '+' para que funcione el link directo
    banco: "BNB - Caja de Ahorro - 123456789"
  },

regalos: [
  {
    nombre: "Cuenta Novia", // Título de la pestaña
    qr: "/qrs/qr-prueba.jpeg", // URL imagen
    banco: "Banco Unión",
    cuenta: "111-222-333",
    titular: "Ana García"
  },
  {
    nombre: "Cuenta Novio",
    qr: "/qrs/qr-prueba.jpeg", // URL imagen
    banco: "BNB",
    cuenta: "999-888-777",
    titular: "Juan Pérez"
  }
],

  musica: "/songs/mi-persona-favorita.mp3",

  // Datos para el Cronograma
  agenda: [
    { hora: "16:00", titulo: "Ceremonia Religiosa", icono: "⛪" },
    { hora: "18:00", titulo: "Recepción y Brindis", icono: "🥂" },
    { hora: "19:00", titulo: "Cena", icono: "🍽️" },
    { hora: "21:00", titulo: "Fiesta", icono: "💃" }
  ],

  // Datos de Vestimenta
  vestimenta: {
    tipo: "Formal Riguroso",
    nota: "Mujeres: Vestido largo. Hombres: Traje."
  },

  // Array de fotos para la galería
  galeria: [
    "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520854221256-17451cc330e7?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522673607200-1645062cd958?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop"
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
  }
}

// CLIENTE 2: Pedro y María (Boda Moderna)
export const bodaPedro = {
  id: 'pedro-y-maria',
  plan: 'basico',
  tipo: 'boda',
  nombres: "Pedro & María",
  fecha: "2026-08-20T20:00:00",
  frase: "Juntos es nuestro lugar favorito en el mundo.",
  
  fotoPortada: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=1080",
  fotoSegunda: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?q=80&w=1080",
  
  ubicacion: {
    nombreLugar: "Salón de Eventos 'El Cielo'",
    direccion: "Calle 5 de Achumani",
    linkGps: "https://goo.gl/maps/..."
  },
  
  contacto: {
    whatsapp: "59160000000",
    banco: "BCP - 987654321"
  },

  musica: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
}