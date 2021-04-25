module.exports = {
  components: {
    categories: [
      {
        name: 'Extras',
        include: [
          'src/components/HorizontalStack/HorizontalStack.js',
          'src/components/MetaDataGroup/MetaDataGroup.js',
          'src/components/MetaDataPair/MetaDataPair.js',
          'src/components/VerticalStack/VerticalStack.js',
        ],
      },
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
          'src/components/TextField/TextField.js',
          'src/components/Toggle/Toggle.js',
        ],
      },
      {
        name: 'Pickers',
        include: [

        ],
      },
      {
        name: 'Surfaces',
        include: [
          'src/components/Dialog/Dialog.js',
        ],
      },
    ],
    wrapper: 'src/components/UXPinWrapper/UXPinWrapper.js',
    webpackConfig: 'uxpin.webpack.config.js',
  },
  name: 'Fluent UI React'
};
