import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { Link } from '@fluentui/react/lib/Link';
import { UxpColors } from '../_helpers/uxpcolorutils';
import * as UXPinParser from '../_helpers/UXPinParser';

const defaultSuperText = 'Super Text';
const defaultSuperTextSize = 'medium';

const defaultPageHeading = 'Page Title';
const defaultPageHeadingSize = 'xxLarge';

const defaultSubText = 'TIP: Add Action, Icon and/or Command Buttons to make a Toolbar on the right';
const defaultSubTextSize = 'medium';

const defaultTextColor = 'black';
const defaultBgColor = 'themeLighterAlt';
const defaultBorderColor = 'themeSecondary';
const defaultBorderThickness = 1;
const borderSolid = 'solid';

const defaultInternalPadding = 24;
const defaultGutterPadding = 6;
const defaultTextStackPadding = 6;

class PageHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _getBorderStyle() {
    var bColor = UxpColors.getHexFromHexOrToken(this.props.borderColor);

    //If the line thickness is 0 or the user has removed the line color, then we're done.
    if (this.props.borderThickness < 1 || !bColor) return 'none';

    let thickness = this.props.borderThickness > 0 ? this.props.borderThickness : defaultBorderThickness;

    return thickness + 'px ' + borderSolid + ' ' + bColor;
  }

  _parseTextAndLink(rawStr) {
    let right = '';
    let left = '';

    if (rawStr) {
      left = String(rawStr);

      if (left.includes('|')) {
        let splitStr = left.split('|');
        left = splitStr[0];

        if (splitStr.length > 1) {
          right = UXPinParser.normalizeLink(splitStr[1]);
        }
      }
    }

    return {
      text: left,
      href: right ? right : '',
    };
  }

  render() {
    //Outer container stack is a vertical stack.
    //In the middle for the main heading title is a horizontal stack with the toolbar on the right, made from props.children.

    //****************************
    //OUTER HORIZONTAL STACK
    //For internal padding within the stack.

    let internalPadding = this.props.internalPadding > -1 ? this.props.internalPadding : 0;

    //With one number, the padding applies to both rows and columns.
    const outerStackTokens = {
      childrenGap: defaultTextStackPadding,
      padding: internalPadding + 'px',
    };

    //Let's see if the user entered a valid color value. This method returns undefined if not.
    var color = UxpColors.getHexFromHexOrToken(this.props.bgColor);

    const outerStackStyles = {
      root: {
        display: 'flex',
        overflow: 'hidden',
        background: color ? color : 'transparent',
        borderBottom: this._getBorderStyle(),
      },
    };

    //****************************
    //TEXT VERTICAL STACK

    //Applies to all text
    var stColor = UxpColors.getHexFromHexOrToken(this.props.textColor);
    if (!stColor) {
      stColor = defaultTextColorHex;
    }
    let fTextStyles = {
      root: {
        color: stColor,
        fontWeight: 'normal',
        fontStyle: 'normal',
        display: 'block', //Fixes the 'nudge up/down' issues for larger and smaller sizes
        lineHeight: 'normal', //Fixes the janked line height issues for larger and smaller sizes
      },
    };

    //****************************
    //SUPER TEXT
    var superText = '';
    if (this.props.superTextValue) {
      let superTextProps = this._parseTextAndLink(this.props.superTextValue);
      let left = superTextProps ? superTextProps.text : this.props.superTextValue?.trim();

      if (superTextProps && superTextProps.href) {
        superText = (
          <StackItem>
            <Link href={superTextProps.href} target={'_UXPin Mockup'}>
              <Text variant={this.props.superTextSize}>{left}</Text>
            </Link>
          </StackItem>
        );
      } else {
        superText = (
          <StackItem>
            <Text styles={fTextStyles} variant={this.props.superTextSize}>
              {left}
            </Text>
          </StackItem>
        );
      }
    }

    //****************************
    //MAIN HEADING TEXT

    const headingRowStackTokens = {
      childrenGap: 24,
      padding: 0,
    };

    var mainHeadingText = '';
    if (this.props.pageHeadingText) {
      let mhtStyles = {
        root: {
          color: stColor,
          fontWeight: this.props.pageHeadingBold ? 'bold' : 'normal',
          fontStyle: this.props.pageHeadingItalic ? 'italic' : 'normal',
          display: 'block', //Fixes the 'nudge up/down' issues for larger and smaller sizes
          lineHeight: 'normal', //Fixes the janked line height issues for larger and smaller sizes
        },
      };

      mainHeadingText = (
        <Text styles={mhtStyles} variant={this.props.pageHeadingSize}>
          {this.props.pageHeadingText.trim()}
        </Text>
      );
    }

    //****************************
    //SUB TEXT
    var subText = '';
    if (this.props.subTextValue) {
      subText = (
        <StackItem>
          <Text styles={fTextStyles} variant={this.props.subTextSize}>
            {this.props.subTextValue.trim()}
          </Text>
        </StackItem>
      );
    }

    //****************************
    //RIGHT SIDE HORIZONTAL TOOLBAR STACK

    //Let's make sure we have a positive number.
    let pad = this.props.gutterPadding > 0 ? this.props.gutterPadding : 0;
    const toolbarStackTokens = {
      childrenGap: pad,
      padding: 0,
    };

    //Set up the StackItems
    var stackList = [];
    if (this.props.children) {
      //First, let's create our own array of children, since UXPin returns an object for 1 child, or an array for 2 or more.
      let childList = React.Children.toArray(this.props.children);

      //Now, we configure the StackItems
      if (childList && childList.length) {
        for (var i = 0; i < childList.length; i++) {
          let child = childList[i];

          //Now we put it all together!
          let stack = <StackItem>{child}</StackItem>;
          stackList.push(stack);
        } //for loop
      } //if childList
    } //If props.children

    return (
      <Stack //Outer wrapper stack
        tokens={outerStackTokens}
        horizontal={false}
        horizontalAlign={'start'}
        verticalAlign={'center'}
        wrap={false}
        styles={outerStackStyles}
      >
        {superText}

        <StackItem align={'stretch'}>
          <Stack //Left side Page header text
            tokens={headingRowStackTokens}
            horizontal={true}
            horizontalAlign={'start'}
            verticalAlign={'center'}
            wrap={false}
          >
            {mainHeadingText}

            <StackItem grow={1}>
              <span />
            </StackItem>

            <StackItem>
              <Stack //Right side toolbar stack
                tokens={toolbarStackTokens}
                horizontal={true}
                horizontalAlign={'end'}
                verticalAlign={'center'}
                wrap={false}
              >
                {stackList}
              </Stack>
            </StackItem>
          </Stack>
        </StackItem>

        {subText}
      </Stack>
    );
  }
}

