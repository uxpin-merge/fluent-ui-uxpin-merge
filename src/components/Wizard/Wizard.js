import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Modal } from '@fluentui/react/lib/Modal';
import { Nav } from '@fluentui/react/lib/Nav';
import { ResponsiveMode } from '@fluentui/react/';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { Text } from '@fluentui/react/lib/Text';
import ActionButton from '../ActionButton/ActionButton';
import Button from '../Button/Button';
import Link from '../Link/Link';
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
const headingBgColor = "#deecf9";     //themeLighter
const headingTextColor = '#000000';   //black
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
        console.log("On next clicked");
    }

    _onBackClick() {
        console.log("On back clicked");
    }

    _onCancelClick() {
        console.log("On cancel clicked");
    }

    _onHelpClick() {
        console.log("On help clicked");
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
                minWidth: '80vw',
                minHeight: '80vh',
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
                borderRight: '1px solid ' + navBorderColor,
            },
        };
        const footerStackItemStyles = {
            root: {
                borderTop: '1px dashed ' + navBorderColor,
            },
        };

        const wizardHeadingTextStyles = {
            root: {
                color: headingTextColor,
            },
        }
        const panelHeadingTextStyles = {
            root: {
                color: defaultTextColor,
            },
        }

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

        let foo = "Panel Heading! How freaking cool is this?? ";
        let panelHeading = (
            <Text
                styles={panelHeadingTextStyles}
                variant={panelHeadingTextVariant}>
                {foo}
            </Text>
        );


        const testStyle = {
            root: {
                background: '#c7e0f4',
                minWidth: '100%',
                width: '100%',
            },
        };
        const testStyle2 = {
            root: {
                background: 'pink',
            },
        };

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
                    responsiveMode={ResponsiveMode.xLarge}
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
                        <StackItem>
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
                                <StackItem
                                    tokens={{
                                        padding: 0,
                                        childrenGap: 6,
                                    }}
                                    horizontalAlign={stackTop}
                                    verticalAlign={stackTop}
                                    grow={1}
                                >
                                    {wizardHeading}
                                </StackItem>

                                <StackItem>
                                    <ActionButton
                                        iconName={"ChromeClose"}
                                        tooltip={''}
                                        text={''}
                                        onClick={() => this._onDismissClicked()}
                                    />
                                </StackItem>
                            </Stack>
                        </StackItem>

                        {/* Middle Section: Nav + Body */}

                        <Stack
                            horizontal={true}
                            grow={true}
                            horizontalAlign={stackStretch}
                            tokens={{
                                padding: 0,
                                childrenGap: 0,
                            }}>

                            {/* Nav: Display for the Steps */}
                            <StackItem
                                styles={navStackStyles}
                                grow={false}
                                verticalFill={true}>
                                <Stack
                                    horizontalAlign={stackStretch}
                                    grow={true}
                                >
                                    <Nav
                                        groups={this.state.steps}
                                    />
                                </Stack>
                            </StackItem>

                            {/* Body Section - Right Side */}
                            <StackItem
                                styles={testStyle}
                                horizontal={true}
                                horizontalAlign={stackStretch}
                                grow={true}
                            >
                                <Stack

                                    tokens={{
                                        childrenGap: 24,
                                        padding: 24,
                                    }}
                                    horizontal={false}
                                    grow={true}>

                                    <StackItem
                                        horizontalAlign={stackStretch}>
                                        {panelHeading}
                                    </StackItem>

                                    <StackItem>
                                        {/* Children Area for each panel */}
                                        <Stack
                                            tokens={{
                                                childrenGap: 12,
                                                padding: 0,
                                            }}
                                            horizontalAlign={stackStretch}
                                            verticalAlign={stackTop}
                                            verticalFill={true}
                                        >
                                            {"Hello!"}
                                        </Stack>
                                    </StackItem>
                                </Stack>
                            </StackItem>
                        </Stack>

                        {/* Footer Button Area */}
                        <Stack
                            horizontal={true}
                            verticalAlign={stackCenter}
                            horizontalAlign={stackStretch}
                            styles={footerStackItemStyles}
                            tokens={{
                                padding: 12,
                                childrenGap: 24,
                            }}>

                            {/* Left Side Help Button */}
                            <StackItem
                                tokens={{
                                    padding: 0,
                                    childrenGap: 6,
                                }}
                                horizontalAlign={stackTop}
                                verticalAlign={stackCenter}
                                grow={3}
                            >
                                <ActionButton
                                    iconName={"info"}
                                    text={''}
                                    tooltip={'Help'}
                                    onClick={() => this._onHelpClick()}
                                />
                            </StackItem>

                            <Stack
                                tokens={{
                                    padding: 0,
                                    childrenGap: 24,
                                }}
                                horizontal={true}
                                verticalAlign={stackCenter}
                            >
                                <Link
                                    value={"Cancel"}
                                    href={''}
                                    onClick={() => this._onCancelClick()}
                                />
                                <Button
                                    primary={false}
                                    text={"Back"}
                                    onClick={() => this._onNextClick()}
                                />
                                <Button
                                    primary={true}
                                    text={"Next"}
                                    onClick={() => this._onNextClick()}
                                />
                            </Stack>

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