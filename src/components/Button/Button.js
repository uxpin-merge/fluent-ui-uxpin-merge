import * as React from 'react';
import * as PropTypes from 'prop-types';
import { PrimaryButton as PrimaryButtonM, DefaultButton as DefaultButtonM } from '@fluentui/react/lib/Button';
import { TooltipHost } from '@fluentui/react/lib/Tooltip';



const defaultText = 'Button';
const defaultIcon = '';
const posStart = 'start';
const posEnd = 'end';



class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const buttonID = _.uniqueId('button_');

    let iconProps = { iconName: this.props.iconName }

    let styles = {};

    if (this.props.iconPosition === posEnd) {
      styles.flexContainer = {
        flexDirection: 'row-reverse'
      }
    }

    const tooltipId = _.uniqueId('tooltip_');
    const ttProps = {
      gapSpace: 2,
      target: `#${buttonID}`,
    };

    return (
      <div>
        <TooltipHost
          content={this.props.tooltip}
          id={tooltipId}
          calloutProps={ttProps}
        >
          {this.props.primary ?
            <PrimaryButtonM
              {...this.props}
              id={buttonID}
              iconProps={iconProps}
              styles={styles}
              aria-describedby={tooltipId}
            />
            :
            <DefaultButtonM
              {...this.props}
              id={buttonID}
              iconProps={iconProps}
              aria-describedby={tooltipId}
            />
          }
        </TooltipHost>
      </div>
    );
  }

}


/**
 * Set up the properties to be available in the UXPin property inspector.
 */
Button.propTypes = {

  /**
   * @uxpindescription To display the button in the filled style. Otherwise, displays in the outline style
   * @uxpinpropname Primary Style
   * */
  primary: PropTypes.bool,

  /**
  * @uxpindescription The displayed text on the button
  * @uxpinpropname Text
  * */
  text: PropTypes.string,

  /**
   * @uxpindescription The exact name from the Fluent icon library (Optional)
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
 * @uxpindescription Fires when the button is clicked on.
 * @uxpinpropname Click
 * */
  onClick: PropTypes.func,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Button.defaultProps = {
  primary: true,
  disabled: false,
  iconName: defaultIcon,
  iconPosition: posStart,
  text: defaultText,
  tooltip: '',
};


export { Button as default };
