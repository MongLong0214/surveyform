/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    colors: {
      default: '#e4e6ef',
      hover: '#f0f9ff',
      hoverText: '#26a6f8',
    },
    extend: {
      spacing: {
        128: "32rem",
      },
      zIndex: {
        "9999": "9999",
      },
      fontSize: {
        'xxs': '10px',
        'xxxs': '5px',
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
}