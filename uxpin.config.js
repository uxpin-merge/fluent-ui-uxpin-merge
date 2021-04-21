module.exports = {
  components: {
    categories: [
      {
        name: 'General',
        include: [
          'src/components/Button/Button.js',
          'src/components/ActionButton/ActionButton.js',
        ],
      },
      {
        name: 'Utilities',
        include: [
          'src/components/Separator/Separator.js',
        ],
      },
    ],
    wrapper: 'src/components/UXPinWrapper/UXPinWrapper.js',
    webpackConfig: 'uxpin.webpack.config.js',
  },
  name: 'Fluent UI React'
};
