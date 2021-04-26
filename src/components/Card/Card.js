import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { Shimmer, ShimmerElementType } from '@fluentui/react/lib/Shimmer';
import VerticalStack from '../VerticalStack/VerticalStack';
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

const defaultShimmerDuration = 1;

const minHeight = '10px';



class Card extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hovered: false,
            shimmer: true
        }
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.shimmer !== this.props.shimmer ||
            prevProps.shimmerDuration !== this.props.shimmerDuration
        ) {
            this.set();
        }
    }

    set() {
        this.setState({
            shimmer: this.props.shimmer
        })
        if (this.props.shimmer) {
            setTimeout(
                () => {
                    this.setState({
                        shimmer: false
                    })
                },
                (this.props.shimmerDuration || defaultShimmerDuration) * 1000
            )
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
            minHeight: minHeight,
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

                        let stack = (
                            <StackItem
                                align={'stretch'}
                                key={i}
                            >
                                {child}
                            </StackItem>
                        );
                        stackList.push(stack);
                    }
                }
            }
        } //If props.children


        return (
            <div
                style={divStyles}
                onMouseEnter={() => this._setHover(true)}
                onMouseLeave={() => this._setHover(false)} >
                {this.state.shimmer && (
                    <VerticalStack
                        showInstructions={false}
                        gutterPadding={10}
                    >
                        <Shimmer shimmerElements={[
                            { type: ShimmerElementType.line, height: 24 },
                        ]} />
                        <Shimmer shimmerElements={[
                            { type: ShimmerElementType.line, height: 50 }
                        ]} />
                        <Shimmer shimmerElements={[
                            { type: ShimmerElementType.line, height: 24, },
                        ]} />
                    </VerticalStack>
                )}
                {!this.state.shimmer && (
                    <Stack
                        tokens={stackTokens}
                        horizontal={false}
                        horizontalAlign={hAlign}
                        verticalAlign={verticalAlign}
                        wrap={false}
                        styles={topStackItemStyles}
                    >

                        {stackList}

                    </Stack>
                )}
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
    * @uxpindescription Whether to display the shimmer 
    * @uxpinpropname Shimmer
    */
    shimmer: PropTypes.bool,

    /**
    * @uxpindescription Shimmer duration inseconds
    * @uxpinpropname Shimmer Duration
    */
    shimmerDuration: PropTypes.number,
}


/**
 * Set the default values for this control in the UXPin Editor.
 */
Card.defaultProps = {
    margin: 6,
    cardPadding: 0,
    gutterPadding: 24,
    align: leftAlign,
    bgColor: '',
    borderColor: 'purple', //'#F5F7FA'
    showShadow: true,
    shimmer: true,
    shimmerDuration: defaultShimmerDuration
}


export { Card as default };