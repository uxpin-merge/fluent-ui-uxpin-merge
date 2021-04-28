import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
    Coachmark as FCoachmark
} from '@fluentui/react/lib/Coachmark';
import { Tooltip as FTooltip, TooltipHost, } from '@fluentui/react/lib/Tooltip';
import { DirectionalHint } from '@fluentui/react/lib/Callout';



class Tooltip extends React.Component {
    constructor(props) {
        super(props);

        this._targetElm = React.createRef();
    }


    render() {

        return (
            <div>
                <div //The control actually acting as the tooltip target. 
                    className="trigger"
                    ref={this._targetElm}
                    style={{
                        display: 'inline-block', //required for tooltip host
                        width: 20,
                        height: 20,
                        borderRadius: 4,
                        background: this.props.showMarker ? '#640487' : 'transparent',
                    }} />
                <FTooltip
                    {...this.props}
                    targetElement={this._targetElm}
                    calloutProps={{
                        hidden: !this.props.show,
                        isBeakVisible: this.props.showBeak
                    }}
                    content={this.props.text}
                    directionalHint={DirectionalHint[this.props.direction]}
                />
            </div>
        );
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Tooltip.propTypes = {

    /**
     * @uxpindescription Whether to display the Tooltlip 
     * @uxpinpropname Show
     */
    show: PropTypes.bool,

    /**
     * @uxpindescription Whether to show the purple target marker on the canvas 
     * @uxpinpropname Show Marker
     */
    showMarker: PropTypes.bool,

    /**
     * @uxpindescription Whether to show the 'beak' (or tip) of the Tooltlip 
     */
    showBeak: PropTypes.bool,

    /**
     * @uxpindescription The main message text
     * @uxpincontroltype textfield(3)
     */
    text: PropTypes.string,

    /**
     * @uxpindescription The control's display direction
     * @uxpinpropname Hint Direction
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

};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Tooltip.defaultProps = {
    show: true,
    showBeak: true,
    text: "I'm a basic tooltip",
    direction: "topCenter",
    showMarker: true,
}


export { Tooltip as default };
