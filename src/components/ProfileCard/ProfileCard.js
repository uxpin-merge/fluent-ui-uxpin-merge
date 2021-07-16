import * as React from 'react';
import * as PropTypes from 'prop-types';
import HorizontalStack from '../HorizontalStack/HorizontalStack';
import Persona from '../Persona/Persona';
import { PersonaSize } from '@fluentui/react/lib/Persona';
import { Stack, StackItem } from '@fluentui/react/lib/Stack';
import { UxpImageUtils } from '../_helpers/uxpimageutils';
import { UxpPersonaData } from '../_helpers/uxppersonadata';



//For the Stack
const stackVAlign = 'start';
const stackHAlign = 'stretch';
const stackItemStyles = {
    root: {
        height: 'auto',
        width: 'auto',
    },
};
const stackTokens = {
    childrenGap: 0,
    padding: '12px',
};

//This is the default URL to use for a generic female user
const defaultPersonaUrl = "https://raw.githubusercontent.com/uxpin-merge/fluent-ui-uxpin-merge/master/src/components/_helpers/_images/person04.jpg";
const defaultSize = 'size72';
const cmdBarHAlign = 'left';
const cmdBarVAlign = 'middle';



class ProfileCard extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Handle the onClick handling for the Persona's email link and CommandBar buttons. 
     */
    _onClick(str) {
        //Raise this event to UXPin. We'll send them the button's index or email value in case they can catch it.
        if (this.props.onPersonaClick) {
            this.props.onPersonaClick(str);
        }

        console.log("Persona click: " + str);
    }


    render() {

        let presenceCode = UxpPersonaData.presenceCodes[this.props.ppPresence];

        let imgURL = UxpImageUtils.getImageUrlByToken(this.props.imageUrl);

        var commandBar = '';
        if (this.props.children) {
            //First, let's create our own array of children, since UXPin returns an object for 1 child, or an array for 2 or more.
            let childList = React.Children.toArray(this.props.children);

            commandBar = (
                <HorizontalStack
                    {...this.props}
                    gutterPadding={0}
                    widths={""}
                    addSpanner={false}
                    align={cmdBarHAlign}
                    vAlign={cmdBarVAlign}>
                    {childList}
                </HorizontalStack>
            );
        }

        return (

            <Stack
                {...this.props}
                tokens={stackTokens}
                horizontal={false}
                horizontalAlign={stackHAlign}
                verticalAlign={stackVAlign}
                wrap={false}
                styles={stackItemStyles}>

                <Persona
                    {...this.props}
                    ppSize={PersonaSize[this.props.ppSize]}
                    imageUrl={imgURL}
                    initials={this.props.initials}
                    ppPresence={presenceCode}
                    ppInitialsColor={this.props.ppInitialsColor}
                    name={this.props.name}
                    role={this.props.role}
                    tertiaryText={this.props.email}
                    onClick={() => this._onClick(0)}
                />

                {commandBar}

            </Stack>

            // <Stack
            //     styles={stackStyles}
            //     tokens={verticalGapStackTokens} >

            //     <StackItem align={'start'}>
            //         <Persona
            //             {...this.props}
            //             size={PersonaSize['size72']}
            //             presence={PersonaPresence[this.props.ppPresence]}
            //             initialsColor={this.props.ppInitialsColor}
            //             styles={personaStyles}

            //             //We can set these props as-is
            //             imageUrl={this.props.imageUrl}
            //             imageInitials={this.props.initials}
            //             text={this.props.name}
            //             secondaryText={this.props.role}
            //             tertiaryText={this.props.email}
            //             onClick={() => this._onClick(0)} //Always send 0
            //         />
            //     </StackItem>

            //     {this.state.showCommandBar && (
            //         <StackItem align={'start'}>
            //             <CommandBar
            //                 items={this.state.items}
            //                 styles={cbStyles}
            //             />
            //         </StackItem>
            //     )}
            // </Stack>

        );
    }
}



/** 
 * Set up the properties to be available in the UXPin property inspector. 
 */
ProfileCard.propTypes = {

    /**
     * Don't show this prop in the UXPin Editor. 
     * @uxpinignoreprop 
     * @uxpindescription Contents for the body of the control. 
     * @uxpinpropname Children
     */
    children: PropTypes.node,

    /**
    * @uxpindescription The URL to an image file. Leave empty to display initials instead. 
    * @uxpinpropname Img URL
    * @uxpincontroltype textfield(6)
    */
    imageUrl: PropTypes.string,

    /**
    * Requires a proprietary PayPal prop name, or else things get screwy. 
    * @uxpindescription The control's size 
    * @uxpinpropname Size
    */
    ppSize: PropTypes.oneOf(['size8', 'size24', 'size32', 'size40', 'size56', 'size72', 'size100']),

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
     * @uxpinpropname Email
     */
    email: PropTypes.string,

    /**
     * @uxpindescription Fires when th Persona component is clicked on
     * @uxpinpropname  Click Persona
     * */
    onPersonaClick: PropTypes.func,
}


/**
 * Set the default values for this control in the UXPin Editor.
 */
ProfileCard.defaultProps = {
    imageUrl: defaultPersonaUrl,
    initials: 'SCPC',
    name: 'Sydney Coleman PC',
    role: 'Financial Analyst II PC',
    email: 'alindqvist_pc@paypal.com',
    ppSize: defaultSize,
    ppPresence: 'online',
    ppInitialsColor: 'lightBlue',
}


export { ProfileCard as default };