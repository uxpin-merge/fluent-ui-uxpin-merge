import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TeachingBubble as FTeachingBubble } from '@fluentui/react/lib/TeachingBubble';
import { DirectionalHint } from '@fluentui/react/lib/Callout';




class TeachingBubble extends React.Component {
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
        if (
            prevProps.show !== this.props.show
        ) {
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
        var hideSecondaryButton = false;

        //If the primary or secondary button labels are empty, we need to hide them. 
        if (!this.props.primaryButtonLabel) {
            hidePrimaryButton = true;
        }
        if (!this.props.secondaryButtonLabel) {
            hideSecondaryButton = true;
        }

        let pIconProps = { iconName: this.props.primaryButtonIcon };
        let sIconProps = { iconName: this.props.secondaryButtonIcon, style: { color: 'white' } };

        return (
            <>
                <div
                    className="trigger"
                    ref={this._targetElm}
                    style={{
                        width: 20,
                        height: 20,
                        background: this.props.showMarker ? '#640487' : 'transparent',
                        borderRadius: 4,
                    }} />

                {this.state.open && (
                    <FTeachingBubble
                        target={this._targetElm.current}
                        {...this.props}
                        calloutProps={{ directionalHint: DirectionalHint[this.props.direction] }}
                        headline={this.props.title}
                        footerContent={this.props.footerText}
                        hasCloseButton={this.props.hasCloseButton}
                        primaryButtonProps={{
                            text: this.props.primaryButtonLabel,
                            hidden: hidePrimaryButton,
                            iconProps: pIconProps,
                            onClick: () => { this._onPrimaryButtonClicked() }
                        }}
                        secondaryButtonProps={{
                            text: this.props.secondaryButtonLabel,
                            hidden: hideSecondaryButton,
                            iconProps: sIconProps,
                            onClick: () => { this._onSecondaryButtonClicked() }
                        }}
                        onDismiss={() => { this._onDismissClicked() }} >
                        {this.props.text}
                    </FTeachingBubble>
                )}
            </>
        );
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
TeachingBubble.propTypes = {

    /**
     * @uxpindescription Whether to display the TeachingBubble 
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
     * @uxpincontroltype textfield(5)
     */
    text: PropTypes.string,

    /**    
    * @uxpindescription Footer text to display in the bottom left corner. 
    * @uxpinpropname Footer Text
    */
    footerText: PropTypes.string,

    /**
     * @uxpindescription The displayed text on the Primary Button. Remove text to hide button.
     * @uxpinpropname Text: Primary Button
     */
    primaryButtonLabel: PropTypes.string,

    /**
     * @uxpindescription The exact name from the icon library (Optional)
     * @uxpinpropname Icon: Primary Button
     */
    primaryButtonIcon: PropTypes.string,

    /**
     * @uxpindescription The displayed text on the Secondary Button. Remove text to hide button.
     * @uxpinpropname Text: Secondary Button
     */
    secondaryButtonLabel: PropTypes.string,

    /**
     * @uxpindescription The exact name from the icon library (Optional)
     * @uxpinpropname Icon: Secondary Button
     */
    secondaryButtonIcon: PropTypes.string,

    /**
     * @uxpindescription Whether to display the Close button
     * @uxpinpropname Show Close Button
     * */
    hasCloseButton: PropTypes.bool,

    /**
     * @uxpindescription The control's display direction
     * @uxpinpropname Direction
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
TeachingBubble.defaultProps = {
    show: true,
    title: "Basic TeachingBubble",
    text: "Set my 'Show' property to true to view me in a mockup.",
    footerText: "",
    direction: "bottomCenter",
    hasCloseButton: true,
    primaryButtonLabel: 'Next',
    secondaryButtonLabel: 'Close',
    secondaryButtonIcon: "Close",
    showMarker: true,
}


export { TeachingBubble as default };
