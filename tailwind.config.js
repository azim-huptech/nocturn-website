/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F9F6EE',
        'cream-2': '#F2EDDF',
        espresso: '#3C1B10',
        'espresso-2': '#2A1109',
        terracotta: '#C84B20',
        'terracotta-2': '#A83C15',
        muted: '#8A7B70',
        ink: '#1A0F0A',
        gold: '#D4A574',
      },
      fontFamily: {
        display: ['"Commissioner"', 'ui-sans-serif', 'system-ui'],
        sans: ['"Plus Jakarta Sans"', 'ui-sans-serif', 'system-ui'],
        serif: ['"Instrument Serif"', 'ui-serif', 'Georgia'],
      },
      animation: {
        'spin-slow': 'spin 22s linear infinite',
        bob: 'bob 5.5s ease-in-out infinite',
        'float-1': 'float1 6s ease-in-out infinite',
        'float-2': 'float2 7.5s ease-in-out infinite',
        'float-3': 'float3 8s ease-in-out infinite',
        steam: 'steam 4s linear infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
      },
      keyframes: {
        bob: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        float1: {
          '0%,100%': { transform: 'translate(0,0) rotate(0)' },
          '50%': { transform: 'translate(10px,-18px) rotate(12deg)' },
        },
        float2: {
          '0%,100%': { transform: 'translate(0,0) rotate(0)' },
          '50%': { transform: 'translate(-14px,-22px) rotate(-14deg)' },
        },
        float3: {
          '0%,100%': { transform: 'translate(0,0) rotate(0)' },
          '50%': { transform: 'translate(8px,14px) rotate(-8deg)' },
        },
        steam: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0.5' },
          '100%': { transform: 'translateY(-80px) scale(1.6)', opacity: '0' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'gradient-x': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};
