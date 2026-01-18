/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Fuente 1: Nombres (Script)
        'script': ['"Great Vibes"', 'cursive'], 
        // Fuente 2: Títulos (Serifa Elegante)
        'serif': ['"Playfair Display"', 'serif'],
        // Fuente 3: Lectura (Limpia)
        'sans': ['"Lato"', 'sans-serif'], 
      },
      colors: {
        // Definimos TU paleta aquí para no fallar
        'boda': {
          primary: '#f43f5e',   // rose-500 (Magenta elegante)
          dark: '#44403c',      // stone-700 (Texto oscuro)
          light: '#78716c',     // stone-500 (Texto suave)
          bg: '#fafaf9',        // stone-50  (Fondo crema)
        }
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite', // Para el disco de música
      }
    },
  },
  plugins: [],
}