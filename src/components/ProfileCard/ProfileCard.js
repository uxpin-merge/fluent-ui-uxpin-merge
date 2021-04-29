import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Callout, DirectionalHint } from '@fluentui/react/lib/Callout';
import {
    Persona,
    PersonaSize,
    PersonaPresence
} from '@fluentui/react/lib/Persona';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { UxpPersonaData } from '../_helpers/uxppersonadata';
// import { getTokens, csv2arr } from '../_helpers/parser.jsx';



//Default action items to populate the control with.
//Leave these left aligned as they show up in UXPin exactly as-is. 
// const defaultItems = `icon(Email) Send email
// icon(BubbleUser) Teams chat
// icon(Chat) Slack
// icon(CircleInfo) `;

//This is the default URL to use for a generic female user
let personaFemaleUrl = "https://static2.sharepointonline.com/files/fabric/office-ui-fabric-react-assets/persona-female.png"

//Special styling for the Callout
const calloutStyles = {
    root: {
        padding: "12px",
        background: 'white',
    }
};

// //Special styling for the CommandBar
// const cbStyles = {
//     root: ['ms-CommandBar',
//         {
//             background: 'white',
//             backgroundColor: 'white',
//             paddingLeft: '0',
//             paddingRight: '0',
//         }]
// };

//Special styling for the Stack
const personaStyles = {
    root: {
        lineHeight: '1.25',
    },
    tertiaryText: [{
        color: '#0070BA', //Blue 600
        selectors: {
            ':hover': {
                color: '#003087', //Blue 800
                textDecoration: 'underline',
            },
        },
    }],
};

//Special styling for the Stack
const stackStyles = {
    root: {
        background: 'white',
    },
};

//Padding for the Stack
const verticalGapStackTokens = {
    childrenGap: 12,
};


class ProfileCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            items: [],
            showCommandBar: false,
        }

        this._targetElm = React.createRef();
    }

    set() {
        this.setState(
            { open: this.props.open }
        )

        this.setItems();
    }

    //Parse the CommandBar items
    setItems() {
        //If there are no items, then return and skip this part. 
        let itemText = this.props.items.trim();
        if (itemText.length < 1)
            return;

        //Now that we know we have some items, let's parse them out
        let items = csv2arr(this.props.items)
            .flat()
            .map((val, index) => ({
                text: getTokens(val).text,
                key: index + 1,  //1 based index for UXPin users
                iconProps: this.getIconProps(val),
                onClick: () => this._onClick(index + 1) //Always send the index
            }));

        var showCommandBar = false;

        if (items && items.length > 0) {
            showCommandBar = true;
        }

        this.setState({
            items: items,
            showCommandBar: showCommandBar
        });
    }

    componentDidMount() {
        this.set();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.open !== this.props.open) {
            this.set();
        }
    }

    // //Get the user-entered left icon name, if there is one
    // getLeftIcon(str) {
    //     const tokens = getTokens(str).tokens
    //     const leftIcon = tokens && tokens.find(t => t.type === 'icon')
    //     return leftIcon ? leftIcon.target : ""
    // }

    // //Let's figure out the icon names.
    // getIconProps(str) {
    //     return { iconName: this.getLeftIcon(str) }
    // }



    /**
     * Hides the control 
     */
    dismissControl() {
        this.setState(
            { open: false }
        )
    }

    /**
     * Handle the onDismiss for the Callout. 
     * Gets triggered when the user clicks off the Callout. 
     */
    _onDismiss() {
        this.dismissControl();
    }

    /**
     * Handle the onClick handling for the Persona's email link and CommandBar buttons. 
     */
    _onClick(str) {
        //Raise this event to UXPin. We'll send them the button's index or email value in case they can catch it.
        if (this.props.onClick) {
            this.props.onClick(str);
        }

        console.log("button click: " + str);

        this.dismissControl();
    }


    render() {

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
                    <Callout
                        {...this.props}
                        target={this._targetElm.current}
                        styles={calloutStyles}
                        calloutWidth={0} //This makes the width automatic
                        directionalHint={DirectionalHint[this.props.direction]}
                        doNotLayer={false}
                        gapSpace={0}
                        isBeakVisible={false}
                        hideOverflow={true}
                        onDismiss={(this._onDismiss.bind(this))}
                    >
                        <Stack
                            styles={stackStyles}
                            tokens={verticalGapStackTokens} >

                            <StackItem align={'start'}>
                                <Persona
                                    {...this.props}
                                    size={PersonaSize['size72']}
                                    presence={PersonaPresence[this.props.ppPresence]}
                                    initialsColor={this.props.ppInitialsColor}
                                    styles={personaStyles}

                                    //We can set these props as-is
                                    imageUrl={this.props.imageUrl}
                                    imageInitials={this.props.initials}
                                    text={this.props.name}
                                    secondaryText={this.props.role}
                                    tertiaryText={this.props.email}
                                    onClick={() => this._onClick(0)} //Always send 0
                                />
                            </StackItem>

                            {this.state.showCommandBar && (
                                <StackItem align={'start'}>
                                    <CommandBar
                                        items={this.state.items}
                                        styles={cbStyles}
                                    />
                                </StackItem>
                            )}
                        </Stack>
                    </Callout>
                )}
            </>

        );
    }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
