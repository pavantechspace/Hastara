/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#0D3B2E',
        gold: '#B8935A',
        cream: '#F8F5EE',
        charcoal: '#1A1A1A',

        background: '#F8F5EE',
        surface: '#FFFFFF',
        muted: '#666666',
        border: '#D4C9B0',

        'tier-mystic': '#B8935A',
        'tier-oracle': '#0D3B2E',
        'tier-sage': '#7B5EA7',
      },
      fontFamily: {
        display: ['Cormorant Garamond', 'serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: {
        card: '16px',
      },
    },
  },
};
