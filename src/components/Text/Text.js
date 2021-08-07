import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Text as FText } from '@fluentui/react/lib/Text';
import { Icon } from '@fluentui/react/lib/Icon';
import { UxpColors } from '../_helpers/uxpcolorutils';
import * as UXPinParser from '../_helpers/UXPinParser';



const defaultTextColor = "#000000";
const defaultTextValue = 'The quick brown fox jumped over the lazy dog.';
const linkTarget = 'uxpin_proto_';
const iconSizeMap = {
  tiny: 10,
  xSmall: 10,
  small: 14,
  smallPlus: 14,
  medium: 16,
  mediumPlus: 16,
  large: 18,
  xxLarge: 32,
  mega: 64,
};



class Text extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      message: defaultTextValue,
    }
  }

  set() {
    let message = this._getMessageText();

    this.setState(
      { message: message }
    )
  }

  componentDidMount() {
    this.set();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.textValue !== this.props.textValue ||
      prevProps.size !== this.props.size) {
      this.set();
    }
  }

  _getMessageText() {
    let elements;
    let parsedOutput = UXPinParser.parse(this.props.textValue);
    // console.log("Text parsedOutput in JSON: " + JSON.stringify(parsedOutput));

    return parsedOutput.map(
      (item) => {
        // If not type compound, return the single element
        if (item.type !== "compound") {
          return this._parseItem(item);
        }
        else {
          // If type compound, map the item values
          elements = item.value.map(
            (subItem) => {
              // Second map of parsedOutput.value to seperate each object of links, icons, and text
              return this._parseItem(subItem);
            }
          )
          return elements;
        }
      }
    )
  }

  _parseItem(item) {
    if (item) {
      const key = _.uniqueId('text_');
      return item.type === "link" ? this._getLinkElement(key, item?.text, item?.href)
        : item.type === "icon" ? this._getIconElement(key, item?.iconName, item.color ? item.color : item?.colorToken)
          : this._getTextElement(key, item?.text);
    }
  }

  _getTextElement(key, text) {
    return (<span key={key}> {text} </span>);
  }

  _getLinkElement(key, text, href) {
    return (<a key={key} href={href ? href : ''} target={linkTarget}>{text}</a>)
  }

  _getIconElement(key, iconName, colorToken) {
    let name = iconName ? iconName.trim() : '';
    let size = iconSizeMap[this.props.size];
    let color = UxpColors.getHexFromHexOrToken(colorToken);
    if (!color) {
      color = defaultTextColor;
    }
    let iconDisplayClass = {
      color: color,
      fontSize: size,
      height: size,
      width: size,
      display: 'inline',
      lineHeight: 'normal',
    };
    const spanStyle = {
      verticalAlign: 'middle',
      alignItems: 'center',
    }

    return (<span key={key} style={spanStyle}>
      <Icon
        iconName={name}
        className={iconDisplayClass}
      />
    </span >)
  }

  render() {
    //Let's see if the user entered a valid color value. This method returns undefined if not. 
    let textColor = UxpColors.getHexFromHexOrToken(this.props.color);

    let fTextStyles = {
      root: {
        color: textColor ? textColor : defaultTextColor,
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

        {this.state.message}

      </FText >
    );
  }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Text.propTypes = {

  /**
   * @uxpindescription The text value to display. 
   * Supports the special syntax for links and icons. Example: 
   * link(Click here | href )
   * icon(icon_name | hex_or_token )
   * @uxpinpropname Text 
   * @uxpincontroltype textfield(10)
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
