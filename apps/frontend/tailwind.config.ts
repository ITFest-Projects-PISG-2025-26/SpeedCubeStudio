import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './public/index.html',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0e0e0e',
        foreground: '#f5f5f5',
        primary: '#10b981',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
