/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './@/components/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: '',
  theme: {
    container: {
      center: 'true',
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        'brand-red': {
          DEFAULT: '#FF3A30',
          dark: '#E0332A',
        },
        'brand-navy': {
          DEFAULT: '#003366',
          light: '#004080',
        },
        'brand-blue-accent': '#A1B9ED',
        surface: {
          offwhite: '#F9F9F9',
          pale: '#F0F0F0',
        },
        text: {
          primary: '#1A1A1A',
          body: '#444746',
          muted: '#595959',
          inverse: '#FFFFFF',
        },
        accent: {
          base: 'var(--accent-base)',
          light: 'var(--accent-light)',
          lighter: 'var(--accent-lighter)',
          dark: 'var(--accent-dark)',
          darker: 'var(--accent-darker)',
          contrast: 'var(--accent-contrast)',
        },
        color1: 'var(--color-1)',
        color2: 'var(--color-2)',
        color3: 'var(--color-3)',
        color4: 'var(--color-4)',
        color5: 'var(--color-5)',
        color6: 'var(--color-6)',
        color7: 'var(--color-7)',
        color8: 'var(--color-8)',
        color9: 'var(--color-9)',
        border: {
          DEFAULT: 'var(--border)',
          light: 'rgba(180, 180, 180, 0.88)',
        },
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        link: 'var(--link)',
        'link-hover': 'var(--link-hover)',
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      backgroundColor: {
        'primary-custom': '#003366',
        'secondary-custom': '#004080',
        'accent-custom': '#FF3A30',
      },
      textColor: {
        link: 'var(--link)',
        'link-hover': 'var(--link-hover)',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        button: '24px',
        card: '8px',
        chip: '24px',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      boxShadow: {
        header: 'var(--header-box-shadow)',
        shadow: 'var(--shadow)',
        'shadow-hover': 'var(--shadow-hover)',
        card: '0 4px 12px rgba(0, 0, 0, 0.05)',
        'card-hover': '0 8px 24px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/forms')],
};
