import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { UxpColors } from '../_helpers/uxpcolorutils';
import _ from 'lodash';



//****** ALIGNMENT */
const verticalAlign = 'center';

const leftAlign = 'left';
const centerAlign = 'center';
const rightAlign = 'right';

//****** STYLES */
const borderRadius = '4px';

//PPUI Elevation Specs: https://engineering.paypalcorp.com/confluence/display/PPUI/Elevation
const elevationShadow0 = '0 2px 4px rgba(0, 0, 0, 0.16)';
const elevationShadow1 = '0 3px 10px rgba(0, 0, 0, 0.16)';



class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hovered: false,
        }
    }

    _setHover(hover) {
        this.setState({ hovered: hover });
    }

    _getHorizontalAlignmentToken() {
        switch (this.props.align) {
            case leftAlign:
                return 'start';
            case centerAlign:
                return 'center';
            case rightAlign:
                return 'end';
            default:
                return 'start';
        }
    }

    _onClick() {
        //Raise this event to UXPin. 
        if (this.props.onCardClick) {
            this.props.onCardClick();
        }
    }

    render() {

        let hAlign = this._getHorizontalAlignmentToken();

        //Styles with dynamic values

        //****************************
        //For Outer Stack

        const topStackItemStyles = {
            root: {
                display: 'flex',
                overflow: 'hidden',
            },
        };

        //Let's make sure we have a positive number. 
        let cardPad = this.props.cardPadding < 0 ? 0 : this.props.cardPadding;

        //Let's see if the user entered a valid color value. This method returns undefined if not. 
        let cardBgColor = UxpColors.getHexFromHexOrToken(this.props.bgColor);

        let bColor = UxpColors.getHexFromHexOrToken(this.props.borderColor);
        let bStyle = bColor ? '1px solid ' + bColor : '';

        let cardShadow = this.state.hovered ? elevationShadow1 : elevationShadow0;

        const divStyles = {
            backgroundColor: cardBgColor,
            borderRadius: borderRadius,
            border: bStyle,
            boxShadow: this.props.showShadow ? cardShadow : '',
            padding: cardPad + 'px',
            margin: this.props.margin,
            minWidth: this.props.boxWidth > 1 ? this.props.boxWidth : 1,
            minHeight: this.props.boxHeight > 1 ? this.props.boxHeight : 1,
        };

        //With one number, the padding applies to both rows and columns.  
        //Let's make sure we have a positive number. 
        let pad = this.props.gutterPadding < 0 ? 0 : this.props.gutterPadding;

        const stackTokens = {
            childrenGap: pad,
            padding: '0px',
        };

        //****************************
        //For Inner Stack

        //Set up the StackItems
        var stackList = [];
        if (this.props.children) {

            //First, let's create our own array of children, since UXPin returns an object for 1 child, or an array for 2 or more.
            let childList = React.Children.toArray(this.props.children);

            //Now, we configure the StackItems
            if (childList.length) {
                for (var i = 0; i < childList.length; i++) {
                    if (childList[i]) {
                        let child = childList[i];

                        let childGrow = i > 0 && i < (childList.length - 1) ? "10" : false;

                        let stack = (
                            <StackItem
                                align={'stretch'}
                                key={i}
                                grow={childGrow}
                            >
                                {child}
                            </StackItem>
                        );
                        stackList.push(stack);
                    }
                }
            }
        }

        return (
            <div
                style={divStyles}
                onMouseEnter={() => this._setHover(true)}
                onMouseLeave={() => this._setHover(false)} >

                <Stack
                    tokens={stackTokens}
                    horizontal={false}
                    horizontalAlign={hAlign}
                    verticalAlign={verticalAlign}
                    wrap={false}
                    styles={topStackItemStyles}
                    onClick={() => this._onClick()}
                >

                    {stackList}

                </Stack>

            </div>
        );
    }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Card.propTypes = {

    /**
     * Don't show this prop in the UXPin Editor. 
     * @uxpinignoreprop 
     * @uxpindescription Contents for the right side. 1. Drag an object onto the canvas. 2. In the Layers Panel, drag the item onto this object. Now it should be indented, and contained as a 'child.'  
     * @uxpinpropname Right Contents
     */
    children: PropTypes.node,

    /**
    * @uxpindescription A minimum width for the whole card   
    * @uxpinpropname Min Width
    */
    boxWidth: PropTypes.number,

    /**
    * @uxpindescription A minimum height for the whole card
    * @uxpinpropname Min Height
    */
    boxHeight: PropTypes.number,

    /**
     * Don't show this prop in the UXPin Editor. 
     * @uxpinignoreprop 
     * @uxpindescription The margin around the card. Value must be 0 or more.  
     * @uxpinpropname Margin
     */
    margin: PropTypes.number,

    /**
     * Don't show this prop in the UXPin Editor. 
     * @uxpinignoreprop 
     * NOTE: This cannot be called just 'padding,' or else there is a namespace collision with regular CSS 'padding.'
     * @uxpindescription Inner padding for all card contents. Value must be 0 or more.  
     * @uxpinpropname Card Padding
     */
    cardPadding: PropTypes.number,

    /**
     * NOTE: This cannot be called just 'padding,' or else there is a namespace collision with regular CSS 'padding.'
     * @uxpindescription Padding between the sections in the card. Value must be 0 or more.  
     * @uxpinpropname Section Padding
     */
    gutterPadding: PropTypes.number,

    /**
     * @uxpindescription To horizontally align all content within the stack 
     * @uxpinpropname Alignment
     */
    align: PropTypes.oneOf([leftAlign, centerAlign, rightAlign]),

    /**
     * @uxpindescription Use a PayPal UI color token, such as 'blue-600' or 'black', or a standard Hex Color, such as '#0070BA'
     * @uxpinpropname Bg Color
     * */
    bgColor: PropTypes.string,

    /**
     * @uxpindescription Use a color token, such as 'blue-600' or 'black', or a standard Hex Color, such as '#0070BA'
     * @uxpinpropname Border Color
     * */
    borderColor: PropTypes.string,

    /**
     * @uxpindescription To show or hide the card's background shadow  
     * @uxpinpropname Show Shadow
     */
    showShadow: PropTypes.bool,

    /**
     * @uxpindescription Fires when the Card is clicked on.
     * @uxpinpropname Click
     * */
    onCardClick: PropTypes.func,
}


/**
 * Set the default values for this control in the UXPin Editor.
 */
Card.defaultProps = {
    margin: 6,
    boxWidth: 0,
    boxHeight: 0,
    cardPadding: 0,
    gutterPadding: 12,
    align: leftAlign,
    bgColor: '#ffffff',
    borderColor: '#F5F7FA',
    showShadow: true,
}


export { Card as default };