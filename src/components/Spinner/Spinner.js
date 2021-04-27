import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  Spinner as FSpinner,
  SpinnerSize
} from '@fluentui/react/lib/Spinner';



class Spinner extends React.Component {

  constructor(props) {
    super(props);
  }


  render() {

    let spinSize = SpinnerSize[this.props.size];

    return (

      <FSpinner
        {...this.props}
        size={spinSize}
      />

    );
  }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Spinner.propTypes = {

  /**
   * @uxpindescription The label value to display next to the Spinner (optional)
   * @uxpincontroltype textfield(2)
   */
  label: PropTypes.string,

  /**
   * Send this value as a string. Don't send it as an enum, which would cause terminal errors. 
   * @uxpindescription Possible locations of the label in relation to the spinner
   * @uxpinpropname Label Position
   */
  labelPosition: PropTypes.oneOf([
    'top',
    'right',
    'bottom',
    'left',
  ]),

  /**
   * @uxpindescription The display size of the Spinner
   */
  size: PropTypes.oneOf([
    'xSmall',
    'small',
    'medium',
    'large',
  ]),
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Spinner.defaultProps = {
  label: 'One moment...',
  size: 'medium',
  labelPosition: 'right',
};


export { Spinner as default };
