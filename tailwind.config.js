module.exports = {
    purge: {
      content: [
        './src/pages/**/*.{js,ts,jsx,tsx}',
        './src/components/**/*.{js,ts,jsx,tsx}'
      ],
      safelist: [
        /^bg-/,
        /^from-/,
        /^to-/,
      ]
    },
    darkMode: false,
    theme: {
      extend: {},
    },
    variants:{
      extend: {},
    },
    plugins: [],
  }