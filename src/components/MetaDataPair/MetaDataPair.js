import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import { VerticalStack } from '../VerticalStack/VerticalStack';
import { UxpColors } from '../_helpers/uxpcolorutils';
import { UxpNumberParser } from '../_helpers/uxpnumberutils';



const innerStackItemStyles = {
    root: {
        alignItems: 'center',
    },
};

const innerStackTokens = {
    childrenGap: '12',
    padding: 0,
};

const verticalAlign = 'center';
const horizontalAlign = 'start';

const innerVerticalAlign = 'center';

const instructionText = `Left Side Meta-Data Label.`;


//Use this color if the UXPin user doesn't enter a valid hex or PPUI color token.
const defaultTextColor = "#000000";

//Default width for the left side. 
const defaultLeftWidth = 212;

//Default gutter padding. 
const defaultGutter = 24;


class MetaDataPair extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    render() {

        //Styles with dynamic values

        //****************************
        //For Outer Stack

        //The user can enter either a percent or regular number
        var leftW = UxpNumberParser.parsePercentOrInt(this.props.leftWidth);
        if (!leftW)
            leftW = defaultLeftWidth;

        const leftStackItemStyles = {
            root: {
                width: leftW,
                alignItems: 'center',
                display: 'flex',
                overflow: 'hidden',
            },
        };

        //The left number is the vertical gap between rows. Right number is the column gap. 
        //Let's make sure we have a positive number. 
        let pad = this.props.gutterPadding < 0 ? 0 : this.props.gutterPadding;
        let gap = '12 ' + pad;
        const stackTokens = {
            childrenGap: gap,
            padding: 0,
        };


        //****************************
        //For Text control on the left side

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
                display: 'block',         //Fixes the 'nudge up/down' issues for larger and smaller sizes
                lineHeight: 'normal',     //Fixes the janked line height issues for larger and smaller sizes,
                textAlign: this.props.align
            }
        }


        //****************************
        //For Inner Stack

        //Set up the StackItems

        var stackList = [];
        if (this.props.children) {

            //First, let's create our own array of children, since UXPin returns an object for 1 child, or an array for 2 or more.
            let childList = React.Children.toArray(this.props.children);

            //Now, we configure the StackItems
            if (childList.length) {
                var i;
                for (i = 0; i < childList.length; i++) {
                    let child = childList[i];
                    let stack = (
                        <StackItem
                            styles={innerStackItemStyles}
                            grow={this.props.stretch ? true : ''}
                            align={this.props.stretch ? "stretch" : ''}   >
                            {child}
                        </StackItem>
                    );
                    stackList.push(stack);
                }
            }
        } //If props.children

        return (
            <React.Fragment>
                {(
                    <Stack
                        {...this.props}
                        tokens={stackTokens}
                        horizontal={true}
                        horizontalAlign={horizontalAlign}
                        verticalAlign={verticalAlign}
                    >

                        <StackItem
                            styles={leftStackItemStyles}
                            disableShrink={true}
                            align={'stretch'} >
                            <Text
                                {...this.props}
                                styles={fTextStyles}
                                variant={this.props.size}>
                                {this.props.value}
                            </Text>
                        </StackItem>

                        <StackItem
                            grow={true}
                            align={'stretch'}>

                            <Stack
                                tokens={innerStackTokens}
                                horizontal={false}
                                horizontalAlign={horizontalAlign}
                                verticalAlign={innerVerticalAlign}
                                wrap={false} >

                                {stackList}

                            </Stack>

                        </StackItem>
                    </Stack>
                )}
            </React.Fragment>
        );
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
MetaDataPair.propTypes = {

    /**
     * Don't show this prop in the UXPin Editor. 
     * @uxpinignoreprop 
     * @uxpindescription Contents for the right side. 1. Drag an object onto the canvas. 2. In the Layers Panel, drag the item onto this object. Now it should be indented, and contained as a 'child.'  
     * @uxpinpropname Right Contents
     */
    children: PropTypes.node,

    /**
     * @uxpindescription The text value to display
     * @uxpinpropname Left Text
     * @uxpincontroltype textfield(6)
     */
    value: PropTypes.string,

    /**
     * @uxpindescription The display size, corresponding to a Microsoft Text 'Variant'
     * @uxpinpropname Left Size
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
     * @uxpinpropname Left Bold
     */
    bold: PropTypes.bool,

    /**
     * @uxpindescription To apply italic formatting
     * @uxpinpropname Left Italic
     */
    italic: PropTypes.bool,

    /**
     * @uxpindescription Text alignment
     * @uxpinpropname Left Align
     */
    align: PropTypes.oneOf(['left', 'center', 'right']),

    /**
     * @uxpindescription Specify a text color with a Hex or color token, such as '#ffffff'
     * @uxpinpropname Left Color
     */
    color: PropTypes.string,

    /**
     * @uxpindescription The fixed width for the left side label. Enter a percent like '33%' or a whole number, like '212'.
     * @uxpinpropname Left Width
     */
    leftWidth: PropTypes.string,

    /**
     * NOTE: This cannot be called just 'padding,' or else there is a namespace collision with regular CSS 'padding.'
     * @uxpindescription Padding between the left side label and the right side contents. Value must be 0 or more.  
     * @uxpinpropname Gutter
     */
    gutterPadding: PropTypes.number,

    /**
     * @uxpindescription To stretch the right side contents 
     * @uxpinpropname Stretch Contents
     */
    stretch: PropTypes.bool,

}


/**
 * Set the default values for this control in the UXPin Editor.
 */
MetaDataPair.defaultProps = {
    value: instructionText,
    size: 'medium',
    bold: false,
    italic: false,
    align: 'left',
    color: 'black',
    leftWidth: defaultLeftWidth,
    gutterPadding: defaultGutter,
    stretch: true,
}


export { MetaDataPair as default };