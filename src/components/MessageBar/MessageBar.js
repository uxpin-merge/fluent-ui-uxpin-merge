import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
    MessageBar as FMessageBar,
    MessageBarButton,
    MessageBarType
} from '@fluentui/react/lib/MessageBar';
import { getTokens } from '../_helpers/parser';



class MessageBar extends React.Component {

    constructor(props) {
        super(props);

    }

    _onDismiss() {

        if (this.props.onDismissClicked) {
            this.props.onDismissClicked();
        }
    }

    _onClickButton1() {
        if (this.props.onClick1) {
            this.props.onClick1(1);
        }
    }

    _onClickButton2() {
        if (this.props.onClick2) {
            this.props.onClick2(2);
        }
    }

    render() {
        console.log("Entered render");


        return (

            <FMessageBar>
                {"Hello!"}
            </FMessageBar>
        );
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
MessageBar.propTypes = {

    /**
     * @uxpindescription The control's message. Supports the link(Click Me) feature.
     * @uxpinpropname Description
     * @uxpincontroltype textfield(6)
     */
    message: PropTypes.string,

    /**
     * @uxpindescription Reflect the control's role in the UI with its visual style
     * @uxpinpropname Role
     */
    messageBarType: PropTypes.oneOf([
        "info",
        "success",
        "warning",
        "severeWarning",
        "error",
        "remove",
        "blocked"
    ]),

    /** 
    * @uxpindescription Whether to allow the text to wrap across multiple lines 
    * @uxpinpropname Multiline
    */
    multiline: PropTypes.bool,

    /** 
    * @uxpindescription Whether to show the dismiss button 
    * @uxpinpropname Dismiss Button
    */
    showDismissButton: PropTypes.bool,

    /**
     * @uxpindescription The text to display on the Primary Button (Optional)
     * @uxpinpropname Primary Button Text
     */
    button1Text: PropTypes.string,

    /**
     * @uxpindescription The text to display on the Secondary Button (Optional)
     * @uxpinpropname Secondary Button Text
     */
    button2Text: PropTypes.string,

    /**
     * @uxpindescription Fires when the Close button is clicked on
     * @uxpinpropname Dismiss
     */
    onDismissClicked: PropTypes.func,

    /**
     * @uxpindescription Fires when the Primary Button is clicked on
     * @uxpinpropname Primary Click
     */
    onClick1: PropTypes.func,

    /**
     * @uxpindescription Fires when the Secondary Button is clicked on
     * @uxpinpropname Secondary Click
     */
    onClick2: PropTypes.func
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
MessageBar.defaultProps = {
    message: "This is a Basic Message Bar. link(Learn More...)",
    messageBarType: "info",
    multiline: true,
    button1Text: "Yes",
    button2Text: "No",
    showDismissButton: true
};


export { MessageBar as default };