/**
 * Set up the properties to be available in the UXPin property inspector.
 */
PageHeader.propTypes = {
  /**
   * Don't show this prop in the UXPin Editor.
   * @uxpinignoreprop
   * @uxpindescription Command Bar values
   * @uxpinpropname
   */
  children: PropTypes.node,

  /**
   * @uxpindescription Small text value appearing above the main page heading.
   * To optionally convert the text to a link, use the pattern:  Display Text | http://www.uxpin.com
   * @uxpinpropname Top Text
   * @uxpincontroltype textfield(2)
   */
  superTextValue: PropTypes.string,

  /**
   * @uxpindescription The display size, corresponding to a Microsoft Text 'Variant'
   * @uxpinpropname Top Size
   */
  superTextSize: PropTypes.oneOf([
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
   * @uxpindescription The main page heading text value
   * @uxpinpropname Heading
   * @uxpincontroltype textfield(2)
   */
  pageHeadingText: PropTypes.string,

  /**
   * @uxpindescription The display size, corresponding to a Microsoft Text 'Variant'
   * @uxpinpropname Heading Size
   */
  pageHeadingSize: PropTypes.oneOf([
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
   * @uxpinpropname Heading Bold
   */
  pageHeadingBold: PropTypes.bool,

  /**
   * @uxpindescription To apply italic formatting
   * @uxpinpropname Heading Italics
   */
  pageHeadingItalic: PropTypes.bool,

  /**
   * @uxpindescription Small text value appearing below the main page heading
   * @uxpinpropname Sub-Text
   * @uxpincontroltype textfield(2)
   */
  subTextValue: PropTypes.string,

  /**
   * @uxpindescription The display size, corresponding to a Microsoft Text 'Variant'
   * @uxpinpropname Sub-Text Size
   */
  subTextSize: PropTypes.oneOf([
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
   * @uxpindescription Specify a text color with a Hex or PayPal UI color token, such as '#ffffff' or 'blue-700'.
   * @uxpinpropname Text Color
   */
  textColor: PropTypes.string,

  /**
   * @uxpindescription Specify a text color with a Hex or PayPal UI color token, such as '#ffffff' or 'blue-700'.
   * @uxpinpropname Bg Color
   */
  bgColor: PropTypes.string,

  /**
   * @uxpindescription Specify a text color with a Hex or PayPal UI color token, such as '#ffffff' or 'blue-700'.
   * @uxpinpropname Border Color
   */
  borderColor: PropTypes.string,

  /**
   * @uxpindescription The thickness of the bottom border line
   * @uxpinpropname Border Line Thickness
   */
  borderThickness: PropTypes.number,

  /**
   * NOTE: This cannot be called just 'padding,' or else there is a namespace collision with regular CSS 'padding.'
   * @uxpindescription Padding within the control. Value must be 0 or more.
   * @uxpinpropname Padding
   */
  internalPadding: PropTypes.number,

  /**
   * NOTE: This cannot be called just 'padding,' or else there is a namespace collision with regular CSS 'padding.'
   * @uxpindescription Padding between items added to this control. Value must be 0 or more.
   * @uxpinpropname Right Gutter
   */
  gutterPadding: PropTypes.number,
};

/**
 * Set the default values for this control in the UXPin Editor.
 */
PageHeader.defaultProps = {
  textColor: defaultTextColor,
  superTextValue: defaultSuperText,
  superTextSize: defaultSuperTextSize,
  pageHeadingText: defaultPageHeading,
  pageHeadingSize: defaultPageHeadingSize,
  pageHeadingBold: false,
  pageHeadingItalic: false,
  subTextValue: defaultSubText,
  subTextSize: defaultSubTextSize,
  bgColor: defaultBgColor,
  borderThickness: defaultBorderThickness,
  borderColor: defaultBorderColor,
  internalPadding: defaultInternalPadding,
  gutterPadding: defaultGutterPadding,
};

export { PageHeader as default };
