import * as React from 'react';
import * as PropTypes from 'prop-types';
import { TooltipHost, } from '@fluentui/react/lib/Tooltip';
import { Callout as MCallout } from '@fluentui/react/lib/Callout';
import { DirectionalHint } from '@fluentui/react/lib/Callout';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import Text from '../Text/Text';



const coStackTokens = {
    childrenGap: 12,
    padding: 12,
};

const tNone = "None";
const tHover = "On Hover";
const tClick = "On Click";

const coDefaultWidth = 320;
const coMinWidth = 20;
const coPadding = 12;

const textHeadingSize = 'large';
const textBodySize = 'medium';
const stretch = 'stretch';



class Callout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            ttDirection: "topCenter",
            open: false,
        }
    }

    set() {
        //Let's see if we can parse a real date
        let direction = this.props.direction;

        this.setState({
            ttDirection: direction,
            open: this.props.show,
        })
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.direction !== this.props.direction ||
            prevProps.open !== this.props.open) {
            this.set();
        }
    }

    _showControl() {
        this.setState(
            { open: true }
        )

        this.props.show = true;
    }

    _dismissControl() {
        //Set the control to not open to dismiss it.
        //We have to set both the state and prop.

        this.setState(
            { open: false }
        )

        this.props.show = false;
    }

    _onClick() {
        if (this.props.trigger === tClick) {
            this._showControl();
        }
    }

    _onMouseEnter() {
        if (this.props.trigger === tHover) {
            this._showControl();
        }
    }

    _onMouseLeave() {
        // if (this.props.trigger === tHover) {
        //     this._dismissControl();
        // }
    }

    render() {
        const coTargetID = _.uniqueId('callout_');

        var coChild = this.props.showMarker ? (
            <div
                style={{
                    display: 'inline-block',
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    background: this.props.showMarker ? '#640487' : 'transparent',
                }} >
            </div>
        ) : '';

        //To hold the list of contents
        var coList = [];

        //Add the title
        if (this.props.title && this.props.title?.trim()?.length > 0) {
            coList.push(
                <StackItem
                    align={stretch}
                    grow={false}>
                    <Text
                        textValue={this.props.title.trim()}
                        size={textHeadingSize} />
                </StackItem>
            );
        }

        //Add the message
        if (this.props.text && this.props.text?.trim()?.length > 0) {
            coList.push(
                <StackItem
                    align={stretch}
                    grow={false}>
                    <Text
                        textValue={this.props.text.trim()}
                        size={textBodySize} />
                </StackItem>
            );
        }

        if (this.props.children) {

            //First, let's create our own array of children, since UXPin returns an object for 1 child, or an array for 2 or more.
            let childList = React.Children.toArray(this.props.children);

            if (childList.length) {
                //We only use the first child. All other children are ignored.
                coChild = childList[0];

                if (childList.length > 1) {
                    //Let's assemble the list of things to chose in the tooltip
                    let ttChildren = childList.slice(1);
                    if (ttChildren && ttChildren.length > 0) {
                        var i;
                        for (i = 0; i < ttChildren.length; i++) {
                            let child = ttChildren[i];
                            coList.push(
                                <StackItem
                                    align={stretch}
                                    grow={false}>
                                    {child}
                                </StackItem>
                            );
                        }
                    }
                }
            }
        }

        //Reset the variable to the stack of objects
        let ttContents = (
            <Stack
                tokens={coStackTokens}
                horizontal={false}
                wrap={false}
                horizontalAlign={stretch}
            >
                {coList}
            </Stack>
        )

        const coStyles = {
            width: this.props.coWidth > coMinWidth ? this.props.coWidth : coMinWidth,
            padding: coPadding,
        };

        return (
            <>
                <Stack
                    id={coTargetID}
                    onClick={() => { this._onClick() }}
                    onMouseEnter={() => { this._onMouseEnter() }}
                    onMouseLeave={() => { this._onMouseLeave() }}
                >
                    {coChild}
                </Stack>
                {this.state.open && (
                    <MCallout
                        isBeakVisible={this.props.showBeak}
                        gapSpace={4}
                        doNotLayer={false}
                        target={`#${coTargetID}`}
                        directionalHint={DirectionalHint[this.props.direction]}
                        onDismiss={() => { this._dismissControl() }}
                        setInitialFocus={true}
                        className={coStyles}
                    >
                        {ttContents}
                    </MCallout>
                )}
            </>

        );
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Callout.propTypes = {

    /**
     * Don't show this prop in the UXPin Editor. 
     * @uxpinignoreprop 
     * @uxpindescription Contents for the body of the control. 
     * @uxpinpropname Children
     */
    children: PropTypes.node,

    /**
     * @uxpindescription Whether to display the Callout 
     */
    show: PropTypes.bool,

    /**
     * @uxpindescription The callout's width
     * @uxpinpropname Width
     */
    coWidth: PropTypes.number,

    /**
     * @uxpindescription Optionally select an automatic way to trigger the display of the Callout
     * @uxpinpropname Trigger
     */
    trigger: PropTypes.oneOf([
        tNone,
        tClick,
        tHover
    ]),

    /**
     * @uxpindescription The control's title text
     * @uxpinpropname Headline
     */
    title: PropTypes.string,

    /**
     * @uxpindescription The main message text
     * @uxpincontroltype textfield(6)
     */
    text: PropTypes.string,

    /**
     * @uxpindescription In the standalone use case, whether to show the purple target marker on the canvas 
     * @uxpinpropname Show Marker
     */
    showMarker: PropTypes.bool,

    /**
     * @uxpindescription Whether to show the 'beak' (or tip) of the Tooltlip 
     */
    showBeak: PropTypes.bool,

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
Callout.defaultProps = {
    showBeak: true,
    coWidth: coDefaultWidth,
    trigger: tClick,
    title: "Callout",
    text: "Set a message and optionally add other Merge controls.",
    direction: "bottomCenter",
    showMarker: false,
}


export { Callout as default };
