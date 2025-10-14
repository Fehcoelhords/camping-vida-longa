/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // Aqui estendemos o tema padrão do Tailwind
      colors: {
        "brand-orange": "#FF7A00", // Um laranja vibrante como uma fogueira
        "brand-green": "#2E4C3E", // Um verde escuro, cor de floresta
        "dark-bg": "#1A1A1A", // Um fundo escuro, quase carvão, mais suave que preto
        "light-bg": "#F5F5DC", // Um fundo claro, cor de pergaminho/areia para contraste
        "main-text": "#EAEAEA", // Cor de texto principal, um branco suave
        "secondary-text": "#A0A0A0", // Cor de texto secundário, um cinza claro
      },
      fontFamily: {
        // 'sans' será nossa fonte padrão (corpo)
        sans: ["Lato", "sans-serif"],
        // 'heading' será nossa fonte para títulos
        heading: ["Poppins", "sans-serif"],
      },
    },
  },
  plugins: [],
};
