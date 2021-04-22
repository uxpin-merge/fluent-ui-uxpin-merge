import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Checkbox as FCheckbox } from '@fluentui/react/lib/Checkbox';



class Checkbox extends React.Component {

  constructor(props) {
    super(props);

    //Track the checked state within the control
    this.state = {
      isChecked: false,
    }
  }

  componentDidMount() {
    //Save the value coming in from props & initializes the state
    this.setState(
      { isChecked: this.props.isChecked }
    )
  }

  componentDidUpdate(prevProps, prevState) {
    //Handles prop updates in the UXPin Editor
    if (prevProps.isChecked !== this.props.isChecked) {

      this.setState(
        { isChecked: this.props.isChecked }
      )
    }
  }

  _onSelectionChange(isChecked) {
    //Assumption: Microsoft sends true or false, and we don't need to validate the value.

    //Set the state with the updated checked value. This will force the control to update in UXPin at runtime.
    this.setState(
      { isChecked: isChecked }
    )

    //Raise this event to UXPin. We'll send them the value in case they can catch it.
    if (this.props.onChange) {
      this.props.onChange(isChecked);
    }
  }

  render() {

    return (
      <FCheckbox
        {...this.props}
        checked={this.state.isChecked}
        onChange={(e, v) => { this._onSelectionChange(v); }}  //We only catch the new value
      />
    );
  }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Checkbox.propTypes = {

  /**
   * @uxpindescription The checked state of the control. This prop's live value is available for scripting.
   * @uxpinbind onChange
   * @uxpinpropname * Checked
   * */
  isChecked: PropTypes.bool,

  /**
  * @uxpindescription The displayed text for the checkbox
  * @uxpinpropname Text
  * @uxpincontroltype textfield(4)
  * */
  label: PropTypes.string,

  /**
   * @uxpindescription To display the box before the start or after end of the text.
   * @uxpinpropname Box Side
   * */
  boxSide: PropTypes.oneOf(['start', 'end']),

  /**
   * @uxpindescription To disable the control
   * @uxpinpropname Disabled
   * */
  disabled: PropTypes.bool,

  /**
   * @uxpindescription Fires when the control's Checked value changes.
   * @uxpinpropname * Checked Changed
   * */
  onChange: PropTypes.func,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Checkbox.defaultProps = {
  label: 'Basic Checkbox',
  isChecked: false,
  boxSide: 'start',
  disabled: false,
};


export { Checkbox as default };
