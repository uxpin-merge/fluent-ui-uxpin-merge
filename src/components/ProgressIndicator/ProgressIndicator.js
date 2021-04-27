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

    return {
      selectors: {
        '& .ms-ProgressIndicator-progressTrack': {
          borderRadius: 100
        },
        '& .ms-ProgressIndicator-progressBar': {
          height: 6,
          width: 50,
          backgroundColor: this.props.roleType === roleSuccess ? successGreen
            : this.props.status === roleWarning ? warningYellow
              : this.props.status === roleError ? errorRed
                : defaultBlue,
          borderRadius: 100
        },
        '& .ms-Button': {
          verticalAlign: 'middle',
          paddingRight: 8,
        },
        'span': {
          verticalAlign: 'middle'
        }
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
    const percent = this._getValidatedPercent()

    return (
      <FProgressIndicator
        {...this.props}
        percentComplete={percent}
        barHeight={6}  //TODO: Should this be hard coded?
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
   * @uxpindescription To display in indeterminate mode rather than show a percent
   * @uxpinpropname Indeterminate
   * */
  indeterminate: PropTypes.bool
}


/**
 * Set the default values.
 * 
 */
ProgressIndicator.defaultProps = {
  status: roleDefault,
  percent: "0.5",
  descriptionText: '',
  indeterminate: false
}


export { ProgressIndicator as default };
