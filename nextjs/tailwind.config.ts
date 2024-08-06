import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'login-light_blue': 'rgb(0,227,254)',
        'login-light_green': 'rgb(253, 224, 71)',
      },
      backgroundImage: {
        'login-bg-gradient':
          'linear-gradient(190deg, rgba(0, 227, 254, 1) 0%, rgba(253, 224, 71, 1) 100%)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
export default config
