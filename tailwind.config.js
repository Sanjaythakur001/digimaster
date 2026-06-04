/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  safelist: [
    // brand colours built dynamically (e.g. `bg-brand-${c}/15`, `text-brand-${c}`)
    ...['blue', 'green', 'orange', 'purple'].flatMap((c) => [
      `text-brand-${c}`,
      `bg-brand-${c}`,
      `bg-brand-${c}/10`,
      `bg-brand-${c}/15`,
      `border-brand-${c}`,
      `border-brand-${c}/40`,
    ]),
    'sm:grid-cols-2',
    'sm:grid-cols-3',
    'shadow-glow',
    'shadow-glow-green',
    'shadow-glow-purple',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0a0f1f',
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
        },
        brand: {
          blue: '#3b82f6',
          green: '#22c55e',
          orange: '#f97316',
          purple: '#a855f7',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgba(59,130,246,0.5)',
        'glow-purple': '0 0 40px -10px rgba(168,85,247,0.5)',
        'glow-green': '0 0 40px -10px rgba(34,197,94,0.5)',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}
