module.exports = {
  components: {
    categories: [
      {
        name: 'Containers',
        include: [
          'src/components/HorizontalStack/HorizontalStack.js',
          'src/components/MetaDataGroup/MetaDataGroup.js',
          'src/components/MetaDataPair/MetaDataPair.js',
          'src/components/Shape/Shape.js',
          'src/components/VerticalStack/VerticalStack.js',
        ],
      },
      {
        name: 'Cards',
        include: [
          'src/components/Card/Card.js',
          'src/components/CardHeader/CardHeader.js',
          'src/components/CardBody/CardBody.js',
          'src/components/CardFooter/CardFooter.js',
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
          'src/components/ToggleButton/ToggleButton.js',
        ],
      },
      {
        name: 'Input',
        include: [
          'src/components/Checkbox/Checkbox.js',
          'src/components/SearchBox/SearchBox.js',
          'src/components/Slider/Slider.js',
          'src/components/TextArea/TextArea.js',
          'src/components/TextField/TextField.js',
          'src/components/Toggle/Toggle.js',
        ],
      },
      {
        name: 'Items & Lists',
        include: [
          'src/components/Persona/Persona.js',
          'src/components/Facepile/Facepile.js',
        ],
      },
      {
        name: 'Surfaces',
        include: [
          'src/components/Dialog/Dialog.js',
          'src/components/Panel/Panel.js',
          'src/components/Tooltip/Tooltip.js',
        ],
      },
      {
        name: 'Notification & Engagement',
        include: [
          'src/components/Coachmark/Coachmark.js',

          'src/components/TeachingBubble/TeachingBubble.js',
        ],
      },
      {
        name: 'Progress',
        include: [
          'src/components/ProgressIndicator/ProgressIndicator.js',
          'src/components/Spinner/Spinner.js',
        ],
      },
    ],
    wrapper: 'src/components/UXPinWrapper/UXPinWrapper.js',
    webpackConfig: 'uxpin.webpack.config.js',
  },
  name: 'Fluent UI React'
};
