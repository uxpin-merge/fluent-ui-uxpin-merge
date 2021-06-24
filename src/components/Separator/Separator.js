import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Separator as FSeparator } from '@fluentui/react/lib/Separator';
import { Text } from '@fluentui/react/lib/Text';
import { Icon } from '@fluentui/react/lib/Icon';
import { UxpColors } from '../_helpers/uxpcolorutils';
import { TextAlignMiddleIcon } from '@fluentui/react-icons-mdl2';



const defaultTextColor = "black";
const defaultBgColor = "white";


class Separator extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }
    }


    render() {

        //Let's see if the user entered a valid background color value. This method returns undefined if not. 
        var bgColor = UxpColors.getHexFromHexOrToken(this.props.bgColor);
        if (!bgColor) {
            bgColor = defaultBgColor;
        }

        //Let's see if the user entered a valid text color value. This method returns undefined if not. 
        var txColor = UxpColors.getHexFromHexOrToken(this.props.textColor);
        if (!txColor) {
            txColor = defaultTextColor;
        }

        const contentStyles = {
            content: {
                background: bgColor,
                borderRadius: 100,
            }
        }

        let fTextStyles = {
            root: {
                color: txColor,
                paddingTop: '2px',
                paddingBottom: '2px',
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

        const iconStyles = {
            root: {
                color: txColor,
                fontSize: '16px',
                height: '16px',
                width: '16px',
                paddingTop: '2px',
                paddingBottom: '2px',
                marginRight: '6px',
            },
        };

        return (
            <FSeparator
                {...this.props}
                vertical={this.props.vertical}
                alignContent={this.props.alignment}
                styles={contentStyles}
            >
                {showIcon ?
                    <Icon
                        {...this.props}
                        iconName={this.props.iconName.trim()}
                        styles={iconStyles}
                    />
                    : ''
                }
                {showText ?
                    <Text
                        {...this.props}
                        styles={fTextStyles}
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
