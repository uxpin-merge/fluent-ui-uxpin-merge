import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TextField as FTextField } from '@fluentui/react/lib/TextField';

const borderFramed = 'framed';
const borderUnderlined = 'underlined';
const borderBorderless = 'borderless';

const autocompleteHintNone = 'off';
const autocompleteHintPwd = 'new-password';

class TextField extends React.Component {
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

    let pwdType = this.props.isPassword ? 'password' : '';

    let isUnderlined = this.props.borderType === borderUnderlined ? true : false;

    let frameless = this.props.borderType === borderBorderless ? true : false;

    //Set the prefix, if the user has set one. The default MUST be undefined.
    //Microsoft requires that we explicitly set this to undefined if there is no text value.
    var prefix = undefined;

    if (this.props.prefix) {
      prefix = this.props.prefix;
    }

    //Set the suffix, if the user has set one. The default MUST be undefined.
    //Microsoft requires that we explicitly set this to undefined if there is no text value.
    var suffix = undefined;

    if (this.props.suffix) {
      suffix = this.props.suffix;
    }

    //We're going to keep this off for UXPin
    let showAutoComplete = this.props.isPassword ? autocompleteHintPwd : autocompleteHintNone;

    return (
      <FTextField
        {...this.props}
        value={textVal}
        iconProps={{ iconName: this.props.icon }}
        prefix={prefix}
        suffix={suffix}
        type={pwdType}
        underlined={isUnderlined}
        borderless={frameless}
        autoComplete={showAutoComplete}
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
TextField.propTypes = {
  /**
   * @uxpindescription The label for the Text Field
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
   * @uxpindescription The exact name from the icon library. Displays on the right side. (Optional)
   * @uxpinpropname Icon Name
   * */
  icon: PropTypes.string,

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
   * @uxpindescription Text to display within the front section of the text field
   * @uxpinpropname Prefix
   * */
  prefix: PropTypes.string,

  /**
   * @uxpindescription Text to display within the end section of the text field
   * @uxpinpropname Suffix
   * */
  suffix: PropTypes.string,

  /**
   * @uxpindescription To turn on password masking
   * @uxpinpropname Password
   * */
  isPassword: PropTypes.bool,

  /**
   * @uxpindescription Whether the user may optionally view their password when the Password prop is true
   * @uxpinpropname Reveal Password
   * */
  canRevealPassword: PropTypes.bool,

  /**
   * @uxpindescription How to show the control's border. If Underlined, then the label moves inline and to the left.
   * @uxpinpropname Border Type
   */
  borderType: PropTypes.oneOf([borderFramed, borderUnderlined, borderBorderless]),

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
TextField.defaultProps = {
  label: 'Basic Text Field',
  textValue: '',
  placeholder: 'Enter some text',
  borderType: borderFramed,
  readOnly: false,
  disabled: false,
  isPassword: false,
  canRevealPassword: false,
};

export { TextField as default };
