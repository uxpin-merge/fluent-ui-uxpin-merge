import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TextField } from '@fluentui/react/lib/TextField';

const autocompleteHintNone = 'off';

class TextArea extends React.Component {
  constructor(props) {
    super(props);

    //Track the control's text value internally
    this.state = {
      _textValue: this.props.textValue,
    };
  }

  set() {
    this.setState({
      //Initialize with the props value
      _textValue: this.props.textValue,
    });
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.textValue !== this.props.textValue) {
      this.set();
    }
  }

  _onChange(newValue) {
    //We only want to know what the new value should be.
    //Assumption: That Microsoft really is only sending strings and it's not undefined.

    //Get the value.
    const textVal = newValue.toString();

    //Set the state with the updated checked value. This will force the control to update in UXPin at runtime.
    this.setState({ currentValue: textVal });

    //Raise this event to UXPin. We'll send them the value in case they can catch it.
    if (this.props.onTFChange) {
      this.props.onTFChange(textVal);
    }
  }

  _onFocus() {
    if (this.props.onTFFocused) {
      this.props.onTFFocused();
    }
  }

  _onBlur() {
    if (this.props.onTFBlurred) {
      this.props.onTFBlurred();
    }
  }

  render() {
    //Get the value from State.
    let textVal = this.state._textValue;

    return (
      <TextField
        {...this.props}
        value={textVal}
        multiline={true}
        autoComplete={autocompleteHintNone}
        onChange={(e, v) => {
          this._onChange(v);
        }} //Only catch the value
        onFocus={() => {
          this._onFocus();
        }}
        onBlur={() => {
          this._onBlur();
        }}
      />
    );
  }
}

/**
 * Set up the properties to be available in the UXPin property inspector.
 */
TextArea.propTypes = {
  /**
   * @uxpindescription The label for the Text Area
   * @uxpinpropname Label
   * @uxpincontroltype textfield(2)
   * */
  label: PropTypes.string,

  /**
   * @uxpindescription To display the 'required' flag on the label
   * @uxpinpropname Required
   * */
  required: PropTypes.bool,

  /**
   * We give this property a unique name to avoid collisions.
   * @uxpindescription Current value of the text field. This prop's live value is available for scripting.
   * @uxpinpropname * Value
   * @uxpinbind onTFChange
   * @uxpincontroltype textfield(4)
   * */
  textValue: PropTypes.string,

  /**
   * @uxpindescription Placeholder text to show in the text field when it's empty
   * @uxpinpropname Placeholder
   * */
  placeholder: PropTypes.string,

  /**
   * @uxpindescription The number of rows for the control's  height
   * @uxpinpropname Rows
   * */
  rows: PropTypes.string,

  /**
   * @uxpindescription Description displayed below the text field to provide additional details or instructions
   * @uxpinpropname Description
   * */
  description: PropTypes.string,

  /**
   * @uxpindescription An error message to display below the control. Setting this value also displays the control in an error state.
   * @uxpinpropname Error Message
   * */
  errorMessage: PropTypes.string,

  /**
   * @uxpindescription Whether the control's height should increase with its contents
   * @uxpinpropname Auto Adj Height
   * */
  autoAdjustHeight: PropTypes.bool,

  /**
   * @uxpindescription Whether to allow the user to resize it at runtime
   * @uxpinpropname Resizable
   * */
  resizable: PropTypes.bool,

  /**
   * @uxpindescription Whether to show the control's border lines
   * @uxpinpropname Borderless
   * */
  borderless: PropTypes.bool,

  /**
   * @uxpindescription To set the control to read-only mode
   * @uxpinpropname Read Only
   * */
  readOnly: PropTypes.bool,

  /**
   * @uxpindescription To disable the control
   * @uxpinpropname Disabled
   * */
  disabled: PropTypes.bool,

  /**
   * We give this property a unique name to avoid collisions.
   * @uxpindescription Fires when the control's Value property changes.
   * @uxpinpropname * Value Changed
   * */
  onTFChange: PropTypes.func,

  /**
   * We give this property a unique name to avoid collisions.
   * @uxpindescription Fires when the control gains focus
   * @uxpinpropname Focused
   * */
  onTFFocused: PropTypes.func,

  /**
   * We give this property a unique name to avoid collisions.
   * @uxpindescription Fires when the control loses focus
   * @uxpinpropname Blurred
   * */
  onTFBlurred: PropTypes.func,
};

/**
 * Set the default values for this control in the UXPin Editor.
 */
TextArea.defaultProps = {
  label: 'Basic Text Area',
  textValue: '',
  placeholder: 'Enter some text',
  rows: '3',
  autoAdjustHeight: false,
  borderless: false,
  resizable: true,
  readOnly: false,
  disabled: false,
};

export { TextArea as default };
