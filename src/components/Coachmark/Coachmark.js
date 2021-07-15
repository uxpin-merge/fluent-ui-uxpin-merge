import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
    Coachmark as FCoachmark
} from '@fluentui/react/lib/Coachmark';
import { TeachingBubbleContent } from '@fluentui/react/lib/TeachingBubble';
import { DirectionalHint } from '@fluentui/react/lib/Callout';



class Coachmark extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
        }

        this._targetElm = React.createRef();
    }

    set() {
        var isOpen = false;

        if (this.props.show) {
            isOpen = true;
        }

        this.setState(
            { open: isOpen }
        )
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.show !== this.props.show) {
            this.set();
        }
    }


    dismissControl() {
        //Set the control to not open to dismiss it.
        this.setState(
            { open: false }
        )

        this.props.show = false;
    }

    _onDismissClicked() {
        //Notify UXPin that the Close icon has been clicked on.
        if (this.props.dismiss) {
            this.props.dismiss();
        }

        this.dismissControl();
    }

    _onPrimaryButtonClicked() {
        //Notify UXPin of the event.
        if (this.props.primaryButtonClick) {
            this.props.primaryButtonClick();
        }

        this.dismissControl();
    }

    _onSecondaryButtonClicked() {
        //Notify UXPin of the event.
        if (this.props.secondaryButtonClick) {
            this.props.secondaryButtonClick();
        }

        this.dismissControl();
    }


    render() {

        //Determine whether to show the Primary and Secondary buttons. 
        var hidePrimaryButton = false;
        var priBtnProps = undefined;
        var hideSecondaryButton = false;
        var secBtnProps = undefined;

        if (!this.props.primaryButtonLabel) {
            hidePrimaryButton = true;
        }
        if (!this.props.secondaryButtonLabel) {
            hideSecondaryButton = true;
        }

        var pIconProps = undefined;
        if (this.props.primaryButtonIcon && this.props.primaryButtonIcon.length) {
            pIconProps = { iconName: this.props.primaryButtonIcon.trim() };
        }

        var sIconProps = undefined;
        if (this.props.secondaryButtonIcon && this.props.secondaryButtonIcon.length) {
            sIconProps = { iconName: this.props.secondaryButtonIcon.trim(), style: { color: 'white' } };
        }

        //Now put it all together...
        if (this.props.primaryButtonLabel || pIconProps) {
            priBtnProps = ({
                text: this.props.primaryButtonLabel,
                hidden: hidePrimaryButton,
                iconProps: pIconProps,
                onClick: () => { this._onPrimaryButtonClicked() }
            });
        }

        if (this.props.secondaryButtonLabel || sIconProps) {
            secBtnProps = ({
                text: this.props.secondaryButtonLabel,
                hidden: hideSecondaryButton,
                iconProps: sIconProps,
                onClick: () => { this._onSecondaryButtonClicked() }
            });
        }


        return (
            <>
                <div
                    className="trigger"
                    onClick={() => { this.setState({ open: !this.state.open }) }}
                    ref={this._targetElm}
                    style={{
                        width: 20,
                        height: 20,
                        background: this.props.showMarker ? '#640487' : 'transparent',
                        borderRadius: 4,
                    }} />

                {this.state.open && (
                    <FCoachmark
                        {...this.props}
                        target={this._targetElm.current}
                        positioningContainerProps={{
                            doNotLayer: false,
                            directionalHint: DirectionalHint[this.props.direction],
                            directionalHintFixed: true,
                        }}>
                        <TeachingBubbleContent
                            headline={this.props.title}
                            footerContent={this.props.footerText}
                            hasCloseIcon={true}
                            primaryButtonProps={priBtnProps}
                            secondaryButtonProps={secBtnProps}
                            onDismiss={() => { this._onDismissClicked() }} >
                            {this.props.text}
                        </TeachingBubbleContent>
                    </FCoachmark>
                )}
            </>
        );
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Coachmark.propTypes = {

    /**
     * @uxpindescription Whether to display the Coachmark 
     * @uxpinpropname Show
     */
    show: PropTypes.bool,

    /**
     * @uxpindescription Whether to show the purple target marker on the canvas 
     * @uxpinpropname Show Marker
     */
    showMarker: PropTypes.bool,

    /**
     * @uxpindescription The control's title text
     * @uxpinpropname Headline
     */
    title: PropTypes.string,

    /**
     * @uxpindescription The main message text
     * @uxpincontroltype textfield(4)
     */
    text: PropTypes.string,

    /**    
    * @uxpindescription Footer text to display in the bottom left corner. 
    */
    footerText: PropTypes.string,

    /**
     * @uxpindescription The displayed text on the Primary Button. Remove text to hide button.
     * @uxpinpropname Text: Primary Button
     */
    primaryButtonLabel: PropTypes.string,

    /**
     * @uxpindescription The exact name from the PayPal icon library (Optional)
     * @uxpinpropname Icon: Primary Button
     */
    primaryButtonIcon: PropTypes.string,

    /**
     * @uxpindescription The displayed text on the Secondary Button. Remove text to hide button.
     * @uxpinpropname Text: Secondary Button
     */
    secondaryButtonLabel: PropTypes.string,

    /**
     * @uxpindescription The exact name from the PayPal icon library (Optional)
     * @uxpinpropname Icon: Secondary Button
     */
    secondaryButtonIcon: PropTypes.string,

    /**
     * @uxpindescription The control's display direction
     */
    direction: PropTypes.oneOf([
        "topLeftEdge",
        "topCenter",
        "topRightEdge",
        "topAutoEdge",
        "bottomLeftEdge",
        "bottomCenter",
        "bottomRightEdge",
        "bottomAutoEdge",
        "leftTopEdge",
        "leftCenter",
        "leftBottomEdge",
        "rightTopEdge",
        "rightCenter",
        "rightBottomEdge"
    ]),

    /**
     * @uxpindescription Fires when the Close button is clicked
     * @uxpinpropname Dismiss
     */
    dismiss: PropTypes.func,

    /**
     * @uxpindescription Fires when the Primary Button is clicked on
     * @uxpinpropname Primary Button Click
     */
    primaryButtonClick: PropTypes.func,

    /**
     * @uxpindescription Fires when the Secondary Button is clicked on
     * @uxpinpropname Secondary Button Click
     */
    secondaryButtonClick: PropTypes.func,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Coachmark.defaultProps = {
    show: true,
    title: "Basic Coachmark",
    text: "Welcome to the land of Coachmarks!",
    footerText: "",
    direction: "bottomCenter",
    primaryButtonLabel: 'Next',
    secondaryButtonLabel: 'Close',
    secondaryButtonIcon: "Close",
    showMarker: true,
}


export { Coachmark as default };
