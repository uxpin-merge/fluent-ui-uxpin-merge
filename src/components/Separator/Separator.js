import * as React from 'react';
import { Separator as FSeparator } from '@fluentui/react/lib/Separator';
import { Text } from '@fluentui/react/lib/Text';
import { Icon } from '@fluentui/react/lib/Icon';
import * as PropTypes from 'prop-types';
import { UxpColors } from '../_helpers/uxpcolorutils';


/**
 * UPDATED April 21, 2020 by Anthony Hand
 * - Added file to our TPX UX Experimental library on UXPin.
 * 
 * TODOs
 * - Control needs to be updated with the proper PayPal UI theme. 
 * 
 */


const defaultTextColor = '#000000';
const defaultBgColor = '#ffffff';


class Separator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }


    render() {

        const iconStyles = {
            root: {
                fontSize: '16px',
                height: '16px',
                width: '16px',
                marginRight: '6px'
            },
        };

        //Let's see if the user entered a valid background color value. This method returns undefined if not. 
        var bgColor = UxpColors.getHexFromHexOrToken(this.props.bgColor);
        if (!bgColor) {
            bgColor = defaultBgColor;
        }

        //Let's see if the user entered a valid text color value. This method returns undefined if not. 
        var txColor = UxpColors.getHexFromHexOrToken(this.props.textColor);

        console.log("TXColor: " + txColor);

        if (!txColor) {
            txColor = defaultTextColor;
        }

        console.log("Now TXColor: " + txColor);

        const contentStyles = {
            background: 'red',
            backgroundColor: 'red',

            content: {
                background: bgColor,
                //color: txColor,
                borderRadius: 100,
            }
        }

        let showIcon = false;
        if (this.props.iconName && this.props.iconName.trim().length > 0) {
            showIcon = true;
        }

        let showText = false;
        if (this.props.text && this.props.text.trim().length > 0) {
            showText = true;
        }

        let fTextStyles = {
            root: {
                color: txColor,
            }
        }

        return (
            <FSeparator
                {...this.props}
                vertical={this.props.vertical}
                alignContent={this.props.alignment}
                styles={contentStyles}
            >
                { showIcon ?
                    <Icon
                        {...this.props}
                        iconName={this.props.iconName.trim()}
                        styles={iconStyles}
                    />
                    : ''
                }
                { showText ?
                    <Text
                        {...this.props}
                    >{this.props.text}</Text>
                    : ''
                }
            </FSeparator>
        );
    }

}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Separator.propTypes = {
    /**
     * @uxpindescription Text to display on the separator (optional)
     */
    text: PropTypes.string,

    /**
    * @uxpindescription If an icon or text are set, the color for the content. Set with a Hex or color token, such as '#ffffff'.  
    * @uxpinpropname Text Color
    */
    textColor: PropTypes.string,

    /**
     * @uxpindescription The exact name from the icon library (Optional)
     * @uxpinpropname Icon Name
     */
    iconName: PropTypes.string,

    /**
     * @uxpindescription If an icon or text are set, the background color behind the content. Set with a Hex or color token, such as '#ffffff'.  
     * @uxpinpropname Bg Color
     */
    bgColor: PropTypes.string,

    /**
    * @uxpindescription How to align content if text and/or and icon are specified 
    * @uxpinpropname Content Alignment
    */
    alignment: PropTypes.oneOf(['start', 'center', 'end']),

    /** 
    * @uxpindescription Whether to display the separator vertical  
    */
    vertical: PropTypes.bool,
};

/**
 * Set the default values for this control in the UXPin Editor.
 */
Separator.defaultProps = {
    text: "Simple Separator",
    iconName: '',
    bgColor: defaultBgColor,
    textColor: defaultTextColor,
    alignment: "center",
    vertical: false,
}

export { Separator as default };
