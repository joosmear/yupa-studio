// src/data/misClientes.js
// CLIENTE 1: Juan y Ana (Boda Clásica)
export const bodaJuan = {
  id: 'juan-y-ana',
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
  
  contacto: {
    whatsapp: "59170000000", // Sin el '+' para que funcione el link directo
    banco: "BNB - Caja de Ahorro - 123456789"
  },

  musica: "/songs/mi-persona-favorita.mp3"
}

// CLIENTE 2: Pedro y María (Boda Moderna)
// Fíjate cómo cambian los datos pero la estructura es igual
export const bodaPedro = {
  id: 'pedro-y-maria',
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