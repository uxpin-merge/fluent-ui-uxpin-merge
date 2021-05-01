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

        this.state = {
            message: ""
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
        if (prevProps.message !== this.props.message) {
            this.set();
        }
    }

    //Tokenize the string coming in from UXPin for the description and 
    //    comments (Body Copy) to support the link(Link Text) feature.
    _getTokenizedText(text) {

        var tokens = getTokens(text).mixed.map((el, i) => {
            if (typeof (el) === 'string') {
                return (<span key={i}> {el} </span>);
            }
            else if (el.type == 'link') {
                return el.suggestions[0];
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
        console.log("Entered render");

        let dismissHandler = this.showDismissButton ? this._onDismiss() : undefined;

        let truncated = !this.isMultiline;

        let message = this.state.message;

        //Adding ANY buttons to the control appears to cause errors. 
        // var btn1 = '';
        // var btn2 = '';
        // var btnActions = '';
        // var hasBtns = false;

        // if (this.props.button1Text) {
        //     btn1 = (
        //         <MessageBarButton
        //             primary
        //             style={{ fontSize: '10px', fontWeight: 'lighter' }}
        //             onClick={() => { this._onClickButton1(); }}>
        //             {this.props.button1Text}
        //         </MessageBarButton>
        //     );
        //     hasBtns = true;
        // }

        // if (this.props.button2Text) {
        //     btn2 = (
        //         <MessageBarButton
        //             style={{ fontSize: '10px', fontWeight: 'lighter' }}
        //             onClick={() => { this._onClickButton2(); }}>
        //             {this.props.button2Text}
        //         </MessageBarButton>);
        //     hasBtns = true;
        // }

        // if (hasBtns) {
        //     btnActions = (
        //         <div>
        //             {btn2}
        //             {btn1}
        //         </div>
        //     )
        // }

        // actions={btnActions}

        return (

            <FMessageBar
                {...this.props}
                truncated={truncated}
                messageBarType={MessageBarType[this.props.messageBarType]}
                onDismiss={() => dismissHandler}
                actions={
                    <>
                        <MessageBarButton>Yes</MessageBarButton>
                        <MessageBarButton>No</MessageBarButton>
                    </>
                }
            >
                {message}
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
    isMultiline: PropTypes.bool,

    /** 
    * @uxpindescription Whether to show the dismiss button 
    * @uxpinpropname Dismiss Button
    */
    showDismissButton: PropTypes.bool,

    // /**
    //  * @uxpindescription The text to display on the Primary Button (Optional)
    //  * @uxpinpropname Primary Button Text
    //  */
    // button1Text: PropTypes.string,

    // /**
    //  * @uxpindescription The text to display on the Secondary Button (Optional)
    //  * @uxpinpropname Secondary Button Text
    //  */
    // button2Text: PropTypes.string,

    /**
     * @uxpindescription Fires when the Close button is clicked on
     * @uxpinpropname Dismiss
     */
    onDismissClicked: PropTypes.func,

    // /**
    //  * @uxpindescription Fires when the Primary Button is clicked on
    //  * @uxpinpropname Primary Click
    //  */
    // onClick1: PropTypes.func,

    // /**
    //  * @uxpindescription Fires when the Secondary Button is clicked on
    //  * @uxpinpropname Secondary Click
    //  */
    // onClick2: PropTypes.func
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
MessageBar.defaultProps = {
    message: "This is a Basic Message Bar. link(Learn More...)",
    messageBarType: "info",
    isMultiline: true,
    // button1Text: "Yes",
    // button2Text: "No",
    showDismissButton: true
};


export { MessageBar as default };
