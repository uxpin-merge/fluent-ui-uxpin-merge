import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Text as FText } from '@fluentui/react/lib/Text';
import { UxpColors } from '../_helpers/uxpcolorutils';
import { getTokens } from '../_helpers/parser';


const defaultTextColor = "#000000";
const defaultTextValue = 'The quick brown fox jumped over the lazy dog.';


class Text extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      message: defaultTextValue,
    }
  }

  set() {
    let message = this._getTokenizedText(this.props.textValue);

    console("TOkenized string: " + message.toString());

    this.setState(
      { message: message }
    )
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.textValue !== this.props.textValue) {
      this.set();
    }
  }

  //Tokenize the string coming in from UXPin to support the link(Link Text) feature.
  _getTokenizedText(text) {

    var tokens = getTokens(text).mixed.map((el, i) => {
      if (typeof (el) === 'string') {
        return (<span key={i}> {el} </span>);
      }
      else if (el.type == 'link') {
        return el.suggestions[0];
      }
      else if (el.suggestions[0]) {
        // if there's a suggestion, call the function
        return el.suggestions[0];
      } else {
        // there's no suggestion, return the text
        return (<span key={i}> {el.tokenString} </span>);
      }
    });

    return tokens;
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
        display: 'block',  //Fixes the 'nudge up/down' issues for larger and smaller sizes
        lineHeight: 'normal',  //Fixes the janked line height issues for larger and smaller sizes
        textAlign: this.props.align,
      }
    }

    let message = this.state.message;

    return (
      <FText
        {...this.props}
        styles={fTextStyles}
        variant={this.props.size}
        nowrap={this.props.truncate}>

        { message}

      </FText>
    );
  }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Text.propTypes = {

  /**
   * @uxpindescription The text value to display. Supports the link(Click Me) feature.
   * @uxpincontroltype textfield(6)
   */
  textValue: PropTypes.string,

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
  textValue: defaultTextValue,
  size: 'medium',
  bold: false,
  italic: false,
  align: 'left',
  truncate: false,
  color: 'black',
};



export { Text as default };
