import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Text as FText } from '@fluentui/react/lib/Text';
import Icon from '../Icon/Icon';
import { UxpColors } from '../_helpers/uxpcolorutils';
import * as UXPinParser from '../_helpers/UXPinParser';



const defaultTextColor = "#000000";
const defaultTextValue = 'The quick brown fox jumped over the lazy dog.';
const linkTarget = 'uxpin_proto_';
const iconSizeMap = {
  tiny: 12,
  xSmall: 12,
  small: 14,
  smallPluss: 14,
  medium: 16,
  mediumPlus: 16,
  large: 20,
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
    let message = this._getTokenizedText(this.props.textValue);

    //Try using new UXPin parser
    let newMessage = this.getMessageText();

    this.setState(
      { message: newMessage }
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

  getMessageText() {
    let elements;
    const parsedOutput = UXPinParser.parse(this.props.textValue);

    // console.log("parsedOutput Variable value: " + parsedOutput);
    console.log("Text parsedOutput in JSON: " + JSON.stringify(parsedOutput));

    return parsedOutput.map(
      (item, index) => {
        console.log("      Map item " + index + " of parsedOutput: " + JSON.stringify(item));
        // If not type compound, return single element
        if (item.type !== "compound") {
          // console.log("This is NOT type Compound, this is a " + item.type)
          // return (item.type === "link" ? <a key={index} href={item.href}>{item.text}</a> : <span key={index}> {item.text} </span>);
          const key = _.uniqueId('text_');
          return item.type === "text" ? this._getTextElement(key, item?.text)
            : item.type === "link" ? this._getLinkElement(key, item?.text, item?.href)
              : item.type === "icon" ? this._getIconElement(key, item?.iconName, subItem.color ? subItem.color : subItem?.colorToken)
                : '';
        } else {
          // console.log("This is type " + item.type)
          // If type compound, map the item values
          elements = item.value.map(
            (subItem, subIndex) => {
              // Second map of parsedOutput.value to seperate each object of links and text
              console.log("      >>> Map item " + subIndex + " of parsedOutput.value: " + JSON.stringify(subItem) + " subItem");
              const key = _.uniqueId('text_');
              return subItem.type === "text" ? this._getTextElement(key, subItem?.text)
                : subItem.type === "link" ? this._getLinkElement(key, subItem?.text, subItem?.href)
                  : subItem.type === "icon" ? this._getIconElement(key, subItem?.iconName, subItem.color ? subItem.color : subItem?.colorToken)
                    : '';
              // return (subItem.type === "link" ? <a key={subIndex} href={subItem.href}>{subItem.text}</a> : <span key={subIndex}> {subItem.text} </span>);
            }
          )
          return elements;
        }
      }
    )
  }

  _getTextElement(key, text) {
    return (<span key={key}> {text} </span>);
  }
  _getLinkElement(key, text, href) {
    return (<a key={key} href={href ? href : ''} target={linkTarget}>{text}</a>)
  }
  _getIconElement(key, iconName, colorToken) {
    let iSize = iconSizeMap[this.props.size];
    return (<span key={key}>
      <Icon
        iconName={iconName}
        iconColor={colorToken}
        size={iSize}
      />
    </span>)
  }

  _getTokenizedText(text) {

    return text;

    //***** For UXPin Parser Testing

    let items = UXPinParser.parseRow(text).map(
      (item, index) => ({
        text: item?.text,
        order: item?.order,
        index: index,
        type: item?.type,
        href: item?.href,
        iconName: item?.iconName,
        iconColor: item?.iconColor,
        colorToken: item?.colorToken,
      })
    );

    var i = 0;
    for (i = 0; i < items.length; i++) {
      let item = items[i];
      console.log("order: " + item.order +
        "     index: " + item.index +
        "     type: " + item.type +
        "     text: " + item?.text +
        "     href: " + item?.href +
        "     iconName: " + item?.iconName +
        "     iconColor: " + item?.iconColor +
        "     colorToken: " + item?.colorToken);
    }
  }

  render() {

    //Let's see if the user entered a valid color value. This method returns undefined if not. 
    let textColor = UxpColors.getHexFromHexOrToken(this.props.color);

    let fTextStyles = {
      root: {
        color: textColor ? textColor : defaultTextColor,
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

        {message}

      </FText >
    );
  }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Text.propTypes = {

  /**
   * @uxpindescription The text value to display. Supports the link(Click Me) feature.
   * @uxpinpropname Text 
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
