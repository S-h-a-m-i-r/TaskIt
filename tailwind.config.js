/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['DM Sans'],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "",
        'custom-background': '#F5F5F7',
        'custom-border': '#D1D5DB',
        'custom-dark-background': '#212121',
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          100: '#5051F9',
          200: '#9747FF',
          300: '#00B69B',
          400: '#4880FF',
          500: '#EF4444'
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          100: '#999CA6',
         
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519',
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        },
        gray: {
          50: '#f9fafb',
          100: '#4B5563',
          200: '#EEEEEE',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
          950: '#030712',
        },
      },
      borderColor: {
        'primary': '#D1D5DB',
      },
      borderRadius: {
        lg: "20px",
        md: "12px",
        sm: "8px",
      },
      // Breakpoints
      screens: {
        'xs': '360px',
        'sm': '475px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1300px',
      },
      // Typography
      fontSize: {
        'tiny': ['0.625rem', { lineHeight: '0.75rem' }],
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.813rem', { lineHeight: '0.991rem' }],
        'base': ['0.9375rem', { lineHeight: '1.435rem' }],
        'lg': ['1.05rem', { lineHeight: '0.875rem' }],
        'xl': ['1.25rem', { lineHeight: '1.5rem' }],
        '2xl': ['1.5rem', { lineHeight: '1.875rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
      },
      // Spacing
      spacing: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
        '18': '4.5rem',
        '112': '28rem',
      },
      transitionProperty: {
        'background': 'background-color',
        'colors': 'background-color, border-color, color, fill, stroke',
      },
      animation: {
        'theme-toggle': 'theme-toggle 0.3s ease-in-out',
      },
      keyframes: {
        'theme-toggle': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(0.95)' },
        },
      },
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
  },
  darkMode: 'class',
  plugins: [],
}



