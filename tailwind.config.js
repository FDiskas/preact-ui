module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    mode: 'all',
    preserveHtmlElements: true,
    content: ['src/index.html', 'src/**/*.{js,ts,tsx,scss,css,module.css}'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
