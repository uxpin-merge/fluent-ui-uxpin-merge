import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Modal } from '@fluentui/react/lib/Modal';
import { Nav } from '@fluentui/react/lib/Nav';
import { ResponsiveMode } from '@fluentui/react/';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import ActionButton from '../ActionButton/ActionButton';
import { UxpColors } from '../_helpers/uxpcolorutils';
import { UxpMenuUtils } from '../_helpers/uxpmenuutils';
import { UxpNumberParser } from '../_helpers/uxpnumberparser';


const _dragOptions = {
    moveMenuItemText: 'Move',
    closeMenuItemText: 'Close',
};


//Default nav items to populate the control with.
//Leave these left aligned as they show up in UXPin exactly as-is. 
const defaultNavItems = `1 Details | Details
2 Collaborators | Identify Collaborators
3 Review | Review`;

const defaultPanelPadding = 24;
const headingBgColor = "#0078d4";     //themePrimary
const headingTextColor = '#ffffff';   //white
const navBgColor = '#f3f2f1';         //neutralLighter
const navBorderColor = '#d2d0ce';     //neutralQuaternary
const defaultTextColor = '#000000';    //black
const panelHeadingTextVariant = 'xLarge';

/** Width for the Nav control displaying the steps */
const navStepWidth = 211;
const stackStretch = 'stretch';
const stackTop = 'start';
const stackCenter = 'center';

class Wizard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            steps: [],
            pageHeadings: [],
            open: false,
        }
    }

    set() {
        console.log("Entering Set. Show? " + this.props.show);

        this.setState(
            { open: this.props.show }
        )
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.selectedIndex !== this.props.selectedIndex ||
            prevProps.steps !== this.props.steps ||
            prevProps.show !== this.props.show) {
            this.set();
        }
    }

    _onRenderItem(item, index) {

    }

    _onStepClick(index) {

    }

    _onNextClick() {

    }

    _onBackClick() {

    }

    _onCancelClick() {

    }

    _onHelpClick() {

    }

    _onDismissClicked() {
        this.dismissControl(true);
    }

    dismissControl(notifyUXPin) {
        //Notify UXPin that the Close icon has been clicked on.
        if (notifyUXPin && this.props.dismiss) {
            this.props.dismiss();
        }

        //Set the control to not open to dismiss it.
        //We have to set the state and prop twice.

        this.setState(
            { open: false }
        )

        this.props.show = false;
    }

    render() {
        /** Misc Constants */
        const wizardStackItemStyles = {
            root: {
                background: '#ffffff',
            },
        };
        const headerStackItemStyles = {
            root: {
                background: headingBgColor,
            },
        };
        const navStackStyles = {
            root: {
                padding: 0,
                width: navStepWidth,
                minHeight: '200',
                height: 'auto',
                background: navBgColor,
                border: '1px solid ' + navBorderColor,
            },
        };
        const wizardHeadingTextStyles = {
            root: {
                color: "#ffffff",
            },
        }
        const panelHeadingTextStyles = {
            root: {
                color: defaultTextColor,
            },
        }
        const dismissBtnStyles = {
            icon: { color: '#ffffff' },
            root: {
                selectors: {
                    ':hover .ms-Button-icon': {
                        color: '#f3f2f1' //neutraLighter
                    },
                    ':active .ms-Button-icon': {
                        color: '#e1dfdd' //neutralQuaternaryAlt
                    }
                }
            }
        };

        /** Wizard Heading */
        var wizardHeading = '';
        if (this.props.title) {
            wizardHeading = (
                <Text
                    styles={wizardHeadingTextStyles}
                    variant={panelHeadingTextVariant}
                    block>
                    {this.props.title?.trim()}
                </Text>
            );
        }

        let foo = "Panel Heading!";
        let panelHeading = (
            <Text
                styles={panelHeadingTextStyles}
                variant={panelHeadingTextVariant}>
                {foo}
            </Text>
        );


        return (

            <div>
                <div  //A visual aid for the designer to see in UXPin
                    style={{
                        width: '100px',
                        height: '100px',
                        color: "white",
                        textAlign: "center",
                        verticalAlign: "middle",
                        background: '#d29200',
                        borderRadius: 10
                    }}><br /><em><strong>Wizard:</strong></em><br />Move this marker offscreen</div>

                <Modal
                    isOpen={this.state.open}
                    responsiveMode={ResponsiveMode.large}
                    isDarkOverlay={true}
                    isBlocking={true}
                    dragOptions={undefined}
                    onDismiss={() => { this._onDismissClicked() }}
                >

                    {/* Modal Display Area */}
                    <Stack
                        horizontal={false}
                        horizontalAlign={stackStretch}
                        styles={wizardStackItemStyles}>

                        {/* Header and Close button */}
                        <Stack
                            horizontal={true}
                            verticalAlign={stackCenter}
                            horizontalAlign={stackTop}
                            styles={headerStackItemStyles}
                            tokens={{
                                padding: 12,
                                childrenGap: 12,
                            }}>

                            {/* Left Side Text */}
                            <Stack
                                tokens={{
                                    padding: 0,
                                    childrenGap: 6,
                                }}
                                horizontalAlign={stackTop}
                                verticalAlign={stackTop}
                                grow={1}
                            >
                                {wizardHeading}
                            </Stack>

                            <Stack.Item>
                                <ActionButton
                                    iconName={"ChromeClose"}
                                    tooltip={"Close"}
                                    text={''}
                                    styles={dismissBtnStyles}
                                    onClick={() => this._onDismissClicked()}
                                />
                            </Stack.Item>
                        </Stack>

                        {/* Middle Section: Nav + Body */}
                        <Stack
                            horizontal={true}
                            verticalAlign={stackTop}
                            horizontalAlign={stackTop}
                            tokens={{
                                padding: 0,
                                childrenGap: 0,
                            }}>

                            {/* Nav: Display for the Steps */}
                            <StackItem>
                                <Stack
                                    styles={navStackStyles}
                                    horizontalAlign={stackStretch}
                                >
                                    <Nav
                                        groups={this.state.steps}
                                    />
                                </Stack>
                            </StackItem>

                            {/* Body Section - Right Side */}
                            <StackItem>
                                <Stack
                                    tokens={{
                                        childrenGap: 24,
                                        padding: 24,
                                    }}
                                    horizontal={false}
                                    horizontalAlign={stackStretch}
                                    verticalAlign={stackTop}>

                                    {panelHeading}

                                    {/* Children Area for each panel */}
                                    <Stack
                                        tokens={{
                                            childrenGap: 12,
                                            padding: 12,
                                        }}
                                        horizontalAlign={stackCenter}
                                        verticalAlign={stackTop}
                                    >
                                        {"Hello!"}
                                    </Stack>

                                </Stack>

                            </StackItem>
                        </Stack>
                    </Stack>
                </Modal>
            </div>
        )
    }
}


