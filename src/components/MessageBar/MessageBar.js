import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
    MessageBar as FMessageBar,
    MessageBarButton,
    MessageBarType
} from '@fluentui/react/lib/MessageBar';
import { getTokens } from '../_helpers/parser';
import { UxpNumberParser } from '../_helpers/uxpnumberparser';




class MessageBar extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            message: "",
        }
    }

    set() {
        let message = this._getTokenizedText(this.props.message);

        this.setState(
            { message: message }
        )
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.message !== this.props.message
        ) {
            this.set();
        }
    }

    //Tokenize the string coming in from UXPin for the description and 
    //    comments (Body Copy) to support the link(Link Text) feature.
    _getTokenizedText(text) {

        var tokens = getTokens(text).mixed.map((el, i) => {

            console.log("get token. el " + el.toString());

            if (el.type) {
                console.log("   el type " + el.type);
            }

            if (typeof (el) === 'string') {
                console.log("get token. el string " + el.toString());
                return (<span key={i}> {el} </span>);
            }
            else if (el.type === 'link') {
                console.log("get token. el link " + el.suggestions);
                if (el.suggestions) {
                    console.log("    el link " + el.suggestions[0]);
                    return el.suggestions[0];
                }
            }
            else if (el.suggestions[0]) {
                // if there's a suggestion, call the function
                return el.suggestions[0];
            } else {
                // there's no suggestion, return the text
                return (<span key={i}> {el.tokenString} </span>);
            }
        });

        return tokens;
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

        //Figure out whether we need to display any action buttons, and configure them.
        let hasActionButtons = false;
        var actionButtons = [];

        if (this.props.button2Text) {
            let btn = (<MessageBarButton style={{ fontSize: '8px', fontWeight: 'lighter' }} onClick={() => { this._onClickButton2(); }}>{this.props.button2Text}</MessageBarButton>);
            actionButtons.push(btn);
            hasActionButtons = true;
        }
        if (this.props.button1Text) {
            let btn = (<MessageBarButton primary style={{ fontSize: '8px', fontWeight: 'lighter' }} onClick={() => { this._onClickButton1(); }}>{this.props.button1Text}</MessageBarButton>);
            actionButtons.push(btn);
            hasActionButtons = true;
        }

        let truncate = false;
        if (!this.props.multiline) {
            truncate = true;
        }

        return (

            <FMessageBar
                {...this.props}
                messageBarType={MessageBarType[this.props.messageBarType]}
                isMultiline={this.props.multiline}
                truncated={truncate}
                actions={
                    (hasActionButtons) ?
                        <div>{actionButtons}</div>
                        : ''
                }
                dismissIconProps={this.props.showDismissButton && { iconName: "Clear", style: { fontSize: 16 } }}
                //The Close icon only displays when the event is handled
                onDismiss={this.props.showDismissButton && this.props.onDismissClicked ? this._onDismiss.bind(this) : undefined}
            >
                {this.state.message}
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
