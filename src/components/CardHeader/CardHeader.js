import * as React from 'react';
import * as PropTypes from 'prop-types';
import { FontIcon } from '@fluentui/react/lib/Icon';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { UxpColors } from '../_helpers/uxpcolorutils';



//****** STYLES */

//Use this color if the UXPin user doesn't enter a valid hex or PPUI color token.
const defaultTextColor = "#000000";

const defaultIconSize = 24;

//TODO: Choose good default icon name
const defaultIconName = '';

//****** OTHER */

const defaultHeaderText = "Card Header";


class CardHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    _onClick() {
        //Raise this event to UXPin. 
        if (this.props.onHeaderClick) {
            this.props.onHeaderClick();
        }
    }

    render() {

        //Styles with dynamic values

        //****************************
        //For Outer Stack

        //Let's make sure we have a positive number. 

        const topStackItemStyles = {
            root: {
                display: 'flex',
                overflow: 'hidden',
            },
        };

        //With one number, the padding applies to both rows and columns.
        let pad = '12px';

        //Let's make sure we have a positive number. 
        let cardPad = this.props.cardPadding < 0 ? 0 : this.props.cardPadding;

        const stackTokens = {
            childrenGap: pad,
            padding: cardPad,
        };

        //****************************
        //For Icon

        var iconStackItem = '';
        if (this.props.iconName) {
            let iName = this.props.iconName.trim();
            let iSize = this.props.iconSize;

            //Let's see if the user entered a valid color value. This method returns undefined if not. 
            var iColor = UxpColors.getHexFromHexOrToken(this.props.iconColor);

            console.log("color prop: " + this.props.iconColor);
            console.log("     Returned value: " + iColor);

            if (!iColor) {
                iColor = defaultTextColor;
            }

            console.log("     Setting it as: " + iColor);

            let colorClass = {
                color: iColor,
            }

            let iconClass = {
                fontSize: iSize,
                height: iSize,
                width: iSize,
                display: 'block',           //Required
                lineHeight: 'normal',       //Required
            };

            iconStackItem = (
                <StackItem>
                    <FontIcon
                        iconName={iName}
                        className={[iconClass, colorClass]}
                    />
                </StackItem>
            );
        }

        //****************************
        //For Text control

        //Let's see if the user entered a valid color value. This method returns undefined if not. 
        let textColor = UxpColors.getHexFromHexOrToken(this.props.textColor);

        let fTextStyles = {
            root: {
                color: textColor ? textColor : defaultTextColor,
                fontWeight: this.props.bold ? 'bold' : 'normal',
                fontStyle: this.props.italic ? 'italic' : 'normal',
                display: 'block',         //Fixes the 'nudge up/down' issues for larger and smaller sizes
                lineHeight: 'normal',     //Fixes the janked line height issues for larger and smaller sizes
            }
        }

        //if Header Text is defined
        var headerTxt = '';
        if (this.props.value) {
            headerTxt = (
                <StackItem>
                    <Text
                        {...this.props}
                        styles={fTextStyles}
                        variant={this.props.size}>
                        {this.props.value}
                    </Text>
                </StackItem>
            );
        }

        return (

            <Stack
                tokens={stackTokens}
                horizontal={true}
                horizontalAlign={'start'}
                verticalAlign={'center'}
                wrap={false}
                styles={topStackItemStyles}
                onClick={() => { this._onClick() }} >

                {iconStackItem}
                {headerTxt}

            </Stack>
        );
    }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
CardHeader.propTypes = {

    /**
     * @uxpindescription The exact name from the icon library (Optional)
     * @uxpinpropname Icon Name
     * */
    iconName: PropTypes.string,

    /**
     * @uxpindescription The size to use for the icon's width and height
     * @uxpinpropname Icon Size
     * */
    iconSize: PropTypes.number,

    /**
     * @uxpindescription Use a color token, such as 'blue-600' or 'black', or a standard Hex Color, such as '#0070BA'
     * @uxpinpropname Icon Color
     * */
    iconColor: PropTypes.string,

    /**
     * @uxpindescription Text to display in the header
     * @uxpinpropname Header Text
     * @uxpincontroltype textfield(6)
     */
    value: PropTypes.string,

    /**
     * @uxpindescription Specify a text color with a Hex or color token, such as '#ffffff' or 'blue-700'. 
     * @uxpinpropname Text Color
     */
    textColor: PropTypes.string,

    /**
     * @uxpindescription To apply bold formatting
     */
    bold: PropTypes.bool,

    /**
     * @uxpindescription To apply italic formatting
     */
    italic: PropTypes.bool,

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
     * Don't show this prop in the UXPin Editor. 
     * @uxpinignoreprop 
     * NOTE: This cannot be called just 'padding,' or else there is a namespace collision with regular CSS 'padding.'
     * @uxpindescription Inner padding for Card Header. Value must be 0 or more.  
     * @uxpinpropname Card Padding
     */
    cardPadding: PropTypes.number,

    /**
     * @uxpindescription Fires when the Header is clicked on.
     * @uxpinpropname Click
     * */
    onHeaderClick: PropTypes.func,
}


/**
 * Set the default values for this control in the UXPin Editor.
 */
CardHeader.defaultProps = {
    value: defaultHeaderText,
    textColor: defaultTextColor,
    size: 'large',
    bold: false,
    italic: false,
    iconName: defaultIconName,
    iconSize: defaultIconSize,
    iconColor: defaultTextColor,
    cardPadding: 12,
}


export { CardHeader as default };