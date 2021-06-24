import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ProgressIndicator as FProgressIndicator } from '@fluentui/react/lib/ProgressIndicator';
import { UxpColors } from '../_helpers/uxpcolorutils';



const roleDefault = 'default';
const roleSuccess = 'success';
const roleWarning = 'warning';
const roleError = 'error';
const defaultColor = "themePrimary";
const minVal = 0;
const maxVal = 100;


class ProgressIndicator extends React.Component {

  constructor(props) {
    super(props);
  }

  set() {
    this.setState({
      _percent: this.props.percent
    })
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.percent !== this.props.percent
    ) {
      this.set();
    }
  }

  getProgressIndicatorClasses() {

    var bgColor = this.props.roleType === roleSuccess ? UxpColors.success
      : this.props.roleType === roleWarning ? UxpColors.warning
        : this.props.roleType === roleError ? UxpColors.error
          : UxpColors.getHexFromColorToken(defaultColor);

    return {
      selectors: {
        '& .ms-ProgressIndicator-progressBar': {
          backgroundColor: bgColor,
        },

      }
    }
  }

  //Determine what value to set as the progress indicator's value, if at all. 
  _getValidatedPercent() {

    //Set the default to undefined. We'll use it if it's in indeterminate mode. 
    var percent = undefined;

    //If it's not indeterminate mode, let's find out what this value should be. 
    //This will set the value to an int between 0 - 100
    if (!this.props.indeterminate) {
      let p = this.state._percent;

      percent = (!p || p < minVal) ? minVal :
        (p > maxVal) ? maxVal :
          p;

      //Now, convert the value to a float between 0 - 1
      percent = (p > 0) ? p / 100 : 0;

      console.log("New value: " + percent);
    }

    //Return the final value
    return percent;
  }


  render() {

    //Get a validated percentage value
    let percent = this._getValidatedPercent()

    return (
      <FProgressIndicator
        {...this.props}
        percentComplete={percent}
        className={this.getProgressIndicatorClasses()}
      />
    );
  }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
ProgressIndicator.propTypes = {

  /**
   * @uxpindescription The label for the control
   * @uxpinpropname Label
   * @uxpincontroltype textfield(2)
   * */
  label: PropTypes.string,

  /**
   * @uxpindescription Use an integer between 0 - 100
   * @uxpinpropname Percent
   * */
  percent: PropTypes.number,

  /**
   * @uxpindescription The description text to reflect the percent complete.
   * @uxpinpropname Description
   * */
  description: PropTypes.string,

  /**
   * @uxpindescription Reflect the control's role in the UI with its visual style
   * @uxpinpropname Type
   * */
  roleType: PropTypes.oneOf([roleDefault, roleSuccess, roleWarning, roleError]),

  /**
   * @uxpindescription Control height. Value must be 0 or more. 
   * @uxpinpropname Height
   */
  barHeight: PropTypes.number,

  /**
   * @uxpindescription To display in indeterminate mode rather than show a percent
   * @uxpinpropname Indeterminate
   * */
  indeterminate: PropTypes.bool,
}


/**
 * Set the default values.
 * 
 */
ProgressIndicator.defaultProps = {
  label: 'Progress',
  roleType: roleDefault,
  percent: "0.5",
  description: '',
  barHeight: 10,
  indeterminate: false,
}


export { ProgressIndicator as default };
