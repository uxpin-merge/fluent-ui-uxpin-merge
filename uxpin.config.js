module.exports = {
  components: {
    categories: [
      {
        name: 'Containers',
        include: [
          'src/components/HideablePanel/HideablePanel.js',
          'src/components/HorizontalStack/HorizontalStack.js',
          'src/components/MetaDataGroup/MetaDataGroup.js',
          'src/components/MetaDataPair/MetaDataPair.js',
          'src/components/PageHeader/PageHeader.js',
          'src/components/PageFooter/PageFooter.js',
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
          'src/components/Chip/Chip.js',
          'src/components/Icon/Icon.js',
          'src/components/Image/Image.js',
          'src/components/Link/Link.js',
          'src/components/Separator/Separator.js',
          'src/components/StatusSet/StatusSet.js',
          'src/components/Text/Text.js',
          'src/components/Timestamp/Timestamp.js',
        ],
      },
      {
        name: 'Buttons',
        include: [
          'src/components/ActionButton/ActionButton.js',
          'src/components/Button/Button.js',
          'src/components/CommandButton/CommandButton.js',
          'src/components/CompoundButton/CompoundButton.js',
          'src/components/SplitButton/SplitButton.js',
          'src/components/ToggleButton/ToggleButton.js',
        ],
      },
      {
        name: 'Input',
        include: [
          'src/components/Calendar/Calendar.js',
          'src/components/CalendarButton/CalendarButton.js',
          'src/components/Checkbox/Checkbox.js',
          'src/components/ChoiceGroup/ChoiceGroup.js',
          'src/components/ColorPicker/ColorPicker.js',
          'src/components/ComboBox/ComboBox.js',
          'src/components/DatePicker/DatePicker.js',
          'src/components/Dropdown/Dropdown.js',
          'src/components/GroupButton/GroupButton.js',
          'src/components/PeoplePicker/PeoplePicker.js',
          'src/components/Rating/Rating.js',
          'src/components/SearchBox/SearchBox.js',
          'src/components/Slider/Slider.js',
          'src/components/SpinButton/SpinButton.js',
          'src/components/TextArea/TextArea.js',
          'src/components/TextField/TextField.js',
          'src/components/Toggle/Toggle.js',
        ],
      },
      {
        name: 'Items & Lists',
        include: [
          'src/components/ActivityItem/ActivityItem.js',
          'src/components/Breadcrumb/Breadcrumb.js',
          'src/components/DetailsList/DetailsList.js',
          'src/components/Facepile/Facepile.js',
          'src/components/Nav/Nav.js',
          'src/components/Persona/Persona.js',
          'src/components/Pivot/Pivot.js',
          'src/components/PivotPanel/PivotPanel.js',
          'src/components/ProfileCard/ProfileCard.js',
        ],
      },
      {
        name: 'Surfaces',
        include: [
          'src/components/Callout/Callout.js',
          'src/components/Dialog/Dialog.js',
          'src/components/Modal/Modal.js',
          'src/components/Panel/Panel.js',
          'src/components/ScrollablePane/ScrollablePane.js',
          'src/components/Tooltip/Tooltip.js',
        ],
      },
      {
        name: 'Notification & Engagement',
        include: [
          'src/components/Coachmark/Coachmark.js',
          'src/components/MessageBar/MessageBar.js',
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
      {
        name: 'Charts',
        include: [
          'src/components/Charts/AreaChart/AreaChart.js',
          'src/components/Charts/BarChart/BarChart.js',
          'src/components/Charts/LineChart/LineChart.js',
          'src/components/Charts/LineMarkChart/LineMarkChart.js',
          'src/components/Charts/MarkChart/MarkChart.js',
          'src/components/Charts/PieChart/PieChart.js',
        ],
      },
    ],
    wrapper: 'src/components/UXPinWrapper/UXPinWrapper.js',
    webpackConfig: 'uxpin.webpack.config.js',
  },
  name: 'Fluent UI React'
};
