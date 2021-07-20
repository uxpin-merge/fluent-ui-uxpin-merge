import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ActionButton as FActionButton } from '@fluentui/react/lib/Button';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';



const posStart = 'start';
const posEnd = 'end';



class ActionButton extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const buttonID = _.uniqueId('actionbutton_');

    let iconProps = { iconName: this.props.iconName }

    //We want the root's margin to help the control to equal 40px. We need to make up 14px when there is no text.
    var rootPadding = '0 7px';
    //The label margin is always present, even when there is no label
    var labelMargin = '0';
    if (this.props.text) {
      rootPadding = '0';
      labelMargin = '0 8px';
    }

    let styles = {
      root: {
        margin: 0,
        padding: rootPadding,
      },
      label: {
        whiteSpace: 'nowrap',
        margin: labelMargin,
        padding: 0,
      }
    }

    if (this.props.iconPosition === posEnd) styles.flexContainer = {
      flexDirection: 'row-reverse'
    }

    const tooltipId = _.uniqueId('tooltip_');
    const ttProps = {
      gapSpace: 0,
      target: `#${buttonID}`,
    };


    return (
      <>
        <TooltipHost
          content={this.props.tooltip}
          id={tooltipId}
          calloutProps={ttProps}
        >
          <FActionButton
            {...this.props}
            id={buttonID}
            iconProps={iconProps}
            styles={styles}
            aria-describedby={tooltipId}
          />
        </TooltipHost>
      </>
    );
  }

}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
ActionButton.propTypes = {

  /**
    * @uxpindescription The displayed text on the button (Optional)
    * @uxpinpropname Text
    * */
  text: PropTypes.string,

  /**
   * @uxpindescription The exact name from the PayPal icon library (Optional)
   * @uxpinpropname Icon Name
   * */
  iconName: PropTypes.string,

  /**
   * @uxpindescription The location to display an icon, if one is set
   * @uxpinpropname Icon Position
   * */
  iconPosition: PropTypes.oneOf([posStart, posEnd]),

  /**
   * @uxpindescription Tooltip for the control
   * @uxpinpropname Tooltip
   * */
  tooltip: PropTypes.string,

  /**
  * @uxpindescription To disable the control
  * @uxpinpropname Disabled
  * */
  disabled: PropTypes.bool,

  /**
   * @uxpindescription Fires when the main button or a popup menu button is clicked on
   * @uxpinpropname Click
   * */
  onClick: PropTypes.func
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
ActionButton.defaultProps = {
  disabled: false,
  text: '',
  iconName: '',
  tooltip: '',
  iconPosition: posStart,
};


export { ActionButton as default };
