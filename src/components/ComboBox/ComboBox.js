import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ComboBox as FComboBox } from '@fluentui/react/lib/ComboBox';
import {
  SelectableOptionMenuItemType,
} from '@fluentui/react/';
import { UxpNumberParser } from '../_helpers/uxpnumberparser';
import * as UXPinParser from '../_helpers/UXPinParser';



const options = [
  { key: 'Header1', text: 'First heading', itemType: SelectableOptionMenuItemType.Header },
  { key: 'A', text: 'Option A' },
  { key: 'B', text: 'Option B' },
  { key: 'C', text: 'Option C' },
  { key: 'D', text: 'Option D' },
  { key: 'divider', text: '-', itemType: SelectableOptionMenuItemType.Divider },
  { key: 'Header2', text: 'Second heading', itemType: SelectableOptionMenuItemType.Header },
  { key: 'E', text: 'Option E' },
  { key: 'F', text: 'Option F', disabled: true },
  { key: 'G', text: 'Option G' },
  { key: 'H', text: 'Option H' },
  { key: 'I', text: 'Option I' },
  { key: 'J', text: 'Option J' },
];
// Optional styling to make the example look nicer
// const comboBoxStyles: Partial<IComboBoxStyles> = { root: { maxWidth: 300 } };
// const buttonStyles: Partial<IButtonStyles> = { root: { display: 'block', margin: '10px 0 20px' } };

class ComboBox extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      //default must be undefined
      _selectedIndex: undefined,
      _selectedIndices: [],
      items: [],
      isDirty: false,
    }
  }

  render() {

    //Convert the autocomplete boolean to one of Microsoft's preferred strings.
    let autoComplete = this.props.autoComplete ? "on" : "off";

    return (
      <div>
        <FComboBox
          defaultSelectedKey={"C"}
          label={this.props.label + " >> single"}
          options={options}
          placeholder={this.props.placeholder}
          autoComplete={autoComplete}
          allowFreeform={false}
          errorMessage={this.props.errorMessage}
          disabled={this.props.disabled}
        />

        <FComboBox
          defaultSelectedKey={"C"}
          label={this.props.label + "  >> multi"}
          multiSelect={true}
          options={options}
          placeholder={this.props.placeholder}
          autoComplete={autoComplete}
          allowFreeform={false}
          errorMessage={this.props.errorMessage}
          disabled={this.props.disabled}
        />
      </div >
    )
  }
};

/**
 * Set up the properties to be available in the UXPin property inspector.
 */
ComboBox.propTypes = {

  /**
   * @uxpindescription The label for the control
   * @uxpinpropname Label
   * @uxpincontroltype textfield(2)
   * */
  label: PropTypes.string,

  /**
   * @uxpindescription Placeholder text to show until an item(s) is selected
   * @uxpinpropname Placeholder
   */
  placeholder: PropTypes.string,

  /**
   * @uxpindescription The list of available options. Put each item on a separate line. Put quotes around an item to use a comma in it. 
   * @uxpincontroltype codeeditor
   */
  items: PropTypes.string,

  /**
   * @uxpindescription The selected indexes, separated with commas (1-based index). In case of Single Select mode, the first number will be used if multiple values are provided. This prop's live value is available for scripting.
   * @uxpinbind onChoiceChange
   * @uxpinpropname * Indexes
   * */
  selected: PropTypes.string,

  /**
   * @uxpindescription To allow multiple selections
   * @uxpinpropname Multi-select
   */
  multiSelect: PropTypes.bool,

  /**
   * Microsoft uses the values: "on", "off" 
   * @uxpindescription Whether the ComboBox auto completes. As the user is inputing text, it will be suggested potential matches from the list of options. 
   * @uxpinpropname Auto-Complete
   */
  autoComplete: PropTypes.bool,

  /**
   * @uxpindescription An error message to display below the control. Setting this value also displays the control in an error state.
   * @uxpinpropname Error Message
   */
  errorMessage: PropTypes.string,

  /**
   * @uxpindescription To disable the control
   * @uxpinpropname Disabled
   * */
  disabled: PropTypes.bool,

  /**
   * @uxpindescription Fires when the selected index(es) changes.
   * @uxpinpropname * Indexes Changed
   * */
  onChoiceChange: PropTypes.func,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
ComboBox.defaultProps = {
  label: "ComboBox",
  placeholder: "- Select -",
  disabled: false,
  multiSelect: false,
  autoComplete: false,
  items: options,
};


export { ComboBox as default };
