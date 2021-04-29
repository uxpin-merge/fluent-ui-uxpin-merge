import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { Text as Text } from '@fluentui/react/lib/Text';
import ActionButton from '../ActionButton/ActionButton';
import { UxpColors } from '../_helpers/uxpcolorutils';



const defaultHeight = 900;
const defaultWidth = 1440;

const headerStyles = {
    root: {
        flexGrow: 1,
        padding: 24
    }
};

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
        console.log("Entering set. show: " + this.props.show);

        let isOpen = this.props.show ? true : false;

        this.setState(
            { open: isOpen }
        )

        console.log("    > Leaving componentDidUpdate. open: " + this.state.open);
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        console.log("Entering componentDidUpdate. show: " + this.props.show);

        if (this.prevProps.show !== this.props.show) {
            this.set();
        }

        console.log("    > Leaving componentDidUpdate. open: " + this.state.open);
    }

    dismissControl() {
        console.log("Entering dismissControl. open: " + this.state.open);
        //Set the control to not open to dismiss it.
        //We have to set the state and prop twice.

        this.setState(
            { open: false }
        )

        this.props.show = false;

        console.log("    > Leaving dismissControl. open: " + this.state.open);
    }

    _onDismissClicked() {
        console.log("Entering _onDismissClicked. open: " + this.state.open);

        this.dismissControl();

        if (this.props.onDismiss) {
            this.props.onDismiss();
        }

        console.log("    > Leaving _onDismissClicked. open: " + this.state.open);
    }

    render() {
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
                                <Stack horizontal>
                                    <Text
                                        variant='large'
                                        block
                                        styles={headerStyles}>
                                        {this.props.headerText}
                                    </Text>

                                    <Stack.Item styles={{
                                        root: {
                                            padding: 12
                                        }
                                    }}>
                                        <ActionButton
                                            iconName="Close"
                                            text="Close"
                                            onClick={() => this._onDismissClicked()}
                                        />
                                    </Stack.Item>
                                </Stack>
                            </Stack>

                            {/* Children Area */}
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
     * @uxpinbind onDismiss
     */
    show: PropTypes.bool,

    /**
     * @uxpindescription The text to be displayed in the header of the panel 
     * @uxpinpropname Header Text
     */
    headerText: PropTypes.string,

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
}


export { Panel as default };