/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
Wizard.propTypes = {

    /**
     * Don't show this prop in the UXPin Editor. 
     * @uxpinignoreprop 
     * @uxpindescription Contents for the main body of the control.  
     * @uxpinpropname Right Contents
     */
    children: PropTypes.node,

    /**
    * @uxpindescription Whether to display the Wizard 
    */
    show: PropTypes.bool,

    /**
     * @uxpindescription The text to be displayed in the header of the control 
     * @uxpinpropname Title
     */
    title: PropTypes.string,

    /**
     * @uxpindescription The 1-based index value of the tab to be shown as selected by default. 
     * @uxpinpropname Selected Index
     */
    selectedIndex: PropTypes.number,

    /**
     * @uxpindescription The list of steps in the nav. Put each item on a separate line.
     * @uxpinpropname Items
     * @uxpincontroltype codeeditor
     */
    steps: PropTypes.string,

    /**
     * @uxpindescription Fires when the Submit Button is clicked.
     * @uxpinpropname Submit Clicked
     */
    onSubmit: PropTypes.func,

    /**
     * @uxpindescription Fires when the Help Button is clicked.
     * @uxpinpropname Help Clicked
     */
    onHelp: PropTypes.func,

    /**
     * @uxpindescription Fires when the Wizard is dismissed by the Close or Cancel buttons.
     * @uxpinpropname Dismissed
     */
    dismiss: PropTypes.func,
};


/**
 * Set the default values for this control in the UXPin Editor.
 */
Wizard.defaultProps = {
    show: false,
    title: "Wizard",
    steps: defaultNavItems,
};


export { Wizard as default };