ProfileCard.propTypes = {

    /**
     * @uxpindescription Whether to display the control 
     * @uxpinpropname Show
     */
    open: PropTypes.bool,

    /**
    * @uxpindescription The URL to an image file. Leave empty to display initials instead. 
    * @uxpinpropname Img URL
    * @uxpincontroltype textfield(6)
    */
    imageUrl: PropTypes.string,

    /**
     * Requires a proprietary prop name, or else things get screwy. 
     * @uxpindescription The user's presence status 
     * @uxpinpropname Presence
     */
    ppPresence: PropTypes.oneOf(['none', 'online', 'offline', 'away', 'busy', 'dnd', 'blocked']),

    /**
     * Requires a proprietary PayPal prop name, or else things get screwy   
     * @uxpindescription If no image, the color of the 'coin' showing the user's initials 
     * @uxpinpropname Initials Color
     */
    ppInitialsColor: PropTypes.oneOf([
        'green', 'darkGreen', 'teal', 'lightBlue', 'blue', 'darkBlue', 'violet',
        'purple', 'magenta', 'lightPink', 'pink', 'burgundy', 'lightRed', 'darkRed',
        'orange', 'rust', 'gold', 'warmGray', 'coolGray']),

    /**
     * @uxpindescription If no image, the initials to display on the 'coin' 
     * @uxpinpropname Initials
     */
    initials: PropTypes.string,

    /**
     * @uxpindescription The full name for this persona 
     * @uxpinpropname Name
     */
    name: PropTypes.string,

    /**
     * @uxpindescription This persona's role; displayed under their name
     * @uxpinpropname Role
     */
    role: PropTypes.string,

    /**
     * @uxpindescription This persona's email address
     */
    email: PropTypes.string,

    /**
     * @uxpindescription The list of communication action items. Put each item on a separate line. Use this pattern: icon(IconName) Action Text
     * @uxpinpropname Action Items
     * @uxpincontroltype codeeditor
     */
    items: PropTypes.string,

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
     * @uxpindescription Whether to show the light blue target marker on the canvas 
     * @uxpinpropname Show Marker
     */
    showMarker: PropTypes.bool,

    /**
     * @uxpindescription Fires when one of the CommandBar buttons is clicked on
     * @uxpinpropname Click
     * */
    onClick: PropTypes.func,
}


/**
 * Set the default values for this control in the UXPin Editor.
 */
ProfileCard.defaultProps = {
    open: true,
    imageUrl: personaFemaleUrl,
    initials: 'AL',
    name: 'Annie Lindqvist',
    role: 'Software Engineer',
    email: 'alindqvist@paypal.com',
    ppInitialsColor: 'darkBlue',
    ppPresence: 'online',
    direction: "bottomAutoEdge",
    showMarker: true,
    items: defaultItems,
}


export { ProfileCard as default };