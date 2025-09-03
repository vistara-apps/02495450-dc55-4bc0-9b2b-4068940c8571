/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(210 40% 98%)',
        accent: 'hsl(209 95% 54%)',
        danger: 'hsl(354 70% 54%)',
        primary: 'hsl(210 39% 16%)',
        surface: 'hsl(209 40% 94%)',
        'text-primary': 'hsl(210 40% 16%)',
        'text-secondary': 'hsl(210 40% 30%)',
        purple: {
          500: '#8B5CF6',
          600: '#7C3AED',
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
        }
      },
      borderRadius: {
        lg: '16px',
        md: '10px',
        sm: '6px',
      },
      spacing: {
        lg: '20px',
        md: '12px',
        sm: '8px',
      },
      boxShadow: {
        card: '0 8px 24px hsla(210, 40%, 16%, 0.12)',
      },
      fontSize: {
        'display': ['2.25rem', { lineHeight: '2.5rem', fontWeight: '700' }],
        'heading': ['1.5rem', { lineHeight: '2rem', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.75rem', fontWeight: '400' }],
        'caption': ['0.875rem', { lineHeight: '1.25rem', fontWeight: '300' }],
      },
      transitionTimingFunction: {
        'custom': 'cubic-bezier(0.22,1,0.36,1)',
      },
      transitionDuration: {
        'base': '250ms',
        'fast': '150ms',
      }
    },
  },
  plugins: [],
}
