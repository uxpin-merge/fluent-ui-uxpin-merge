import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Toggle as FToggle } from '@fluentui/react/lib/Toggle';
import { check } from 'prettier';



class Toggle extends React.Component {

  constructor(props) {
    super(props);

    //Track the checked state within the control
    var checked = false;
    if (this.props.isChecked) {
      checked = this.props.isChecked;
    }

    this.state = {
      _isChecked: checked,
    }
  }

  set() {
    this.setState(
      { _isChecked: this.props.isChecked }
    )
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    //Handles prop updates in the UXPin Editor
    if (prevProps.isChecked !== this.props.isChecked) {
      this.set();
    }
  }

  _onSelectionChange(isChecked) {
    //Set the state with the updated checked value. This will force the control to update in UXPin at runtime.
    this.setState(
      { _isChecked: isChecked }
    )

    //Raise this event to UXPin. We'll send them the value in case they can catch it.
    if (this.props.onCheckChanged) {
      this.props.onCheckChanged(isChecked);
    }
  }

  render() {
    let checked = this.state._isChecked;

    return (
      <FToggle
        {...this.props}
        checked={checked}
        onChange={(e, v) => { this._onSelectionChange(v); }}   //Only catch the new value
      />
    );
  }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Toggle.propTypes = {

  /**
   * @uxpindescription The checked state of the control. This prop's live value is available for scripting.
   * @uxpinpropname * Checked
   * @uxpinbind onCheckChanged
   * */
  isChecked: PropTypes.bool,

  /**
   * @uxpindescription The label for the switch
   * @uxpinpropname Label
   * @uxpincontroltype textfield(2)
   * */
  label: PropTypes.string,

  /**
   * @uxpindescription The text to show when the value is on
   * @uxpinpropname On Text
   * */
  onText: PropTypes.string,

  /**
   * @uxpindescription The text to show when the value is off
   * @uxpinpropname Off Text
   * */
  offText: PropTypes.string,

  /**
   * @uxpindescription To position on the same line as the control (true), or above the control (false)
   * @uxpinpropname Inline Label
   * */
  inlineLabel: PropTypes.bool,

  /**
   * @uxpindescription To disable the control
   * @uxpinpropname Disabled
   * */
  disabled: PropTypes.bool,

  /**
   * @uxpindescription Fires when the control's Checked value changes
   * @uxpinpropname * Checked Changed
   * */
  onCheckChanged: PropTypes.func
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Toggle.defaultProps = {
  isChecked: true,
  label: "Toggle Switch",
  onText: "On",
  offText: "Off",
  inlineLabel: true,
  disabled: false,
};


export { Toggle as default };
