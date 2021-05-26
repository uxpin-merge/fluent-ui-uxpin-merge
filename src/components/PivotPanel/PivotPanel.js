import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { UxpColors } from '../_helpers/uxpcolorutils';



//The smallest allowed box size
const defaultBoxSize = '1';

const verticalAlign = 'start';

const leftAlign = 'left';
const centerAlign = 'center';
const rightAlign = 'right';
const stretchAlign = 'stretch';

const instructionText = `PivotPanel Instructions: 
1) Drag any Merge control onto the canvas. 
2) In the Layers Panel, drag and drop it onto this control.`;


//Use this color if the UXPin user doesn't enter a valid hex or color token.
const defaultTextColor = "#000000";

//In case we can't parse user-entered internal padding info or it's unspecified
const defaultPadding = "0";



class PivotPanel extends React.Component {
    constructor(props) {
        super(props);
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

    render() {

        //****************************
        // Instructions
        let fTextStyles = {
            root: {
                color: defaultTextColor,
                fontWeight: 'normal',
                fontStyle: 'normal',
                display: 'block',         //Fixes the 'nudge up/down' issues for larger and smaller sizes
                lineHeight: 'normal',     //Fixes the janked line height issues for larger and smaller sizes
            }
        }

        let instructions = (
            <Text
                {...this.props}
                styles={fTextStyles}
                variant={'medium'}>
                {instructionText}
            </Text>
        );

        //****************************
        //For Outer Stack

        let hAlign = this._getHorizontalAlignmentToken();
        let doStretch = this.props.align === stretchAlign ? true : false;

        //Styles with dynamic values

        //Let's see if the user entered a valid color value. This method returns undefined if not. 
        var color = UxpColors.getHexFromHexOrToken(this.props.bgColor);
        if (!color)
            color = 'transparent';

        //For internal padding within the stack. 
        let internalPadding = this.props.internalPadding > -1 ? this.props.internalPadding : defaultPadding;

        let mWidth = this.props.boxWidth > defaultBoxSize ? this.props.boxWidth : defaultBoxSize;
        let mHeight = this.props.boxHeight > defaultBoxSize ? this.props.boxHeight : defaultBoxSize;

        const topStackItemStyles = {
            root: {
                background: color,        //undefined is OK
                height: 'auto',
                width: 'auto',
                minWidth: mWidth + 'px',
                minHeight: mHeight + 'px',
            },
        };

        //With one number, the padding applies to both rows and columns.  
        //Let's make sure we have a positive number. 
        let pad = this.props.gutterPadding > 0 ? this.props.gutterPadding : 0;

        const stackTokens = {
            childrenGap: pad,
            padding: 0,
        };

        //****************************
        //For Inner Stack

        //Set up the StackItems
        var stackList = [];
        if (this.props.children) {

            const childStackItemStyles = {
                root: {
                    height: 'auto',
                    width: 'auto',
                    minWidth: mWidth + 'px',
                    minHeight: mHeight + 'px',
                },
            };

            //First, let's create our own array of children, since UXPin returns an object for 1 child, or an array for 2 or more.
            let childList = React.Children.toArray(this.props.children);

            //Now, we configure the StackItems
            if (childList.length) {

                for (var i = 0; i < childList.length; i++) {
                    let child = childList[i];

                    let stack = (
                        <StackItem
                            key={i}
                            align={doStretch ? stretchAlign : hAlign}
                            grow={false}
                            styles={childStackItemStyles}
                        >
                            {child}
                        </StackItem>
                    );
                    stackList.push(stack);
                } //for loop
            } //if childList
        } //If props.children


        return (

            <Stack
                {...this.props}
                tokens={stackTokens}
                padding={internalPadding + 'px'}
                horizontal={this.props.horizontal}
                horizontalAlign={hAlign}
                verticalAlign={verticalAlign}
                wrap={true}
                styles={topStackItemStyles}>

                {_.isEmpty(this.props.children) && instructions}
                {stackList}

            </Stack>
        );
    }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
PivotPanel.propTypes = {

    /**
     * Don't show this prop in the UXPin Editor. 
     * @uxpinignoreprop 
     * @uxpindescription Contents for the right side. 1. Drag an object onto the canvas. 2. In the Layers Panel, drag the item onto this object. Now it should be indented, and contained as a 'child.'  
     * @uxpinpropname Right Contents
     */
    children: PropTypes.node,

    /**
     * @uxpindescription Whether to use a Horizontal or Vertical layout. Check for Horizontal layout. Uncheck for Vertical layout.  
     */
    horizontal: PropTypes.bool,

    /**
    * @uxpindescription A minimum width for each child object in the panel. Most useful in grid layouts.   
    * @uxpinpropname Item Min Width
    */
    boxWidth: PropTypes.number,

    /**
    * @uxpindescription A minimum width for each child object in the panel. Most useful in grid layouts. 
    * @uxpinpropname Item Min Height
    */
    boxHeight: PropTypes.number,

    /**
     * NOTE: This cannot be called just 'padding,' or else there is a namespace collision with regular CSS 'padding.'
     * @uxpindescription Padding within the stack. Value must be 0 or more. 
     * @uxpinpropname Padding
     */
    internalPadding: PropTypes.number,

    /**
     * NOTE: This cannot be called just 'padding,' or else there is a namespace collision with regular CSS 'padding.'
     * @uxpindescription Row padding between the items in the group. Value must be 0 or more.  
     * @uxpinpropname Gutter
     */
    gutterPadding: PropTypes.number,

    /**
     * @uxpindescription To horizontally align all content within the stack 
     * @uxpinpropname Alignment
     */
    align: PropTypes.oneOf([leftAlign, centerAlign, rightAlign, stretchAlign]),

    /**
     * @uxpindescription Use a PayPal UI color token, such as 'blue-600' or 'black', or a standard Hex Color, such as '#0070BA'
     * @uxpinpropname Bg Color
     * */
    bgColor: PropTypes.string,
}


/**
 * Set the default values for this control in the UXPin Editor.
 */
PivotPanel.defaultProps = {
    internalPadding: 0,
    gutterPadding: 12,
    boxWidth: 0,
    boxHeight: 0,
    horizontal: true,
    align: stretchAlign,
    bgColor: '',
}


export { PivotPanel as default };