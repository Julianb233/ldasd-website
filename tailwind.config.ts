import type { Config } from "tailwindcss";

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Premium Warm Palette - San Diego Estate Planning
        primary: {
          DEFAULT: "#52796F", // Softer sage green
          light: "#84A98C",   // Mint sage
          dark: "#3D5A50",    // Muted forest
        },
        secondary: {
          DEFAULT: "#D4A574", // Warm gold
          light: "#E8C49A",   // Champagne
          dark: "#B8956A",    // Amber
        },
        accent: {
          DEFAULT: "#52796F",
          light: "#84A98C",
          dark: "#3D5A50",
        },
        // Section backgrounds
        tan: "#F5E6D3",       // Warm tan
        sky: "#E8F4F8",       // Soft sky blue
        sage: "#EDF5EE",      // Pale sage
        sand: "#FDF8F3",      // Warm sand/cream
        // Base colors
        background: "#FEFCF8", // Warmer cream
        foreground: "#2D3748", // Softer charcoal
        ivory: "#FFFEF9",
      },
      fontFamily: {
        sans: ["DM Sans", "system-ui", "sans-serif"],
      },
      boxShadow: {
        'premium': '0 4px 6px -1px rgba(0,0,0,0.03), 0 10px 20px -5px rgba(0,0,0,0.06), 0 25px 50px -12px rgba(0,0,0,0.08)',
        'premium-hover': '0 10px 20px -5px rgba(0,0,0,0.08), 0 25px 50px -12px rgba(0,0,0,0.12), 0 40px 80px -20px rgba(0,0,0,0.1)',
        'glass': '0 8px 32px rgba(0,0,0,0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
