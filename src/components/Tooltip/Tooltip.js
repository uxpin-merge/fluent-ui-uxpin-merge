import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Tooltip as FTooltip, TooltipHost, } from '@fluentui/react/lib/Tooltip';
import { DirectionalHint } from '@fluentui/react/lib/Callout';
import { Stack } from '@fluentui/react/lib/Stack';



class Tooltip extends React.Component {
    constructor(props) {
        super(props);

        this._targetElm = React.createRef();

        this.state = {
            ttDirection: "topCenter",
        }
    }

    set() {
        //Let's see if we can parse a real date
        let direction = this.props.direction;

        this.setState(
            { ttDirection: direction }
        )
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.direction !== this.props.direction) {
            this.set();
        }
    }


    render() {

        const ttTargetID = _.uniqueId('ttTarget_');
        const tooltipID = _.uniqueId('tooltip_');

        const ttProps = {
            gapSpace: 2,
            target: `#${ttTargetID}`,
        };

        var ttChild = undefined;
        if (this.props.children) {

            //First, let's create our own array of children, since UXPin returns an object for 1 child, or an array for 2 or more.
            let childList = React.Children.toArray(this.props.children);

            if (childList.length) {
                //We only use the first child. All other children are ignored.
                ttChild = childList[0];
            }
        }

        let divStyle = ttChild ? '' : {
            //display: 'inline-block', //required for tooltip host
            width: 20,
            height: 20,
            borderRadius: 4,
            background: this.props.showMarker ? '#640487' : 'transparent',
        };

        return (
            <>
                <TooltipHost
                    content={this.props.text}
                    directionalHint={DirectionalHint[this.state.ttDirection]}
                    closeDelay={500}
                    id={tooltipID}
                    calloutProps={ttProps}
                >
                    <Stack
                        style={divStyle}
                        id={ttTargetID}
                        ariaDescribedby={tooltipID}>

                        {ttChild}

                    </Stack>
                </TooltipHost>
            </>

        );
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Tooltip.propTypes = {

    /**
     * Don't show this prop in the UXPin Editor. 
     * @uxpinignoreprop 
     * @uxpindescription Contents for the body of the control. 
     * @uxpinpropname Children
     */
    children: PropTypes.node,

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
     * @uxpincontroltype textfield(4)
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
