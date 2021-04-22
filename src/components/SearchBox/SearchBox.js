import * as React from 'react';
import * as PropTypes from 'prop-types';
import { SearchBox as FSearchBox } from '@fluentui/react/lib/SearchBox';



class SearchBox extends React.Component {

  constructor(props) {
    super(props);
  }

  set() {
    this.setState({
      //Initialize with the props value
      currentValue: this.props.textValue
    })
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.textValue !== this.props.textValue
    ) {
      this.set();
    }
  }

  _onValueChange(newValue) {
    //We only want to know what the new value should be.

    //Get the value. 
    const textVal = newValue.toString();

    //Set the state with the updated checked value. This will force the control to update in UXPin at runtime.
    this.setState(
      { currentValue: textVal }
    )

    //Raise this event to UXPin. We'll send them the value in case they can catch it.
    if (this.props.onsBChange) {
      this.props.onSBChange(textVal);
    }
  }


  _onClear() {
    //This means that the user has hit the clear button, so we need to clear the text out. 

    //Set the state with an empty string. This will force the control to update in UXPin at runtime.
    this.setState(
      { currentValue: "" }
    )

    //Raise this event to UXPin. We'll send them the value in case they can catch it.
    if (this.props.onSBClear) {
      this.props.onSBClear("");
    }
  }


  _onSearch() {
    //When the user hits 'enter' on their keyboard to search, let's communicate that to UXPin.

    //Raise this event to UXPin. We'll send them the current text value in case they can catch it.
    if (this.props.onSBSearch) {
      this.props.onSBSearch(this.state.currentValue);
    }
  }


  render() {

    //Get the value from State.
    var textVal = this.state.currentValue;

    return (
      <FSearchBox
        {...this.props}
        value={textVal}
        disabled={this.props.disabled}
        placeholder={this.props.placeholder}
        iconProps={{ iconName: this.props.icon }}
        onChange={(e, v) => { this._onValueChange(v); }}   //Only catch the value
        onSearch={(e) => { this._onSearch(); }}   //Don't need to catch a value
        onClear={(e) => { this._onClear(); }}   //Don't need to catch a value
      />
    );

  }

}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
SearchBox.propTypes = {

  /**
   * We give this property a unique name to avoid collisions. We map its value to the control's 'value' prop.
   * @uxpindescription Current value of the text field. This prop's live value is available for scripting.
   * @uxpinpropname * Value
   * @uxpinbind onSBChange
   * @uxpincontroltype textfield(3)
   * */
  textValue: PropTypes.string,

  /**
   * @uxpindescription Placeholder text to show in the text field when it's empty
   * @uxpinpropname Placeholder
   * */
  placeholder: PropTypes.string,

  /**
   * @uxpindescription The exact name from the PayPal icon library. Displays on the right side. 
   * @uxpinpropname Icon Name
   * */
  icon: PropTypes.string,

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
  onSBChange: PropTypes.func,

  /**
   * We give this property a unique name to avoid collisions. 
   * @uxpindescription Fires when the user selects the Clear button.
   * @uxpinpropname Clear
   * */
  onSBClear: PropTypes.func,

  /**
   * We give this property a unique name to avoid collisions. 
   * @uxpindescription Fires when the user selects the Search feature (typically, by hitting the 'Enter' key when the control has focus).
   * @uxpinpropname Search
   * */
  onSBSearch: PropTypes.func

};


/**
 * Set the default values for this control in the UXPin Editor.
 */
SearchBox.defaultProps = {
  textValue: "",
  placeholder: "Search",
  icon: "Search",
  disabled: false
};


export { SearchBox as default };
