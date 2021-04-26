import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { UxpColors } from '../_helpers/uxpcolorutils';



const topAlign = 'top';
const middleAlign = 'middle';
const bottomAlign = 'bottom';

const defaultBorderColor = '#CBD2D6';

const borderNone = 'none';
const borderDashed = 'dashed';
const borderSolid = 'solid';
const borderDotted = 'dotted';

const minHeight = '10px';

//A StackItem that will spring to fill available space. 
const spanner = (<StackItem grow={1}><span /></StackItem>);



class CardFooter extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }

    _getVerticalAlignmentToken() {
        switch (this.props.vAlign) {
            case topAlign:
                return 'start';
            case middleAlign:
                return 'center';
            case bottomAlign:
                return 'end';
            default:
                return 'start';
        }
    }

    render() {

        let vAlign = this._getVerticalAlignmentToken();

        //Styles with dynamic values

        var bStyle = '';

        if (this.props.borderStyle !== borderNone) {
            let line = this.props.borderStyle === borderSolid ? borderSolid
                : this.props.borderStyle === borderDashed ? borderDashed
                    : borderDotted;

            //The function returns undefined if it's unparseable
            var bColor = UxpColors.getHexFromHexOrToken(this.props.borderColor);
            if (!bColor)
                bColor = defaultBorderColor;

            bStyle = '1px ' + line + ' ' + bColor;
        }

        const topStackItemStyles = {
            root: {
                display: 'flex',
                overflow: 'hidden',
                width: '100%',
                minHeight: minHeight,
                borderTop: bStyle,
            },
        };

        //****************************
        //For Outer Stack

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

            //First, let's create our own array of children, since UXPin returns an object for 1 child, or an array for 2 or more.
            var childList = React.Children.toArray(this.props.children);

            //Now, we configure the StackItems
            if (childList && childList.length) {

                for (var i = 0; i < childList.length; i++) {
                    let child = childList[i];

                    let stackItemStyle = {
                        root: {
                            width: 'auto',
                            display: 'flex',
                            overflow: 'hidden',
                            padding: '0',
                            margin: '0',
                        },
                    };

                    //Now we put it all together!
                    let stack = (
                        <Stack
                            horizontal={false}
                            horizontalAlign={'start'}
                            verticalAlign={vAlign}
                            wrap={false}
                            styles={stackItemStyle}
                        >
                            <StackItem
                                align={this.props.stretch ? "stretch" : ''}   >
                                {child}
                            </StackItem>
                        </Stack>
                    );
                    stackList.push(stack);
                } //for

                //Do we need to add a spanner?
                if (this.props.addSpanner && this.props.spannerIndex > 0 && this.props.spannerIndex <= stackList.length) {
                    let newIndex = this.props.spannerIndex - 1;

                    //Add the spanner at the specified index, deleting 0 other items.
                    stackList.splice(newIndex, 0, spanner);
                }
            } //if props.children.length
        } //If props.children


        return (

            <Stack
                tokens={stackTokens}
                horizontal={true}
                horizontalAlign={'start'}
                wrap={false}
                styles={topStackItemStyles}>

                {stackList}

            </Stack>
        );
    }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
CardFooter.propTypes = {

    /**
     * Don't show this prop in the UXPin Editor. 
     * @uxpinignoreprop 
     * @uxpindescription Contents for the right side. 1. Drag an object onto the canvas. 2. In the Layers Panel, drag the item onto this object. Now it should be indented, and contained as a 'child.'  
     * @uxpinpropname Right Contents
     */
    children: PropTypes.node,

    /**
     * @uxpindescription To show or hide the top border  
     * @uxpinpropname Border Style
     */
    borderStyle: PropTypes.oneOf([borderDotted, borderSolid, borderDashed, borderNone]),

    /**
     * @uxpindescription Use a color token, such as 'blue-600' or 'black', or a standard Hex Color, such as '#0070BA'
     * @uxpinpropname Border Color
     * */
    borderColor: PropTypes.string,

    /**
     * NOTE: This cannot be called just 'padding,' or else there is a namespace collision with regular CSS 'padding.'
     * @uxpindescription Row padding between the items in the group. Value must be 0 or more. 
     * @uxpinpropname Gutter
     */
    gutterPadding: PropTypes.number,

    /**
     * @uxpindescription To vertically align all content within the stack 
     * @uxpinpropname Vert Alignment
     */
    vAlign: PropTypes.oneOf([topAlign, middleAlign, bottomAlign]),

    /**
     * @uxpindescription To insert a spanner to fill empty space between two elements. 
     * @uxpinpropname Add Spanner
     */
    addSpanner: PropTypes.bool,

    /**
     * @uxpindescription The 1-based index for where to insert a Spanner. The Spanner will be inserted to the left of the item that is at this index value.
     * @uxpinpropname Spanner Index
     */
    spannerIndex: PropTypes.number,

}


/**
 * Set the default values for this control in the UXPin Editor.
 */
CardFooter.defaultProps = {
    borderStyle: borderDotted,
    borderColor: defaultBorderColor,
    gutterPadding: 12,
    vAlign: middleAlign,
    addSpanner: false,
    spannerIndex: 1,
}


export { CardFooter as default };