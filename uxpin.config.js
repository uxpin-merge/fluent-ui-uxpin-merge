module.exports = {
  components: {
    categories: [
      {
        name: 'Utilities',
        include: [
          'src/components/Text/Text.js',
          'src/components/Separator/Separator.js',
        ],
      },
      {
        name: 'Buttons',
        include: [
          'src/components/Button/Button.js',
          'src/components/ActionButton/ActionButton.js',
        ],
      },
    ],
    wrapper: 'src/components/UXPinWrapper/UXPinWrapper.js',
    webpackConfig: 'uxpin.webpack.config.js',
  },
  name: 'Fluent UI React'
};
