module.exports = {
  components: {
    categories: [
      {
        name: 'Utilities',
        include: [
          'src/components/Image/Image.js',
          'src/components/Link/Link.js',
          'src/components/Separator/Separator.js',
          'src/components/Text/Text.js',
        ],
      },
      {
        name: 'Buttons',
        include: [
          'src/components/ActionButton/ActionButton.js',
          'src/components/Button/Button.js',
          'src/components/CompoundButton/CompoundButton.js',
        ],
      },
      {
        name: 'Input',
        include: [
          'src/components/Checkbox/Checkbox.js',
          'src/components/SearchBox/SearchBox.js',
          'src/components/Slider/Slider.js',
        ],
      },
    ],
    wrapper: 'src/components/UXPinWrapper/UXPinWrapper.js',
    webpackConfig: 'uxpin.webpack.config.js',
  },
  name: 'Fluent UI React'
};
