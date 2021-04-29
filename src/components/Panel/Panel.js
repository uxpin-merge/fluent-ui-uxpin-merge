import * as React from 'react';
import * as PropTypes from 'prop-types';
import { ScrollablePane } from '@fluentui/react/lib/ScrollablePane';
import { Stack } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import ActionButton from '../ActionButton/ActionButton';




const defaultHeight = 900;
const defaultWidth = 1440;
const defaultContentPadding = 24;

const sizeToWidthMap = {
    small: 300,
    medium: 600,
    large: 900,
    extraLarge: 1200,
}



class Panel extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            open: false,
        }
    }

    set() {

        let isOpen = this.props.show ? true : false;

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
        //We have to set the state and prop twice.

        this.setState(
            { open: false }
        )

        this.props.show = false;
    }

    _onDismissClicked() {
        this.dismissControl();

        //Raise this event to UXPin.
        if (this.props.onDismiss) {
            this.props.onDismiss();
        }
    }

    render() {

        //if Header Text is defined
        var headerTxt = '';
        if (this.props.headerText) {
            headerTxt = (
                <Text
                    variant='xLarge'
                    block>
                    {this.props.headerText.trim()}
                </Text>
            );
        }

        //if Sub-Header Text is defined
        var subheaderTxt = '';
        if (this.props.subheaderText) {
            subheaderTxt = (
                <Text
                    variant='medium'
                    block>
                    {this.props.subheaderText.trim()}
                </Text>
            );
        }

        //For the ScrollPane
        let scrollPaneStyles = {
            root: {
                maxWidth: sizeToWidthMap[this.props.size],
            }
        }

        return (
            <>
                {this.state.open && <div
                    style={{
                        width: this.props.width,
                        height: this.props.height || defaultHeight,
                        color: '#000000',
                        backgroundColor: 'rgba(255, 255, 255, 0.4)'
                    }}
                >
                    <div style={{
                        width: sizeToWidthMap[this.props.size],
                        height: this.props.height || defaultHeight,
                        boxShadow: `rgba(0, 0, 0, 0.22) 0px 25.6px 57.6px 0px, rgba(0, 0, 0, 0.18) 0px 4.8px 14.4px 0px`,
                        float: 'right',
                        backgroundColor: '#ffffff',
                    }}>
                        {/* Main vertical stack */}
                        <Stack
                            styles={{
                                root: {
                                    width: '100%'
                                }
                            }}
                        >
                            {/* Header Area */}
                            <Stack>
                                {/* Header and Close button */}
                                <Stack
                                    horizontal={true}
                                    verticalAlign={'center'}
                                    horizontalAlign={'start'}
                                    tokens={{
                                        padding: 24,
                                        childrenGap: 12,
                                    }}>

                                    {/* Children Area */}
                                    <Stack
                                        tokens={{
                                            padding: 0,
                                            childrenGap: 6,
                                        }}
                                        horizontalAlign={'start'}
                                        verticalAlign={'start'}
                                        grow={1}
                                    >
                                        {headerTxt}
                                        {subheaderTxt}
                                    </Stack>

                                    <Stack.Item>
                                        <ActionButton
                                            iconName="Close"
                                            text="Close"
                                            onClick={() => this._onDismissClicked()}
                                        />
                                    </Stack.Item>
                                </Stack>
                            </Stack>

                            {/* Children Area */}
                            <div style={{ position: 'relative', zIndex: 0 }}>
                                <ScrollablePane
                                    styles={scrollPaneStyles}>
                                    <Stack
                                        tokens={{
                                            padding: 24,
                                            childrenGap: 24
                                        }}
                                        horizontalAlign={'stretch'}
                                        verticalAlign={'start'}
                                    >
                                        {this.props.children}
                                    </Stack>
                                </ScrollablePane>
                            </div>
                        </Stack>

                    </div>

                </div>}

                {!this.state.open && <div
                    style={{
                        width: 0,
                        height: 0,
                    }}
                ></div>}
            </>
        );
    }
};


Panel.propTypes = {
    /**
     * @uxpinignoreprop hide this from the user
     */
    children: PropTypes.node,

    /**
     * @uxpindescription To show or hide the panel 
     */
    show: PropTypes.bool,

    /**
     * @uxpindescription The text to be displayed in the header of the panel 
     * @uxpinpropname Header Text
     */
    headerText: PropTypes.string,

    /**
     * @uxpindescription The text to be displayed in the header of the panel, immediately under the Header Text
     * @uxpinpropname Sub-Header Text
     */
    subheaderText: PropTypes.string,

    /**
     * @uxpindescription The panel height
     */
    height: PropTypes.number,

    /**
     * @uxpindescription The full width on the control, including the overlay
     */
    width: PropTypes.number,

    /**
     * @uxpindescription The width of just the panel
     */
    size: PropTypes.oneOf(['small', 'medium', 'large', 'extraLarge']),

    /**
    * @uxpindescription Fired when the user clicks on the Close button
    * @uxpinpropname Dismiss
    */
    onDismiss: PropTypes.func,
};


Panel.defaultProps = {
    show: true,
    size: 'large',
    height: defaultHeight,
    width: defaultWidth,
    headerText: 'Panel Header',
    subheaderText: '',
}


export { Panel as default };
