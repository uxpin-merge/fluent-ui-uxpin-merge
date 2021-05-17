import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ProgressIndicator as FProgressIndicator } from '@fluentui/react/lib/ProgressIndicator';



const roleDefault = 'default';
const roleSuccess = 'success';
const roleWarning = 'warning';
const roleError = 'error';

const defaultBlue = '#0070BA';
const successGreen = '#299976';
const warningYellow = '#FF9600';
const errorRed = '#D20000';


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

    var bgColor = this.props.roleType === roleSuccess ? successGreen
      : this.props.roleType === roleWarning ? warningYellow
        : this.props.roleType === roleError ? errorRed
          : defaultBlue;

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
    if (!this.props.indeterminate) {
      percent = parseFloat(this.state._percent);

      //If it's not a number, set it to 0
      if (isNaN(percent)) {
        percent = 0;
      }

      //Check for min
      if (percent < 0) {
        percent = 0;
      }

      //Check for max
      if (percent > 1) {
        percent = 1.0;
      }
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
   * @uxpindescription Use a value between 0 - 1.0
   * @uxpinpropname Percent
   * */
  percent: PropTypes.string,

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
  label: '',
  roleType: roleDefault,
  percent: "0.5",
  description: '',
  barHeight: 10,
  indeterminate: false,
}


export { ProgressIndicator as default };
