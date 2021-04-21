import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Text as FText } from '@fluentui/react/lib/Text';
import { UxpColors } from '../_helpers/uxpcolorutils';



const defaultTextColor = "#000000";


class Text extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
    }
  }

  render() {

    //Let's see if the user entered a valid color value. This method returns undefined if not. 
    var textColor = UxpColors.getHexFromHexOrToken(this.props.color);
    if (!textColor) {
      textColor = defaultTextColor;
    }

    let fTextStyles = {
      root: {
        color: textColor,
        fontWeight: this.props.bold ? 'bold' : 'normal',
        fontStyle: this.props.italic ? 'italic' : 'normal',
        //Fixes the 'nudge up/down' issues for larger and smaller sizes
        display: 'block',
        //Fixes the janked line height issues for larger and smaller sizes
        lineHeight: 'normal',
        textAlign: this.props.align,
      }
    }


    return (
      <FText
        {...this.props}
        styles={fTextStyles}
        variant={this.props.size}
        nowrap={this.props.truncate}>
        { this.props.value}
      </FText>
    );
  }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Text.propTypes = {

  /**
   * @uxpindescription The text value to display
   * @uxpincontroltype textfield(6)
   */
  value: PropTypes.string,

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
   * @uxpindescription To apply bold formatting
   */
  bold: PropTypes.bool,

  /**
   * @uxpindescription To apply italic formatting
   */
  italic: PropTypes.bool,

  /**
   * @uxpindescription Text alignment
   */
  align: PropTypes.oneOf(['left', 'center', 'right']),

  /**
   * @uxpindescription To restrict the Text to a single line, truncating any extra with ellipses. If unchecked, you can manually set the width and height. 
   * @uxpinpropname Truncate Text
   */
  truncate: PropTypes.bool,

  /**
   * @uxpindescription Specify a text color with a Hex or color token, such as '#ffffff'. 
   */
  color: PropTypes.string,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Text.defaultProps = {
  value: 'The quick brown fox jumped over the lazy dog.',
  size: 'medium',
  bold: false,
  italic: false,
  align: 'left',
  truncate: false,
  color: 'black',
};



export { Text as default };
