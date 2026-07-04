module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          navy: {
            50: '#e8eaf6',
            100: '#c5cae9',
            200: '#9fa8da',
            300: '#7986cb',
            400: '#5c6bc0',
            500: '#3f51b5',
            600: '#303f9f',
            700: '#283593',
            800: '#1a237e',
            900: '#0d1642',
          },
          sky: {
            300: '#7dd3fc',
            400: '#38bdf8',
            500: '#0ea5e9',
            600: '#0284c7',
            700: '#0369a1',
          },
          'dark-bg': {
            100: '#1e293b',
            200: '#0f172a',
            300: '#0a0f1a',
          },
        },
      },
    },
    plugins: [require("daisyui")],
    daisyui: {
      themes: [
        {
          'navy-dark': {
            'primary': '#3f51b5',
            'primary-focus': '#1a237e',
            'primary-content': '#ffffff',
            'secondary': '#38bdf8',
            'secondary-focus': '#0284c7',
            'secondary-content': '#ffffff',
            'accent': '#7dd3fc',
            'accent-focus': '#38bdf8',
            'accent-content': '#0f172a',
            'neutral': '#1e293b',
            'neutral-focus': '#0f172a',
            'neutral-content': '#e2e8f0',
            'base-100': '#0f172a',
            'base-200': '#1e293b',
            'base-300': '#2d3a5e',
            'base-content': '#e2e8f0',
            'info': '#38bdf8',
            'success': '#10b981',
            'warning': '#f59e0b',
            'error': '#ef4444',
          },
        },
      ],
    },
  }