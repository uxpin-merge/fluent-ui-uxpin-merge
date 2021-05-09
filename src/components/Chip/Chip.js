import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Text } from '@fluentui/react/lib/Text';
import { UxpColors } from '../_helpers/uxpcolorutils';


const defaultTextColor = "#000000";
const defaultTextValue = 'hello';

const roleDefault = 'default';
const roleInfo = 'info';
const roleSuccess = 'success';
const roleWarning = 'warning';
const roleError = 'error';

const alignCenter = 'center';
const borderSyle = '1px solid ';
const borderRadius = '5';

//Padding: left and right
const padLR = '8px ';
//Padding: top and bottom
const padTB = '4px ';



class Chip extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      chipStyles: '',
    }
  }

  set() {
    let style = this._getStyles();

    this.setState(
      {
        chipStyles: style,
      }
    )
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.role !== this.props.role) {
      this.set();
    }
  }

  _getStyles() {

    let role = this.props.role;

    let border = role === roleInfo ? UxpColors.info
      : role === roleSuccess ? UxpColors.success
        : role === roleWarning ? UxpColors.warning
          : role === roleError ? UxpColors.error
            : UxpColors.grey300;

    let bg = role === roleInfo ? UxpColors.infoBackground
      : role === roleSuccess ? UxpColors.successBackground
        : role === roleWarning ? UxpColors.warningBackground
          : role === roleError ? UxpColors.errorBackground
            : UxpColors.grey100;

    let textColor = role === roleInfo ? UxpColors.infoText
      : role === roleSuccess ? UxpColors.successText
        : role === roleWarning ? UxpColors.warningText
          : role === roleError ? UxpColors.errorText
            : UxpColors.black;

    let hover = role === roleInfo ? UxpColors.infoBackgroundHover
      : role === roleSuccess ? UxpColors.successBackgroundHover
        : role === roleWarning ? UxpColors.warningBackgroundHover
          : role === roleError ? UxpColors.errorBackgroundHover
            : UxpColors.grey400;

    return {
      text: textColor,
      background: bg,
      border: border,
      hover: hover,
    };
  }

  _onClick() {
    if (this.props.onChipClick) {
      this.props.onChipClick();
    }
  }

  render() {
    let chipStyles = this.state.chipStyles;

    let textColor = chipStyles.text;
    let bStyle = borderSyle + chipStyles.border;
    let curser = this.props.onChipClick ? 'pointer' : '';

    let fTextStyles = {
      root: {
        color: textColor,
        fontWeight: 'normal',
        fontStyle: 'normal',
        display: 'block',  //Fixes the 'nudge up/down' issues for larger and smaller sizes
        lineHeight: 'normal',  //Fixes the janked line height issues for larger and smaller sizes
        textAlign: alignCenter,
        padding: padTB + padLR + padTB + padLR,
        background: chipStyles.background,
        border: bStyle,
        borderRadius: 10,
        cursor: cursor,
        selectors: {
          ':hover': {
            background: this.props.hoverEffect ? chipStyles.hover : '',
          },
        },
      }
    }

    let message = this.props.textValue ? this.props.textValue.trim() : '';

    return (
      <Text
        {...this.props}
        styles={fTextStyles}
        variant={this.props.size}
        block={true}
        nowrap={true}
        onClick={() => this.onClick()} >
        { message}
      </Text>
    );
  }
}


/**
* Set up the properties to be available in the UXPin property inspector.
*/
Chip.propTypes = {

  /**
   * @uxpindescription The text value to display. Supports the link(Click Me) feature.
   * @uxpinpropname Text 
   * @uxpincontroltype textfield(2)
   */
  textValue: PropTypes.string,

  /**
  * @uxpindescription The visual style based on the role of the control
  */
  role: PropTypes.oneOf([roleDefault, roleInfo, roleSuccess, roleWarning, roleError]),

  /**
   * @uxpindescription The display size, corresponding to a Microsoft Text 'Variant'
   */
  size: PropTypes.oneOf([
    'tiny',
    'xSmall',
    'small',
    'smallPlus',
    'medium',
    'mediumPlus',
    'large',
    'xLarge',
    'xxLarge',
    'mega',
  ]),

  /**
   * @uxpindescription Whether to show an effect on hover
   * @uxpinpropname Hover Effect
   */
  hoverEffect: PropTypes.bool,

  /**
   * @uxpindescription Fires when the control is clicked on.
   * @uxpinpropname Click
   * */
  onChipClick: PropTypes.func,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Chip.defaultProps = {
  textValue: defaultTextValue,
  size: 'xSmall',
  role: roleDefault,
  hoverEffect: true,
};


export { Chip as default };
