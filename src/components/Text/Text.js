import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Text as FText } from '@fluentui/react/lib/Text';
import Image from '../Image/Image';
import Link from '../Link/Link';
import { UxpColors } from '../_helpers/uxpcolorutils';
import * as UXPinParser from '../_helpers/UXPinParser';



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

    //Try using new UXPin parser
    let newMessage = this.getMessageText();

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
          return (item.type === "link" ? <a key={index} href={item.href}>{item.text}</a> : <span key={index}> {item.text} </span>);
        } else {
          // console.log("This is type " + item.type)
          // If type compound, map the item values
          elements = item.value.map(
            (subItem, subIndex) => {
              // Second map of parsedOutput.value to seperate each object of links and text
              console.log("      >>> Map item " + subIndex + " of parsedOutput.value: " + JSON.stringify(subItem) + " subItem");

              return (subItem.type === "link" ? <a key={subIndex} href={subItem.href}>{subItem.text}</a> : <span key={subIndex}> {subItem.text} </span>);

            }
          )
          return elements;
        }
      }
    )
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
